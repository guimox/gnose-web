"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";

const FormSchema = z.object({
  quote: z
    .string()
    .trim()
    .min(20, {
      message: "Quote must be at least 20 characters.",
    })
    .max(150, {
      message: "Quote cannot exceed 150 characters.",
    })
    .regex(/^[a-zA-Z0-9 .,?!'"-]*$/, {
      message:
        "Quote contains invalid characters. Only letters, numbers, and basic punctuation are allowed.",
    }),
});

export function FormQuote() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),

    defaultValues: {
      quote: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    alert(JSON.stringify(data));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl font-bold">Quote</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-y max-h-64"
                  placeholder="Enter the quote you want to share to the world"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
          Share
        </Button>
      </form>
    </Form>
  );
}
