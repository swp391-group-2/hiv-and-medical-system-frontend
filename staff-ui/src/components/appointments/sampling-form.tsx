import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const sampleFormSchema = z.object({
  sampleCode: z.string(),
  sampleType: z.string(),
});

// 2) Infer the form values type
type SampleFormValues = z.infer<typeof sampleFormSchema>;

// 3) Create the form component
export function SampleForm() {
  const form = useForm<SampleFormValues>({
    resolver: zodResolver(sampleFormSchema),
    defaultValues: {
      sampleCode: "",
      sampleType: "",
    },
  });

  const onSubmit = (data: SampleFormValues) => {
    console.log("Submitted:", data);
    // …your submit logic here…
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Sample Code Field */}
        <FormField
          control={form.control}
          name="sampleCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mã mẫu xét nghiệm</FormLabel>
              <FormControl>
                <Input placeholder="Nhập mã mẫu xét nghiệm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sample Type Field */}
        <FormField
          control={form.control}
          name="sampleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại mẫu</FormLabel>
              <FormControl>
                <Input placeholder="Nhập loại mẫu xét nghiệm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
