'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { fetchWithBaseUrl } from '@/utils/api-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from '../ui/textarea';

const FormSchema = z.object({
  quote: z
    .string()
    .trim()
    .min(20, {
      message: 'Quote must be at least 20 characters.',
    })
    .max(150, {
      message: 'Quote cannot exceed 150 characters.',
    }),
});

export function FormQuote() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quote: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const postResponse = await fetchWithBaseUrl<{ hashId: string }>(
        '/quotes/correct',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quote: data.quote }),
        }
      );

      if (postResponse.error) {
        throw new Error(postResponse.error);
      }

      const { hashId } = postResponse.data;

      const confirmResponse = await fetchWithBaseUrl(
        `/quotes?hashId=${hashId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (confirmResponse.error) {
        throw new Error(confirmResponse.error);
      }

      form.reset();
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        id="form-quote"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="max-h-64 resize-y"
                  placeholder="Enter the quote you want to share to the world"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
