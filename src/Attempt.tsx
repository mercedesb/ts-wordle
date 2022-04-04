import React, { useRef, useState, useEffect } from "react";
import { Letter } from "./Letter";
import { InputProps } from "./types";

export function Attempt({ word }: { word: string }) {
  const firstLetterRef = useRef<HTMLInputElement>(null);
  const secondLetterRef = useRef<HTMLInputElement>(null);
  const thirdLetterRef = useRef<HTMLInputElement>(null);
  const fourthLetterRef = useRef<HTMLInputElement>(null);
  const fifthLetterRef = useRef<HTMLInputElement>(null);
  const [inputProps, setInputProps] = useState<InputProps[]>([]);

  useEffect(() => {
    const defaultInputProps = { className: "", disabled: false };
    setInputProps([
      {
        ...defaultInputProps,
        label: "first",
        expectedLetter: word[0],
        inputRef: firstLetterRef,
      },
      {
        ...defaultInputProps,
        label: "second",
        expectedLetter: word[1],
        inputRef: secondLetterRef,
      },
      {
        ...defaultInputProps,
        label: "third",
        expectedLetter: word[2],
        inputRef: thirdLetterRef,
      },
      {
        ...defaultInputProps,
        label: "fourth",
        expectedLetter: word[3],
        inputRef: fourthLetterRef,
      },
      {
        ...defaultInputProps,
        label: "fifth",
        expectedLetter: word[4],
        inputRef: fifthLetterRef,
      },
    ]);
  }, [word]);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const currentRefIndex = inputProps.findIndex(
      (input) => input.inputRef.current === event.target
    );

    const isLetter = event.key >= "a" && event.key <= "z";
    const isArrowForward =
      event.key === "ArrowRight" || event.key === "ArrowDown";
    const isArrowBackward =
      event.key === "ArrowLeft" || event.key === "ArrowUp";
    const isLastLetter = currentRefIndex === inputProps.length - 1;

    if (isLetter && !isLastLetter) {
      moveFocusToNextLetter(currentRefIndex);
    }
    if (isArrowForward) moveFocusToNextLetter(currentRefIndex);
    if (isArrowBackward) moveFocusToPrevLetter(currentRefIndex);
  };

  const moveFocusToNextLetter = (currentRefIndex: number) => {
    if (currentRefIndex < inputProps.length - 1) {
      const nextFocusRef = inputProps[currentRefIndex + 1].inputRef;
      if (nextFocusRef.current) {
        nextFocusRef.current.focus();
      }
    }
  };

  const moveFocusToPrevLetter = (currentRefIndex: number) => {
    if (currentRefIndex > 0) {
      const prevFocusRef = inputProps[currentRefIndex - 1].inputRef;
      if (prevFocusRef.current) {
        prevFocusRef.current.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkAttempt();
  };

  const checkAttempt = () => {
    // TODO: handle not a real word (use an API for words)
    const updatedInputProps = [...inputProps];

    const blanksPresent = inputProps.some(
      (input) => !input.inputRef.current!.value
    );

    inputProps.forEach((input, index) => {
      if (blanksPresent) {
        if (!input.inputRef.current!.value) {
          updatedInputProps[index].className = "border-red-700";
        }
      } else {
        updatedInputProps[index].disabled = true;
        if (input.inputRef.current!.value === input.expectedLetter) {
          updatedInputProps[index].className = "text-white bg-green-500";
        } else if (word.includes(input.inputRef.current!.value)) {
          updatedInputProps[index].className = "bg-yellow-400";
        } else {
          updatedInputProps[index].className = "bg-neutral-300";
        }
      }
    });

    setInputProps(updatedInputProps);
  };

  return (
    <form className="flex my-4 w-fit m-auto" onSubmit={handleSubmit}>
      {inputProps.map((input, index) => (
        <Letter key={index} inputProps={input} handleKeyUp={handleKeyUp} />
      ))}
      <input type="submit" className="sr-only" value="Submit" />
    </form>
  );
}
