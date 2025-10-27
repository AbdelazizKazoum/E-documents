/* eslint-disable lines-around-comment */
'use client'

import React, { useState } from 'react'

import { ChevronDown, BookMarked, FileText, Users } from 'lucide-react'
import { create } from 'zustand'

import PreviewDocument from '../../../components/PreviewDocument' // Import the separated component

// --- Zustand Store Setup ---

export interface FormData {
  centreData: string
  reportData: string
  officerData: string
  preamble: string
  personInfo: string
  statement: string
}

interface FormStore {
  formData: FormData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const useFormStore = create<FormStore>(set => ({
  formData: {
    centreData: '',
    reportData: '',
    officerData: '',
    preamble: '',
    personInfo: '',
    statement: ''
  },
  handleInputChange: e => {
    const { name, value } = e.target

    set(state => ({
      formData: {
        ...state.formData,
        [name as keyof FormData]: value
      }
    }))
  }
}))
// --- End Zustand Store Setup ---

export default function Page() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const { formData, handleInputChange } = useFormStore()

  const handleNextStep = (step: number) => {
    if (step < 3) {
      setCurrentStep(step + 1)
    }
  }

  return (
    <div className='flex flex-col lg:flex-row min-h-screen w-full bg-[var(--background-color)] text-[var(--mui-palette-text-primary)]'>
      {/* Left Side: Accordion Forms */}
      <div className='w-full lg:w-1/2 h-screen overflow-y-auto border-e border-[var(--border-color)]'>
        <div className='p-4 sm:p-6' dir='rtl'>
          <h1 className='text-2xl font-bold mb-6 text-[var(--mui-palette-text-primary)]'>إدارة المحاضر</h1>
          <div className='space-y-3'>
            <AccordionItem
              title='رأس المحضـــــــــــــــر'
              icon={<BookMarked className='w-5 h-5' />}
              sectionId={1}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            >
              <FormSection onSubmit={() => handleNextStep(1)} submitText='التالي'>
                <FormInput
                  label='معطيات المركز'
                  name='centreData'
                  value={formData.centreData}
                  onChange={handleInputChange}
                />
                <FormInput
                  label='معطيات المحضر'
                  name='reportData'
                  value={formData.reportData}
                  onChange={handleInputChange}
                />
                <FormInput
                  label='معطيات الضباط وأعوان الشرطة القضائية'
                  name='officerData'
                  value={formData.officerData}
                  onChange={handleInputChange}
                  isTextArea
                />
              </FormSection>
            </AccordionItem>
            <AccordionItem
              title='التمهيـــــــــــــــد'
              icon={<FileText className='w-5 h-5' />}
              sectionId={2}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            >
              <FormSection onSubmit={() => handleNextStep(2)} submitText='التالي'>
                <FormInput
                  label='نص التمهيد'
                  name='preamble'
                  value={formData.preamble}
                  onChange={handleInputChange}
                  isTextArea
                  rows={8}
                />
              </FormSection>
            </AccordionItem>
            <AccordionItem
              title='الاشخـــــــــــــــاص'
              icon={<Users className='w-5 h-5' />}
              sectionId={3}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            >
              <FormSection onSubmit={() => handleNextStep(3)} submitText='حفظ وإنهاء'>
                <FormInput
                  label='المعلومات الشخصية'
                  name='personInfo'
                  value={formData.personInfo}
                  onChange={handleInputChange}
                  isTextArea
                  rows={4}
                />
                <FormInput
                  label='التصريح'
                  name='statement'
                  value={formData.statement}
                  onChange={handleInputChange}
                  isTextArea
                  rows={6}
                />
              </FormSection>
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* Right Side: Live Preview */}
      <div className='w-full lg:w-1/2 h-screen overflow-y-auto'>
        <div className='p-4 sm:p-6 lg:p-10' dir='rtl'>
          <PreviewDocument data={formData} />
        </div>
      </div>
    </div>
  )
}

interface AccordionItemProps {
  title: string
  icon: React.ReactNode
  sectionId: number
  currentStep: number
  setCurrentStep: (id: number) => void
  children: React.ReactNode
}

function AccordionItem({ title, icon, sectionId, currentStep, setCurrentStep, children }: AccordionItemProps) {
  const isOpen = sectionId === currentStep

  return (
    <div className='rounded-[var(--border-radius)] border border-[var(--border-color)] bg-[var(--mui-palette-background-paper)] shadow-sm overflow-hidden'>
      <button
        type='button'
        className='flex items-center justify-between w-full p-4 text-start'
        onClick={() => setCurrentStep(isOpen ? 0 : sectionId)}
      >
        <div className='flex items-center gap-3'>
          <span className='text-[var(--primary-color)]'>{icon}</span>
          <span className='font-semibold text-lg text-[var(--mui-palette-text-primary)]'>{title}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[var(--mui-palette-text-secondary)] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='p-4 border-t border-[var(--border-color)]'>{children}</div>
      </div>
    </div>
  )
}

interface FormSectionProps {
  children: React.ReactNode
  onSubmit: () => void
  submitText: string
}

function FormSection({ children, onSubmit, submitText }: FormSectionProps) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onSubmit()
      }}
      className='space-y-4'
    >
      {children}
      <div className='flex justify-end pt-2'>
        <button
          type='submit'
          className='inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-[var(--border-radius)] shadow-sm text-white bg-[var(--primary-color)] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)]'
        >
          {submitText}
        </button>
      </div>
    </form>
  )
}

interface FormInputProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isTextArea?: boolean
  rows?: number
}

function FormInput({ label, name, value, onChange, isTextArea = false, rows = 3 }: FormInputProps) {
  const commonProps = {
    name: name,
    id: name,
    value: value,
    onChange: onChange,
    className:
      'block w-full p-2.5 rounded-[var(--border-radius)] border border-[var(--border-color)] bg-[var(--mui-palette-background-paper)] text-[var(--mui-palette-text-primary)] focus:ring-1 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] shadow-sm'
  }

  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium mb-1.5 text-[var(--mui-palette-text-secondary)]'>
        {label}
      </label>
      {isTextArea ? <textarea {...commonProps} rows={rows} /> : <input {...commonProps} type='text' />}
    </div>
  )
}
