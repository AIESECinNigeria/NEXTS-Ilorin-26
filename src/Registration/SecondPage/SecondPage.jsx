import { DateField, SelectField } from '../fields'
import { MIN_AGE, ageOn } from '../steps'

const ROLES = ['tm', 'tl', 'lcvp', 'lcp', 'alumni'].map((value) => ({ value, label: value.toUpperCase() }))

const LCS = [
  { value: 'the_cooks_est', label: 'The Cooks (EST)' },
  { value: 'abeokuta', label: 'Abeokuta' },
  { value: 'abuja', label: 'Abuja' },
  { value: 'akure', label: 'Akure' },
  { value: 'benin', label: 'Benin' },
  { value: 'benue', label: 'Benue' },
  { value: 'calabar', label: 'Calabar' },
  { value: 'ekiti', label: 'Ekiti' },
  { value: 'enugu', label: 'Enugu' },
  { value: 'ibadan', label: 'Ibadan' },
  { value: 'ife', label: 'Ife' },
  { value: 'illorin', label: 'Ilorin' },
  { value: 'jos', label: 'Jos' },
  { value: 'kano', label: 'Kano' },
  { value: 'lagos', label: 'Lagos' },
  { value: 'port_harcourt', label: 'Port Harcourt' },
  { value: 'zaria', label: 'Zaria' },
  { value: 'international', label: 'International Delegates' },
]

const YES_NO = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
]

const SecondPage = () => (
  <>
    <SelectField
      name="role"
      label="What role do you play in the making of the masterpiece?"
      placeholder="Choose your role"
      options={ROLES}
      rules={{ required: 'role selection is required' }}
    />
    <DateField
      name="d_o_b"
      label="When did the sculptor take first form?"
      placeholder="DD/MM/YYYY"
      rules={{
        required: 'Date of Birth is required',
        validate: (value) => {
          // A complete, real date is stored as YYYY-MM-DD; anything else is still being typed or impossible
          if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Enter a valid date as DD/MM/YYYY'
          const age = ageOn(value)
          if (age < 0 || age > 120) return 'Enter a valid date as DD/MM/YYYY' // future date or a typo like 1022
          return age >= MIN_AGE || `You must be at least ${MIN_AGE} years old to register`
        },
      }}
    />
    <SelectField name="lc" label="Which workshop do you call your home?" placeholder="Choose your LC" options={LCS} rules={{ required: 'LC selection is required' }} />
    <SelectField
      name="first_conf"
      label="Is this your first time entering the forge?"
      placeholder="Is this your first conference"
      options={YES_NO}
      rules={{ required: 'First Conference selection is required' }}
    />
  </>
)

export default SecondPage