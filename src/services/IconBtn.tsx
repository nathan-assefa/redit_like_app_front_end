import React, { ReactNode, ButtonHTMLAttributes } from "react";

// If we want to inherit all the props of a regular html button
// then we can can extend from ButtonHTMLAttributes, example
// import { ButtonHTMLAttributes } from "react";
// 'interface IconBtnProps extends ButtonHTMLAttributes<HTMLButtonElement>'

interface IconBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.ElementType;
  isActive?: boolean;
  color?: string;
  children?: ReactNode;
}

const IconBtn: React.FC<IconBtnProps> = ({
  Icon,
  isActive,
  color,
  children,
  ...props
}) => {
  return (
    <button
      className={`btn icon-btn ${isActive ? "icon-btn-active" : ""} ${
        color || ""
      }`}
      {...props}
    >
      <span className={`${children ? "mr-1" : ""}`}>
        <Icon />
      </span>
      <span className={`${children ? "count" : ""}`}>{children}</span>
    </button>
  );
};

export default IconBtn;
