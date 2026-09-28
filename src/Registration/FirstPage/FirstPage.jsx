import { SelectField, TextField } from '../fields'

const GENDERS = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
]

const FirstPage = () => (
  <>
    <TextField
      name="fullName"
      label="What do we call the apprentice?"
      placeholder="Michelangelo Buonarroti"
      mobilePlaceholder="Enter your name"
      rules={{ required: 'Full Name is required' }}
    />
    <TextField
      name="number"
      type="tel"
      label="How do we reach the apprentice?"
      hint="(Phone Number)"
      hintBreak
      placeholder="Your golden ratio..."
      rules={{ required: 'Phone Number is required' }}
    />
    <SelectField name="gender" label="What is your gender?" placeholder="Select one" options={GENDERS} rules={{ required: 'Gender selection is required' }} />
    <TextField
      name="email"
      type="email"
      label="Where should we send the apprentice's correspondence?"
      hint="(Email Address)"
      placeholder="Your workshop's digital address..."
      rules={{ required: 'Email is required' }}
    />
  </>
)

export default FirstPage
