import { create } from 'zustand'

import api from '@/lib/api'

interface DocumentStore {
  generateDocument: (data: any) => Promise<void>
}

export const useDocumentStore = create<DocumentStore>(() => ({
  generateDocument: async (data: any) => {
    try {
      const res = await api.post('/generate-pdf', data, {
        responseType: 'blob' // Ensure response is treated as a binary file
      })

      console.log(res.data)

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')

      link.href = url
      link.setAttribute('download', 'generated-file.docx') // Set the filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating document:', error)
    }
  }
}))
