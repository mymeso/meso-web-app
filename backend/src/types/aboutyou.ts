import { z } from 'zod';

export const AboutYouSchema = z.object({
  shop_id: z.uuid(),
  created_at: z.string(),
  service_description: z.string().nullable().optional(),
  experience: z.string().nullable().optional(),
  exp_years: z.number().nullable().optional(),
  certifications: z.string().nullable().optional(),
  style: z.string().nullable().optional(),
  fun_fact: z.string().nullable().optional(),
  languages: z.array(z.string()).nullable().optional(),
  gallery: z.array(z.string()).nullable().optional(),
  updated_at: z.string().nullable().optional(),
})

export const CreateAboutYouSchema = z.object({
  service_description: z.string().max(1000).optional(),
  experience: z.string().max(2000).optional(),
  exp_years: z.number().min(0).max(50).optional(),
  certifications: z.string().max(1000).optional(),
  style: z.string().max(1000).optional(),
  fun_fact: z.string().max(500).optional(),
  languages: z.array(z.string()).optional(),
  gallery: z.array(z.string()).optional(),
})

export const UpdateAboutYouSchema = z.object({
  service_description: z.string().max(1000).optional(),
  experience: z.string().max(2000).optional(),
  exp_years: z.number().min(0).max(50).optional(),
  certifications: z.string().max(1000).optional(),
  style: z.string().max(1000).optional(),
  fun_fact: z.string().max(500).optional(),
  languages: z.array(z.string()).optional(),
  gallery: z.array(z.string()).optional(),
})

export type AboutYou = z.infer<typeof AboutYouSchema>
export type CreateAboutYouData = z.infer<typeof CreateAboutYouSchema>
export type UpdateAboutYouData = z.infer<typeof UpdateAboutYouSchema> 