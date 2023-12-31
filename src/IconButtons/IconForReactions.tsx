import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface IconBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.ElementType;
  isActive?: boolean;
  color?: string;
  children?: ReactNode;
}

const IconForReactions: React.FC<IconBtnProps> = ({
  Icon,
  isActive,
  color,
  children,
  ...props
}) => {
  return (
    <button
      className={`love-like-btn love-like-icon-btn ${
        isActive ? "love-like-icon-btn-active" : ""
      } ${color || ""}`}
      {...props}
    >
      <span className={`${children ? "mr-1" : ""}`}>
        <Icon />
      </span>
      <span
        className={`${
          children !== null && children !== undefined
            ? "count-footer no-count"
            : ""
        }`}
      >
        {children}
      </span>
    </button>
  );
};

export default IconForReactions;
