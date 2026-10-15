# Oryzo / Lusion Precision Architectural Hardware Rebrand

A radical aesthetic and interactive elevation transforming the IPA Atelier and digital storefront into an ultra-sophisticated, deadpan "AI Hardware" parody experience. Physical architectural furniture, stone monoliths, and bespoke joinery are presented with over-engineered reverence as zero-compute, zero-token physical computing platforms, complete with precision spec-sheet matrices and interactive tuning dials.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following directions have been confirmed and will guide the implementation:

- **Confirmed Scope**: Rebrand the current furniture and spatial atelier (`/shop`, `/products/:id`, and homepage Atelier spotlight) into a precision architectural hardware platform ("IPA Precision Systems // Physical Architecture").
- **Confirmed Tone**: Deadpan AI-hardware parody that treats natural, physical materials (Italian Arabescato marble, bouclé, smoked oak, brushed champagne brass) as bleeding-edge deep-tech hardware specs (e.g., *"0 Tokens · Zero Compute · Infinite Retention · Native Solid-Stone Firmware"*).
- **Confirmed Centerpiece**: A multi-column "Precision Spec-Sheet Matrix" equipped with real-time interactive technical dials and parameter sliders (adjusting structural inertia, acoustic attenuation, and tactile density in real time).

---

## 1. Overview & Core Concept

### What It Does
Transforms the atelier commerce and showcase experience into an immersive, editorial tech-hardware showcase inspired by **Lusion** and **Oryzo.ai**. Users explore high-end architectural furniture reimagined as physical hardware apparatuses. They can inspect interactive technical spec sheets, tune hardware parameters (Inertia, Cantilever Angle, Thermal Equilibrium, Acoustic Dampening) via precision dials, compare physical inference tiers, and commission bespoke units with live metric telemetry.

### Target Audience & Persona
- Discerning luxury clients, architects, and design technologists who appreciate both uncompromising physical craftsmanship and deadpan Silicon Valley tech culture parody.
- High-net-worth estate patrons seeking turnkey bespoke furniture engineered with aerospace-grade precision.

### Key Value
Bridges the gap between elite architectural craftsmanship and high-tech web artistry, replacing generic e-commerce layouts with a memorable, high-conversion, interactive editorial design system.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **The Physical Hardware Monograph (Homepage Atelier Section & Showcase)**:
   - Visitors encounter high-contrast typography: bold geometric sans headlines paired with tracked uppercase micro-copy (`IPA-01 // NEURAL BOUCLÉ PLATFORM`).
   - Technical badges highlight the deadpan parody: `ZERO COMPUTE`, `100% PASSIVE THERMAL DISSIPATION`, `SOLID STONE FIRMWARE`.
2. **The Precision Spec-Sheet Matrix (Centerpiece)**:
   - A multi-column comparison table comparing hardware configurations: *Studio Core*, *Executive Monolith*, and *Architectural Estate*.
   - Spec rows itemize: Structural Mass, Token Cost ($0.00/hr), Thermal Envelope, Latency (0.00ms Photonic), and Acoustic Attenuation.
3. **Interactive Hardware Parameter Tuner**:
   - Users interact with precision dials and sliders:
     - **Inertial Density Dial**: Adjusts Paonazzo marble density (1,200 kg to 3,400 kg), dynamically updating floor load ratings.
     - **Cantilever Ergonomic Angle**: Adjusts louvers / backrest pitch (0° to 45°), updating optical shadow throw and posture support metrics.
     - **Bouclé Tactile Frequency**: Adjusts surface loops/cm² with tactile micro-haptic feedback.
4. **Architectural Hardware Product Detail (PDP)**:
   - Full-bleed technical schematics, exploded dimensional readouts, and a contiguous purchase/inquiry module with instant spec-sheet PDF generation and atelier reservation.

### Visual Identity & Theme
- **Color Palette**:
  - Dominant Canvas: Deep obsidian (`#09090B`) and technical graphite (`#121214`), with a dual light mode in clean stark laboratory white (`#FFFFFF`) and warm natural linen (`#F5F4F0`).
  - Structural Surfaces: Crisp hairline borders (`rgba(255, 255, 255, 0.08)` and `rgba(0, 0, 0, 0.08)`), dark slate card backings (`#18181B`).
  - Accent Color: Warm natural cork and raw earth tan (`#C69B7B`, `#D97706`, `#B45309`) paying homage to Oryzo's organic materials, contrasted with crisp laboratory white highlights.
