import { z } from 'zod'

export const quoteFormSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  phone: z.string().min(10, 'Telefone inválido'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  store_preference: z.string().optional(),
  notes: z.string().optional(),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  subject: z.string().min(2, 'O assunto é obrigatório'),
  message: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres'),
})

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: 'As senhas não coincidem',
  path: ['confirm_password'],
})

export const productFilterSchema = z.object({
  categorySlug: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  searchQuery: z.string().optional(),
})

export type QuoteFormValues = z.infer<typeof quoteFormSchema>
export type ContactFormValues = z.infer<typeof contactFormSchema>
export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ProductFilterValues = z.infer<typeof productFilterSchema>
