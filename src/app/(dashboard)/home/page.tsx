import React from 'react'

import { pvs } from '@/data/pvs.data'

export default function Page() {
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      {/* Main title with a modern look but original colors */}
      <h1 className='text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200 flex justify-between items-center'>
        <span>Liste des Procès-Verbaux</span>
        <span className='text-gray-500 font-medium' dir='rtl'>
          قائمة المحاضر
        </span>
      </h1>
      {/* Grid with modernized cards but original width and colors */}
      <div className='grid md:grid-cols-3 gap-6'>
        {pvs.map(pv => (
          <a
            key={pv.type}
            href={`/pv?pv_type=${pv.type}`}
            className='group block bg-white p-6 rounded-xl border border-transparent hover:shadow-xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 ease-in-out'
          >
            {/* Card title with French on the left and Arabic on the right */}
            <div className='flex justify-between items-start mb-2'>
              <h2 className='text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>
                {pv.title}
              </h2>
              <h2 className='text-lg font-semibold text-gray-400' dir='rtl'>
                {pv.ar_title}
              </h2>
            </div>
            <p className='text-gray-600 mt-2'>{pv.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
