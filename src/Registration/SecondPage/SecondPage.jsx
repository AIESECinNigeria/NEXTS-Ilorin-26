import { DateField, SelectField } from '../fields'
import { MIN_AGE, ageOn, latestAdultBirthday } from '../steps'

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
  { value: 'port_harcourt', label: 'Port Harcourt' },
  { value: 'zaria', label: 'Zaria' },
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
      placeholder="Select your date of birth"
      max={latestAdultBirthday()}
      rules={{
        required: 'Date of Birth is required',
        validate: (value) => ageOn(value) >= MIN_AGE || `You must be at least ${MIN_AGE} years old to register`,
      }}
    />
    <SelectField name="lc" label="Which workshop do you call your home?" placeholder="Choose your LC" options={LCS} rules={{ required: 'LC selection is required' }} />
    <SelectField
      name="first_conf"
      label="Is this your first time entering the forge?"
      placeholder="Select an option"
      options={YES_NO}
      rules={{ required: 'First Conference selection is required' }}
    />
  </>
)

export default SecondPage
