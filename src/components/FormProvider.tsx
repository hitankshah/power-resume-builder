import React from 'react';
import { useForm, FormProvider as RHFFormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resumeSchema, type ResumeData } from '@/utils/resumeSchema';

interface FormProviderProps {
  children: React.ReactNode;
  defaultValues?: Partial<ResumeData>;
  onSubmit?: (data: ResumeData) => void;
}

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  defaultValues,
  onSubmit = () => {},
}) => {
  const methods = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      hobbies: [],
      achievements: [],
      certificates: [],
      ...defaultValues,
    },
  });

  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </RHFFormProvider>
  );
};
