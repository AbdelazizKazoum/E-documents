import React from 'react'

import { useFormStore } from '@/store/formStore'

const HeaderForm = ({ handleNextStep }: { handleNextStep: (step: number) => void }) => {
  const { pvData, handleInputChange } = useFormStore()

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          const section = pvData.sections.find(s => s.type === 'header')

          console.log('Section 1 values:', section?.formData)
          handleNextStep(1)
        }}
        className='space-y-4'
      >
        <div>
          <label
            htmlFor='centreData'
            className='block text-sm font-medium mb-1.5 text-[var(--mui-palette-text-secondary)]'
          >
            معطيات المركز
          </label>
          <input
            type='text'
            name='centreData'
            id='centreData'
            value={pvData.sections.find(s => s.type === 'header')?.formData.centreData || ''}
            onChange={e => handleInputChange('header', e.target.name, e.target.value)}
            className='block w-full p-2.5 rounded-[var(--border-radius)] border border-[var(--border-color)] bg-[var(--mui-palette-background-paper)] text-[var(--mui-palette-text-primary)] focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] shadow-sm'
          />
        </div>
        <div>
          <label
            htmlFor='reportData'
            className='block text-sm font-medium mb-1.5 text-[var(--mui-palette-text-secondary)]'
          >
            معطيات المحضر
          </label>
          <input
            type='text'
            name='reportData'
            id='reportData'
            value={pvData.sections.find(s => s.type === 'header')?.formData.reportData || ''}
            onChange={e => handleInputChange('header', e.target.name, e.target.value)}
            className='block w-full p-2.5 rounded-[var(--border-radius)] border border-[var(--border-color)] bg-[var(--mui-palette-background-paper)] text-[var(--mui-palette-text-primary)] focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] shadow-sm'
          />
        </div>
        <div>
          <label
            htmlFor='officerData'
            className='block text-sm font-medium mb-1.5 text-[var(--mui-palette-text-secondary)]'
          >
            معطيات الضباط وأعوان الشرطة القضائية
          </label>
          <textarea
            name='officerData'
            id='officerData'
            value={pvData.sections.find(s => s.type === 'header')?.formData.officerData || ''}
            onChange={e => handleInputChange('header', e.target.name, e.target.value)}
            rows={3}
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

export default HeaderForm
