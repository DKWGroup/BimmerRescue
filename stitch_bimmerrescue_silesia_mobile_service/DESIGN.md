---
name: Precision Performance
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e9bcb5'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#af8781'
  outline-variant: '#5f3f3a'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#690000'
  primary-container: '#e00000'
  on-primary-container: '#fff0ee'
  inverse-primary: '#c00000'
  secondary: '#c8c6c6'
  on-secondary: '#303030'
  secondary-container: '#494949'
  on-secondary-container: '#b9b8b8'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#706f6f'
  on-tertiary-container: '#f6f3f2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930100'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c8c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  title-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-margin: 20px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style

The design system is engineered for **BimmerRescue Silesia**, a premium mobile BMW service. The brand personality is rooted in technical expertise, urgency, and automotive precision. It targets discerning BMW owners who value professional-grade maintenance and high-performance aesthetics.

The visual style is **High-Contrast Corporate Modern** with an **Automotive Interface** lean. It utilizes deep dark backgrounds to evoke a premium garage environment, contrasted with sharp typography and vibrant M-performance accents. The interface should feel like a natural extension of the BMW iDrive ecosystem—focused, efficient, and technologically advanced.

## Colors

The palette is anchored by **Deep Black (#000000)** to provide a canvas of luxury and focus. **BMW M-style Red (#E00000)** is the primary action color, used sparingly for critical interactions, alerts, and calls to action to maintain its impact.

**Professional Slate Gray (#4A4A4A)** is used for secondary elements, borders, and disabled states, ensuring the interface maintains a technical, mechanical feel. **Crisp White** is reserved for high-readability text and primary icons, ensuring maximum contrast against the dark background.

## Typography

This design system uses a triple-font approach to balance impact and technical utility. **Montserrat** is used for headlines to provide a bold, geometric, and authoritative presence. **Inter** handles the bulk of the content, offering exceptional readability on mobile screens. **JetBrains Mono** (or a similar monospace) is utilized for technical labels, VIN numbers, and diagnostic codes to reinforce the "Rescue" and "Service" aspect of the brand.

All display text should be set in Uppercase when used for navigation or major section headers to mimic automotive dashboard styling.

## Layout & Spacing

The layout follows a **Fixed Grid** model for mobile devices to ensure a controlled, dashboard-like experience. It uses a 4px base unit to maintain strict mathematical alignment. 

- **Margins:** 20px horizontal margins provide a spacious frame for content.
- **Gutter:** 16px between columns.
- **Rhythm:** Vertical spacing is aggressive; use larger gaps (`stack-lg`) between logical service groups and tighter gaps (`stack-sm`) for related technical details.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** rather than traditional shadows. Surfaces "lift" by becoming slightly lighter shades of gray rather than casting blurs.

- **Level 0 (Background):** Pure Black (#000000).
- **Level 1 (Cards/Lists):** Very dark charcoal (#121212) with a 1px Slate Gray (#4A4A4A) stroke.
- **Level 2 (Modals/Popovers):** Slate Gray (#1A1A1A) with a more prominent 1px light gray border.

Interactive elements use a **Red Glow** (low-opacity M-Red drop shadow) only when in an active or "warning" state to signify urgency.

## Shapes

The shape language is "Soft-Industrial." Components use a conservative **0.25rem (4px)** radius to avoid the playfulness of fully rounded UI while remaining modern and touch-friendly. 

- **Small elements (Inputs/Chips):** 4px radius.
- **Large elements (Cards):** 8px (rounded-lg).
- **Icons:** Sharp, thin-stroke (1.5px) glyphs to match the technical typography.

## Components

### Buttons
- **Primary:** M-Red (#E00000) background, white text, 4px radius. High-impact.
- **Secondary:** Transparent background, 1px White or Slate Gray border, White text.
- **Tertiary/Ghost:** White text with a small red chevron icon for directional actions.

### Input Fields
- Dark surfaces (#121212) with a bottom-only border in Slate Gray. The border turns M-Red when the field is focused. Labels use the Monospaced font in uppercase.

### Service Cards
- Containers for diagnostic info. Use a Level 1 surface. Include a vertical M-Red accent bar (4px wide) on the left edge to indicate "Active" or "Critical" status.

### Status Chips
- Used for diagnostic results (e.g., "OK", "ERROR"). "ERROR" states should use a solid Red background; "OK" should use a White outline with White text to maintain the high-contrast aesthetic without introducing green, which clashes with the BMW M-branding.

### Progress Gauges
- Linear or circular progress indicators should use M-Red for the "fill" to mimic needle gauges from the logo and BMW instrument clusters.