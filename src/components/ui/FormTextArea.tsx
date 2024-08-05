// components/ui/FormInput.tsx
import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form'
import { Textarea } from './textarea'

interface IFormTextAreaProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: Path<T>
  control: Control<T>
}

export default function FormTextArea<T extends FieldValues>({ label, name, control, ...rest }: IFormTextAreaProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel> {label} </FormLabel>
          <FormControl>
            <Textarea {...field} {...rest} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
