"use client";

import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsInsertSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
  intialValues?: AgentGetOne;
}
const AgentForm = ({ onSuccess, onCancel, intialValues }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));

        if (intialValues?.id) {
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: intialValues.id })
          );
        }

        onSuccess?.();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    })
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    defaultValues: {
      name: intialValues?.name ?? "",
      instructions: intialValues?.instructions ?? "",
    },
    resolver: zodResolver(agentsInsertSchema),
  });

  const isEdit = !!intialValues?.id;
  const isPending = createAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      console.log("TODO: updateAgent");
    } else {
      createAgent.mutate(values);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="eg. Math Tutor" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="You are a helpful assistant helping in math exams."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          {!!onCancel && (
            <Button
              onClick={() => onCancel}
              variant={"ghost"}
              disabled={isPending}
              type="button"
            >
              Cancel
            </Button>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isEdit ? "Save Changes" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AgentForm;
