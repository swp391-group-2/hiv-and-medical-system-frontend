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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";
import type { Doctor } from "@/types/doctor";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const schema = z.object({
  workDate: z.string().nonempty("Ngày làm việc không được bỏ trống"),
  slotId: z.array(
    z.object({
      id: z.number().int(),
    })
  ),
});

export const ScheduleMutateForm = ({ doctor }: { doctor: Doctor }) => {
  type ScheduleValues = z.infer<typeof schema>;
  const form = useForm<ScheduleValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      workDate: "",
      slotId: [],
    },
  });
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
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Chọn ngày làm việc</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
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
