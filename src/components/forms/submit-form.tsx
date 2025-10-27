'use client'

import type { FC, SetStateAction } from 'react'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useFormStore } from '@/stores/form.store'

interface SubmitFormProps {
  setActiveStep: (value: SetStateAction<number>) => void
}

const SubmitForm: FC<SubmitFormProps> = props => {
  const { setActiveStep } = props

  const generateDocument = useFormStore(state => state.generateDocument)

  const handleSubmit = async () => {
    await generateDocument()
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1)
  }

  return (
    <div className='text-center'>
      <Typography variant='h4' className='my-20'>
        Toutes les étapes sont terminées !
      </Typography>
      <div className='flex justify-between mt-4'>
        <Button variant='tonal' onClick={handleBack} color='secondary' startIcon={<i className='tabler-arrow-left' />}>
          الرجوع
        </Button>
        <Button variant='contained' onClick={handleSubmit}>
          Générer le Document
        </Button>
      </div>
    </div>
  )
}

export default SubmitForm
