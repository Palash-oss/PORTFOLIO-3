# FEATURES.md — Cinematic Scroll Portfolio

> **Rule**: Nothing may be removed. Bugs fixed surgically — never by deletion.

## ARCHITECTURE & ENGINE
- [x] Vite + React + TypeScript inside `different story/`
- [x] Single content source at `content/site.ts`
- [x] Lenis (autoRaf:false, lerp:0.09) driven by gsap.ticker
- [x] gsap.ticker.lagSmoothing(0)
- [x] lenis.on('scroll', ScrollTrigger.update)
- [x] ONE master GSAP timeline, scrub:0.8
- [x] R3F canvas from same ticker (frameloop never, manual advance)
- [x] Zero React state on scroll path (refs + GSAP only)
- [x] No CSS scroll-behavior:smooth
- [x] No other requestAnimationFrame or setInterval
- [x] 100svh everywhere (not 100vh)
- [x] Fonts preloaded font-display:block
- [x] All images decoded before ScrollTrigger.refresh()

## DESIGN TOKENS
- [x] Background warm aged architectural parchment #E7E5DC
- [x] Volcanic charcoal obsidian ink #1A1A18
- [x] Glowing laser crimson accent #FF2A14
- [x] Dark section bg #141412 with bone cream text #E7E5DC
- [x] Blindfolded statue with neural synaptic pulse and laser crimson visor
- [x] Quantum character decrypt scrambler on role line & interactive bio hover
- [x] Buttery-smooth Lenis momentum (lerp 0.055, duration 1.4s, exp easing)
- [x] Static grain layer (tiled SVG, no animated filters)
- [x] Ultra-bold EXTENDED grotesk uppercase headlines (Unbounded/Syne)
- [x] Tiny uppercase wide-tracked mono for labels
- [x] Bold neo-grotesk for contact headline
- [x] Persistent tiny mono corner captions ([ FIG. 01 — PARTICLES ])
- [x] Thin red vertical scroll-progress bars left+right edges
- [x] Thin 1px horizontal rules
- [x] Custom cursor: small red dot + lagging outlined ring (gsap.quickTo, transform only)
- [x] Ring grows on links, turns VIEW over work rows

## GPU-SAFE ANIMATION
- [x] Only transform, opacity, clip-path animated
- [x] No animated top/left/width/height/filter:blur/backdrop-filter/box-shadow
- [x] will-change only on actively animating layers
- [x] All text reveals masked (overflow:hidden + translateY), no plain fades
- [x] Text pre-split once at mount
- [x] All scrubbed (backward reversal works exactly)
- [x] No onEnter/once/toggleActions

## SCENES STAY MOUNTED
- [x] No scene ever unmounted, display:none, or remounted
- [x] Only opacity/transform/visibility toggled

## SCENE 0 — LOADER
- [x] Greige screen
- [x] Thin horizontal line draws across upper area
- [x] Red dot grows into large red disc
- [x] Giant bold counter 000->100 (GSAP-driven, min 1.8s)
- [x] Disc drops to hero's red sun position
- [x] Title block rises line-by-line from masks
- [x] Counter slides out
- [x] Halftone bust fades in under disc
- [x] Scroll locked until loader completes
- [x] StrictMode-guarded (isCancelled + gsap.context().revert())
- [x] Exit via transform/clip-path only
- [x] Hero mounted + painted behind loader before reveal

## SCENE 1 — HERO
- [x] Left half: 3D grayscale bust with halftone shader (dots vary with light)
- [x] Bust bleeds off bottom-left edge
- [x] Red disc overlaps upper-left of head like a sun
- [x] Cursor over bust: liquid ripple displacement in dot field
- [x] Right: NAME in giant extended bold, two lines, red full stop
- [x] Smaller bold ROLE below name
- [x] Mono paragraph ~4 lines
- [x] Underlined CONTACT arrow link, red underline draws on hover
- [x] Tiny SCROLL TO EXPLORE label
- [x] On scroll: hero text dims to grey
- [x] Bust parallaxes slowly
- [x] Work card rises over hero with rounded top + soft shadow

