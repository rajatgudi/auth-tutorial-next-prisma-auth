import { FaExclamationTriangle } from "react-icons/fa";
import CardWrapper from "./card-wrapper";
const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login!"
      showSocial={false}
    >
      <div className="w-full flex justify-center items-center">
        <FaExclamationTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
