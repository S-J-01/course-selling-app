import {z} from "zod"

export const signupInputProp = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
  })
  
export type SignupParams = z.infer<typeof signupInputProp>