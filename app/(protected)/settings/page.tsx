import { auth, signOut } from "@/auth";
import React from "react";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      SettingsPage
      <p>Current Session:{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
