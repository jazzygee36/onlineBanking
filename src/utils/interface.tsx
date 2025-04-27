export interface ButtonProps {
  title: string;
  onClick?: () => void;
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  className?: string;
  bg: string;
  width: string;
  color?: string;
}

export interface CardProps {
  children: React.ReactNode;
}

export interface InputProps {
  type: string;
  placeholder: string;
  readOnly?: boolean;
  label?: string;
  name?: string;
  value?: string;
  border?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
}

export interface SelectProps {
  label?: string;
  option: { value: string; label: string }[];
  name: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  border?: string;
}

export interface IndividualFormProps {
  completeRegistration: boolean;
  setCompleteRegistration: (value: boolean) => void;
  setFormHeader: (value: boolean) => void;
  setProgress: (value: number) => void;
  step: number;
  setStep: (value: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setApiError: any;
}

export interface CorporateFormProps {
  completeRegistration: boolean;
  setCompleteRegistration: (value: boolean) => void;
  setFormHeader: (value: boolean) => void;
  setProgress: (value: number) => void;
  step: number;
  setStep: (value: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setApiError: any;
}

export interface ErrorProps {
  title: string;
  onClose?: () => void;
}

export interface dashboardProps {
  title: string;
  setIsOpen?: (val: boolean) => void;
  isOpen?: boolean;
  children: React.ReactNode;
}
export interface headerProps {
  title: string;
}

export interface TransferFundProps {
  amount: string;
  name: string;
  acctNumber: string;
  bankName: string;
  branchAddress: string;
  onlinePin: string;
  terms: string;
  tacCode: string;
  dwtcCode: string;
  noneResidentTax: string;
}
