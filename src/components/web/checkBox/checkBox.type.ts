export interface CheckBoxProps {
  id: string;
  label: string;
  description?: React.ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;
  disable?: boolean;
  error?: string;
}