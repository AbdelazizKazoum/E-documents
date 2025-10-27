/* eslint-disable lines-around-comment */
'use client'

import React, { useState } from 'react'

import { ChevronDown, BookMarked, FileText, Users } from 'lucide-react'

import PreviewDocument from '../../../components/PreviewDocument' // Import the separated component
import { useFormStore } from '@/store/formStore'
import HeaderForm from '@/components/forms/HeaderForm'
import IntroductionForm from '@/components/forms/IntroductionForm'
import PersonsForm from '@/components/forms/PersonsForm'

export default function Page() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const { pvData } = useFormStore()

  console.log('🚀 ~ Page ~ pvData:', pvData)

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
              <HeaderForm handleNextStep={handleNextStep} />
            </AccordionItem>
            <AccordionItem
              title='التمهيـــــــــــــــد'
              icon={<FileText className='w-5 h-5' />}
              sectionId={2}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            >
              <IntroductionForm handleNextStep={handleNextStep} />
            </AccordionItem>
            <AccordionItem
              title='الاشخـــــــــــــــاص'
              icon={<Users className='w-5 h-5' />}
              sectionId={3}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            >
              <PersonsForm handleNextStep={handleNextStep} />
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* Right Side: Live Preview */}
      <div className='w-full lg:w-1/2 h-screen overflow-y-auto'>
        <div className='p-4 sm:p-6 lg:p-10' dir='rtl'>
          <PreviewDocument data={pvData} />
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
