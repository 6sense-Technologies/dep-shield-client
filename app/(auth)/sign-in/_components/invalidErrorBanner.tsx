import React from "react";

const InvalidErrorBanner = () => {
  return (
    <div className="bg-lightRedBg text-center rounded-md mt-8 border border-destructive">
      <p className="text-destructive text-sm font-medium py-2">
        Invalid email or password.
      </p>
    </div>
  );
};

export default InvalidErrorBanner;
