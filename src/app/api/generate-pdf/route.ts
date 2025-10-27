/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import fs from 'fs'

import { NextResponse } from 'next/server'

import carbone from 'carbone'

// Define the request body type
interface RequestBody {
  data: Record<string, any> // Accepts dynamic key-value pairs
}

// Helper function to generate PDF
const generatePdf = (templatePath: string, data: Record<string, any>): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    carbone.render(templatePath, data, (err: any, result: any) => {
      if (err) {
        return reject(err)
      }

      resolve(Buffer.from(result)) // Convert to Buffer for response
    })
  })
}

// POST API Route
export async function POST(req: Request) {
  try {
    // 1. Parse incoming data
    const body: RequestBody = await req.json()
    const data = body

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'Invalid data provided' }, { status: 400 })
    }

    // 2. Define the template path (outside public directory)
    const templatePath = path.join(process.cwd(), 'templates', 'template.odt')

    // 3. Check if the template exists
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json({ error: 'Template file not found' }, { status: 500 })
    }

    // 4. Generate PDF using Carbone.js
    const pdfBuffer = await generatePdf(templatePath, data)

    // 5. Create 'generated-docs' folder if it doesn't exist
    const outputDir = path.join(process.cwd(), 'generated-docs')

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // 6. Define the output file path
    const outputPath = path.join(outputDir, 'output.docx')

    // 7. Save the PDF buffer to the output path
    fs.writeFileSync(outputPath, pdfBuffer)

    // 5. Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=output.docx'
      }
    })
  } catch (error: any) {
    console.error('Error generating DOCX:', error.message)

    return NextResponse.json({ error: 'Failed to generate DOCX' }, { status: 500 })
  }
}
