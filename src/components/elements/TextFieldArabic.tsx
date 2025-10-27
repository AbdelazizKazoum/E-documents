import { useEffect, useRef, useState } from 'react'

import 'react-simple-keyboard/build/css/index.css'
import Keyboard from 'react-simple-keyboard'
import layout from 'simple-keyboard-layouts/build/layouts/arabic'

import { useOnClickOutside } from '@/utils/hooks/useOnClickOutside'
import CustomTextField from '@core/components/mui/TextField'

const TextFieldArabic = (props: any) => {
  const { id, value, handleChange, ...rest } = props

  const ref = useRef(null)
  const keyboardRef = useRef(null)
  const [input, setInput] = useState(value)
  const [layoutName, setLayoutName] = useState('default')
  const [showKeyboard, setShowKeyboard] = useState(false)

  useOnClickOutside(ref, () => setShowKeyboard(false))

  useEffect(() => {
    handleChange(id, input)
  }, [id, input, handleChange])

  const onKeyPress = (button: string) => {
    if (button === '{shift}' || button === '{lock}') {
      setLayoutName(layoutName === 'default' ? 'shift' : 'default')
    } else if (button === '{bksp}') {
      setInput('')
    }
  }

  const onChange = (input: string) => {
    if (isArabic(input)) setInput(input)
  }

  const onChangeInput = (event: any) => {
    const input = event.target.value

    if (isArabic(input)) {
      setInput(input)

      try {
        if (keyboardRef.current) (keyboardRef.current as any).setInput(input)
      } catch (error) {}
    }
  }

  const handleKeyDown = (event: any) => {
    const arabicKeyPattern = /[\u0600-\u06FF]/
    const key = event.key

    // Allow Ctrl + V (paste) and Ctrl + C (copy)
    if ((event.ctrlKey && key.toLowerCase() === 'v') || (event.ctrlKey && key.toLowerCase() === 'c')) {
      return
    }

    if (!arabicKeyPattern.test(key) && key.length === 1) {
      event.preventDefault()
    }
  }

  const handlePaste = (event: any) => {
    const pastedText = event.clipboardData.getData('Text')

    if (isArabic(pastedText)) {
      setInput(pastedText)

      try {
        if (keyboardRef.current) (keyboardRef.current as any).setInput(pastedText)
      } catch (error) {}
    } else {
      event.preventDefault()
    }
  }

  return (
    <div className='relative' dir='ltr' ref={ref} onClick={() => setShowKeyboard(true)}>
      <CustomTextField
        {...rest}
        dir='rtl'
        id={id}
        value={input}
        onChange={onChangeInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />
      {showKeyboard && (
        <div className='absolute top-16 right-0 z-10'>
          <Keyboard
            {...layout}
            keyboardRef={ref => (keyboardRef.current = ref)}
            onChange={onChange}
            onKeyPress={onKeyPress}
            layoutName={layoutName}
            rtl
          />
        </div>
      )}
    </div>
  )
}

export default TextFieldArabic

const isArabic = (text: string) => {
  // Define a regex pattern to match Arabic script, including extended ranges
  const arabicPattern =
    /[\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u08A0-\u08FF\uFB00-\uFB4F\uFB50-\uFDFF\uFE70-\uFEFF\u1EE00-\u1EEFF\s]/

  // Check if any Arabic characters are present in the text
  return arabicPattern.test(text)
}
