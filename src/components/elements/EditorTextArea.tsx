'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

// MUI Imports
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'

// Third-party imports
import { Color } from '@tiptap/extension-color'
import { ListItem } from '@tiptap/extension-list-item'
import { TextStyle } from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extension-placeholder'

import '@/lib/styles/tiptapEditor.css'

const EditorToolbar = ({ editor }: any) => {
  if (!editor) {
    return null
  }

  return (
    <div className='flex flex-wrap gap-x-4 gap-y-2 p-6'>
      <Chip
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        {...(editor.isActive('bold') && { variant: 'tonal', color: 'primary' })}
        label='gras'
      />
      <Chip
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        {...(editor.isActive('italic') && { variant: 'tonal', color: 'primary' })}
        label='italique'
      />
      <Chip
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        {...(editor.isActive('strike') && { variant: 'tonal', color: 'primary' })}
        label='barré'
      />
      <Chip
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        {...(editor.isActive('code') && { variant: 'tonal', color: 'primary' })}
        label='code'
      />
      <Chip onClick={() => editor.chain().focus().unsetAllMarks().run()} label='effacer les styles' />
      <Chip onClick={() => editor.chain().focus().clearNodes().run()} label='effacer les nœuds' />
      <Chip
        onClick={() => editor.chain().focus().setParagraph().run()}
        {...(editor.isActive('paragraph') && { variant: 'tonal', color: 'primary' })}
        label='paragraphe'
      />
      <Chip
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        {...(editor.isActive('heading', { level: 1 }) && { variant: 'tonal', color: 'primary' })}
        label='titre 1'
      />
      <Chip
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        {...(editor.isActive('heading', { level: 2 }) && { variant: 'tonal', color: 'primary' })}
        label='titre 2'
      />
      <Chip
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        {...(editor.isActive('heading', { level: 3 }) && { variant: 'tonal', color: 'primary' })}
        label='titre 3'
      />
      <Chip
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        {...(editor.isActive('heading', { level: 4 }) && { variant: 'tonal', color: 'primary' })}
        label='titre 4'
      />
      <Chip
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        {...(editor.isActive('heading', { level: 5 }) && { variant: 'tonal', color: 'primary' })}
        label='titre 5'
      />
      <Chip
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        {...(editor.isActive('heading', { level: 6 }) && { variant: 'tonal', color: 'primary' })}
        label='titre 6'
      />
      <Chip
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        {...(editor.isActive('bulletList') && { variant: 'tonal', color: 'primary' })}
        label='liste à puces'
      />
      <Chip
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        {...(editor.isActive('orderedList') && { variant: 'tonal', color: 'primary' })}
        label='liste ordonnée'
      />
      <Chip
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        {...(editor.isActive('blockquote') && { variant: 'tonal', color: 'primary' })}
        label='bloc de citation'
      />
      <Chip onClick={() => editor.chain().focus().setHorizontalRule().run()} label='ligne horizontale' />
      <Chip onClick={() => editor.chain().focus().setHardBreak().run()} label='saut de ligne' />
      <Chip
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        label='annuler'
      />
      <Chip
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        label='refaire'
      />
      <Chip onClick={() => editor.chain().focus().setColor('var(--mui-palette-primary-main)').run()} label='primaire' />
    </div>
  )
}

interface EditorTextAreaProps {
  content: string
  setContent: (content: string) => void
}

const EditorTextArea: FC<EditorTextAreaProps> = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      Placeholder.configure({ placeholder: '' })
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getText())
    },
    immediatelyRender: false
  })

  useEffect(() => {
    if (editor && content !== editor.getText()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <div className='border rounded-md'>
      <EditorToolbar editor={editor} />
      <Divider />
      <EditorContent editor={editor} />
    </div>
  )
}

export default EditorTextArea
