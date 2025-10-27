import React from 'react'

import { useFormStore } from '@/store/formStore'

const IntroductionForm = ({ handleNextStep }: { handleNextStep: (step: number) => void }) => {
  const { pvData, handleInputChange } = useFormStore()

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          const section = pvData.sections.find(s => s.type === 'introduction')

          console.log('Section 2 values:', section?.formData)
          handleNextStep(2)
        }}
        className='space-y-4'
      >
        <div>
          <label
            htmlFor='preamble'
            className='block text-sm font-medium mb-1.5 text-[var(--mui-palette-text-secondary)]'
          >
            نص التمهيد
          </label>
          <textarea
            name='preamble'
            id='preamble'
            value={pvData.sections.find(s => s.type === 'introduction')?.formData.preamble || ''}
            onChange={e => handleInputChange('introduction', e.target.name, e.target.value)}
            rows={8}
            className='block w-full p-2.5 rounded-[var(--border-radius)] border border-[var(--border-color)] bg-[var(--mui-palette-background-paper)] text-[var(--mui-palette-text-primary)] focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] shadow-sm'
          />
        </div>
        <div className='flex justify-end pt-2'>
          <button
            type='submit'
            className='inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-[var(--border-radius)] shadow-sm text-white bg-[var(--primary-color)] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)]'
          >
            التالي
          </button>
        </div>
      </form>
    </div>
  )
}

export default IntroductionForm
