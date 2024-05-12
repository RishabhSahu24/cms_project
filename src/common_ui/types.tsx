export interface ButtonProps {
  type: "submit" | "button" | "reset";
  onClick?: () => void;
  className?: string;
  children: any;
}

export interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  required?: boolean;
}
