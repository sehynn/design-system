import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./style.module.scss";

/** 버튼 스타일 변형 */
export enum ButtonType {
  FILL = "fill",
  OUTLINE = "outline", 
  GHOST = "ghost",
  COLOR = "color"
}

type Size = "sm" | "md" | "lg";
type Rounded = "sm" | "md" | "lg" | "pill"; 

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { 
  theme?: ButtonType;
  color?: "primary" | "info" | "danger" | "neutral" | "warning";
  size?: Size; 
  fullWidth?: boolean; 
  loading?: boolean; 
  leftIcon?: React.ReactNode; 
  rightIcon?: React.ReactNode; 
  rounded?: Rounded;
}
 
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    theme = ButtonType.FILL,
    color = "primary",
    size = "md",
    fullWidth,
    loading,
    leftIcon,
    rightIcon,
    className,
    disabled,
    rounded = "pill",  
    ...rest
  },
  ref
) {
  const cls = cn(
    styles.button,
    // theme에 따라 color 적용
    theme === ButtonType.COLOR 
      ? styles[`${color}-fill`] 
      : theme === ButtonType.OUTLINE 
        ? styles[`${color}-outline`]
        : theme === ButtonType.GHOST
          ? styles[`${color}-ghost`]
          : styles[theme],
    styles[`size-${size}`], 		// size
    styles[`rounded-${rounded}`], // radius
    {
      [styles.fullWidth]: !!fullWidth,
      [styles.loading]: !!loading,
    },
    className
  );

  return (
    <button
      ref={ref}
      className={cls}
      disabled={disabled || loading}
      aria-busy={!!loading}
      {...rest}
    > 
      {loading ? (
        <span className={styles.loadingContent}>
          <span className={styles.spinner} aria-hidden />
        </span>
      ) : (
        <>
          {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
          <span className={styles.label}>{children}</span>
          {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

export default Button;