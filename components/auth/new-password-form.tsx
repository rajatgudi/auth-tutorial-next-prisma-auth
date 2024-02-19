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
import { NewPasswordSchema, ResetSchema } from "@/schemas";
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
import { newPassword } from "@/actions/new-password";
import { SyncLoader } from "react-spinners";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
    resetOptions: {
      keepDefaultValues: true,
    },
  });
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setSuccessMsg("");
    setErrorMsg("");
    startTransition(() => {
      newPassword(values, token).then((data: any) => {
        setErrorMsg(data.error);
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
        headerLabel="Enter a new password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        showSocial={false}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="*******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={errorMsg} />
            <FormSuccess message={successMsg} />
            <Button disabled={isPending} type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default NewPasswordForm;
