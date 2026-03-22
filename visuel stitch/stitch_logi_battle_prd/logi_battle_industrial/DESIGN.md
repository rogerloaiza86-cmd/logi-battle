```markdown
# Design System Strategy: The Industrial Arena

## 1. Overview & Creative North Star
The visual identity of this design system is rooted in the **"Industrial Arena."** This is a high-octane, e-sports-inspired framework that elevates the grit of logistics into a premium, competitive spectacle. We are moving away from the static, dry nature of educational apps and toward a "Command Center" aesthetic.

**Creative North Star: The Kinetic Command Center.**
The interface should feel like a high-performance heads-up display (HUD). We achieve this through a "glass-on-steel" approach: heavy, industrial foundations (Deep Navy) layered with lightweight, luminous digital overlays (Glassmorphism). To break the "template" look, we employ **intentional asymmetry**—such as offset headers and overlapping container edges—to mimic the organized chaos of a shipping port.

---

## 2. Colors & Tonal Depth
The palette transitions from the heavy shadows of a warehouse to the high-visibility neon of safety gear.

### Color Roles
*   **Primary (`#fea52e`):** "Industrial Orange." Used for active gameplay elements, primary CTAs, and critical feedback.
*   **Secondary (`#699cff`):** "Team Alpha Blue." Used for competitive identity and data visualization.
*   **Surface & Background (`#0c0c1f`):** "Deep Navy." The foundation of the arena, providing maximum contrast for projector environments.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. To separate a quiz question from the answer set, place a `surface-container-high` card atop a `surface-container-low` background. 

### Glass & Gradient Rule
To move beyond a "flat" digital feel, all floating elements must utilize **Backdrop Blur (12px - 20px)** combined with semi-transparent surface colors. Main action buttons should not be flat; apply a subtle linear gradient from `primary` to `primary_container` (at a 135-degree angle) to give the "glow" a physical source.

---

## 3. Typography: The Lexend Scale
Lexend was chosen for its hyper-legibility and geometric stability, crucial for fast-paced competitive environments and projector visibility.

*   **Display (Large/Medium):** Used for scores and "Versus" screens. Use `display-lg` (3.5rem) with reduced letter-spacing (-0.02em) to create an authoritative, "jumbotron" effect.
*   **Headlines:** Used for quiz questions. Use `headline-lg` (2rem). This scale ensures the person at the back of the room can read the prompt instantly.
*   **Body:** Used for logistics context and explanations. Use `body-lg` (1rem) for maximum readability.
*   **Labels:** Used for metadata (e.g., "Pallet Count," "Transit Time"). Always uppercase with a slight letter-spacing (0.05em) to mimic industrial stamping.

---

## 4. Elevation & Depth: Tonal Layering
We do not use structural lines. We use physics.

*   **The Layering Principle:** Treat the UI as a series of nested shipping containers. 
    *   Base Floor: `surface`
    *   Main Content Area: `surface-container-low`
    *   Interactive Cards: `surface-container-high`
*   **Ambient Glows:** Instead of grey shadows, use "Ambient Glows." When a card is active, apply a diffused shadow (blur: 24px) using a 10% opacity version of the `primary` (Orange) or `secondary` (Blue) color. This creates the sensation of a light-emitting screen.
*   **The Ghost Border:** For accessibility on interactive inputs, use a "Ghost Border"—a 1.5px stroke using `outline-variant` at 15% opacity. This provides a hint of structure without breaking the seamless glass aesthetic.

---

## 5. Components

### Glassmorphic Battle Cards
*   **Style:** Background `surface_container_highest` at 60% opacity.
*   **Blur:** 16px backdrop-blur.
*   **Corner Radius:** `lg` (2rem/32px) for a modern, friendly-yet-technical feel.
*   **Constraint:** No dividers. Use `spacing-8` (2rem) to separate content blocks within the card.

### Glowing Action Buttons
*   **Primary:** `primary` background with a 135° gradient to `primary_container`. 
*   **Shadow:** Box-shadow `0 8px 20px` using `primary` at 30% opacity.
*   **Typography:** `title-md` (bold), centered.
*   **Interaction:** On hover, the scale increases to 1.05x to mimic a physical "power up."

### Circular "Logi-Timers"
*   **Structure:** A heavy `surface_variant` track with a `primary` (Orange) stroke that depletes.
*   **Visual Soul:** Add a small glow-dot at the leading edge of the timer's progress to emphasize the "ticking clock" pressure.

### 'Versus' Labels
*   **Design:** Skewed containers (8-degree tilt) to suggest motion and friction. Use `secondary` for Team A and `tertiary` (Red/Pink) for Team B.
*   **Placement:** Overlap the edges of the main containers to break the rigid grid.

### Input Fields (Logistics Entry)
*   **Style:** `surface_container_lowest` background (pure black/deep navy) to create a "recessed" look.
*   **State:** When focused, the "Ghost Border" becomes a 100% opaque `primary` stroke to signal active data entry.

---

## 6. Do's and Don'ts

### Do
*   **Do** use overlapping elements. A "Pallet" icon should peek out from behind a glass card.
*   **Do** prioritize high contrast. Ensure `on-surface` text remains white or light lavender (`#e5e3ff`) against the deep backgrounds.
*   **Do** use `24` (6rem) spacing for major section breaks to let the industrial elements "breathe."

### Don't
*   **Don't** use 1px solid white or grey borders. They look "web-template" and break the premium immersion.
*   **Don't** use standard "Drop Shadows." Only use tinted ambient glows.
*   **Don't** use sharp corners. Every container must follow the `lg` (2rem) or `md` (1.5rem) roundedness scale to maintain the high-end gaming feel.
*   **Don't** clutter. If a screen feels full, increase the spacing scale rather than adding lines.```