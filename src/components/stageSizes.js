// Size of the fixed layout canvas each screen is designed on (see Stage.jsx). Positions inside a
// screen are written for these sizes, and Stage scales the whole canvas to fit the real screen.
export const DESKTOP = { width: 1440, height: 1024 }
export const MOBILE = { width: 390, height: 770 }

// Mobile canvas for the third and fourth intro screens: narrower, and each is a different height
export const mobileWorkshop = (height) => ({ width: 375, height })
