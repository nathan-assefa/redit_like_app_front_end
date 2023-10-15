import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface IconBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.ElementType;
  isActive?: boolean;
  color?: string;
  children?: ReactNode;
}

const IconForContent: React.FC<IconBtnProps> = ({
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
      <span className={`${children ? "count-footer" : ""}`}>{children}</span>
    </button>
  );
};

export default IconForContent;
