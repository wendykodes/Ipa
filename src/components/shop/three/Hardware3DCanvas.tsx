import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export interface Hardware3DParams {
  temperature: number; // 270K - 450K
  roughness: number;   // 0.05 - 0.95
  restitution: number; // 0.1 - 1.0 (spring bounce)
  exploded: number;    // 0.0 - 1.0 (separation distance)
  lightingMood: 'obsidian' | 'clean-lab' | 'cyber-sunset';
  activeHotspot: string | null;
  onHotspotClick?: (id: string, name: string) => void;
  scrollProgress: number; // 0.0 - 1.0 driven by GSAP ScrollTrigger
}

interface Hardware3DCanvasProps {
  params: Hardware3DParams;
  className?: string;
}

export const Hardware3DCanvas: React.FC<Hardware3DCanvasProps> = ({
  params,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const paramsRef = useRef<Hardware3DParams>(params);
  paramsRef.current = params;

  // Reusable refs for mutable state & Three.js objects
  const sceneStateRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    heroGroup?: THREE.Group;
    explodedLayers: {
      layer: THREE.Object3D;
      baseY: number;
      explodeDirY: number;
      explodeDirZ: number;
    }[];
    heatSinkMaterial?: THREE.MeshStandardMaterial;
    basaltMaterial?: THREE.MeshStandardMaterial;
    glassMaterial?: THREE.MeshPhysicalMaterial;
    brassMaterial?: THREE.MeshStandardMaterial;
    keyLight?: THREE.DirectionalLight;
    fillLight?: THREE.HemisphereLight;
    rimLight?: THREE.PointLight;
    gyroRings: THREE.Mesh[];
    // Spring physics state
    spring: {
      targetRotX: number;
      targetRotY: number;
      currentRotX: number;
      currentRotY: number;
      velX: number;
      velY: number;
    };
    cameraTarget: {
      pos: THREE.Vector3;
      lookAt: THREE.Vector3;
    };
    animFrameId?: number;
  }>({
    explodedLayers: [],
    gyroRings: [],
    spring: {
      targetRotX: 0,
      targetRotY: 0,
      currentRotX: 0,
      currentRotY: 0,
      velX: 0,
      velY: 0,
    },
    cameraTarget: {
      pos: new THREE.Vector3(0, 1.2, 5.0),
      lookAt: new THREE.Vector3(0, 0, 0),
    },
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x08080a);
    scene.fog = new THREE.FogExp2(0x08080a, 0.08);

    // 2. CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.0);
    camera.lookAt(0, 0, 0);

    // 3. RENDERER WITH PBR DIRECTIVES
    const isHeadless = typeof navigator !== 'undefined' && (/HeadlessChrome/i.test(navigator.userAgent) || navigator.webdriver);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. STUDIO ENVIRONMENT REFLECTION (RoomEnvironment + PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 5. 3-POINT STUDIO LIGHTING RIG
    const keyLight = new THREE.DirectionalLight(0xfff6ee, 3.8);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = !isHeadless;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.camera.left = -2.5;
    keyLight.shadow.camera.right = 2.5;
    keyLight.shadow.camera.top = 2.5;
    keyLight.shadow.camera.bottom = -2.5;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0xdde5ed, 0x18181c, 1.2);
    fillLight.position.set(0, 10, 0);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xa5c4e8, 2.5, 12);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Ground Contact Shadow & Technical Grid Disc
    const groundGroup = new THREE.Group();
    groundGroup.position.y = -1.25;

    // Contact shadow radial plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.001;
    groundGroup.add(shadowPlane);

    // Precision Vernier Calibration Grid Floor
    const gridHelper = new THREE.GridHelper(8, 32, 0x3f3f46, 0x1f1f23);
    gridHelper.position.y = 0.002;
    groundGroup.add(gridHelper);
    scene.add(groundGroup);

    // 6. PROCEDURAL TEXTURES (Brushed Titanium / Basalt & Laser Reticle)
    const brushedCanvas = document.createElement('canvas');
    brushedCanvas.width = 512;
    brushedCanvas.height = 512;
    const bCtx = brushedCanvas.getContext('2d');
    if (bCtx) {
      bCtx.fillStyle = '#222226';
      bCtx.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 4000; i++) {
        bCtx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)';
        const y = Math.random() * 512;
        bCtx.fillRect(0, y, 512, 1 + Math.random() * 1.5);
      }
    }
    const brushedTex = new THREE.CanvasTexture(brushedCanvas);
    brushedTex.wrapS = THREE.RepeatWrapping;
    brushedTex.wrapT = THREE.RepeatWrapping;
    brushedTex.repeat.set(2, 2);
    brushedTex.colorSpace = THREE.SRGBColorSpace;
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    brushedTex.anisotropy = maxAnisotropy;

    // 7. COMPOSITE PROCEDURAL HERO OBJECT (THREE.Group with 6 articulated parts)
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // Materials
    const basaltMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1e,
      roughness: 0.28,
      metalness: 0.85,
      map: brushedTex,
      envMapIntensity: 1.4,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xba8c46, // Warm architectural brass/copper
      roughness: 0.2,
      metalness: 0.95,
      envMapIntensity: 1.8,
    });

    const heatSinkMaterial = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.35,
      metalness: 0.9,
      emissive: new THREE.Color(0x000000),
      emissiveIntensity: 0.0,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.06,
      ior: 1.52,
      thickness: 0.8,
      specularIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      depthWrite: false,
    });

    const explodedLayers: {
      layer: THREE.Object3D;
      baseY: number;
      explodeDirY: number;
      explodeDirZ: number;
    }[] = [];

    // Part 1: Heavy Monolithic Ground Base (Substrate Stage)
    const baseGeo = new THREE.CylinderGeometry(1.3, 1.4, 0.18, 64);
    const baseMesh = new THREE.Mesh(baseGeo, basaltMaterial);
    baseMesh.position.y = -0.95;
    baseMesh.castShadow = !isHeadless;
    baseMesh.receiveShadow = !isHeadless;
    heroGroup.add(baseMesh);
    explodedLayers.push({ layer: baseMesh, baseY: -0.95, explodeDirY: -0.4, explodeDirZ: 0 });

    // Part 2: Chamfered Primary Monolithic Core Block
    const coreShape = new THREE.Shape();
    const w = 1.0;
    const h = 0.9;
    const bevel = 0.12;
    coreShape.moveTo(-w / 2 + bevel, -h / 2);
    coreShape.lineTo(w / 2 - bevel, -h / 2);
    coreShape.lineTo(w / 2, -h / 2 + bevel);
    coreShape.lineTo(w / 2, h / 2 - bevel);
    coreShape.lineTo(w / 2 - bevel, h / 2);
    coreShape.lineTo(-w / 2 + bevel, h / 2);
    coreShape.lineTo(-w / 2, h / 2 - bevel);
    coreShape.lineTo(-w / 2, -h / 2 + bevel);
    coreShape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.7,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };
    const coreGeo = new THREE.ExtrudeGeometry(coreShape, extrudeSettings);
    coreGeo.center();
    const coreMesh = new THREE.Mesh(coreGeo, basaltMaterial);
    coreMesh.position.y = -0.2;
    coreMesh.castShadow = !isHeadless;
    coreMesh.receiveShadow = !isHeadless;
    heroGroup.add(coreMesh);
    explodedLayers.push({ layer: coreMesh, baseY: -0.2, explodeDirY: -0.15, explodeDirZ: 0 });

    // Part 3: Laser-cut Thermal Heat-Sink Fin Array (Stack of precision horizontal vanes)
    const finGroup = new THREE.Group();
    finGroup.position.y = 0.45;
    const finCount = 7;
    for (let i = 0; i < finCount; i++) {
      const finMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.85 - i * 0.04, 0.024, 0.65 - i * 0.03),
        heatSinkMaterial
      );
      finMesh.position.y = (i - finCount / 2) * 0.055;
      finMesh.castShadow = !isHeadless;
      finGroup.add(finMesh);
    }
    heroGroup.add(finGroup);
    explodedLayers.push({ layer: finGroup, baseY: 0.45, explodeDirY: 0.35, explodeDirZ: -0.2 });

    // Part 4: Concentric Gyroscopic Resonance Rings (Zero-Compute Hardware Parody Core)
    const gyroGroup = new THREE.Group();
    gyroGroup.position.set(0, 0.45, 0.42);
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.02, 24, 48), brassMaterial);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.016, 24, 48), brassMaterial);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.012, 24, 48), brassMaterial);
    gyroGroup.add(ring1);
    gyroGroup.add(ring2);
    gyroGroup.add(ring3);
    heroGroup.add(gyroGroup);
    explodedLayers.push({ layer: gyroGroup, baseY: 0.45, explodeDirY: 0.5, explodeDirZ: 0.45 });

    // Part 5: Optical Borosilicate Floating Crystal Prism
    const crystalGeo = new THREE.CylinderGeometry(0.48, 0.52, 0.35, 8);
    const crystalMesh = new THREE.Mesh(crystalGeo, glassMaterial);
    crystalMesh.position.set(0, 0.95, 0);
    crystalMesh.castShadow = !isHeadless;
    heroGroup.add(crystalMesh);
    explodedLayers.push({ layer: crystalMesh, baseY: 0.95, explodeDirY: 0.85, explodeDirZ: 0 });

    // Part 6: Anodized Titanium Crown & Calibration Cap
    const capGeo = new THREE.CylinderGeometry(0.25, 0.32, 0.12, 32);
    const capMesh = new THREE.Mesh(capGeo, brassMaterial);
    capMesh.position.set(0, 1.22, 0);
    heroGroup.add(capMesh);
    explodedLayers.push({ layer: capMesh, baseY: 1.22, explodeDirY: 1.2, explodeDirZ: 0 });

    // Pre-warm WebGL shaders once per Three.js skill
    renderer.compile(scene, camera);

    // Save into state ref
    sceneStateRef.current = {
      renderer,
      scene,
      camera,
      heroGroup,
      explodedLayers,
      heatSinkMaterial,
      basaltMaterial,
      glassMaterial,
      brassMaterial,
      keyLight,
      fillLight,
      rimLight,
      gyroRings: [ring1, ring2, ring3],
      spring: {
        targetRotX: 0,
        targetRotY: 0,
        currentRotX: 0,
        currentRotY: 0,
        velX: 0,
        velY: 0,
      },
      cameraTarget: {
        pos: new THREE.Vector3(0, 1.2, 5.0),
        lookAt: new THREE.Vector3(0, 0, 0),
      },
    };

    // 8. CURSOR EVENT LISTENERS FOR MAGNETIC SPRING INERTIA
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Max tilt amplitude: ~25 degrees
      sceneStateRef.current.spring.targetRotY = nx * 0.55;
      sceneStateRef.current.spring.targetRotX = -ny * 0.38;
    };

    const handleMouseLeave = () => {
      sceneStateRef.current.spring.targetRotX = 0;
      sceneStateRef.current.spring.targetRotY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Handle Resize
    const handleResize = () => {
      if (!container || !sceneStateRef.current.camera || !sceneStateRef.current.renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      sceneStateRef.current.camera.aspect = w / h;
      sceneStateRef.current.camera.updateProjectionMatrix();
      sceneStateRef.current.renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. ANIMATION LOOP (Frame-rate independent exponential damping + spring physics)
    let lastTime = performance.now();
    const clock = new THREE.Clock();

    const animate = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsedTime = clock.getElapsedTime();

      const p = paramsRef.current;
      const state = sceneStateRef.current;

      if (state.heroGroup && state.camera && state.renderer && state.scene) {
        // A. Dynamic Parameter Updates in real-time
        if (state.basaltMaterial) {
          state.basaltMaterial.roughness = p.roughness;
        }

        // Thermal glow on heat-sink fins
        if (state.heatSinkMaterial) {
          // Temperature above 300K starts radiating warm orange/amber thermal emission
          const heatRatio = Math.max(0, Math.min(1, (p.temperature - 300) / 150));
          state.heatSinkMaterial.emissive.setRGB(
            heatRatio * 1.0,
            heatRatio * 0.28,
            heatRatio * 0.04
          );
          state.heatSinkMaterial.emissiveIntensity = heatRatio * 2.2;
        }

        // B. Gyroscope rings continuous kinetic counter-rotation
        if (state.gyroRings.length === 3) {
          state.gyroRings[0].rotation.x = elapsedTime * 0.8;
          state.gyroRings[0].rotation.y = elapsedTime * 0.5;
          state.gyroRings[1].rotation.y = -elapsedTime * 1.1;
          state.gyroRings[1].rotation.z = elapsedTime * 0.6;
          state.gyroRings[2].rotation.z = elapsedTime * 1.4;
          state.gyroRings[2].rotation.x = -elapsedTime * 0.7;
        }

        // C. Spring Physics for cursor tilt (restitution controls bounce/stiffness)
        const stiffness = 85.0 * (p.restitution * 1.2);
        const damping = 12.0 / Math.max(0.2, p.restitution);

        const diffX = state.spring.targetRotX - state.spring.currentRotX;
        const diffY = state.spring.targetRotY - state.spring.currentRotY;

        state.spring.velX += (diffX * stiffness - state.spring.velX * damping) * delta;
        state.spring.velY += (diffY * stiffness - state.spring.velY * damping) * delta;

        state.spring.currentRotX += state.spring.velX * delta;
        state.spring.currentRotY += state.spring.velY * delta;

        // Base idle breathing rotation + scroll scrub rotation + cursor spring
        const scrollRotY = p.scrollProgress * Math.PI * 2.5;
        state.heroGroup.rotation.y = scrollRotY + state.spring.currentRotY + Math.sin(elapsedTime * 0.5) * 0.05;
        state.heroGroup.rotation.x = state.spring.currentRotX + Math.cos(elapsedTime * 0.4) * 0.03;

        // D. Exploded view layer translation
        // Driven by either scrollProgress stages or manual exploded slider
        const effectiveExploded = Math.max(
          p.exploded,
          p.scrollProgress > 0.25 && p.scrollProgress < 0.75
            ? Math.sin((p.scrollProgress - 0.25) / 0.5 * Math.PI) * 1.1
            : 0
        );

        state.explodedLayers.forEach((item) => {
          const targetY = item.baseY + item.explodeDirY * effectiveExploded;
          const targetZ = item.explodeDirZ * effectiveExploded;
          item.layer.position.y = THREE.MathUtils.damp(item.layer.position.y, targetY, 6.0, delta);
          item.layer.position.z = THREE.MathUtils.damp(item.layer.position.z, targetZ, 6.0, delta);
        });

        // E. Camera Choreography synced to scroll progress & hotspots
        // 4 Technical Camera Stages:
        // 0.0 - 0.25: Hero Overview Angle [0, 1.2, 5.0]
        // 0.25 - 0.55: Exploded Axonometric High Angle [2.8, 3.2, 4.0]
        // 0.55 - 0.80: Macro Crystalline Inspection [-1.4, 1.4, 2.6]
        // 0.80 - 1.00: Kinematic Base & Calibration View [0.0, 0.4, 3.8]
        let camTargetX = 0;
        let camTargetY = 1.2;
        let camTargetZ = 5.0;
        let lookAtY = 0;

        if (p.activeHotspot === 'crystal') {
          camTargetX = 0;
          camTargetY = 1.3;
          camTargetZ = 2.4;
          lookAtY = 0.95;
        } else if (p.activeHotspot === 'gyro') {
          camTargetX = 0.6;
          camTargetY = 0.8;
          camTargetZ = 2.2;
          lookAtY = 0.45;
        } else if (p.activeHotspot === 'fins') {
          camTargetX = -1.2;
          camTargetY = 0.9;
          camTargetZ = 2.5;
          lookAtY = 0.45;
        } else if (p.activeHotspot === 'base') {
          camTargetX = 0;
          camTargetY = -0.3;
          camTargetZ = 3.2;
          lookAtY = -0.95;
        } else {
          // Dynamic camera spline based on scrollProgress
          const sp = p.scrollProgress;
          if (sp < 0.25) {
            // Stage 1: Hero front 3/4
            const t = sp / 0.25;
            camTargetX = THREE.MathUtils.lerp(0, 1.5, t);
            camTargetY = THREE.MathUtils.lerp(1.2, 1.6, t);
            camTargetZ = THREE.MathUtils.lerp(5.0, 4.4, t);
            lookAtY = 0;
          } else if (sp < 0.6) {
            // Stage 2: Axonometric elevated view
            const t = (sp - 0.25) / 0.35;
            camTargetX = THREE.MathUtils.lerp(1.5, 3.0, t);
            camTargetY = THREE.MathUtils.lerp(1.6, 2.8, t);
            camTargetZ = THREE.MathUtils.lerp(4.4, 3.6, t);
            lookAtY = THREE.MathUtils.lerp(0, 0.3, t);
          } else if (sp < 0.85) {
            // Stage 3: Macro optical crystal close-up
            const t = (sp - 0.6) / 0.25;
            camTargetX = THREE.MathUtils.lerp(3.0, -1.2, t);
            camTargetY = THREE.MathUtils.lerp(2.8, 1.4, t);
            camTargetZ = THREE.MathUtils.lerp(3.6, 2.5, t);
            lookAtY = THREE.MathUtils.lerp(0.3, 0.85, t);
          } else {
            // Stage 4: Monolithic final grounding elevation
            const t = (sp - 0.85) / 0.15;
            camTargetX = THREE.MathUtils.lerp(-1.2, 0.0, t);
            camTargetY = THREE.MathUtils.lerp(1.4, 0.6, t);
            camTargetZ = THREE.MathUtils.lerp(2.5, 4.2, t);
            lookAtY = THREE.MathUtils.lerp(0.85, 0.0, t);
          }
        }

        // Smoothly damp camera position & lookAt target
        state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, camTargetX, 4.5, delta);
        state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, camTargetY, 4.5, delta);
        state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, camTargetZ, 4.5, delta);

        state.cameraTarget.lookAt.y = THREE.MathUtils.damp(state.cameraTarget.lookAt.y, lookAtY, 4.5, delta);
        state.camera.lookAt(state.cameraTarget.lookAt);

        // F. Lighting Mood Switching
        if (state.keyLight && state.fillLight && state.rimLight) {
          if (p.lightingMood === 'clean-lab') {
            state.scene.background = new THREE.Color(0x18181b);
            state.keyLight.color.setHex(0xffffff);
            state.keyLight.intensity = 4.2;
            state.fillLight.color.setHex(0xe4e4e7);
            state.rimLight.color.setHex(0x93c5fd);
          } else if (p.lightingMood === 'cyber-sunset') {
            state.scene.background = new THREE.Color(0x0f0b12);
            state.keyLight.color.setHex(0xffaa5e);
            state.keyLight.intensity = 4.5;
            state.fillLight.color.setHex(0x7c3aed);
            state.rimLight.color.setHex(0x06b6d4);
          } else {
            // Obsidian (Default Oryzo aesthetic)
            state.scene.background = new THREE.Color(0x08080a);
            state.keyLight.color.setHex(0xfff6ee);
            state.keyLight.intensity = 3.8;
            state.fillLight.color.setHex(0xdde5ed);
            state.rimLight.color.setHex(0xa5c4e8);
          }
        }

        state.renderer.render(state.scene, state.camera);
      }

      sceneStateRef.current.animFrameId = requestAnimationFrame(animate);
    };

    sceneStateRef.current.animFrameId = requestAnimationFrame(animate);

    // CLEANUP ON UNMOUNT
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);

      if (sceneStateRef.current.animFrameId) {
        cancelAnimationFrame(sceneStateRef.current.animFrameId);
      }

      // Dispose geometries, materials & textures
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });

      envTexture.dispose();
      brushedTex.dispose();
      shadowTexture.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};
