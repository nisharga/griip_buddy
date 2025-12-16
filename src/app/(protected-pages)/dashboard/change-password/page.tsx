import React from "react";
import { PasswordChangeForm } from "./components";

const page = () => {
  return (
    <div>
      <div className="mb-4 lg:mb-8"></div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <PasswordChangeForm />
        </div>
      </div>
    </div>
  );
};

export default page;
