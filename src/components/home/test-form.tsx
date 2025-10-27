'use client'

import { useState } from 'react'

import axios from 'axios'
import { JsonForms } from '@jsonforms/react'
import { materialCells } from '@jsonforms/material-renderers'
import { Button, Card } from '@mui/material'
import type { JsonSchema, ValidationMode } from '@jsonforms/core'

import renderers from '@/utils/json-forms/renderers'

const initialData = {
  date: new Date(),
  officer: 'عبدالعزيز كزوم',
  affair: 'قضية سرقة',
  victim: 'احمد سلطان',
  witness: 'محمد علي',
  observation:
    'هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص. إن كنت تريد أن تستخدم نص لوريم إيبسوم ما، عليك أن تتحقق أولاً أن ليس هناك أي كلمات أو عبارات محرجة أو غير لائقة مخبأة في هذا النص. بينما تعمل جميع مولّدات نصوص لوريم إيبسوم على الإنترنت على إعادة تكرار مقاطع من نص لوريم إيبسوم نفسه عدة مرات بما تتطلبه الحاجة، يقوم مولّدنا هذا باستخدام كلمات من قاموس يحوي على أكثر من 200 كلمة لا تينية، مضاف إليها مجموعة من الجمل النموذجية، لتكوين نص لوريم إيبسوم ذو شكل منطقي قريب إلى النص الحقيقي. وبالتالي يكون النص الناتح خالي من التكرار، أو أي كلمات أو عبارات غير لائقة أو ما شابه. وهذا ما يجعله أول مولّد نص لوريم إيبسوم حقيقي على الإنترنت',
  observationDate: new Date()
}

const TestForm = () => {
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState([])
  const [validationMode, setValidationMode] = useState<ValidationMode>('ValidateAndHide')

  const handleSubmit = async () => {
    setValidationMode('ValidateAndShow')
    if (errors.length) return

    const res = await axios.post(
      '/api/generate-pdf',
      {
        ...data,
        date: data.date.toLocaleDateString(),
        observationDate: data.observationDate.toLocaleDateString()
      },
      { responseType: 'blob' }
    )

    const url = window.URL.createObjectURL(res.data)
    const link = document.createElement('a')

    link.href = url
    link.download = 'generated-file.docx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <Card className='p-6 overflow-visible'>
      <form dir='rtl'>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={renderers}
          cells={materialCells}
          validationMode={validationMode}
          onChange={({ data, errors }: any) => {
            setErrors(errors)
            setData(data)
          }}
        />
        <div className='mt-6 flex justify-end'>
          <Button className='px-10' variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default TestForm

const schema: JsonSchema = {
  type: 'object',
  properties: {
    date: {},
    officer: {},
    affair: {},
    victim: {},
    witness: {},
    observation: {},
    observationDate: {}
  },
  required: ['date', 'officer', 'affair', 'victim', 'witness', 'observation', 'observationDate']
}

const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'HorizontalLayout',
      elements: [
        { type: 'DateTime', scope: '#/properties/date', label: 'التاريخ' },
        { type: 'TextField', scope: '#/properties/officer', label: 'الضابط' }
      ]
    },
    {
      type: 'HorizontalLayout',
      elements: [
        { type: 'TextField', scope: '#/properties/affair', label: 'القضية' },
        { type: 'TextField', scope: '#/properties/victim', label: 'الضحية' }
      ]
    },
    {
      type: 'HorizontalLayout',
      elements: [
        { type: 'TextField', scope: '#/properties/witness', label: 'الشاهد' },
        { type: 'DateTime', scope: '#/properties/observationDate', label: 'تاريخ الشهادة' }
      ]
    },
    {
      type: 'HorizontalLayout',
      elements: [{ type: 'TextFieldArea', scope: '#/properties/observation', label: 'الشهادة', rows: '6' }]
    }
  ]
}
