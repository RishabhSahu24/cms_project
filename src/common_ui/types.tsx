export interface ButtonProps {
  id?: string;
  type: "submit" | "button" | "reset";
  onClick?: () => void;
  className?: string;
  children: any;
  disabled?: boolean;
}

export interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  required?: boolean;
  error?: string;
}
export interface HeaderProps {
  heading: string;
}
