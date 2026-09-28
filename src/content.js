// Text, image paths, audio and timings used across the site, kept in one place so they're easy to change.
// All images live in public/images and the song in public/audio.

// The two small lines at the top of the orange intro screens
export const TOP_BAR = {
  from: 'from: CC ijoye',
  via: 'dispatched via: the batcave',
}

const img = (name) => `/images/${name}`

export const IMAGES = {
  // --- Intro screens (desktop) ---
  forgeTexture: img('forge-texture.png'), // brushed texture over the orange background
  workshopTexture: img('workshop-texture.png'), // texture behind the dark workshop screens
  logo: img('logo.svg'), // NEXTS Ilorin 2026 logo, white
  logoNexts: img('logo-nexts.svg'), // logo split in two parts, used on the dark screens
  logoIlorin: img('logo-ilorin.svg'),
  ruleTop: img('rule-top.svg'), // thin lines in the header and above the footer
  ruleHeader: img('rule-header.svg'),
  ruleBottom: img('rule-bottom.svg'),
  hero01Anvil: img('hero01-anvil.png'), // anvil on the first screen, plus a glow layer drawn over it
  hero01AnvilOverlay: img('hero01-anvil-overlay.png'),
  hero02Anvil: img('hero02-anvil.png'), // anvil on the second screen, plus its glow layer
  hero02AnvilOverlay: img('hero02-anvil-overlay.png'),
  forge4: img('forge4.jpg'), // pottery photos layered on the third screen
  forge13: img('forge13.jpg'),
  portrait: img('portrait.png'), // photo on the fourth screen
  arrowsOrange: img('arrows-orange.svg'), // arrow icons inside buttons
  arrowsDark: img('arrows-dark.svg'),

  // --- Intro screens (mobile versions) ---
  mForgeTexture: img('m-forge-texture.jpg'),
  mHeader01: img('m-header-01.svg'), // header lines + logo, first and second screens
  mHeader02: img('m-header-02.svg'),
  mArrowsOrange: img('m-arrows-orange.svg'),
  mTopbarIcon: img('m-topbar-icon.svg'), // small puzzle icon at the top left
  mHero03Photo: img('m-hero03-photo.png'), // photos on the third and fourth screens
  mHero04Photo: img('m-hero04-photo.png'),

  // --- Success page ---
  car: img('car.png'),

  // --- Registration form ---
  regNextsBig: img('nextsBg.png'), // faint "NE XTS" outline letters behind the desktop form
  regTexture: img('texture.png'), // dark background texture
  regNextsOutline: img('smnextsBg.png'), // faint "NEXTS" outline above the mobile buttons
  regMosque: img('firstReg.png'), // page 1 photo, desktop (already sized to the full 1440×1024 layout)
  regMosqueMobile: img('smbuilding.png'), // page 1 photo, mobile
  regHorse: img('horsey.png'), // page 2 photo
  regRider: img('guyonhorse.png'), // page 3 photo
  regPot: img('coolmetal.png'), // page 4 photo
  regPuzzle: img('puzzly.png'), // floating glass puzzle piece on page 1
  regLogo: img('nextsLogo.png'), // orange logo, bottom left on desktop
  arrowBack: img('left.png'), // arrows inside the Back / Next buttons
  arrowNext: img('right.png'),
  dropdown: img('dropdown.svg'), // arrow on the right of each dropdown
  decoComb: img('deco-comb.svg'), // floating decorations beside the desktop card
  decoScissors: img('deco-scissors.svg'),
  decoMask: img('deco-mask.svg'),
  mIconPuzzle: img('m-icon-puzzle.svg'), // small icon at the top left on mobile, one per page
  mIconMask: img('m-icon-mask.svg'),
  mIconScissors: img('m-icon-scissors.svg'),
}

export const AUDIO = {
  theme: '/audio/theme.mp3', // background song (Son Lux – Thunderbolts)
}

export const TIMING = {
  fade: 0.9, // seconds each intro screen takes to fade in or out
  workshopHold: 2200, // ms the third intro screen stays up after its text finishes typing
  typeSpeed: 32, // ms per character for the typing effect
  holdToFill: 1600, // ms a press-and-hold button must be held to fill up
  afterFill: 550, // ms a filled button stays in its "done" colours before moving on
}
