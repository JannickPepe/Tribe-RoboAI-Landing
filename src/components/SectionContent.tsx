import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface SectionContentProps extends HTMLAttributes<HTMLDivElement> {
  position?: string;
}

export const SectionContent = (props: SectionContentProps) => {
  const { className, position, ...otherProps } = props;
  return (
    <div
      className={twMerge(
        "container py-24 md:py-36 lg:py-48 overflow-hidden",
        className, position
      )}
      {...otherProps}
    />
  );
};
