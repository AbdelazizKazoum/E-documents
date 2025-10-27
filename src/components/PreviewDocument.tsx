/* eslint-disable @typescript-eslint/consistent-type-imports */
import React, { useMemo } from 'react'

import Handlebars from 'handlebars'

import { Printer } from 'lucide-react'

import { FormData } from '../app/(dashboard)/about/page' // Adjust import if FormData is moved

const PRE_TAG_STYLING =
  'font-mono whitespace-pre-wrap p-2.5 bg-[rgba(var(--mui-mainColorChannels-shadow)/0.05)] rounded-[var(--border-radius)] border border-[var(--border-color)] text-[var(--mui-palette-text-primary)]'

Handlebars.registerHelper('shouldShowSection1', function (data: FormData) {
  return data.centreData || data.reportData || data.officerData
})

Handlebars.registerHelper('shouldShowSection2', function (data: FormData) {
  return !!data.preamble
})

Handlebars.registerHelper('shouldShowSection3', function (data: FormData) {
  return data.personInfo || data.statement
})

const templateString = `
<h1 class="text-3xl font-bold text-center mb-6 border-b pb-3 border-[var(--border-color)] border-color-print">
  محضــــر رسمي
</h1>
{{#if (shouldShowSection1 this)}}
  <div class="mb-6 pb-4 border-b border-dashed border-[var(--border-color)] border-color-print">
    <h2 class="text-xl font-semibold mb-3 text-[var(--primary-color)]">
      رأس المحضر
    </h2>
    <div class="space-y-2">
      <p>
        <strong>معطيات المركز:</strong> {{centreData}}
      </p>
      <p>
        <strong>معطيات المحضر:</strong> {{reportData}}
      </p>
      <p>
        <strong>الضباط والأعوان:</strong>
      </p>
      <pre class="${PRE_TAG_STYLING}">{{officerData}}</pre>
    </div>
  </div>
{{/if}}
{{#if (shouldShowSection2 this)}}
  <div class="mb-6 pb-4 border-b border-dashed border-[var(--border-color)] border-color-print">
    <h2 class="text-xl font-semibold mb-3 text-[var(--primary-color)]">
      التمهيد
    </h2>
    <pre class="${PRE_TAG_STYLING}">{{preamble}}</pre>
  </div>
{{/if}}
{{#if (shouldShowSection3 this)}}
  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-3 text-[var(--primary-color)]">
      الأشخاص والتصريحات
    </h2>
    <h3 class="text-lg font-medium mt-4 mb-2">المعلومات الشخصية</h3>
    <pre class="${PRE_TAG_STYLING}">{{personInfo}}</pre>
    <h3 class="text-lg font-medium mt-4 mb-2">التصريح</h3>
    <pre class="${PRE_TAG_STYLING}">{{statement}}</pre>
  </div>
{{/if}}
`

export default function PreviewDocument({ data }: { data: FormData }) {
  const template = useMemo(() => Handlebars.compile(templateString), [])
  const renderedHtml = template(data)

  const handlePrint = () => {
    const printContent = document.getElementById('preview-for-print')?.innerHTML

    if (!printContent) return
    const printWindow = window.open('', '', 'height=800,width=800')

    if (printWindow) {
      printWindow.document.write('<html><head><title>طباعة المحضر</title>')
      printWindow.document.write(`
        <style>
          body { font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; direction: rtl; padding: 2rem; line-height: 1.6; }
          h1, h2, h3 { margin-bottom: 0.5rem; }
          pre { font-family: inherit; white-space: pre-wrap; padding: 10px; background-color: #f4f4f5; border-radius: 8px; border: 1px solid #e4e4e7; }
          .print-hide { display: none; }
          .prose { max-width: none; text-align: right; }
          .prose-lg { font-size: 1.125rem; line-height: 1.7777778; }
          .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
          .font-bold { font-weight: 700; }
          .text-center { text-align: center; }
          .mb-6 { margin-bottom: 1.5rem; }
          .border-b { border-bottom-width: 1px; }
          .pb-3 { padding-bottom: 0.75rem; }
          .pb-4 { padding-bottom: 1rem; }
          .border-dashed { border-style: dashed; }
          .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
          .font-semibold { font-weight: 600; }
          .mb-3 { margin-bottom: 0.75rem; }
          .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.5rem; margin-bottom: 0; }
          .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
          .font-medium { font-weight: 500; }
          .mt-4 { margin-top: 1rem; }
          .mb-2 { margin-bottom: 0.5rem; }
          h1, h2, h3, p, div, strong { color: #111827; }
          h2 { color: #3730a3; }
          .border-color-print { border-color: #e5e7eb; }
          .${PRE_TAG_STYLING.split(' ').join('.')} { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; white-space: pre-wrap; padding: 0.625rem; background-color: #f9fafb; border-radius: var(--border-radius, 0.375rem); border: 1px solid #e5e7eb; color: #111827; }
        </style>
      `)
      printWindow.document.write('</head><body>')
      printWindow.document.write(printContent)
      printWindow.document.write('</body></html>')
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
    }
  }

  return (
    <div
      className='relative p-6 sm:p-8 lg:p-12 bg-[var(--mui-palette-background-paper)] rounded-[var(--border-radius)] shadow-lg'
      id='preview-document'
    >
      <button
        onClick={handlePrint}
        className='print-hide absolute top-4 start-4 flex items-center gap-2 px-3 py-1.5 border border-[var(--border-color)] text-xs font-medium rounded-[var(--border-radius)] text-[var(--mui-palette-text-secondary)] hover:bg-[var(--mui-palette-action-hover)]'
      >
        <Printer className='w-4 h-4' />
        طباعة
      </button>
      <div
        id='preview-for-print'
        className='prose prose-lg max-w-4xl mx-auto text-right text-[var(--mui-palette-text-primary)]'
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    </div>
  )
}
