export interface InputProps {
  className: string;
  label: string;
  expectedLetter: string;
  disabled: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}