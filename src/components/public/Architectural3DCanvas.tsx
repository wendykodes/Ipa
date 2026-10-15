import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type RenderMode = 'pbr' | 'wireframe' | 'clay' | 'thermal';

export interface Architectural3DParams {
  timeOfDay: 'day' | 'golden-hour' | 'night';
  explodedLevel: number; // 0.0 to 1.0 (separation of layers)
  activeLayer: 'all' | 'lawn' | 'lighting' | 'entrance' | 'walls' | 'art' | 'furniture' | 'kitchen' | 'wine' | 'study' | 'spa' | 'skypool' | 'sanctuary';
  cameraAngle: 'perspective' | 'axonometric' | 'front' | 'interior' | 'aerial';
  roughness: number;    // 0.1 to 0.9
  travertineTone: 'roman-silver' | 'tivoli-cream' | 'basalt-noir';
  renderMode?: RenderMode;
  scrollProgress?: number; // 0.0 to 1.0
  assemblyProgress?: number; // 1.0 to 13.0
  thermalTemperature?: number; // 270K to 350K
  thermalMode?: boolean;
  lawnTone?: 'zoysia' | 'bentgrass' | 'zen-gravel';
  windSpeed?: number; // 0.5 to 3.0
  waterRipple?: boolean;
  wineTemp?: number;
  wineOnyxGlow?: boolean;
  spaSteam?: boolean;
  poolFireEmber?: boolean;
}

interface Architectural3DCanvasProps {
  params: Architectural3DParams;
  className?: string;
  onLayerSelect?: (layer: string) => void;
  interactive?: boolean;
}

