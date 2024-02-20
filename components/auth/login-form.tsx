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
import { LoginSchema } from "@/schemas";
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

const LoginForm = () => {
  const searchParams = useSearchParams();
  //when one email id already registered with google and trying to login with same email id from github, shows this error
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    resetOptions: {
      keepDefaultValues: true,
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setSuccessMsg("");
    setErrorMsg("");
    startTransition(() => {
      login(values).then((data: any) => {
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
        headerLabel="Welcome Back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial={true}
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
                    <Button
                      variant={"link"}
                      size={"sm"}
                      asChild
                      className="px-0 "
                    >
                      <Link href={"/auth/reset"}>Forget password?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={errorMsg || urlError} />
            <FormSuccess message={successMsg} />
            <Button disabled={isPending} type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default LoginForm;
