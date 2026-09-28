import { TextField } from '../fields'

const FourthPage = () => (
  <>
    <TextField
      name="nextOfKin"
      label="Who do we call when the artisan needs an extra pair of hands?"
      placeholder="Name and number of your next of kin"
      rules={{ required: 'Next of Kin is required' }}
    />
    <TextField
      name="relationship"
      label="What is their place in your circle of trust?"
      placeholder="Parent, sibling, guardian....."
      rules={{ required: 'relationship selection is required' }}
    />
    <TextField
      name="expectations"
      label="What masterpiece do you hope to unveil after your time in the forge?"
      placeholder="Expectations?"
      rules={{ required: 'expectations is required' }}
    />
    <TextField
      name="additionalInfo"
      label="Is there anything the forge should know before the heat rises?"
      placeholder="Any additional information?"
      rules={{ required: 'Additional Info is required' }}
    />
  </>
)

export default FourthPage
