'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Grid from '@mui/material/Grid'
import { Card, CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'

import StepperContainer from '@components/stepper/stepper-container'
import { pvs } from '@/data/pvs.data'

interface Props {
  searchParams: { pv_type?: string }
}

export default function Page(props: Props) {
  const { searchParams } = props

  const router = useRouter()

  const [pvType, setPvType] = useState<string>('')
  const [loadingPvContent, setLoadingPvContent] = useState(true)

  useEffect(() => {
    const validPvTypes = pvs.map(pv => pv.type)
    const pvType = searchParams.pv_type

    if (!pvType || !validPvTypes.includes(pvType)) {
      router.push('/404')
    }

    setPvType(pvType as string)
    setLoadingPvContent(false)
  }, [router, searchParams.pv_type])

  if (loadingPvContent) {
    return (
      <div className='min-h-full flex justify-center items-center'>
        <CircularProgress color='secondary' />
      </div>
    )
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Card dir='rtl' className='mb-4 p-3 overflow-visible flex justify-between'>
          <Typography variant='h5' className='font-bold'>
            مـحــضـــر بحث تمهيدي
          </Typography>
          <Typography variant='h5'>{dayjs().format('DD/MM/YYYY')}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <StepperContainer pvType={pvType} />
      </Grid>
    </Grid>
  )
}
