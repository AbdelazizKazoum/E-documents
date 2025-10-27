/* eslint-disable lines-around-comment */
import { create } from 'zustand'

// Define the shape of our form data
// We export this so the Page component can use it for props
export interface FormData {
  // Section 1
  centreData: string
  reportData: string
  officerData: string

  // Section 2
  preamble: string

  // Section 3
  personInfo: string
  statement: string
}

// Define the Zustand store
interface FormStore {
  formData: FormData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const useFormStore = create<FormStore>(set => ({
  formData: {
    centreData: '',
    reportData: '',
    officerData: '',
    preamble: '',
    personInfo: '',
    statement: ''
  },
  handleInputChange: e => {
    const { name, value } = e.target

    set(state => ({
      formData: {
        ...state.formData,
        [name as keyof FormData]: value // Update the specific field
      }
    }))
  }
}))
