import React from "react";

interface SectionTitleProps {
  children: React.ReactElement;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  if (!React.isValidElement(children)) {
    return children; // Or handle the error appropriately
  }

  const currentClassName =
    (children.props as { className?: string }).className ?? "";

  return React.cloneElement(
    children as React.ReactElement<{ className?: string }>,
    {
      className: `${currentClassName} text-3xl lg:text-5xl lg:leading-tight font-bold`,
    },
  );
};

export default SectionTitle;
