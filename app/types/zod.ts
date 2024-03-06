import { z } from "zod"

export const formSchema = z.object({
    name: z.string().min(2),
    phone: z.string().min(11),
    email: z.string().email(),
})

export type dataFormSchema =  z.infer<typeof formSchema>