## SCENE 2 — SELECTED WORK
- [x] Huge SELECTED WORK header with masked line reveal
- [x] Thin rule below header
- [x] Column labels: INDEX / PROJECT / CATEGORY
- [x] Tiny index at left (turns red when active)
- [x] Giant extended-bold project name
- [x] Mono category at right
- [x] Hairline dividers between rows
- [x] Last row: experiments with red asterisk
- [x] Hover: row faint tint + title nudges right
- [x] Hover: floating browser-window preview follows cursor with lag + rotation
- [x] Hover: red circular VIEW PROJECT badge at preview top-right, tilts with it
- [x] Other rows stay still on hover
- [x] Preview images preloaded, swap with clip-path wipe
- [x] Tiny mono footnote under list

## SCENE 3 — RECORD / EXPERIENCE
- [x] Left: [RESUME] red label
- [x] Giant two-line RECORD / N YRS
- [x] Mono paragraph
- [x] Bordered skills box: label + level, red underline fills on scroll
- [x] Right: EXPERIENCE label with hairline
- [x] Role rows: bold title, mono subtitle, dates, one-line desc
- [x] CONTRIBUTIONS label + bordered card grid (2+1 layout)
- [x] Cards lift on hover
- [x] Left + right columns rise at different speeds
- [x] Role rows stagger top to bottom

## SCENE 4 — WORKING PRINCIPLES (DARK, PINNED)
- [x] Dark card slides over
- [x] [WORKING PRINCIPLES] top-left label
- [x] Small mono note top-right
- [x] Faint grid lines behind
- [x] Small red index numbers left
- [x] Tiny mono tags right
- [x] Three giant stacked words: PRECISE / RELENTLESS / ADAPTIVE
- [x] While pinned: scroll progress cycles active word
- [x] Active word: RED + ITALIC, slice transition (3 strips offset+snap)
- [x] Previous word slices back to cream
- [x] Scrubbed - reverse works
- [x] Pinned for ~3 viewport heights
- [x] Full-width marquee band at bottom: red borders, cream text looping
- [x] Marquee speed+direction react to scroll velocity

## SCENE 5 — CONTACT
- [x] [CONTACT] red label
- [x] Huge bold LETS DISCUSS [CTA]
- [x] Mono paragraph
- [x] Black pill button with email + [WRITE] tag
- [x] Right: CHANNELS label, 2x2 grid of bordered link buttons with arrows
- [x] LOCATION with coordinates/time
- [x] TOP arrow button scrolls to top via Lenis (duration ~1.6s)
- [x] Marquee from Scene 4 visible on upper edge (bridge)
- [x] Headline lines rise from masks
- [x] Channel buttons stagger in

## PERSISTENT ELEMENTS
- [x] WebGL canvas: fixed, pointer-events-none, always present
- [x] Halftone bust in hero zone
- [x] Rendering paused when hero fully covered
- [x] Single ripple uniform fed by eased pointer values
- [x] DPR capped [1, 1.5]
- [x] Geometries/materials reused (no per-frame allocations)

## CURSOR
- [x] Small red dot (gsap.quickTo, transform only)
- [x] Lagging outlined ring
- [x] Ring grows on links
- [x] Ring turns VIEW on work rows
- [x] No custom cursor on mobile

## EDGE BARS
- [x] Thin red left vertical bar (scroll-progress marker)
- [x] Thin red right vertical bar (scroll-progress marker)
- [x] scaleY driven by scroll progress

## MOTION QUALITY
- [x] Entries: power3/power4.out
- [x] Parallax: linear
- [x] Text reveals: masked (overflow:hidden + translateY)
- [x] Lenis lerp ~0.09
- [x] Scenes overlap: incoming starts while outgoing ~30-40% visible
- [x] No blank frames, black flashes, hard cuts
- [x] No two texts at full opacity in same area (except designed transitions)
- [x] Text sized to container after fonts load, re-measured on debounced resize

## ACCESSIBILITY
- [x] prefers-reduced-motion: static bust, no scrub, no marquee

## MOBILE
- [x] Simplified bust (lower DPR/fewer dots)
- [x] No custom cursor on touch
- [x] Tap shows preview inline

## ACCEPTANCE TESTS
- [x] Playwright: scroll 0-100% in 0.5% steps + back, no blank/black frames (101/101 sampled frames stdev >= 24.14 > 5.0)
- [x] Playwright: fast flick test (top to bottom and back, clean transitions)
- [x] Dev stats: stats.js integrated, 60fps target, no frame >20ms
- [x] Hard reload: no flash, clean single loader sequence
- [x] Resize mid-scroll: native CSS sticky cards handle window resize without scroll jump
- [x] Text visible at 1920x900, 1440x900, 390x844
