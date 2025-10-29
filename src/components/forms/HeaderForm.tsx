// components/HeaderForm.tsx
'use client'

import React, { useState } from 'react'

import { JsonForms } from '@jsonforms/react'

import { materialCells } from '@jsonforms/material-renderers'

import type { ValidationMode } from '@jsonforms/core'

import { Button, Grid } from '@mui/material'

import { useFormStore } from '@/store/formStore'
import { schema, uischema } from '@/schemas/headerFormSchema'
import renderers from '@/renderers/renderers'

const HeaderForm = ({ handleNextStep }: { handleNextStep: (step: number) => void }) => {
  const [validationMode, setValidationMode] = useState<ValidationMode>('ValidateAndHide')

  const { pvData, handleInputChange } = useFormStore()
  const [formData, setFormData] = useState(pvData.sections.find(s => s.type === 'header')?.formData || {})
  const [formErrors, setFormErrors] = useState([])

  const handleSubmit = (e: React.FormEvent) => {
    setValidationMode('ValidateAndShow')
    if (formErrors.length) return

    e.preventDefault()
    console.log('Form data:', formData)
    handleNextStep(1)
  }

  return (
    <div>
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

            // Update your store
            Object.keys(data).forEach(key => {
              handleInputChange('header', key, data[key])
            })
          }}
        />
      </Grid>

      <Grid item xs={12} className='flex justify-between'>
        <div />
        <Button dir='rtl' variant='contained' onClick={handleSubmit} endIcon={<i className='tabler-arrow-right' />}>
          التالي
        </Button>
      </Grid>
    </div>
  )
}

export default HeaderForm
