import React from 'react'

import { useFormStore } from '@/store/formStore'

const PersonsForm = ({ handleNextStep }: { handleNextStep: (step: number) => void }) => {
  const { pvData, handleInputChange } = useFormStore()

  return (
    <div>
      {' '}
      <form
        onSubmit={e => {
          e.preventDefault()
          const section = pvData.sections.find(s => s.type === 'persons')

          console.log('Section 3 values:', section?.formData)
          handleNextStep(3)
        }}
        className='space-y-4'
      >
        <div>
          <label
            htmlFor='personInfo'
            className='block text-sm font-medium mb-1.5 text-[var(--mui-palette-text-secondary)]'
          >
            المعلومات الشخصية
          </label>
          <textarea
            name='personInfo'
            id='personInfo'
            value={pvData.sections.find(s => s.type === 'persons')?.formData.personInfo || ''}
            onChange={e => handleInputChange('persons', e.target.name, e.target.value)}
            rows={4}
            className='block w-full p-2.5 rounded-[var(--border-radius)] border border-[var(--border-color)] bg-[var(--mui-palette-background-paper)] text-[var(--mui-palette-text-primary)] focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] shadow-sm'
          />
        </div>
        <div>
          <label
            htmlFor='statement'
            className='block text-sm font-medium mb-1.5 text-[var(--mui-palette-text-secondary)]'
          >
            التصريح
          </label>
          <textarea
            name='statement'
            id='statement'
            value={pvData.sections.find(s => s.type === 'persons')?.formData.statement || ''}
            onChange={e => handleInputChange('persons', e.target.name, e.target.value)}
            rows={6}
            className='block w-full p-2.5 rounded-[var(--border-radius)] border border-[var(--border-color)] bg-[var(--mui-palette-background-paper)] text-[var(--mui-palette-text-primary)] focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] shadow-sm'
          />
        </div>
        <div className='flex justify-end pt-2'>
          <button
            type='submit'
            className='inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-[var(--border-radius)] shadow-sm text-white bg-[var(--primary-color)] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)]'
          >
            حفظ وإنهاء
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonsForm
