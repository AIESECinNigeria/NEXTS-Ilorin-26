// Order of the registration pages and the fields each one validates before moving on.
export const STEPS = [
  { path: 'step-one', fields: ['fullName', 'number', 'gender', 'email'] },
  { path: 'step-two', fields: ['role', 'd_o_b', 'lc', 'first_conf'] },
  { path: 'step-three', fields: ['allergies', 'remedy', 'roomSituation'] },
  { path: 'step-four', fields: ['nextOfKin', 'relationship', 'expectations', 'additionalInfo'] },
]

export const stepUrl = (i) => `/registration/${STEPS[i].path}`

export const MIN_AGE = 18

// Full years between a YYYY-MM-DD birth date and today
export function ageOn(birthDate, today = new Date()) {
  const [y, m, d] = birthDate.split('-').map(Number)
  if (!y || !m || !d) return NaN
  let age = today.getFullYear() - y
  const beforeBirthday = today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)
  if (beforeBirthday) age -= 1
  return age
}
