export interface ButtonProps {
  title: string;
  onClick?: () => void;
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  className?: string;
  bg: string;
  width: string;
}

export interface CardProps {
  children: React.ReactNode;
}

export interface InputProps {
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
  label: string;
}
