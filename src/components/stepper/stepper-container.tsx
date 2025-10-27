'use client'

// React Imports
import type { FC } from 'react'
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Component Imports
import Grid from '@mui/material/Grid'

import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import HeaderForm from '@components/forms/header-form'
import IntroductionForm from '@components/forms/introduction-form'
import PersonsForm from '@components/forms/persons-form'
import FooterForm from '@components/forms/footer-form'
import SubmitForm from '@components/forms/submit-form'

const steps = [
  {
    title: 'رأس المحضـــــــــــــــر'
  },
  {
    title: 'التمهيـــــــــــــــد'
  },
  {
    title: 'الاشخـــــــــــــــاص'
  },
  {
    title: 'الإشارات و النظائر الموجهة'
  }
]

interface Props {
  pvType: string
}

const StepperContainer: FC<Props> = props => {
  const {} = props

  const [activeStep, setActiveStep] = useState(0)

  const renderStepContent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return <HeaderForm setActiveStep={setActiveStep} />
      case 1:
        return <IntroductionForm setActiveStep={setActiveStep} />
      case 2:
        return <PersonsForm setActiveStep={setActiveStep} />
      case 3:
        return <FooterForm setActiveStep={setActiveStep} />
      default:
        return <Typography>Unknown Form</Typography>
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => {
              return (
                <Step key={label.title}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-title'>{label.title}</Typography>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <Divider />
      <CardContent className='text-area-arabic'>
        {activeStep === steps.length ? (
          <SubmitForm setActiveStep={setActiveStep} />
        ) : (
          <form>
            <Grid container spacing={6}>
              <Grid item xs={12} dir='rtl'>
                <Typography variant='h4' className='mb-6 font-medium text-center underline'>
                  {steps[activeStep].title}
                </Typography>
              </Grid>
              {renderStepContent(activeStep)}
            </Grid>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

export default StepperContainer
