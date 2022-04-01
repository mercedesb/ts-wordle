import React, { useState } from 'react'

export function Letter({label, inputRef, handleKeyUp}: {label: string, inputRef: React.RefObject<HTMLInputElement>, handleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void }) {
  const [value, setValue] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  
  return (
    <label>
      <span className="sr-only">{label} letter</span>
      <input 
        onKeyUp={handleKeyUp}
        onChange={onChange}
        ref={inputRef}
        value={value}
        type="text" 
        className="border border-gray-400 w-8 mx-1 rounded" />
    </label>
  )
}
