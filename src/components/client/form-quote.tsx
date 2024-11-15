import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useModal } from '@/context/ModalContext';
import { fetchWithBaseUrl } from '@/utils/api-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Change, diffChars } from 'diff';
import { CircleHelp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  quote: z
    .string()
    .trim()
    .min(10, {
      message: 'Quote must be at least 10 characters.',
    })
    .max(150, {
      message: 'Quote cannot exceed 150 characters.',
    }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface CorrectedQuoteType {
  quote: string;
  hashId: string;
  correctedQuote: string;
}

interface DiffViewProps {
  originalText: string;
  correctedText: string;
}

const DiffView: React.FC<DiffViewProps> = ({ originalText, correctedText }) => {
  const diff = diffChars(originalText, correctedText);

  return (
    <div className="rounded-md bg-gray-50 p-4 font-mono text-sm">
      {diff.map((part: Change, index: number) => (
        <span
          key={index}
          className={
            part.added
              ? 'bg-green-100 text-green-800'
              : part.removed
                ? 'bg-red-100 text-red-800 line-through'
                : 'text-gray-800'
          }
        >
          {part.value}
        </span>
      ))}
    </div>
  );
};

export function FormQuote() {
  const router = useRouter();
  const { closeModal } = useModal();
  const [correctedQuote, setCorrectedQuote] = useState<any>(null);
  const [originalQuote, setOriginalQuote] = useState<string>('');
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quote: '',
    },
  });

  async function handleCorrectionRequest(data: FormSchemaType): Promise<void> {
    setLoading(true);
    try {
      setOriginalQuote(data.quote);
      const postResponse = await fetchWithBaseUrl<{
        data: CorrectedQuoteType;
        error?: string;
      }>('/quotes/correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote: data.quote }),
      });

      if (postResponse.error) {
        throw new Error(postResponse.error);
      }

      setCorrectedQuote(postResponse.data);
      setIsEditable(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmAndSubmit(): Promise<void> {
    if (!correctedQuote) return;

    try {
      const confirmResponse = await fetchWithBaseUrl<{ error?: string }>(
        `/quotes?hashId=${correctedQuote.hashId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (confirmResponse.error) {
        throw new Error(confirmResponse.error);
      }

      form.reset();
      router.refresh();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        id="form-quote"
        onSubmit={form.handleSubmit(handleCorrectionRequest)}
        className="w-full space-y-6"
      >
        {!correctedQuote ? (
          <>
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="max-h-64 resize-y"
                      placeholder="Your quote goes here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-between gap-4">
              <div className="w-full">
                <Tooltip>
                  <TooltipTrigger className="flex items-center justify-center gap-1 text-gray-400">
                    <CircleHelp size={15} />
                    Why validate?
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Before submitting a quote, we first validate it</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex w-full justify-between gap-4">
                <Button type="button" variant="secondary" onClick={closeModal}>
                  Close
                </Button>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Validating...' : 'Validate'}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <p className="mb-2 font-medium">Changes Made:</p>
                <DiffView
                  originalText={originalQuote}
                  correctedText={correctedQuote.quote}
                />
              </div>
              <div>
                <p className="mb-2 font-medium">Corrected Quote:</p>
                <Textarea
                  className="max-h-64 resize-y"
                  value={correctedQuote.quote}
                  readOnly={!isEditable}
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
              <Button type="button" variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditable(!isEditable)}
              >
                {isEditable ? 'Save' : 'Edit'}
              </Button>
              <Button type="button" onClick={handleConfirmAndSubmit}>
                Confirm and Share
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}

export default FormQuote;
