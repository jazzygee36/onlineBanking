import { z } from 'zod';

// Define a base schema (plain ZodObject)
const baseIndividualSchema = z.object({
  firstName: z.string().min(3, 'This field is required'),
  lastName: z.string().min(3, 'This field is required'),
  email: z.string().email('Email address is incorrect.'),
  phoneNumber: z.string().min(3, 'This field is required'),
  password: z.string().min(3, 'This field is required'),
  confirmPassword: z.string().min(3, 'This field is required'),
  username: z.string().min(4, 'This field is required'),
  occupation: z.string().min(4, 'This field is required'),
  gender: z.string().min(4, 'This field is required'),
  dob: z.string().min(4, 'This field is required'),
  state: z.string().min(4, 'This field is required'),
  country: z.string().min(4, 'This field is required'),
  zipCode: z.string().min(4, 'This field is required'),
  city: z.string().min(4, 'This field is required'),
  address: z.string().min(4, 'This field is required'),
  acctType: z.string().min(4, 'This field is required'),
  acctPin: z.string().min(4, 'This field is required'),
});

// Full schema with refinement for the entire form
export const individualSchema = baseIndividualSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  }
);

// For step 1, pick only the necessary fields:
export const step1Schema = baseIndividualSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  username: true,
  occupation: true,
  gender: true,
  // phoneNumber: true,
  dob: true,
});

// For step 2, pick the remaining fields and add a refinement to ensure passwords match:
export const step2Schema = baseIndividualSchema.pick({
  // password: true,
  // confirmPassword: true,
  phoneNumber: true,
  state: true,
  country: true,
  zipCode: true,
  city: true,
  address: true,
});

export const step3Schema = baseIndividualSchema.pick({
  acctType: true,
  acctPin: true,
});

export const step4Schema = baseIndividualSchema
  .pick({
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: z.string().email('Email address is incorrect.'),
  password: z.string().min(3, 'This field is required'),
});

// export const transferSchema = z.object({
//   country: z.string().min(3, 'This field is required'),
//   amount: z.string().min(2, 'This field is required'),
//   name: z.string().min(2, 'This field is required'),
//   acctNumber: z.string().min(2, 'This field is required'),
//   bankName: z.string().min(2, 'This field is required'),
//   bankBranch: z.string().min(2, 'This field is required'),
//   onlinePin: z.string().min(2, 'This field is required'),
//   branchAddress: z.string().min(2, 'This field is required'),
// });

// Define a base schema (plain ZodObject)
const baseCorporateSchema = z.object({
  companyName: z.string().min(3, 'This field is required'),
  businessType: z.string().min(3, 'This field is required'),
  incorporationDate: z
    .date()
    .refine((date) => date !== null, { message: 'This field is required' }),
  password: z.string().min(3, 'This field is required'),
  confirmPassword: z.string().min(3, 'This field is required'),
  email: z.string().email('Email address is incorrect.'),

  verificationCode: z.string().min(4, 'This field is required'),
});

export const corporateSchema = baseCorporateSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  }
);

export const transferFunSchema = z.object({
  country: z.string().min(3, 'This field is required'),
  amount: z.string().min(3, 'This field is required'),
  name: z.string().min(3, 'This field is required'),
  acctNumber: z.string().min(3, 'This field is required'),
  bankName: z.string().min(3, 'This field is required'),

  bankAddress: z.string().min(3, 'This field is required'),
  onlinePin: z.string().min(4, 'This field is required'),
  terms: z.string().min(0, 'This field is required'),
  tacCode: z.string().min(4, 'This field is required'),
  dwtcCode: z.string().min(4, 'This field is required'),
  noneResidentTax: z.string().min(4, 'This field is required'),
});

export const transferStep1Schema = transferFunSchema.pick({
  amount: true,
  name: true,
  acctNumber: true,
  bankName: true,
  bankAddress: true,
  onlinePin: true,
  country: true,
});

export const transferStep2Schema = transferFunSchema.pick({
  amount: true,
  name: true,
  acctNumber: true,
  bankName: true,
  bankAddress: true,

  onlinePin: true,
  country: true,
});
export const transferStep3Schema = transferFunSchema.pick({
  terms: true,
});

export const transferStep4Schema = transferFunSchema.pick({
  tacCode: true,
  dwtcCode: true,
  noneResidentTax: true,
});
