export interface RadioInputProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ColorSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface EntryData {
  name: string;
  color: string;
  category: string;
  price: string;
  assigned: boolean;
  description: string;
}
