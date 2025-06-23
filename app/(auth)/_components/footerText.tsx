import { TFooterText } from "@/types/Auth.types";
import React, { FC } from "react";

const FooterTexts: FC<TFooterText> = ({ heading, subHeading }) => {
  return (
    <div className="flex flex-col gap-[8px] justify-end pl-[32px] pr-[40px] pb-[32px]">
      <p className="w-full max-w-[410px] text-xl text-lightWhiteColor text-justify">
        {heading}
      </p>
      <p className="text-lightWhiteColor text-sm">{subHeading}</p>
    </div>
  );
};

export default FooterTexts;
