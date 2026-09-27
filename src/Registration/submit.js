import axios from 'axios'

// Teammate's submit logic (moved out of FourthPage.jsx unchanged): map the form to the API payload and post it.
export async function submitRegistration(allFormData) {
  const payload = {
    // Core Profile Information
    name: allFormData.fullName,
    phone: allFormData.number,
    gender: allFormData.gender,
    email: allFormData.email,
    date_of_birth: allFormData.d_o_b,

    lc: allFormData.lc,
    role: allFormData.role,
    allergies: allFormData.allergies,
    allergy_treatment: allFormData.remedy,

    first_conference: allFormData.first_conf === 'true' || allFormData.first_conf === true,
    can_stay_with_opposite_sex: allFormData.roomSituation === 'true' || allFormData.roomSituation === true,

    emergency_contact: allFormData.nextOfKin,
    emergency_contact_relationship: allFormData.relationship,
    expectations: allFormData.expectations,
    additional_information: allFormData.additionalInfo,
  }

  console.log('MAPPED PAYLOAD READY FOR PYDANTIC:', payload)

  const response = await axios.post('https://ain-backend.fly.dev/api/nexts-ilorin/register', payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  console.log('Registration successful!', response.data)
  return response.data
}
