"use client";
import { login } from "@/actions/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";
import CardWrapper from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { reset } from "@/actions/reset";
import { MoonLoader, SyncLoader } from "react-spinners";

const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
    resetOptions: {
      keepDefaultValues: true,
    },
  });
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setSuccessMsg("");
    setErrorMsg("");
    startTransition(() => {
      reset(values).then((data: any) => {
        setErrorMsg(data.error);
        console.log("error", data.error);
        if (data.success) {
          setSuccessMsg(data.success);
          form.reset();
        }
      });
    });
  };
  return (
    <div>
      <CardWrapper
        headerLabel="Forgot your password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        showSocial={false}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="rajat@gmail.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={errorMsg} />
            <FormSuccess message={successMsg} />
            <Button disabled={isPending} type="submit" className="w-full flex gap-1">
              Send Reset Email
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default ResetForm;