- **Typography & Hierarchy**:
  - Display Face: `Plus Jakarta Sans` / `Outfit` in extra-bold, tight tracking (`tracking-tight` to `tracking-tighter`), balanced with high-contrast editorial sizing.
  - Micro-copy & Technical Specs: `Space Mono` / `JetBrains Mono` / `tabular-nums` in uppercase with meticulous letterspacing (`tracking-[0.2em]`).
  - Body: Refined clean sans (`Plus Jakarta Sans`), 15–16px, balanced line length.
- **Component Styling**:
  - Crisp hairlines (`border border-neutral-800` / `border-neutral-200`) with zero-pill discipline (clean unboxed labels with `·` separators).
  - Multi-column technical matrices with monospace data cells.
  - Custom SVG precision dials with rotating tick marks and numeric readouts.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Blending Real Commerce with Parody Specs**
  - *Chosen Approach*: The copy and specs playfully adopt hardware parody ("Zero Compute", "Infinite State Retention"), while maintaining real prices, genuine materials (Arabescato marble, bouclé fabric, solid oak), and actual functional shopping bag and design inquiry workflows.
  - *Why*: Delivers the satirical Lusion/Oryzo aesthetic without breaking the functional business application or confusing real purchasing intent.
- **Decision 2: Interactive Parameter Tuner Architecture**
  - *Chosen Approach*: Pure client-side reactive state recalculating real physical formulas (mass, load pressure, acoustic absorption index) within 16ms render frames.
  - *Why*: Provides zero-latency feedback that feels like physical hardware instrumentation without requiring heavy backend computation.
- **Decision 3: Zero-Pill & Top Bar Contract Compliance**
  - *Chosen Approach*: Maintain strict 1-row, 3-zone navigation bar and unboxed typographic tags with separator dots, completely avoiding generic floating pill badges.
  - *Why*: Complies strictly with the universal frontend constitution while matching Oryzo's minimalist architectural discipline.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MasterNavigation                                │
│   [IPA SYSTEMS]  ─────  [HARDWARE · MATRIX · ATELIER · SPECS]  ─────   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       PrecisionHardwareCatalog                         │
│  ┌────────────────────────┐  ┌──────────────────────────────────────┐  │
│  │   Hero Spec Matrix     │  │  Interactive Hardware Tuner Dials    │  │
│  │  - Zero-Compute Banner │  │  - Inertial Mass (kg)                │  │
│  │  - Photonic Latency    │  │  - Acoustic Attenuation (dB)         │  │
│  │  - Solid-Stone Firmware│  │  - Ergonomic Cantilever (deg)        │  │
│  └───────────┬────────────┘  └──────────────────┬───────────────────┘  │
│              │                                  │                      │
│              ▼                                  ▼                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │             Hardware Comparison Matrix (Tier Matrix)             │  │
│  │   [Tier 1: Studio Core]  [Tier 2: Monolith Pro]  [Tier 3: Estate] │  │
│  │   - Dynamic mass & dimension recalculations                      │  │
│  │   - Direct Spec Export & Atelier Inquiry Trigger                 │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                  │                                     │
│                                  ▼                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │              Physical Hardware Product Detail (PDP)              │  │
│  │   - High-fidelity imagery + dimensional technical schematics     │  │
│  │   - Contiguous buy module & custom fabric/stone configuration    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    IpaDataContext (State Store)                        │
│   - Hardware Catalog Entities & Technical Telemetry Specifications     │
│   - Multi-Currency Conversions (USD / EUR / GBP / UGX)                 │
│   - Persistent Client Cart & Bespoke Specification Bookmarks           │
└────────────────────────────────────────────────────────────────────────┘
```

### Key Components to Implement
1. `PrecisionSpecMatrix.tsx`: Multi-tier comparison matrix with technical spec rows, deadpan AI-hardware copy, and feature checklists.
2. `HardwareTunerDials.tsx`: Interactive circular dials and precision range sliders with live feedback, numerical telemetry readouts, and responsive haptic-style micro-animations.
3. `AtelierShopExperience.tsx` (Refactor): Rebranded storefront featuring high-contrast obsidian & cork aesthetic, technical spec sheets per item, and quick-add capabilities.
4. `ProductDetailPage.tsx` (Refactor): High-end hardware monograph presentation with dimensional blueprints and full material breakdown.
5. Tailwind CSS token refinement: Dedicated obsidian (`#09090B`), cork/tan (`#C69B7B`), and precision hairline border utilities.
