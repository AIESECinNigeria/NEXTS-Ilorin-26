// Copy, asset paths and timings in one place so they're easy to tweak.

export const TOP_BAR = {
  from: 'from: CC ijoye',
  via: 'dispatched via: the batcave',
}

const img = (name) => `/images/${name}`

export const IMAGES = {
  forgeTexture: img('forge-texture.png'),
  workshopTexture: img('workshop-texture.png'),
  logo: img('logo.svg'),
  logoNexts: img('logo-nexts.svg'),
  logoIlorin: img('logo-ilorin.svg'),
  ruleTop: img('rule-top.svg'),
  ruleHeader: img('rule-header.svg'),
  ruleBottom: img('rule-bottom.svg'),
  hero01Anvil: img('hero01-anvil.png'),
  hero01AnvilOverlay: img('hero01-anvil-overlay.png'),
  hero02Anvil: img('hero02-anvil.png'),
  hero02AnvilOverlay: img('hero02-anvil-overlay.png'),
  forge4: img('forge4.jpg'),
  forge13: img('forge13.jpg'),
  portrait: img('portrait.png'),
  arrowsOrange: img('arrows-orange.svg'),
  arrowsDark: img('arrows-dark.svg'),
  // mobile-only
  mForgeTexture: img('m-forge-texture.jpg'),
  mHeader01: img('m-header-01.svg'),
  mHeader02: img('m-header-02.svg'),
  mArrowsOrange: img('m-arrows-orange.svg'),
}

export const TIMING = {
  fade: 0.9, // seconds, fade in/out of every screen
  introHold: 2600, // ms Hero 01 stays on screen after fading in
  workshopHold: 2200, // ms Hero 03 stays after its text finishes typing
  typeSpeed: 32, // ms per character
  holdToFill: 1600, // ms of holding needed to fill the gauge
  afterFill: 550, // ms pause on the "filled" colours before advancing
}
