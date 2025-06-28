import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const schema = z.object({
  workDate: z.string().nonempty("Ngày làm việc không được bỏ trống"),
  slotId: z.array(
    z.object({
      id: z.number().int(),
    })
  ),
});

type ScheduleValues = z.infer<typeof schema>;
const form = useForm<ScheduleValues>({
  resolver: zodResolver(schema),
  defaultValues: {
    workDate: "",
    slotId: [],
  },
});

export const ScheduleCreateForm = () => {
  const handleSubmit = (values: ScheduleValues) => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        <FormField
          control={form.control}
          name="workDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}></FormLabel>
              <FormControl></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slotId"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}></FormLabel>
              <FormControl></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
