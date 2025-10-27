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

interface FooterFormProps {
  setActiveStep: (value: SetStateAction<number>) => void
}

const FooterForm: FC<FooterFormProps> = props => {
  const { setActiveStep } = props

  const data = useFormStore(state => state.data)
  const setData = useFormStore(state => state.setData)

  const [formData, setFormData] = useState<any>(data)
  const [formErrors, setFormErrors] = useState([])
  const [validationMode, setValidationMode] = useState<ValidationMode>('ValidateAndHide')

  const handleSubmit = async () => {
    setValidationMode('ValidateAndShow')
    if (formErrors.length) return

    setData(formData)

    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <Fragment>
      <Grid item xs={12} dir='rtl'>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={formData}
          renderers={renderers}
          cells={materialCells}
          validationMode={validationMode}
          onChange={({ data, errors }: any) => {
            setFormData(data)
            setFormErrors(errors)
          }}
        />
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

export default FooterForm

const schema: JsonSchema = {
  type: 'object',
  properties: {
    signaux: {},
    contrepartie_premier: {},
    contrepartie_deuxieme: {},
    date_modifier_sceller: {}
  },
  required: ['signaux', 'contrepartie_premier', 'contrepartie_deuxieme', 'date_modifier_sceller']
}

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'TextFieldArea',
          scope: '#/properties/signaux',
          label: 'الإشارات',
          minRows: 5
        }
      ]
    },
    {
      type: 'HorizontalLayout',
      elements: [
        { type: 'TextField', scope: '#/properties/contrepartie_premier', label: 'النظيرة الأولــــى (مع نسختها)' },
        { type: 'TextField', scope: '#/properties/contrepartie_deuxieme', label: 'النظيرة الـثــانـيـة' }
      ]
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'TextField',
          scope: '#/properties/date_modifier_sceller',
          label: 'حـرر و ختم في',
          minRows: 5
        }
      ]
    }
  ]
}
