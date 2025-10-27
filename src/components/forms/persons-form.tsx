'use client'

import type { FC, SetStateAction } from 'react'
import { Fragment, useState } from 'react'

import { Button } from '@mui/material'

import Grid from '@mui/material/Grid'

import { materialCells } from '@jsonforms/material-renderers'
import { JsonForms } from '@jsonforms/react'
import type { JsonSchema, ValidationMode } from '@jsonforms/core'

import renderers from '@/utils/json-forms/renderers'
import { useFormStore } from '@/stores/form.store'

interface InvolveFormProps {
  setActiveStep: (value: SetStateAction<number>) => void
}

const PersonsForm: FC<InvolveFormProps> = props => {
  const { setActiveStep } = props

  const data = useFormStore(state => state.data)
  const setData = useFormStore(state => state.setData)

  const [formData, setFormData] = useState<any>(data.personnes || [])
  const [formErrors, setFormErrors] = useState<Record<number, any>>({})
  const [validationMode, setValidationMode] = useState<ValidationMode>('ValidateAndHide')

  const handleSubmit = async () => {
    setValidationMode('ValidateAndShow')
    if (Object.values(formErrors).some(errors => errors.length)) return

    setData({ personnes: formData })

    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleAddPerson = () => {
    setFormData([...formData, {}])
  }

  const handleRemovePerson = (index: number) => {
    setFormData(formData.filter((_: any, i: number) => i !== index))

    setFormErrors(prevErrors => {
      const updatedErrors = { ...prevErrors }

      delete updatedErrors[index]

      const newErrors: Record<number, any> = {}

      Object.keys(updatedErrors).forEach(key => {
        const newKey = parseInt(key, 10)

        if (newKey > index) {
          newErrors[newKey - 1] = updatedErrors[newKey]
        } else {
          newErrors[newKey] = updatedErrors[newKey]
        }
      })

      return newErrors
    })
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <Fragment>
      <Grid item xs={12} className='mb-2' dir='rtl'>
        {formData.map((person: any, index: number) => (
          <Grid key={index} item xs={12} className='mb-6'>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={person}
              renderers={renderers}
              cells={materialCells}
              validationMode={validationMode}
              onChange={({ data, errors }: any) => {
                setFormData((prevPersons: any) => {
                  const updatedPersons = [...prevPersons]

                  updatedPersons[index] = data

                  return updatedPersons
                })
                setFormErrors(prev => ({ ...prev, [index]: errors || [] }))
              }}
            />
            <div className='text-end'>
              <Button
                className='pl-6'
                variant='tonal'
                color='error'
                size='small'
                startIcon={<i className='tabler-trash' />}
                onClick={() => handleRemovePerson(index)}
              >
                إزالة
              </Button>
            </div>
          </Grid>
        ))}

        <Button
          className='pl-8'
          variant='contained'
          color='success'
          startIcon={<i className='tabler-plus mie-1' />}
          onClick={handleAddPerson}
        >
          إضافة شخص
        </Button>
      </Grid>

      <Grid item xs={12} className='flex justify-between'>
        <Button variant='tonal' onClick={handleBack} color='secondary' startIcon={<i className='tabler-arrow-left' />}>
          الرجوع
        </Button>
        <Button variant='contained' onClick={handleSubmit} endIcon={<i className='tabler-arrow-right' />}>
          التالي
        </Button>
      </Grid>
    </Fragment>
  )
}

export default PersonsForm

const sexeOptions = ['رجل', 'إمرأة']
const casierJudiciaireOptions = ['بدون سوابق عدلية', 'لديه سوابق عدلية']
const situationFamilialeOptions = ['عازب(ة)', 'متزوج(ة)', 'مطلق(ة)', 'أرمل(ة)']
const identitePersonneOptions = ['ضحية', 'متهم(ة)', 'مرشح(ة)']

const schema: JsonSchema = {
  type: 'object',
  properties: {
    identite: {
      enum: identitePersonneOptions
    },
    sexe: {
      enum: sexeOptions
    },
    nom: {},
    nom_pere: {},
    nationalite: {},
    date_naissance: {},
    ville_naissance: {},
    ville_actuelle: {},
    nom_mere: {},
    profession: {},
    situation_familiale: {
      enum: situationFamilialeOptions
    },
    enfants: {},
    carte_nationale: {},
    casier_judiciaire: {
      enum: casierJudiciaireOptions
    },
    declaration: {}
  },
  required: [
    'identite',
    'sexe',
    'nom',
    'nom_pere',
    'nationalite',
    'date_naissance',
    'ville_naissance',
    'ville_actuelle',
    'nom_mere',
    'profession',
    'situation_familiale',
    'carte_nationale',
    'casier_judiciaire',
    'declaration'
  ]
}

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Group',
      label: '',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            { type: 'Select', scope: '#/properties/identite', label: 'هوية الشخص' },
            { type: 'TextField', scope: '#/properties/nom', label: 'الاسم الكامل' },
            { type: 'Select', scope: '#/properties/sexe', label: 'الجنس' },
            {
              type: 'TextField',
              scope: '#/properties/carte_nationale',
              label: 'رقم البطاقة الوطنية'
            },
            { type: 'TextField', scope: '#/properties/nationalite', label: 'جنسية' }
          ]
        },
        {
          type: 'HorizontalLayout',
          elements: [
            { type: 'TextField', scope: '#/properties/ville_naissance', label: 'بمدينة' },
            { type: 'TextField', scope: '#/properties/ville_actuelle', label: 'و يسكن' },
            {
              type: 'DateTime',
              scope: '#/properties/date_naissance',
              label: 'مزداد بتاريخ *',
              showYearDropdown: true,
              showMonthDropdown: true
            },
            { type: 'TextField', scope: '#/properties/nom_pere', label: 'اسم الأب' },
            { type: 'TextField', scope: '#/properties/nom_mere', label: 'اسم الأم' }
          ]
        },
        {
          type: 'HorizontalLayout',
          elements: [
            { type: 'TextField', scope: '#/properties/profession', label: 'المهنة' },
            {
              type: 'Select',
              scope: '#/properties/situation_familiale',
              label: 'الحالة العائلية'
            },
            {
              type: 'TextField',
              scope: '#/properties/enfants',
              label: 'الأطفال'
            },
            {
              type: 'Select',
              scope: '#/properties/casier_judiciaire',
              label: 'السوابق العدلية'
            }
          ]
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'TextFieldArea',
              scope: '#/properties/declaration',
              label: 'التصريح',
              minRows: 5,
              maxRows: 15
            }
          ]
        }
      ]
    }
  ]
}
