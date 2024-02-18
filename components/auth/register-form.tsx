import React from "react";
import CardWrapper from "@/components/auth/card-wrapper";

const RegisterForm = () => {
  return (
    <div>
      <CardWrapper
        headerLabel="Create New Account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial={false}
      >
        Register Form
      </CardWrapper>
    </div>
  );
};

export default RegisterForm;
