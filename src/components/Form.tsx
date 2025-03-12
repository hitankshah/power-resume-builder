import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

interface FormProps {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, defaultValues }) => {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
