"use client";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import FormError from "../form-error";
import FormSuccess from "../form-success";
const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing Token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((err) => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div>
      <CardWrapper
        headerLabel="Confirming your verification"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
        showSocial={false}
      >
        <div className="flex items-center w-full justify-center">
          {!success && !error && <BeatLoader />}
          <FormSuccess message={success} />
          <FormError message={error} />
        </div>
      </CardWrapper>
    </div>
  );
};

export default NewVerificationForm;
