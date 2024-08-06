// components/ui/FormInput.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { PasswordInput } from './PasswordInput'

interface IFormTextInputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: Path<T>
  control: Control<T>
}

export default function FormTextInput<T extends FieldValues>({
  label,
  name,
  control,
  ...rest
}: IFormTextInputProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel> {label} </FormLabel>
          <FormControl>
            {rest.type === 'password' ? (
              <PasswordInput {...field} {...rest} />
            ) : (
              <Input type={rest.type} {...field} {...rest} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
