# IPA INTERIORS — THE EVOLVING MANSION
## Phase 2: Complete 11-Chapter Scroll-Driven Experience Report

---

### Executive Summary
The entire IPA Interiors flagship website has been rebuilt as an authentic, full-page, scroll-driven interactive narrative inspired by the complete frontend architecture of **https://oryzo.ai/**.

The experience advances through **11 sequential chapters**, beginning with an expansive establishing view of the estate grounds, progressively focusing on the landscape and a sculptural garden lamp, moving through the monumental mahogany pivot entrance into the curated interior salon and kitchen, elevating to the private master sanctuary, orchestrating a majestic camera pullback, and culminating in the full 360° interactive mansion reveal and commissioning invitation.

---

### The 11-Chapter Narrative & Technical Sequence

| Chapter | Title & Tag | Narrative Arc & Spatial Role | Architectural Focus & 3D Staging | IPA Relevant Capability |
|---|---|---|---|---|
| **01** | **The Estate**<br>`ACT 01 // THE ESTATE` | Establishing context, grounds, and architectural arrival. | Wide atmospheric camera (`cam: 10.5, 6.5, 12.0`) establishing the 14,000 m² domain and equatorial massing. | Site acquisition, master topography modeling, and microclimate planning. |
| **02** | **The Lawn**<br>`ACT 02 // THE LAWN & APPROACH` | The home begins before entering the building. | Camera swoops low across the terraced volcanic loam, monolithic honed travertine podium, and sunken 4.4m reflection water basin. | Integrated landscape architecture, natural stone retaining plinths, and reflection pools. |
| **03** | **The Lighting**<br>`ACT 03 // THE SCULPTURAL LIGHTING` | Lighting establishes atmosphere and guides movement. | Camera zooms in directly on the hero sculptural cast-bronze garden lamp; twilight falls, casting a warm 2700K pool of light across the lawn. | Custom luminaire design, dark-sky compliant optics, and dusk atmosphere modeling. |
| **04** | **The Entrance**<br>`ACT 04 // THE MONUMENTAL ARRIVAL` | The entrance expresses the character of the home before crossing inside. | Camera transitions toward the front door: stepped travertine approach, fluted bronze jambs, and 3.8m vertical African mahogany pivot door. | Precision architectural millwork, concealed hydraulic floor pivots, and bronze foundry work. |
| **05** | **The Artwork**<br>`ACT 05 // THE CURATED ARTWORK` | Art and personal objects give a home identity. | Camera enters the interior gallery corridor, framing a lost-wax cast bronze torus knot sculpture on a limestone pedestal under 98 CRI downlighting. | Fine art curation, site-specific sculptural commissions, and museum conservation lighting. |
| **06** | **The Furniture**<br>`ACT 06 // THE LIVING SALON` | Room quality stems from proportional relationships between elements. | Camera glides into the salon: curved low-slung bouclé modular sofa, hand-carved travertine coffee plinth, and woven wool area rug. | Bespoke residential atelier, curved upholstered seating, and artisanal stone carving. |
| **07** | **The Kitchen**<br>`ACT 07 // THE CULINARY GALLERY` | Functional spaces become beautiful through craftsmanship and layout. | Camera frames the monolithic Calacatta Oro marble waterfall island, concealed induction cooking, and fluted smoked oak cabinetry. | High-precision stone fabrication, mitred bookmatched marble, and concealed appliance joinery. |
| **08** | **The Complete Interior**<br>`ACT 08 // ARCHITECTURAL CONTINUITY` | Continuity between public salons and private sanctuaries. | Camera elevates to show spatial flow into the cantilevered upper master suite with aerodynamic cedar louvers and solarium glass terrace. | Multi-level spatial sequencing, passive equatorial cooling, and acoustic envelope engineering. |
| **09** | **The Assembly**<br>`ACT 09 // UNIFIED SYNTHESIS` | Previously introduced elements belong to one unified home. | Deliberate camera pullback: the grounds, lamp, entrance, artwork, furniture, kitchen, and upper suite unite as one living residence. | Turnkey architectural management, BIM clash detection, and end-to-end estate construction. |
| **10** | **The Mansion Reveal**<br>`ACT 10 // THE MANSION REVEAL` | Complete luxury residence in a memorable architectural composition. | Interactive 360° model inspection with drag physics, Daylight/Golden Hour/Dusk solar switcher, 0–100% axonometric explode, and monograph dossier. | Full bespoke private estate design and turnkey delivery. |
| **11** | **The Invitation**<br>`ACT 11 // THE INVITATION` | "Every residence is a portrait. We engineer the frame." | Dignified architectural overview framing the residence; private client commissioning desk under NDA with Kampala, London, and Dubai ateliers. | Private family office commissions, international residential ateliers, and architectural monographs. |

---

### Genuine Scroll-Driven Staging Details

1. **Lenis Inertial Smoothing + GSAP ScrollTrigger**:
   - `duration: 1.25` with power-curve easing for butter-smooth momentum.
   - Synchronized directly to GSAP ticker with `lagSmoothing(0)` for zero frame jitter.
2. **Persistent 3D Viewport (`Architectural3DCanvas.tsx`)**:
   - Fixed full-screen canvas running ACESFilmic tone mapping and soft directional shadows.
   - Continuous scroll progress smoothly interpolates camera position (`cameraPos.lerp`) and target focus (`cameraCurrentTarget.lerp`).
   - 8 procedural architectural layers assemble progressively with smoothstep scaling and subtle vertical drop.
3. **Reversible Scroll Interaction**:
   - Scrolling forward assembles the home and moves the camera into intimate spaces.
   - Scrolling backward disassembles layers and returns the camera to earlier perspectives smoothly.
4. **Hero Sculptural Garden Lamp (Chapter 3)**:
   - Built with an angled cast-bronze pedestal, cantilevered head, and recessed emissive lens.
   - Casts a warm 2700K spotlight beam across the lawn and stepped travertine pavers.

---

### Verification Summary
- **TypeScript**: `tsc --noEmit` exited with code 0 (zero errors).
- **Vite Build**: Production compilation successful.
- **Dev Server**: Running cleanly on port 3000.
