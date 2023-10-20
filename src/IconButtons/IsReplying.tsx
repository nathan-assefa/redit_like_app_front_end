import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface IconBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.ElementType;
  isActive?: boolean;
  color?: string;
  children?: ReactNode;
}

const IsReplying: React.FC<IconBtnProps> = ({
  Icon,
  isActive,
  color,
  ...props
}) => {
  return (
    <button
      className={`reply-btn reply-icon-btn ${
        isActive ? "reply-icon-btn-active" : ""
      } ${color || ""}`}
      {...props}
    >
      <span>
        <Icon />
      </span>
    </button>
  );
};

export default IsReplying;
