import { create } from 'zustand'

// --- Interfaces ---

export interface Officer {
  name: string
  rank: string
  judicialRole: string
}

export interface Section {
  type: 'header' | 'introduction' | 'persons'
  title: string
  formSchema: any // Placeholder for react-jsonschema, can be defined later
  formData: any // Changed to any to support string or Officer[]
  outputTemplate: string // Placeholder for output template
}

export interface PvData {
  id: string
  title: string
  sections: Section[]
  output: string
}

interface FormStore {
  pvData: PvData
  currentStep: number
  handleInputChange: (sectionType: string, fieldName: string, value: any) => void
  submitSection: (sectionType: string, data: any) => void
  setCurrentStep: (step: number) => void
}

export const useFormStore = create<FormStore>(set => ({
  pvData: {
    id: 'pv-1', // Example ID, can be dynamic
    title: 'محضر', // Example title in Arabic
    sections: [
      {
        type: 'header',
        title: 'رأس المحضـــــــــــــــر',
        formSchema: {}, // Placeholder
        formData: { officers: [] as Officer[], centreData: '', reportData: '', officerData: '' },
        outputTemplate: '' // Placeholder
      },
      {
        type: 'introduction',
        title: 'التمهيـــــــــــــــد',
        formSchema: {}, // Placeholder
        formData: { preamble: '' },
        outputTemplate: '' // Placeholder
      },
      {
        type: 'persons',
        title: 'الاشخـــــــــــــــاص',
        formSchema: {}, // Placeholder
        formData: { personInfo: '', statement: '' },
        outputTemplate: '' // Placeholder
      }
    ],
    output: ''
  },
  currentStep: 1,
  handleInputChange: (sectionType, fieldName, value) => {
    set(state => ({
      pvData: {
        ...state.pvData,
        sections: state.pvData.sections.map(section =>
          section.type === sectionType ? { ...section, formData: { ...section.formData, [fieldName]: value } } : section
        )
      }
    }))
  },
  submitSection: (sectionType, data) => {
    set(state => ({
      pvData: {
        ...state.pvData,
        sections: state.pvData.sections.map(section =>
          section.type === sectionType ? { ...section, formData: data } : section
        )
      }
    }))
  },
  setCurrentStep: step => set({ currentStep: step })
}))
