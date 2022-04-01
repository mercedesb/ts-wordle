import React, { useRef } from 'react'
import { Letter } from './Letter'

export function Attempt() {
  const firstLetterRef = useRef<HTMLInputElement>(null);
  const secondLetterRef = useRef<HTMLInputElement>(null);
  const thirdLetterRef = useRef<HTMLInputElement>(null);
  const fourthLetterRef = useRef<HTMLInputElement>(null);
  const fifthLetterRef = useRef<HTMLInputElement>(null);

  const inputRefs = [firstLetterRef, secondLetterRef, thirdLetterRef, fourthLetterRef, fifthLetterRef]

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isLetter = (event.key >= "a" && event.key <= "z");
    const isArrow = event.key.match(/arrow/i);
    if (isLetter) moveFocusToNextLetter(event);
    if (isArrow) moveFocusToCorrectLetter(event);
  }

  const moveFocusToNextLetter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const currentRefIndex = inputRefs.findIndex(ref => ref.current === event.target);
    if (currentRefIndex < inputRefs.length - 1) {
      const nextFocusRef = inputRefs[currentRefIndex + 1];
      if (nextFocusRef.current) {
        nextFocusRef.current.focus();
      }
    }
  }

  const moveFocusToPrevLetter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const currentRefIndex = inputRefs.findIndex(ref => ref.current === event.target);
    if (currentRefIndex > 0) {
      const prevFocusRef = inputRefs[currentRefIndex - 1];
      if (prevFocusRef.current) {
        prevFocusRef.current.focus();
      }
    }
  }

  const moveFocusToCorrectLetter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const moveNext = event.key === 'ArrowRight' || event.key === 'ArrowDown'
    const movePrev = event.key === 'ArrowLeft' || event.key === 'ArrowUp'

    if (moveNext) moveFocusToNextLetter(event)
    else if (movePrev) moveFocusToPrevLetter(event)
  }

return (
  <form className="flex my-4">
    <Letter label="first" handleKeyUp={handleKeyUp} inputRef={firstLetterRef} />
    <Letter label="second" handleKeyUp={handleKeyUp} inputRef={secondLetterRef}/>
    <Letter label="third" handleKeyUp={handleKeyUp} inputRef={thirdLetterRef}/>
    <Letter label="fourth" handleKeyUp={handleKeyUp} inputRef={fourthLetterRef}/>
    <Letter label="fifth" handleKeyUp={handleKeyUp} inputRef={fifthLetterRef}/>
  </form>
)
}
