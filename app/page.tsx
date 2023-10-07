'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type FormFieldMapType = {
  name: Array<'email' | 'password'>, labelName: Array<string>, placeholder: Array<string>
}
const formSchema = z.object({
  email: z.string().email({
    message: 'Please Provide Valid Email'
  }),
  password: z.string()
})

function onSubmit(values: z.infer<typeof formSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values)
}

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  const FormFieldMap = ({ name, labelName, placeholder }: FormFieldMapType) => {
    let obj = []
    for (let i = 0; name.length > i; i++) {
       obj.push(
        <FormField
          control={form.control}
          name={name[i]}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{labelName[i]}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder[i]} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    }
    return obj
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormFieldMap name={['email', 'password']} labelName={['Email', 'Password']} placeholder={['Enter your mail', 'Enter your Password']} />
        <Button  type="submit">Submit</Button>
      </form>
    </Form>
  )
}
