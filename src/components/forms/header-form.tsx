'use client'

import type { FC, SetStateAction } from 'react'
import { Fragment, useState } from 'react'

import type { JsonSchema, ValidationMode } from '@jsonforms/core'

import { JsonForms } from '@jsonforms/react'
import { materialCells } from '@jsonforms/material-renderers'
import { Button } from '@mui/material'

import Grid from '@mui/material/Grid'

import renderers from '@/utils/json-forms/renderers'

import { useFormStore } from '@/stores/form.store'

const gradesOfficerOptions = ['رقيب', 'رقيب أول', 'مساعد', 'مساعد أول']

const statusOfficerOptions = ['(ض.ش.ق)', '(ع.ش.ق)']

interface HeaderFormProps {
  setActiveStep: (value: SetStateAction<number>) => void
}

const HeaderForm: FC<HeaderFormProps> = props => {
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
        <div />
        <Button variant='contained' onClick={handleSubmit} endIcon={<i className='tabler-arrow-right' />}>
          التالي
        </Button>
      </Grid>
    </Fragment>
  )
}

export default HeaderForm

const schema: JsonSchema = {
  type: 'object',
  properties: {
    region: {},
    compagnie: {},
    centre: {},
    numero_pv: {},
    date_pv: {},
    nom_personne_impliquee: {},
    nom_officier_premier: {},
    grade_officier_premier: {
      enum: gradesOfficerOptions
    },
    statut_officier_premier: {
      enum: statusOfficerOptions
    },
    nom_officier_deuxieme: {},
    grade_officier_deuxieme: {
      enum: gradesOfficerOptions
    },
    statut_officier_deuxieme: {
      enum: statusOfficerOptions
    },
    accusation_date: {},
    accusation: {},
    article_code: {},
    article_loi: {}
  },
  required: [
    'region',
    'compagnie',
    'centre',
    'numero_pv',
    'date_pv',
    'nom_officier_premier',
    'grade_officier_premier',
    'statut_officier_premier',
    'nom_officier_deuxieme',
    'grade_officier_deuxieme',
    'statut_officier_deuxieme',
    'accusation_date',
    'accusation',
    'article_code',
    'article_loi'
  ]
}

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Group',
      label: 'معطيات المركز',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            { type: 'TextField', scope: '#/properties/region', label: 'القيادة الجهوية' },
            { type: 'TextField', scope: '#/properties/compagnie', label: 'سرية' },
            { type: 'TextField', scope: '#/properties/centre', label: 'المركز' }
          ]
        }
      ]
    },
    {
      type: 'Group',
      label: 'معطيات المحضر',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            { type: 'TextFieldNumber', scope: '#/properties/numero_pv', label: 'محضر عدد' },
            { type: 'DateTime', scope: '#/properties/date_pv', label: 'بتاريخ *' }
          ]
        }
      ]
    },
    {
      type: 'Group',
      label: 'معطيات الضباط وأعوان الشرطة القضائية',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            { type: 'TextField', scope: '#/properties/nom_officier_premier', label: 'اسم الضابط الأول' },
            { type: 'Select', scope: '#/properties/grade_officier_premier', label: 'رتبة' },
            { type: 'Select', scope: '#/properties/statut_officier_premier', label: 'الصفة الضبطية' }
          ]
        },
        {
          type: 'HorizontalLayout',
          elements: [
            { type: 'TextField', scope: '#/properties/nom_officier_deuxieme', label: 'اسم الضابط الثاني' },
            { type: 'Select', scope: '#/properties/grade_officier_deuxieme', label: 'رتبة' },
            { type: 'Select', scope: '#/properties/statut_officier_deuxieme', label: 'الصفة الضبطية' }
          ]
        }
      ]
    },
    {
      type: 'Group',
      label: 'معطيات الجنائية',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            { type: 'TextField', scope: '#/properties/accusation_date', label: 'في هذا اليوم' },
            { type: 'TextField', scope: '#/properties/accusation', label: 'التهمة' }
          ]
        },
        {
          type: 'HorizontalLayout',
          elements: [
            { type: 'TextField', scope: '#/properties/article_loi', label: 'من قانون' },
            { type: 'TextField', scope: '#/properties/article_code', label: 'بناء على المواد' }
          ]
        }
      ]
    }
  ]
}
