import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface IconBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.ElementType;
  isActive?: boolean;
  color?: string;
  children?: ReactNode;
}

const UpvoteButton: React.FC<IconBtnProps> = ({
  Icon,
  isActive,
  color,
  children,
  ...props
}) => {
  return (
    <button
      className={`btn icon-btn ${isActive ? "upvote-btn-active" : ""} ${
        color || ""
      }`}
      {...props}
    >
      <span className={`${children ? "mr-1" : ""}`}>
        <Icon />
      </span>
      <span
        className={`${
          children !== null && children !== undefined ? "count-footer" : ""
        }`}
      >
        {children}
      </span>
    </button>
  );
};

export default UpvoteButton;
