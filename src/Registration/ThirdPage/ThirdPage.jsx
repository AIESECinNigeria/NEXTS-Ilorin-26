import { SelectField, TextField } from '../fields'

const YES_NO = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
]

const ThirdPage = () => (
  <>
    <TextField
      name="allergies"
      label="What must we keep away from the apprentice?"
      placeholder="What is/are your allergy(ies)?"
      rules={{ required: 'Allergies is required' }}
    />
    <TextField
      name="remedy"
      label="When the workshop triggers your reaction, what restores your balance?"
      placeholder="What cures your allergy(ies)?"
      rules={{ required: 'Remedy is required' }}
    />
    <SelectField
      name="roomSituation"
      label="Will you share the workshop with fellow apprentices?"
      placeholder="Make your choice"
      options={YES_NO}
      rules={{ required: 'Room Situation selection is required' }}
    />
  </>
)

export default ThirdPage
