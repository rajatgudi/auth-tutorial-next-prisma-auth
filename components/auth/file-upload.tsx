"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { useState } from "react";
interface FileUploaderProps {
  onFieldChange: (url: string) => void;
}
const FileUploader = ({ onFieldChange }: FileUploaderProps) => {
  const user = useCurrentUser();
  const [image, setImage] = useState(user?.image || "");
  return (
    <div className="flex flex-row justify-around items-center ">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          onFieldChange(res[0]?.url);
          setImage(res[0]?.url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.log(`ERROR! ${error.message}`);
        }}
      />
      {(user?.image || image) && (
        <Image
          src={image || user?.image || ""}
          alt=""
          height={80}
          width={120}
          className="rounded-full border-2"
        />
      )}
    </div>
  );
};

export default FileUploader;