export const Architectural3DCanvas: React.FC<Architectural3DCanvasProps> = ({
  params,
  className = '',
  onLayerSelect,
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const paramsRef = useRef<Architectural3DParams>(params);
  paramsRef.current = params;

  const sceneStateRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    mansionGroup?: THREE.Group;
    layers: {
      id: string;
      group: THREE.Group;
      baseY: number;
      explodeOffset: number;
      assemblyStep: number;
    }[];
    allMeshes: THREE.Mesh[];
    travertineMat?: THREE.MeshStandardMaterial;
    mahoganyMat?: THREE.MeshStandardMaterial;
    bronzeMat?: THREE.MeshStandardMaterial;
    glassMat?: THREE.MeshPhysicalMaterial;
    waterMat?: THREE.MeshPhysicalMaterial;
    hearthMat?: THREE.MeshStandardMaterial;
    sofaMat?: THREE.MeshStandardMaterial;
    lawnMat?: THREE.MeshStandardMaterial;
    grassBladeMat?: THREE.MeshStandardMaterial;
    pebbleMat?: THREE.MeshStandardMaterial;
    basaltMat?: THREE.MeshStandardMaterial;
    lanternMat?: THREE.MeshStandardMaterial;
    calacattaMat?: THREE.MeshStandardMaterial;
    onyxMat?: THREE.MeshStandardMaterial;
    eucalyptusMat?: THREE.MeshStandardMaterial;
    leatherMat?: THREE.MeshStandardMaterial;
    grigioMat?: THREE.MeshStandardMaterial;
    skyWaterMat?: THREE.MeshPhysicalMaterial;
    emberMat?: THREE.MeshStandardMaterial;
    sunLight?: THREE.DirectionalLight;
    ambientLight?: THREE.HemisphereLight;
    warmInteriorLight?: THREE.PointLight;
    lanternLights: THREE.PointLight[];
    thermalLight?: THREE.PointLight;
    underwaterLight?: THREE.PointLight;
    bonsaiLight?: THREE.SpotLight;
    wineSpot?: THREE.SpotLight;
    spaLight?: THREE.SpotLight;
    emberLight?: THREE.PointLight;
    grassGroup?: THREE.Group;
    bambooGroup?: THREE.Group;
    waterPlaneGeo?: THREE.PlaneGeometry;
    skyWaterGeo?: THREE.PlaneGeometry;
    spring: {
      targetRotX: number;
      targetRotY: number;
      currentRotX: number;
      currentRotY: number;
      velX: number;
      velY: number;
    };
    cameraTarget: THREE.Vector3;
    cameraCurrentTarget: THREE.Vector3;
    cameraPos: THREE.Vector3;
    cameraTargetPos: THREE.Vector3;
    animFrameId?: number;
    isUserInteracting: boolean;
  }>({
    layers: [],
    allMeshes: [],
    lanternLights: [],
    spring: {
      targetRotX: 0,
      targetRotY: 0,
      currentRotX: 0,
      currentRotY: 0,
      velX: 0,
      velY: 0,
    },
    cameraTarget: new THREE.Vector3(0, 0.8, 0),
    cameraCurrentTarget: new THREE.Vector3(0, 0.8, 0),
    cameraPos: new THREE.Vector3(7, 4.5, 8.5),
    cameraTargetPos: new THREE.Vector3(7, 4.5, 8.5),
    isUserInteracting: false,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07080a);

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(7, 4.5, 8.5);
    camera.lookAt(0, 0.8, 0);

    // 2. High-Performance WebGL Renderer with ACESFilmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);

    // 3. Environment & Studio Lighting (Oryzo Studio Setup)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv).texture;

    const ambientLight = new THREE.HemisphereLight(0xdde3ea, 0x14141c, 0.65);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.4);
    sunLight.position.set(9, 14, 7);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x6080a0, 1.1);
    rimLight.position.set(-10, 7, -8);
    scene.add(rimLight);

    const warmInteriorLight = new THREE.PointLight(0xffb055, 3.5, 12, 1.2);
    warmInteriorLight.position.set(0.5, 1.3, 0);
    scene.add(warmInteriorLight);

    const thermalLight = new THREE.PointLight(0xff2200, 0, 15);
    thermalLight.position.set(0, 2.5, 0);
    scene.add(thermalLight);

    // 4. PBR Materials System
    const travertineMat = new THREE.MeshStandardMaterial({
      color: 0xdfd9ce,
      roughness: 0.62,
      metalness: 0.04,
    });

    const mahoganyMat = new THREE.MeshStandardMaterial({
      color: 0x3d2016,
      roughness: 0.42,
      metalness: 0.08,
    });

    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0x82644b,
      roughness: 0.28,
      metalness: 0.88,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      transmission: 0.88,
      roughness: 0.06,
      ior: 1.52,
      thickness: 0.5,
    });

    const waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x091e2b,
      roughness: 0.02,
      metalness: 0.95,
      transmission: 0.6,
      transparent: true,
      opacity: 0.88,
    });

    const hearthMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ee,
      roughness: 0.22,
      metalness: 0.05,
    });

    const sofaMat = new THREE.MeshStandardMaterial({
      color: 0xeeeae4,
      roughness: 0.85,
    });

    const lawnMat = new THREE.MeshStandardMaterial({
      color: 0x1e361d, // Deep Kyoto Zoysia Emerald
      roughness: 0.88,
      metalness: 0.02,
    });

    const grassBladeMat = new THREE.MeshStandardMaterial({
      color: 0x244621,
      roughness: 0.82,
      metalness: 0.04,
      side: THREE.DoubleSide,
    });

    const pebbleMat = new THREE.MeshStandardMaterial({
      color: 0xd4ccbd,
      roughness: 0.94,
      metalness: 0.02,
    });

    const basaltMat = new THREE.MeshStandardMaterial({
      color: 0x15181c,
      roughness: 0.55,
      metalness: 0.12,
    });

    const lanternMat = new THREE.MeshStandardMaterial({
      color: 0xffdfaa,
      emissive: 0xffaa44,
      emissiveIntensity: 1.6,
      roughness: 0.2,
    });

    const calacattaMat = new THREE.MeshStandardMaterial({
      color: 0xf3f2ef,
      roughness: 0.25,
      metalness: 0.06,
    });

    const onyxMat = new THREE.MeshStandardMaterial({
      color: 0xffaa55,
      emissive: 0xff7711,
      emissiveIntensity: 0.85,
      roughness: 0.22,
      metalness: 0.04,
    });

    const eucalyptusMat = new THREE.MeshStandardMaterial({
      color: 0x221a15,
      roughness: 0.38,
      metalness: 0.08,
    });

    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x482d1c,
      roughness: 0.72,
      metalness: 0.05,
    });

    const grigioMat = new THREE.MeshStandardMaterial({
      color: 0x383e44,
      roughness: 0.28,
      metalness: 0.08,
    });

    const skyWaterMat = new THREE.MeshPhysicalMaterial({
      color: 0x14728f,
      roughness: 0.02,
      metalness: 0.2,
      transmission: 0.85,
      transparent: true,
      opacity: 0.85,
      ior: 1.333,
    });

    const emberMat = new THREE.MeshStandardMaterial({
      color: 0xff3b00,
      emissive: 0xff5500,
      emissiveIntensity: 2.4,
      roughness: 0.45,
    });

    // 5. MASTER ARCHITECTURAL GROUP & PROGRESSIVE CONSTITUENT LAYERS
    const mansionGroup = new THREE.Group();
    scene.add(mansionGroup);
    const allMeshes: THREE.Mesh[] = [];
    const lanternLights: THREE.PointLight[] = [];

    // ==========================================
    // LAYER 1: The Landscape & Lawn (Plinth, Terraces, Bonsai, Grass Tufts, Reflection Pool)
    // ==========================================
    const lawnGroup = new THREE.Group();
    lawnGroup.name = 'layer_lawn';
    mansionGroup.add(lawnGroup);

    // 1. Lower Earth Sub-Base Plinth
    const lawnBaseGeo = new THREE.BoxGeometry(14.8, 0.28, 10.8);
    const lawnBase = new THREE.Mesh(lawnBaseGeo, new THREE.MeshStandardMaterial({ color: 0x141814, roughness: 0.95 }));
    lawnBase.position.y = -0.62;
    lawnBase.receiveShadow = true;
    lawnGroup.add(lawnBase);
    allMeshes.push(lawnBase);

    // 2. Primary Laser-Graded Velvet Lawn Plinth
    const lawnPlinthGeo = new THREE.BoxGeometry(13.8, 0.18, 9.8);
    const lawnPlinth = new THREE.Mesh(lawnPlinthGeo, lawnMat);
    lawnPlinth.position.y = -0.49;
    lawnPlinth.receiveShadow = true;
    lawnGroup.add(lawnPlinth);
    allMeshes.push(lawnPlinth);

    // 3. Sunken Western Garden Terrace
    const terraceLawnGeo = new THREE.BoxGeometry(3.8, 0.14, 4.4);
    const terraceLawn = new THREE.Mesh(terraceLawnGeo, lawnMat);
    terraceLawn.position.set(-4.8, -0.42, 0.0);
    terraceLawn.receiveShadow = true;
    lawnGroup.add(terraceLawn);
    allMeshes.push(terraceLawn);

    // Dark Bronze Terrace Retaining Trim
    const curbGeo = new THREE.BoxGeometry(3.84, 0.05, 0.08);
    const curb = new THREE.Mesh(curbGeo, bronzeMat);
    curb.position.set(-4.8, -0.34, 2.2);
    lawnGroup.add(curb);
    allMeshes.push(curb);

    // 4. Crushed River Pebble Dry Margin (Surrounding the Travertine Podium)
    const pebbleGeo = new THREE.BoxGeometry(10.0, 0.03, 7.6);
    const pebbleBorder = new THREE.Mesh(pebbleGeo, pebbleMat);
    pebbleBorder.position.set(0, -0.38, 0);
    pebbleBorder.receiveShadow = true;
    lawnGroup.add(pebbleBorder);
    allMeshes.push(pebbleBorder);

    // 5. Architectural Travertine Podium
    const podiumGeo = new THREE.BoxGeometry(9.2, 0.38, 6.8);
    const podium = new THREE.Mesh(podiumGeo, travertineMat);
    podium.position.y = -0.19;
    podium.receiveShadow = true;
    lawnGroup.add(podium);
    allMeshes.push(podium);

    // 6. 1,400+ Instanced Botanical Grass Tufts with Procedural Wind Motion
    const grassGroup = new THREE.Group();
    grassGroup.name = 'grass_field';
    lawnGroup.add(grassGroup);

    const bladeGeo = new THREE.ConeGeometry(0.016, 0.22, 3);
    bladeGeo.translate(0, 0.11, 0);
    const grassCount = 1400;
    const grassInstanced = new THREE.InstancedMesh(bladeGeo, grassBladeMat, grassCount);
    grassInstanced.receiveShadow = true;

    const dummy = new THREE.Object3D();
    const colorA = new THREE.Color(0x193318); // Deep velvet
    const colorB = new THREE.Color(0x274a24); // Fresh forest
    const colorC = new THREE.Color(0x42622b); // Sunlit tip

    let placed = 0;
    let seed = 42;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    while (placed < grassCount) {
      // Pick random area across lawn plinths
      const zone = pseudoRandom();
      let gx = 0;
      let gz = 0;
      let gy = -0.40;

      if (zone < 0.40) {
        // Front main lawn
        gx = -5.8 + pseudoRandom() * 7.4;
        gz = 2.1 + pseudoRandom() * 2.5;
      } else if (zone < 0.65) {
        // Right flank around pool
        gx = 4.8 + pseudoRandom() * 1.8;
        gz = -3.8 + pseudoRandom() * 7.6;
      } else if (zone < 0.85) {
        // Left terrace garden
        gx = -6.4 + pseudoRandom() * 2.2;
        gz = -3.6 + pseudoRandom() * 7.2;
        gy = -0.35;
      } else {
        // Along entrance stepping path
        gx = -3.6 + pseudoRandom() * 2.4;
        gz = 2.2 + pseudoRandom() * 2.4;
      }

      // Check not inside house core
      if (Math.abs(gx) < 3.8 && Math.abs(gz) < 2.6) {
        continue;
      }

      dummy.position.set(gx, gy, gz);
      dummy.rotation.y = pseudoRandom() * Math.PI * 2;
      dummy.rotation.x = (pseudoRandom() - 0.5) * 0.25;
      dummy.rotation.z = (pseudoRandom() - 0.5) * 0.25;
      const s = 0.75 + pseudoRandom() * 0.55;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();

      grassInstanced.setMatrixAt(placed, dummy.matrix);

      // Color variation
      const cMix = pseudoRandom();
      const instanceColor = cMix < 0.5 ? colorA.clone().lerp(colorB, cMix * 2) : colorB.clone().lerp(colorC, (cMix - 0.5) * 2);
      grassInstanced.setColorAt(placed, instanceColor);

      placed++;
    }
    grassInstanced.instanceMatrix.needsUpdate = true;
    if (grassInstanced.instanceColor) grassInstanced.instanceColor.needsUpdate = true;
    grassGroup.add(grassInstanced);

    // 7. Sculptural Japanese Cloud Pine Bonsai & Weathered Basalt Monoliths
    const bonsaiGroup = new THREE.Group();
    bonsaiGroup.position.set(-4.8, -0.46, 2.7);
    lawnGroup.add(bonsaiGroup);

    // Basalt Standing Rocks
    const boulderGeo1 = new THREE.DodecahedronGeometry(0.36, 1);
    const boulder1 = new THREE.Mesh(boulderGeo1, basaltMat);
    boulder1.position.set(0.1, 0.2, 0.15);
    boulder1.scale.set(1.2, 0.8, 1.0);
    boulder1.castShadow = true;
    boulder1.receiveShadow = true;
    bonsaiGroup.add(boulder1);
    allMeshes.push(boulder1);

    const boulderGeo2 = new THREE.DodecahedronGeometry(0.24, 0);
    const boulder2 = new THREE.Mesh(boulderGeo2, basaltMat);
    boulder2.position.set(-0.35, 0.12, -0.2);
    boulder2.castShadow = true;
    bonsaiGroup.add(boulder2);
    allMeshes.push(boulder2);

    // Gnarled Windswept Cedar Trunk Segments
    const barkMat = new THREE.MeshStandardMaterial({ color: 0x34281e, roughness: 0.95 });
    const trunkSeg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.45, 8), barkMat);
    trunkSeg1.position.set(0, 0.22, 0);
    trunkSeg1.rotation.z = -0.22;
    trunkSeg1.castShadow = true;
    bonsaiGroup.add(trunkSeg1);
    allMeshes.push(trunkSeg1);

    const trunkSeg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.42, 8), barkMat);
    trunkSeg2.position.set(0.09, 0.56, 0.05);
    trunkSeg2.rotation.z = 0.28;
    trunkSeg2.castShadow = true;
    bonsaiGroup.add(trunkSeg2);
    allMeshes.push(trunkSeg2);

    const trunkSeg3 = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, 0.38, 8), barkMat);
    trunkSeg3.position.set(0.02, 0.88, 0.08);
    trunkSeg3.rotation.z = -0.15;
    trunkSeg3.castShadow = true;
    bonsaiGroup.add(trunkSeg3);
    allMeshes.push(trunkSeg3);

    // Cloud Foliage Pads
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x142816, roughness: 0.92 });
    const cloudGeo = new THREE.SphereGeometry(0.38, 8, 8);
    cloudGeo.scale(1.4, 0.35, 1.1);

    const cloudCoords = [
      { x: 0.28, y: 0.58, z: 0.12, s: 0.8 },
      { x: -0.22, y: 0.72, z: -0.15, s: 0.9 },
      { x: 0.24, y: 0.95, z: 0.18, s: 1.05 },
      { x: -0.05, y: 1.15, z: 0.05, s: 1.2 },
      { x: 0.18, y: 1.32, z: -0.08, s: 0.85 }
    ];

    cloudCoords.forEach(c => {
      const pad = new THREE.Mesh(cloudGeo, foliageMat);
      pad.position.set(c.x, c.y, c.z);
      pad.scale.multiplyScalar(c.s);
      pad.castShadow = true;
      bonsaiGroup.add(pad);
      allMeshes.push(pad);
    });

    // Dedicated Ground Uplight for Bonsai Canopy
    const bonsaiLight = new THREE.SpotLight(0xffdfaa, 2.8, 5, Math.PI / 4, 0.45);
    bonsaiLight.position.set(0.2, 0.05, 0.4);
    bonsaiLight.target = trunkSeg2;
    bonsaiGroup.add(bonsaiLight);

    // 8. Enhanced Sunken Reflection Pool & Animated Rippling Water
    const poolBasinGeo = new THREE.BoxGeometry(3.5, 0.32, 5.0);
    const poolBasin = new THREE.Mesh(poolBasinGeo, basaltMat);
    poolBasin.position.set(3.6, -0.22, 0.4);
    poolBasin.receiveShadow = true;
    lawnGroup.add(poolBasin);
    allMeshes.push(poolBasin);

    // Submerged Dark Tile Basin Floor
    const tileFloorGeo = new THREE.PlaneGeometry(3.2, 4.7);
    const tileFloorMat = new THREE.MeshStandardMaterial({ color: 0x091016, roughness: 0.4, metalness: 0.2 });
    const tileFloor = new THREE.Mesh(tileFloorGeo, tileFloorMat);
    tileFloor.rotation.x = -Math.PI / 2;
    tileFloor.position.set(3.6, -0.34, 0.4);
    lawnGroup.add(tileFloor);
    allMeshes.push(tileFloor);

    // Animated Water Surface Mesh
    const waterPlaneGeo = new THREE.PlaneGeometry(3.18, 4.68, 32, 32);
    const waterMesh = new THREE.Mesh(waterPlaneGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(3.6, -0.065, 0.4);
    lawnGroup.add(waterMesh);
    allMeshes.push(waterMesh);

    // Submerged Underwater Perimeter LED Strip Glow
    const underwaterLight = new THREE.PointLight(0x70d6ff, 1.8, 4.5);
    underwaterLight.position.set(3.6, -0.22, 0.4);
    lawnGroup.add(underwaterLight);

    // 4 Floating Travertine Stepping Pads Spanning Across the Water Pool
    const poolPaverZ = [-1.6, -0.5, 0.6, 1.7];
    poolPaverZ.forEach(pz => {
      const pPaverGeo = new THREE.BoxGeometry(0.85, 0.07, 0.75);
      const pPaver = new THREE.Mesh(pPaverGeo, travertineMat);
      pPaver.position.set(3.6, -0.02, pz);
      pPaver.castShadow = true;
      pPaver.receiveShadow = true;
      lawnGroup.add(pPaver);
      allMeshes.push(pPaver);

      // Embedded Under-Step Warm Amber Glow Strip
      const stepLightGeo = new THREE.BoxGeometry(0.82, 0.015, 0.04);
      const stepLightMat = new THREE.MeshStandardMaterial({
        color: 0xffcc77,
        emissive: 0xff9922,
        emissiveIntensity: 1.2,
      });
      const stepLight = new THREE.Mesh(stepLightGeo, stepLightMat);
      stepLight.position.set(3.6, -0.05, pz + 0.36);
      lawnGroup.add(stepLight);
    });

    // 8B. Floating Lotus Lily Pads in Reflection Pool
    const lilyGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.01, 12);
    const lilyMat = new THREE.MeshStandardMaterial({ color: 0x1b441f, roughness: 0.6 });
    const lilyCoords = [
      { x: 2.8, z: -0.8 },
      { x: 4.4, z: -0.2 },
      { x: 3.1, z: 1.2 },
      { x: 4.2, z: 1.9 },
    ];
    lilyCoords.forEach(lc => {
      const lily = new THREE.Mesh(lilyGeo, lilyMat);
      lily.position.set(lc.x, -0.055, lc.z);
      lily.rotation.y = Math.random() * Math.PI;
      lawnGroup.add(lily);
      allMeshes.push(lily);
    });

    // 9. Sculpted Geometric Boundary Hedges
    for (let h = -2.8; h <= 2.8; h += 1.4) {
      const hedgeGeo = new THREE.BoxGeometry(0.35, 0.45, 0.9);
      const hedge = new THREE.Mesh(hedgeGeo, lawnMat);
      hedge.position.set(-5.6, -0.3, h);
      hedge.castShadow = true;
      lawnGroup.add(hedge);
      allMeshes.push(hedge);
    }

    // 9B. Manicured Topiary Boxwood Spheres along the Garden Flanks
    const boxwoodMat = new THREE.MeshStandardMaterial({ color: 0x193a1c, roughness: 0.85 });
    const boxwoodCoords = [
      { x: -5.4, z: 3.4, r: 0.28 },
      { x: -5.0, z: 3.8, r: 0.22 },
      { x: -4.3, z: 4.1, r: 0.18 },
      { x: -0.8, z: 2.4, r: 0.24 },
      { x: -0.4, z: 2.7, r: 0.19 },
      { x: 2.1, z: 3.2, r: 0.26 },
      { x: 2.4, z: 3.6, r: 0.21 },
    ];
    boxwoodCoords.forEach(bc => {
      const sphereGeo = new THREE.SphereGeometry(bc.r, 12, 10);
      const sphere = new THREE.Mesh(sphereGeo, boxwoodMat);
      sphere.position.set(bc.x, -0.4 + bc.r * 0.9, bc.z);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      lawnGroup.add(sphere);
      allMeshes.push(sphere);
    });

    // 10. Stepped Entrance Pavers (Floating Slabs across the Lawn with recessed lights)
    for (let p = 0; p < 6; p++) {
      const paverGeo = new THREE.BoxGeometry(2.3, 0.08, 0.62);
      const paver = new THREE.Mesh(paverGeo, travertineMat);
      paver.position.set(-2.2, -0.42 + p * 0.07, 4.6 - p * 0.58);
      paver.receiveShadow = true;
      paver.castShadow = true;
      lawnGroup.add(paver);
      allMeshes.push(paver);

      // Recessed Architectural Linear Step Edge Light
      const riserGlowGeo = new THREE.BoxGeometry(2.2, 0.012, 0.03);
      const riserGlowMat = new THREE.MeshStandardMaterial({
        color: 0xffd999,
        emissive: 0xffaa33,
        emissiveIntensity: 0.9,
      });
      const riserGlow = new THREE.Mesh(riserGlowGeo, riserGlowMat);
      riserGlow.position.set(-2.2, -0.45 + p * 0.07, 4.6 - p * 0.58 + 0.30);
      lawnGroup.add(riserGlow);
    }

    // ==========================================
    // LAYER 2: Outdoor Lighting (Hero Sculptural Lamp & Pathway Bollards)
    // ==========================================
    const lightingGroup = new THREE.Group();
    lightingGroup.name = 'layer_lighting';
    mansionGroup.add(lightingGroup);

    // HERO SCULPTURAL GARDEN LAMP (Featured in Chapter 3)
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-0.8, -0.2, 4.0);
    lightingGroup.add(lampGroup);

    // Monolithic angled cast-bronze pedestal
    const lampStemGeo = new THREE.BoxGeometry(0.16, 0.92, 0.16);
    const lampStem = new THREE.Mesh(lampStemGeo, bronzeMat);
    lampStem.position.y = 0.46;
    lampStem.castShadow = true;
    lampGroup.add(lampStem);
    allMeshes.push(lampStem);

    // Cantilevered light head with recessed warm lens
    const lampHeadGeo = new THREE.BoxGeometry(0.28, 0.12, 0.2);
    const lampHead = new THREE.Mesh(lampHeadGeo, bronzeMat);
    lampHead.position.set(0.08, 0.92, 0);
    lampHead.castShadow = true;
    lampGroup.add(lampHead);
    allMeshes.push(lampHead);

    const lampLensGeo = new THREE.BoxGeometry(0.24, 0.04, 0.16);
    const lampLens = new THREE.Mesh(lampLensGeo, lanternMat);
    lampLens.position.set(0.08, 0.85, 0);
    lampGroup.add(lampLens);
    allMeshes.push(lampLens);

    // Warm light beam casting across the lawn and stone path
    const lampSpot = new THREE.SpotLight(0xffae42, 4.5, 8, Math.PI / 3, 0.4, 1.2);
    lampSpot.position.set(0.08, 0.85, 0);
    lampSpot.target.position.set(1.4, -0.4, 4.0);
    lampGroup.add(lampSpot);
    lampGroup.add(lampSpot.target);

    // Additional Pathway Lighting Bollards
    const bollardPositions = [
      [-3.4, -0.2, 4.4],
      [2.2, -0.2, 3.6],
      [5.4, -0.2, 2.2],
      [5.4, -0.2, -1.8],
    ];

    bollardPositions.forEach(([bx, by, bz]) => {
      const stemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.55, 12);
      const stem = new THREE.Mesh(stemGeo, bronzeMat);
      stem.position.set(bx, by, bz);
      stem.castShadow = true;
      lightingGroup.add(stem);
      allMeshes.push(stem);

      const headGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.1, 12);
      const head = new THREE.Mesh(headGeo, lanternMat);
      head.position.set(bx, by + 0.28, bz);
      lightingGroup.add(head);
      allMeshes.push(head);

      const bLight = new THREE.PointLight(0xffae42, 1.2, 3.5, 1.5);
      bLight.position.set(bx, by + 0.35, bz);
      lightingGroup.add(bLight);
      lanternLights.push(bLight);
    });

    // ==========================================
    // LAYER 3: Entrance & Arrival Portal (Mahogany Pivot Door & Bronze Jambs)
    // ==========================================
    const entranceGroup = new THREE.Group();
    entranceGroup.name = 'layer_entrance';
    mansionGroup.add(entranceGroup);

    // Fluted Bronze Portal Jamb
    const jambGeo = new THREE.BoxGeometry(2.2, 2.7, 0.25);
    const jamb = new THREE.Mesh(jambGeo, bronzeMat);
    jamb.position.set(-2.2, 1.25, 2.6);
    entranceGroup.add(jamb);
    allMeshes.push(jamb);

    // Massive Ribbed African Mahogany Pivot Door
    const doorGeo = new THREE.BoxGeometry(1.4, 2.5, 0.12);
    const door = new THREE.Mesh(doorGeo, mahoganyMat);
    door.position.set(-2.2, 1.25, 2.62);
    door.rotation.y = -0.28; // Welcoming slight pivot angle
    door.castShadow = true;
    entranceGroup.add(door);
    allMeshes.push(door);

    // Vertical Cast-Bronze Pull Handle
    const pullGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.6, 12);
    const pull = new THREE.Mesh(pullGeo, bronzeMat);
    pull.position.set(-1.6, 1.25, 2.7);
    entranceGroup.add(pull);
    allMeshes.push(pull);

    // ==========================================
    // LAYER 4: Monolithic Walls & Surfaces (Honed Travertine Shear Walls & Roof)
    // ==========================================
    const wallsGroup = new THREE.Group();
    wallsGroup.name = 'layer_walls';
    mansionGroup.add(wallsGroup);

    // Primary Travertine Shear Core Wall
    const shearCoreGeo = new THREE.BoxGeometry(0.45, 2.7, 4.4);
    const shearCore = new THREE.Mesh(shearCoreGeo, travertineMat);
    shearCore.position.set(-0.6, 1.35, -0.4);
    shearCore.castShadow = true;
    shearCore.receiveShadow = true;
    wallsGroup.add(shearCore);
    allMeshes.push(shearCore);

    // Transverse Gallery Wall
    const transWallGeo = new THREE.BoxGeometry(3.6, 2.7, 0.4);
    const transWall = new THREE.Mesh(transWallGeo, travertineMat);
    transWall.position.set(-2.4, 1.35, -0.6);
    transWall.castShadow = true;
    wallsGroup.add(transWall);
    allMeshes.push(transWall);

    // Floor-to-Ceiling Glazed Facade & Bronze Mullions
    const curtainGeo = new THREE.BoxGeometry(4.8, 2.4, 0.06);
    const curtain = new THREE.Mesh(curtainGeo, glassMat);
    curtain.position.set(1.6, 1.2, 2.1);
    wallsGroup.add(curtain);
    allMeshes.push(curtain);

    const rearCurtain = new THREE.Mesh(curtainGeo, glassMat);
    rearCurtain.position.set(1.6, 1.2, -2.2);
    wallsGroup.add(rearCurtain);
    allMeshes.push(rearCurtain);

    // Bronze Mullion Columns
    for (let x = -0.6; x <= 3.8; x += 1.45) {
      const colGeo = new THREE.CylinderGeometry(0.045, 0.045, 2.5, 16);
      const col = new THREE.Mesh(colGeo, bronzeMat);
      col.position.set(x, 1.25, 2.1);
      col.castShadow = true;
      wallsGroup.add(col);
      allMeshes.push(col);
    }

    // Monolithic Floating Roof Slab
    const roofGeo = new THREE.BoxGeometry(9.6, 0.32, 7.2);
    const roof = new THREE.Mesh(roofGeo, travertineMat);
    roof.position.set(0, 2.55, 0);
    roof.castShadow = true;
    roof.receiveShadow = true;
    wallsGroup.add(roof);
    allMeshes.push(roof);

    const fasciaGeo = new THREE.BoxGeometry(9.7, 0.08, 7.3);
    const fascia = new THREE.Mesh(fasciaGeo, bronzeMat);
    fascia.position.set(0, 2.68, 0);
    wallsGroup.add(fascia);
    allMeshes.push(fascia);

    // ==========================================
    // LAYER 5: Artwork & Gallery Styling (Bronze Sculptures & Museum Pedestals)
    // ==========================================
    const artGroup = new THREE.Group();
    artGroup.name = 'layer_art';
    mansionGroup.add(artGroup);

    // Minimalist Art Pedestal
    const pedestalGeo = new THREE.BoxGeometry(0.5, 1.1, 0.5);
    const pedestal = new THREE.Mesh(pedestalGeo, hearthMat);
    pedestal.position.set(-0.1, 0.55, 0.2);
    pedestal.castShadow = true;
    artGroup.add(pedestal);
    allMeshes.push(pedestal);

    // Torus Knot Bronze Abstract Sculpture
    const sculptGeo = new THREE.TorusKnotGeometry(0.24, 0.07, 64, 16);
    const sculpture = new THREE.Mesh(sculptGeo, bronzeMat);
    sculpture.position.set(-0.1, 1.38, 0.2);
    sculpture.castShadow = true;
    artGroup.add(sculpture);
    allMeshes.push(sculpture);

    // Wall Art Tapestry Relief
    const artReliefGeo = new THREE.BoxGeometry(0.06, 1.6, 1.8);
    const artRelief = new THREE.Mesh(artReliefGeo, hearthMat);
    artRelief.position.set(-0.35, 1.5, -0.4);
    artGroup.add(artRelief);
    allMeshes.push(artRelief);

    // Dedicated Art Spotlight
    const artSpot = new THREE.SpotLight(0xfffaed, 2.8, 6, Math.PI / 6, 0.3);
    artSpot.position.set(-0.1, 2.4, 0.2);
    artSpot.target = sculpture;
    artGroup.add(artSpot);

    // ==========================================
    // LAYER 6: Living Space & Bespoke Furniture (Bouclé Modular Sofa & Tables)
    // ==========================================
    const furnitureGroup = new THREE.Group();
    furnitureGroup.name = 'layer_furniture';
    mansionGroup.add(furnitureGroup);

    // Woven Textured Area Rug
    const rugGeo = new THREE.BoxGeometry(3.6, 0.02, 2.8);
    const rug = new THREE.Mesh(rugGeo, sofaMat);
    rug.position.set(1.4, 0.01, -0.6);
    furnitureGroup.add(rug);
    allMeshes.push(rug);

    // Curved Low-Slung Bouclé Modular Sofa
    const sofaMainGeo = new THREE.BoxGeometry(2.3, 0.42, 1.1);
    const sofaMain = new THREE.Mesh(sofaMainGeo, sofaMat);
    sofaMain.position.set(1.4, 0.21, -0.9);
    sofaMain.castShadow = true;
    furnitureGroup.add(sofaMain);
    allMeshes.push(sofaMain);

    const sofaLoungeGeo = new THREE.BoxGeometry(1.0, 0.42, 1.5);
    const sofaLounge = new THREE.Mesh(sofaLoungeGeo, sofaMat);
    sofaLounge.position.set(2.4, 0.21, -0.4);
    sofaLounge.castShadow = true;
    furnitureGroup.add(sofaLounge);
    allMeshes.push(sofaLounge);

    // Sculpted Travertine Coffee Plinth
    const coffeeGeo = new THREE.BoxGeometry(1.2, 0.24, 0.8);
    const coffeeTable = new THREE.Mesh(coffeeGeo, travertineMat);
    coffeeTable.position.set(1.2, 0.12, 0.1);
    coffeeTable.castShadow = true;
    furnitureGroup.add(coffeeTable);
    allMeshes.push(coffeeTable);

    // Low Smoked Oak Side Block
    const sideBlockGeo = new THREE.BoxGeometry(0.45, 0.35, 0.45);
    const sideBlock = new THREE.Mesh(sideBlockGeo, mahoganyMat);
    sideBlock.position.set(0.0, 0.18, -0.9);
    furnitureGroup.add(sideBlock);
    allMeshes.push(sideBlock);

    // ==========================================
    // LAYER 7: Culinary Gallery & Social Kitchen (Calacatta Marble Island & Fluted Millwork)
    // ==========================================
    const kitchenGroup = new THREE.Group();
    kitchenGroup.name = 'layer_kitchen';
    mansionGroup.add(kitchenGroup);

    // Monolithic Calacatta Marble Waterfall Island
    const islandGeo = new THREE.BoxGeometry(2.5, 0.88, 1.05);
    const island = new THREE.Mesh(islandGeo, calacattaMat);
    island.position.set(1.8, 0.44, 1.1);
    island.castShadow = true;
    island.receiveShadow = true;
    kitchenGroup.add(island);
    allMeshes.push(island);

    // Fluted Oak Back Storage Cabinetry
    const backCabGeo = new THREE.BoxGeometry(0.55, 2.4, 2.6);
    const backCab = new THREE.Mesh(backCabGeo, mahoganyMat);
    backCab.position.set(3.8, 1.2, 0.2);
    backCab.castShadow = true;
    kitchenGroup.add(backCab);
    allMeshes.push(backCab);

    // Minimalist Brass Barstools
    for (let s = 0; s < 3; s++) {
      const stoolTopGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.05, 16);
      const stoolTop = new THREE.Mesh(stoolTopGeo, mahoganyMat);
      stoolTop.position.set(0.9 + s * 0.7, 0.65, 1.8);

      const stoolLegGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.65, 8);
      const stoolLeg = new THREE.Mesh(stoolLegGeo, bronzeMat);
      stoolLeg.position.set(0.9 + s * 0.7, 0.32, 1.8);

      kitchenGroup.add(stoolTop, stoolLeg);
      allMeshes.push(stoolTop, stoolLeg);
    }

    // ==========================================
    // LAYER 8: Sommelier Vault & Climate Cellar (Backlit Onyx & Precision Bronze Cradles)
    // ==========================================
    const wineGroup = new THREE.Group();
    wineGroup.name = 'layer_wine';
    mansionGroup.add(wineGroup);

    // Backlit Translucent Onyx Feature Wall
    const onyxWallGeo = new THREE.BoxGeometry(2.2, 2.0, 0.08);
    const onyxWall = new THREE.Mesh(onyxWallGeo, onyxMat);
    onyxWall.position.set(-3.4, 1.0, -1.8);
    wineGroup.add(onyxWall);
    allMeshes.push(onyxWall);

    // Monolithic Nero Basalt Degustation Tasting Bar
    const tastingTableGeo = new THREE.BoxGeometry(1.4, 0.88, 0.65);
    const tastingTable = new THREE.Mesh(tastingTableGeo, basaltMat);
    tastingTable.position.set(-3.2, 0.44, -0.9);
    tastingTable.castShadow = true;
    wineGroup.add(tastingTable);
    allMeshes.push(tastingTable);

    // Bronze Precision Wine Bottle Cradles
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 5; col++) {
        const bottleGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.28, 8);
        const bottle = new THREE.Mesh(bottleGeo, basaltMat);
        bottle.rotation.x = Math.PI / 2;
        bottle.position.set(-4.1 + col * 0.36, 0.4 + row * 0.42, -1.68);
        wineGroup.add(bottle);
        allMeshes.push(bottle);
      }
    }

    // Smoked Climate Glazing Screen
    const wineGlassGeo = new THREE.BoxGeometry(2.4, 2.0, 0.04);
    const wineGlass = new THREE.Mesh(wineGlassGeo, glassMat);
    wineGlass.position.set(-3.2, 1.0, -0.4);
    wineGroup.add(wineGlass);
    allMeshes.push(wineGlass);

    // Dedicated Amber Sommelier Spotlight
    const wineSpot = new THREE.SpotLight(0xff9933, 2.6, 5, Math.PI / 5, 0.35);
    wineSpot.position.set(-3.2, 2.2, -0.9);
    wineSpot.target = tastingTable;
    wineGroup.add(wineSpot);

    // ==========================================
    // LAYER 9: Atelier Library & Private Study (Smoked Eucalyptus & Saddle Leather)
    // ==========================================
    const studyGroup = new THREE.Group();
    studyGroup.name = 'layer_study';
    mansionGroup.add(studyGroup);

    // Full-Height Smoked Eucalyptus Bookcase
    const bookcaseGeo = new THREE.BoxGeometry(2.6, 2.3, 0.4);
    const bookcase = new THREE.Mesh(bookcaseGeo, eucalyptusMat);
    bookcase.position.set(3.0, 1.15, -1.8);
    bookcase.castShadow = true;
    studyGroup.add(bookcase);
    allMeshes.push(bookcase);

    // Shelves with Architectural Monographs
    for (let shelf = 0; shelf < 3; shelf++) {
      const booksGeo = new THREE.BoxGeometry(2.3, 0.26, 0.32);
      const booksMat = shelf % 2 === 0 ? hearthMat : travertineMat;
      const books = new THREE.Mesh(booksGeo, booksMat);
      books.position.set(3.0, 0.5 + shelf * 0.65, -1.75);
      studyGroup.add(books);
      allMeshes.push(books);
    }

    // Patinated Bronze Rolling Library Ladder
    const ladderRailGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.7, 8);
    const ladderRail = new THREE.Mesh(ladderRailGeo, bronzeMat);
    ladderRail.rotation.z = -0.14;
    ladderRail.position.set(2.0, 1.2, -1.55);
    studyGroup.add(ladderRail);
    allMeshes.push(ladderRail);

    // Executive Slab Desk in Patinated Bronze & Smoked Wood
    const deskGeo = new THREE.BoxGeometry(1.5, 0.08, 0.8);
    const desk = new THREE.Mesh(deskGeo, eucalyptusMat);
    desk.position.set(2.8, 0.74, -0.6);
    desk.castShadow = true;
    studyGroup.add(desk);
    allMeshes.push(desk);

    // Saddle Leather Writing Blotter
    const blotterGeo = new THREE.BoxGeometry(0.85, 0.02, 0.48);
    const blotter = new THREE.Mesh(blotterGeo, leatherMat);
    blotter.position.set(2.8, 0.79, -0.6);
    studyGroup.add(blotter);
    allMeshes.push(blotter);

    // Bronze T-Legs
    const dLeg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.74, 8), bronzeMat);
    dLeg1.position.set(2.2, 0.37, -0.6);
    const dLeg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.74, 8), bronzeMat);
    dLeg2.position.set(3.4, 0.37, -0.6);
    studyGroup.add(dLeg1, dLeg2);
    allMeshes.push(dLeg1, dLeg2);

    // Warm Directional Desk Reading Beam
    const studyLamp = new THREE.SpotLight(0xfff5e6, 2.2, 4, Math.PI / 4, 0.2);
    studyLamp.position.set(3.2, 1.8, -0.6);
    studyLamp.target = desk;
    studyGroup.add(studyLamp);

    // ==========================================
    // LAYER 10: Wellness Spa & Hammam (Grigio Orobico Freestanding Bath & Bamboo Zen Court)
    // ==========================================
    const spaGroup = new THREE.Group();
    spaGroup.name = 'layer_spa';
    mansionGroup.add(spaGroup);

    // Monolithic Honed Grigio Orobico Soaking Tub
    const tubRimGeo = new THREE.TorusGeometry(0.52, 0.16, 16, 32);
    const tubRim = new THREE.Mesh(tubRimGeo, grigioMat);
    tubRim.rotation.x = Math.PI / 2;
    tubRim.position.set(2.6, 3.25, -0.4);
    tubRim.scale.set(1.35, 0.9, 1.0);
    tubRim.castShadow = true;
    spaGroup.add(tubRim);
    allMeshes.push(tubRim);

    const tubBaseGeo = new THREE.CylinderGeometry(0.52, 0.42, 0.46, 32);
    const tubBase = new THREE.Mesh(tubBaseGeo, grigioMat);
    tubBase.position.set(2.6, 2.95, -0.4);
    tubBase.scale.set(1.35, 1.0, 0.9);
    tubBase.castShadow = true;
    spaGroup.add(tubBase);
    allMeshes.push(tubBase);

    // Private Zen Bamboo Light Court
    const bambooGroup = new THREE.Group();
    for (let b = 0; b < 8; b++) {
      const stalkGeo = new THREE.CylinderGeometry(0.018, 0.022, 2.1, 8);
      const stalk = new THREE.Mesh(stalkGeo, grassBladeMat);
      stalk.position.set(2.0 + (b % 4) * 0.35 + (Math.random() - 0.5) * 0.08, 3.75, -1.3 - Math.floor(b / 4) * 0.3);
      bambooGroup.add(stalk);
      allMeshes.push(stalk);

      const leafGeo = new THREE.SphereGeometry(0.12, 6, 6);
      const leaf = new THREE.Mesh(leafGeo, lawnMat);
      leaf.scale.set(1.5, 0.4, 1.5);
      leaf.position.set(stalk.position.x, 4.7, stalk.position.z);
      bambooGroup.add(leaf);
      allMeshes.push(leaf);
    }
    spaGroup.add(bambooGroup);

    // Natural Skylight Shaft Beam
    const spaLight = new THREE.SpotLight(0xf0f8ff, 3.2, 7, Math.PI / 7, 0.3);
    spaLight.position.set(2.6, 5.4, -0.4);
    spaLight.target = tubBase;
    spaGroup.add(spaLight);

    // ==========================================
    // LAYER 11: Cantilevered Rooftop Sky Pool & Sunken Fire Pit (Glazed Infinity Waters & Embers)
    // ==========================================
    const skyPoolGroup = new THREE.Group();
    skyPoolGroup.name = 'layer_skypool';
    mansionGroup.add(skyPoolGroup);

    // Suspended Cantilevered Basalt Pool Trough
    const skyPoolTroughGeo = new THREE.BoxGeometry(3.4, 0.52, 2.0);
    const skyPoolTrough = new THREE.Mesh(skyPoolTroughGeo, basaltMat);
    skyPoolTrough.position.set(2.2, 2.65, 1.4);
    skyPoolTrough.castShadow = true;
    skyPoolGroup.add(skyPoolTrough);
    allMeshes.push(skyPoolTrough);

    // Translucent Turquoise Crystalline Water Surface
    const skyWaterGeo = new THREE.PlaneGeometry(3.1, 1.7, 16, 16);
    const skyWaterMesh = new THREE.Mesh(skyWaterGeo, skyWaterMat);
    skyWaterMesh.rotation.x = -Math.PI / 2;
    skyWaterMesh.position.set(2.2, 2.92, 1.4);
    skyPoolGroup.add(skyWaterMesh);
    allMeshes.push(skyWaterMesh);

    // Frameless Glazed Infinity Edge Balustrade
    const skyGlassGeo = new THREE.BoxGeometry(3.4, 0.72, 0.04);
    const skyGlass = new THREE.Mesh(skyGlassGeo, glassMat);
    skyGlass.position.set(2.2, 3.22, 2.42);
    skyPoolGroup.add(skyGlass);
    allMeshes.push(skyGlass);

    // Sunken Fire Pit with Volcanic Stone Curb
    const pitRimGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.2, 24);
    const pitRim = new THREE.Mesh(pitRimGeo, basaltMat);
    pitRim.position.set(0.1, 2.8, 1.4);
    skyPoolGroup.add(pitRim);
    allMeshes.push(pitRim);

    // Glowing Volcanic Ember Rocks
    const emberGeo = new THREE.SphereGeometry(0.2, 12, 12);
    const emberMesh = new THREE.Mesh(emberGeo, emberMat);
    emberMesh.position.set(0.1, 2.94, 1.4);
    skyPoolGroup.add(emberMesh);
    allMeshes.push(emberMesh);

    const emberLight = new THREE.PointLight(0xff5511, 2.8, 4.5);
    emberLight.position.set(0.1, 3.1, 1.4);
    skyPoolGroup.add(emberLight);

    // Teak Daybed Plinth
    const daybedGeo = new THREE.BoxGeometry(1.5, 0.16, 0.85);
    const daybed = new THREE.Mesh(daybedGeo, mahoganyMat);
    daybed.position.set(-0.9, 2.8, 1.4);
    skyPoolGroup.add(daybed);
    allMeshes.push(daybed);

    // ==========================================
    // LAYER 12: Private Sanctuary & Solarium Louvers (Upper Bedroom Suite & Cedar Louvers)
    // ==========================================
    const sanctuaryGroup = new THREE.Group();
    sanctuaryGroup.name = 'layer_sanctuary';
    mansionGroup.add(sanctuaryGroup);

    // Upper Master Sanctuary Box
    const upperSuiteGeo = new THREE.BoxGeometry(4.2, 1.9, 3.8);
    const upperSuite = new THREE.Mesh(upperSuiteGeo, travertineMat);
    upperSuite.position.set(-1.8, 3.65, -0.2);
    upperSuite.castShadow = true;
    upperSuite.receiveShadow = true;
    sanctuaryGroup.add(upperSuite);
    allMeshes.push(upperSuite);

    // Cantilevered Upper Terrace
    const terraceGeo = new THREE.BoxGeometry(4.4, 0.18, 4.2);
    const upperTerrace = new THREE.Mesh(terraceGeo, travertineMat);
    upperTerrace.position.set(-1.8, 2.7, -0.2);
    sanctuaryGroup.add(upperTerrace);
    allMeshes.push(upperTerrace);

    // Slatted Cedar Privacy Louvers (Deflecting equatorial sun)
    for (let i = 0; i < 11; i++) {
      const louverGeo = new THREE.BoxGeometry(0.04, 1.9, 0.35);
      const louver = new THREE.Mesh(louverGeo, mahoganyMat);
      louver.position.set(-3.7 + i * 0.36, 3.65, 1.72);
      louver.rotation.y = 0.32;
      louver.castShadow = true;
      sanctuaryGroup.add(louver);
      allMeshes.push(louver);
    }

    // Solarium Glass Balustrade
    const balustradeGeo = new THREE.BoxGeometry(4.4, 0.85, 0.05);
    const balustrade = new THREE.Mesh(balustradeGeo, glassMat);
    balustrade.position.set(-1.8, 3.15, 1.88);
    sanctuaryGroup.add(balustrade);
    allMeshes.push(balustrade);

    // Ground Shadow Plane
    const groundGeo = new THREE.PlaneGeometry(40, 40);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.59;
    ground.receiveShadow = true;
    scene.add(ground);

    // Store state in ref
    sceneStateRef.current = {
      renderer,
      scene,
      camera,
      mansionGroup,
      layers: [
        { id: 'lawn', group: lawnGroup, baseY: 0, explodeOffset: -1.8, assemblyStep: 1 },
        { id: 'lighting', group: lightingGroup, baseY: 0, explodeOffset: -1.4, assemblyStep: 2 },
        { id: 'entrance', group: entranceGroup, baseY: 0, explodeOffset: -1.0, assemblyStep: 3 },
        { id: 'walls', group: wallsGroup, baseY: 0, explodeOffset: -0.6, assemblyStep: 4 },
        { id: 'art', group: artGroup, baseY: 0, explodeOffset: -0.2, assemblyStep: 5 },
        { id: 'furniture', group: furnitureGroup, baseY: 0, explodeOffset: 0.2, assemblyStep: 6 },
        { id: 'kitchen', group: kitchenGroup, baseY: 0, explodeOffset: 0.6, assemblyStep: 7 },
        { id: 'wine', group: wineGroup, baseY: 0, explodeOffset: 1.0, assemblyStep: 8 },
        { id: 'study', group: studyGroup, baseY: 0, explodeOffset: 1.4, assemblyStep: 9 },
        { id: 'spa', group: spaGroup, baseY: 0, explodeOffset: 1.8, assemblyStep: 10 },
        { id: 'skypool', group: skyPoolGroup, baseY: 0, explodeOffset: 2.2, assemblyStep: 11 },
        { id: 'sanctuary', group: sanctuaryGroup, baseY: 0, explodeOffset: 2.6, assemblyStep: 12 },
      ],
      allMeshes,
      travertineMat,
      mahoganyMat,
      bronzeMat,
      glassMat,
      waterMat,
      hearthMat,
      sofaMat,
      lawnMat,
      grassBladeMat,
      pebbleMat,
      basaltMat,
      lanternMat,
      calacattaMat,
      onyxMat,
      eucalyptusMat,
      leatherMat,
      grigioMat,
      skyWaterMat,
      emberMat,
      sunLight,
      ambientLight,
      warmInteriorLight,
      lanternLights,
      thermalLight,
      underwaterLight,
      bonsaiLight,
      wineSpot,
      spaLight,
      emberLight,
      grassGroup,
      bambooGroup,
      waterPlaneGeo,
      skyWaterGeo,
      spring: {
        targetRotX: 0,
        targetRotY: 0,
        currentRotX: 0,
        currentRotY: 0,
        velX: 0,
        velY: 0,
      },
      cameraTarget: new THREE.Vector3(0, 0.8, 0),
      cameraCurrentTarget: new THREE.Vector3(0, 0.8, 0),
      cameraPos: new THREE.Vector3(7, 4.5, 8.5),
      cameraTargetPos: new THREE.Vector3(7, 4.5, 8.5),
      isUserInteracting: false,
    };

    // 6. Interactive Cursor Drag & Spring Physics
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      sceneStateRef.current.isUserInteracting = true;
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging && interactive) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        sceneStateRef.current.spring.targetRotY += deltaX * 0.007;
        sceneStateRef.current.spring.targetRotX += deltaY * 0.004;
        sceneStateRef.current.spring.targetRotX = Math.max(-0.4, Math.min(0.6, sceneStateRef.current.spring.targetRotX));
      } else {
        // Subtle magnetic cursor parallax when not dragging
        sceneStateRef.current.spring.targetRotY = normX * 0.15;
        sceneStateRef.current.spring.targetRotX = -normY * 0.08;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      sceneStateRef.current.isUserInteracting = false;
    };

    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // 7. Animation Loop with Progressive Assembly & Smooth Camera Choreography
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const state = sceneStateRef.current;
      const p = paramsRef.current;
      const elapsedTime = clock.getElapsedTime();

      // Spring physics integration
      const k = 0.08;
      const d = 0.82;

      const fX = (state.spring.targetRotX - state.spring.currentRotX) * k;
      state.spring.velX = (state.spring.velX + fX) * d;
      state.spring.currentRotX += state.spring.velX;

      const fY = (state.spring.targetRotY - state.spring.currentRotY) * k;
      state.spring.velY = (state.spring.velY + fY) * d;
      state.spring.currentRotY += state.spring.velY;

      if (state.mansionGroup) {
        state.mansionGroup.rotation.x = state.spring.currentRotX;
        state.mansionGroup.rotation.y = state.spring.currentRotY + 0.12;
      }

      // -------------------------------------------------------------
      // PROGRESSIVE ASSEMBLY ENGINE (Each of 12 layers unlocks in step)
      // -------------------------------------------------------------
      const currentStep = p.assemblyProgress !== undefined 
        ? p.assemblyProgress 
        : (p.scrollProgress !== undefined ? 1 + p.scrollProgress * 11.8 : 13);

      const explode = p.explodedLevel || 0;

      state.layers.forEach((layer) => {
        const stepDiff = currentStep - layer.assemblyStep;
        
        // Visibility and Scale interpolation
        if (stepDiff < -0.15) {
          // Layer not yet introduced
          layer.group.visible = false;
          layer.group.scale.set(0.001, 0.001, 0.001);
        } else {
          layer.group.visible = true;
          // Smooth entry scaling from 0 to 1
          const factor = Math.min(1, Math.max(0, stepDiff + 0.5));
          const easedFactor = factor * factor * (3 - 2 * factor); // smoothstep
          layer.group.scale.set(easedFactor, easedFactor, easedFactor);

          // Position with optional exploded axonometric offset
          const explodeY = layer.explodeOffset * explode;
          const entryDrop = (1 - easedFactor) * 1.5; // slight drop into place
          layer.group.position.y = layer.baseY + explodeY + entryDrop;
        }

        // Active layer isolation if specified
        if (p.activeLayer && p.activeLayer !== 'all') {
          if (layer.id === p.activeLayer) {
            layer.group.position.y += 0.2;
          }
        }
      });

      // -------------------------------------------------------------
      // SCROLL-LINKED CINEMATIC CAMERA SEQUENCE (16 Consecutive Acts)
      // -------------------------------------------------------------
      let targetCamX = 7.5;
      let targetCamY = 4.2;
      let targetCamZ = 8.5;
      let lookX = 0;
      let lookY = 0.8;
      let lookZ = 0;

      if (p.scrollProgress !== undefined) {
        const sp = p.scrollProgress;

        if (sp < 0.06) {
          // ACT 01 — THE ESTATE (Establishing perspective of grounds, topography and arrival)
          const norm = sp / 0.06;
          targetCamX = 11.2 - norm * 2.2;
          targetCamY = 6.8 - norm * 1.3;
          targetCamZ = 12.8 - norm * 2.2;
          lookX = 0;
          lookY = 0.8;
          lookZ = 0;
        } else if (sp < 0.12) {
          // ACT 02 — THE LAWN & PLINTH (Lawn tufts, niwaki pine, reflection pool & stepping pads)
          const norm = (sp - 0.06) / 0.06;
          targetCamX = 9.0 - norm * 3.2;
          targetCamY = 5.5 - norm * 3.7;
          targetCamZ = 10.6 - norm * 2.8;
          lookX = -0.5;
          lookY = 0.2;
          lookZ = 1.5;
        } else if (sp < 0.18) {
          // ACT 03 — THE SCULPTURAL LIGHTING (Cast bronze luminaire close-up & golden light pool)
          const norm = (sp - 0.12) / 0.06;
          targetCamX = 5.8 - norm * 5.9;
          targetCamY = 1.8 - norm * 1.2;
          targetCamZ = 7.8 - norm * 2.7;
          lookX = -0.7;
          lookY = 0.35;
          lookZ = 4.0;
        } else if (sp < 0.25) {
          // ACT 04 — THE MONUMENTAL ARRIVAL (Mahogany pivot portal, fluted bronze jambs, travertine steps)
          const norm = (sp - 0.18) / 0.07;
          targetCamX = -0.1 - norm * 1.3;
          targetCamY = 0.6 + norm * 0.8;
          targetCamZ = 5.1 - norm * 0.7;
          lookX = -2.0;
          lookY = 1.3;
          lookZ = 2.6;
        } else if (sp < 0.31) {
          // ACT 05 — THE STRUCTURAL ENVELOPE (Monolithic travertine masses, floating slab & bronze mullions)
          const norm = (sp - 0.25) / 0.06;
          targetCamX = -1.4 - norm * 1.6;
          targetCamY = 1.4 + norm * 1.0;
          targetCamZ = 4.4 + norm * 0.8;
          lookX = 0.0;
          lookY = 1.6;
          lookZ = 0.5;
        } else if (sp < 0.37) {
          // ACT 06 — THE CURATED ARTWORK (Bronze sculpture on limestone pedestal in gallery)
          const norm = (sp - 0.31) / 0.06;
          targetCamX = -3.0 + norm * 3.8;
          targetCamY = 2.4 - norm * 0.9;
          targetCamZ = 5.2 - norm * 2.8;
          lookX = -0.1;
          lookY = 1.38;
          lookZ = 0.2;
        } else if (sp < 0.43) {
          // ACT 07 — THE LIVING SALON (Curved bouclé sofa, hand-carved travertine coffee slab & rug)
          const norm = (sp - 0.37) / 0.06;
          targetCamX = 0.8 + norm * 2.5;
          targetCamY = 1.5 + norm * 0.1;
          targetCamZ = 2.4 - norm * 0.4;
          lookX = 1.4;
          lookY = 0.6;
          lookZ = -0.4;
        } else if (sp < 0.50) {
          // ACT 08 — THE CULINARY GALLERY (Calacatta marble waterfall island & fluted oak cabinetry)
          const norm = (sp - 0.43) / 0.07;
          targetCamX = 3.3 + norm * 0.3;
          targetCamY = 1.6 + norm * 0.2;
          targetCamZ = 2.0 + norm * 1.2;
          lookX = 1.8;
          lookY = 0.7;
          lookZ = 1.1;
        } else if (sp < 0.57) {
          // ACT 09 — THE SOMMELIER VAULT (Backlit Italian amber onyx, wine bottle grid & tasting plinth)
          const norm = (sp - 0.50) / 0.07;
          targetCamX = 3.6 - norm * 5.8;
          targetCamY = 1.8 - norm * 0.4;
          targetCamZ = 3.2 - norm * 2.4;
          lookX = -3.2;
          lookY = 0.85;
          lookZ = -1.2;
        } else if (sp < 0.64) {
          // ACT 10 — THE ATELIER STUDY (Smoked eucalyptus library, bronze ladder, saddle leather desk)
          const norm = (sp - 0.57) / 0.07;
          targetCamX = -2.2 + norm * 4.6;
          targetCamY = 1.4 + norm * 0.2;
          targetCamZ = 0.8 - norm * 0.3;
          lookX = 3.0;
          lookY = 1.1;
          lookZ = -1.2;
        } else if (sp < 0.71) {
          // ACT 11 — THE WELLNESS SPA (Grigio Orobico freestanding bath, skylight beam & bamboo court)
          const norm = (sp - 0.64) / 0.07;
          targetCamX = 2.4 - norm * 0.2;
          targetCamY = 1.6 + norm * 2.1;
          targetCamZ = 0.5 + norm * 1.2;
          lookX = 2.6;
          lookY = 3.1;
          lookZ = -0.5;
        } else if (sp < 0.78) {
          // ACT 12 — THE CANTILEVERED SKY POOL (Suspended infinity waters, volcanic embers & sundeck)
          const norm = (sp - 0.71) / 0.07;
          targetCamX = 2.2 + norm * 1.8;
          targetCamY = 3.7 + norm * 0.5;
          targetCamZ = 1.7 + norm * 2.2;
          lookX = 1.6;
          lookY = 2.9;
          lookZ = 1.4;
        } else if (sp < 0.85) {
          // ACT 13 — THE UPPER SANCTUARY (Architectural continuity & motorized cedar solar louvers)
          const norm = (sp - 0.78) / 0.07;
          targetCamX = 4.0 - norm * 5.8;
          targetCamY = 4.2 - norm * 0.4;
          targetCamZ = 3.9 + norm * 0.8;
          lookX = -1.8;
          lookY = 3.6;
          lookZ = 1.7;
        } else if (sp < 0.91) {
          // ACT 14 — THE ASSEMBLY (Camera pullback: all 12 strata unite in exploded harmony)
          const norm = (sp - 0.85) / 0.06;
          targetCamX = -1.8 + norm * 9.8;
          targetCamY = 3.8 + norm * 1.6;
          targetCamZ = 4.7 + norm * 5.0;
          lookX = 0;
          lookY = 1.2;
          lookZ = 0;
        } else if (sp < 0.96) {
          // ACT 15 — THE MANSION REVEAL (Interactive 360° orbit around completed residence)
          targetCamX = 8.5 + Math.sin(elapsedTime * 0.25) * 1.8;
          targetCamY = 4.8 + Math.cos(elapsedTime * 0.18) * 0.6;
          targetCamZ = 9.8 + Math.cos(elapsedTime * 0.25) * 1.8;
          lookX = 0;
          lookY = 1.2;
          lookZ = 0;
        } else {
          // ACT 16 — THE INVITATION (Dignified closing perspective for private atelier commission)
          targetCamX = 7.5;
          targetCamY = 3.8;
          targetCamZ = 8.5;
          lookX = 0;
          lookY = 0.8;
          lookZ = 0;
        }
      } else {
        if (p.cameraAngle === 'axonometric') {
          targetCamX = 9.5;
          targetCamY = 7.2;
          targetCamZ = 9.5;
        } else if (p.cameraAngle === 'front') {
          targetCamX = 0;
          targetCamY = 2.4;
          targetCamZ = 10.5;
        } else if (p.cameraAngle === 'interior') {
          targetCamX = 2.4;
          targetCamY = 1.5;
          targetCamZ = 3.6;
          lookX = 0.8;
          lookY = 1.1;
          lookZ = 0.2;
        } else if (p.cameraAngle === 'aerial') {
          targetCamX = 0.1;
          targetCamY = 12.0;
          targetCamZ = 0.1;
        }
      }

      // Smooth camera position damping
      state.cameraPos.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.05);
      camera.position.copy(state.cameraPos);

      // Smooth camera target damping
      state.cameraCurrentTarget.lerp(new THREE.Vector3(lookX, lookY, lookZ), 0.05);
      camera.lookAt(state.cameraCurrentTarget);

      // -------------------------------------------------------------
      // DYNAMIC LIGHTING & TIME-OF-DAY ATMOSPHERE
      // -------------------------------------------------------------
      if (p.timeOfDay === 'night' || (p.scrollProgress !== undefined && p.scrollProgress > 0.12 && p.scrollProgress < 0.22)) {
        scene.background = new THREE.Color(0x040507);
        if (state.sunLight) state.sunLight.intensity = 0.35;
        if (state.ambientLight) state.ambientLight.intensity = 0.25;
        if (state.warmInteriorLight) state.warmInteriorLight.intensity = 4.2;
        state.lanternLights.forEach((l) => (l.intensity = 2.2));
      } else if (p.timeOfDay === 'golden-hour' || (p.scrollProgress !== undefined && p.scrollProgress >= 0.70 && p.scrollProgress < 0.80) || (p.scrollProgress !== undefined && p.scrollProgress >= 0.92)) {
        scene.background = new THREE.Color(0x0e0906);
        if (state.sunLight) {
          state.sunLight.color.setHex(0xffaa55);
          state.sunLight.intensity = 3.2;
          state.sunLight.position.set(12, 5, 8);
        }
        if (state.warmInteriorLight) state.warmInteriorLight.intensity = 3.8;
        state.lanternLights.forEach((l) => (l.intensity = 1.6));
      } else {
        scene.background = new THREE.Color(0x07080a);
        if (state.sunLight) {
          state.sunLight.color.setHex(0xfff5e6);
          state.sunLight.intensity = 2.4;
          state.sunLight.position.set(9, 14, 7);
        }
        if (state.ambientLight) state.ambientLight.intensity = 0.65;
        state.lanternLights.forEach((l) => (l.intensity = 0.8));
      }

      // Thermal Mode Handling
      if (p.thermalMode && state.thermalLight) {
        state.thermalLight.intensity = 4.5;
        const temp = p.thermalTemperature || 298;
        const hue = Math.max(0, Math.min(1, (temp - 273) / 60));
        state.thermalLight.color.setHSL(0.66 - hue * 0.66, 1.0, 0.5);
      } else if (state.thermalLight) {
        state.thermalLight.intensity = 0;
      }

      // -------------------------------------------------------------
      // PROCEDURAL DYNAMICS: WIND SWAY, POOLS WAVE RIPPLES & EMBER GLOW
      // -------------------------------------------------------------
      const wind = p.windSpeed ?? 1.2;

      // 1. Organic Grass Field & Bamboo Sway in Breeze
      if (state.grassGroup) {
        state.grassGroup.rotation.z = Math.sin(elapsedTime * 2.2 * wind) * 0.035;
        state.grassGroup.rotation.x = Math.cos(elapsedTime * 1.8 * wind) * 0.025;
      }
      if (state.bambooGroup) {
        state.bambooGroup.rotation.z = Math.sin(elapsedTime * 1.5 * wind) * 0.02;
      }

      // 2. Continuous Water Wave Ripples on Ground Reflection Pool
      if (state.waterPlaneGeo && p.waterRipple !== false) {
        const pos = state.waterPlaneGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const u = pos.getX(i);
          const v = pos.getY(i);
          const wave = Math.sin(u * 5.0 + elapsedTime * 2.6 * wind) * 0.015 + Math.cos(v * 4.2 + elapsedTime * 2.0 * wind) * 0.012;
          pos.setZ(i, wave);
        }
        pos.needsUpdate = true;
        state.waterPlaneGeo.computeVertexNormals();
      }

      // 3. Continuous Water Wave Ripples on Cantilevered Sky Pool
      if (state.skyWaterGeo) {
        const skyPos = state.skyWaterGeo.attributes.position;
        for (let j = 0; j < skyPos.count; j++) {
          const su = skyPos.getX(j);
          const sv = skyPos.getY(j);
          const skyWave = Math.sin(su * 6.0 + elapsedTime * 3.2) * 0.01 + Math.cos(sv * 5.0 + elapsedTime * 2.4) * 0.008;
          skyPos.setZ(j, skyWave);
        }
        skyPos.needsUpdate = true;
        state.skyWaterGeo.computeVertexNormals();
      }

      // 4. Volcanic Ember Flame Flickering
      if (state.emberLight) {
        const flicker = Math.sin(elapsedTime * 12.0) * 0.4 + Math.cos(elapsedTime * 17.5) * 0.3;
        state.emberLight.intensity = Math.max(1.8, 2.8 + flicker);
      }

      // 5. Backlit Onyx Wall Luminescence
      if (state.onyxMat) {
        if (p.wineOnyxGlow !== false) {
          const pulse = Math.sin(elapsedTime * 0.8) * 0.15 + 0.85;
          state.onyxMat.emissiveIntensity = pulse;
        } else {
          state.onyxMat.emissiveIntensity = 0.2;
        }
      }

      // 6. Dynamic Lawn Tone & Material Adaptation
      if (state.lawnMat) {
        if (p.lawnTone === 'bentgrass') {
          state.lawnMat.color.setHex(0x32562d);
          state.lawnMat.roughness = 0.82;
          if (state.grassBladeMat) state.grassBladeMat.color.setHex(0x3d6636);
        } else if (p.lawnTone === 'zen-gravel') {
          state.lawnMat.color.setHex(0xc0b298);
          state.lawnMat.roughness = 0.94;
          if (state.grassBladeMat) state.grassBladeMat.color.setHex(0xb5a78c);
        } else {
          // Kyoto Velveteen Zoysia (Imperial default)
          state.lawnMat.color.setHex(0x1a3319);
          state.lawnMat.roughness = 0.88;
          if (state.grassBladeMat) state.grassBladeMat.color.setHex(0x244621);
        }
      }

      // 7. Underwater Light & Bonsai Glow at Twilight
      if (state.underwaterLight) {
        if (p.timeOfDay === 'night' || p.timeOfDay === 'golden-hour') {
          state.underwaterLight.intensity = 2.4;
        } else {
          state.underwaterLight.intensity = 1.2;
        }
      }
      if (state.bonsaiLight) {
        if (p.timeOfDay === 'night') {
          state.bonsaiLight.intensity = 3.6;
        } else if (p.timeOfDay === 'golden-hour') {
          state.bonsaiLight.intensity = 2.8;
        } else {
          state.bonsaiLight.intensity = 1.4;
        }
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // 8. Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      renderer.dispose();
      pmremGenerator.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
