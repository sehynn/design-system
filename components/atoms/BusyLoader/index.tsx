import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./style.module.scss";

export type SpinnerSize = "small" | "medium" | "big";
export type LoaderType = "spinner" | "bubbles" | "bar";
export type LoaderColor = "primary" | "info" | "danger" | "neutral";
export type LoaderSpeed = "slow" | "normal" | "fast";

export interface BusyLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isBusy?: boolean;
  spinnerSize?: SpinnerSize;
  type?: LoaderType;
  color?: LoaderColor;
  speed?: LoaderSpeed;
  children?: React.ReactNode;
  loadingText?: string;
  className?: string;
}

const BusyLoader = forwardRef<HTMLDivElement, BusyLoaderProps>(function BusyLoader(
  {
    isBusy = true,
    spinnerSize = "small",
    type = "spinner",
    color = "primary",
    speed = "normal",
    children,
    loadingText,
    className,
    ...rest
  },
  ref
) {
  const loaderCls = cn(
    styles.busyLoader,
    styles[type],
    styles[spinnerSize],
    styles[`color-${color}`],
    styles[`speed-${speed}`],
    className
  );

  if (!isBusy) {
    return <>{children}</>;
  }

  return (
    <div ref={ref} className={loaderCls} {...rest}>
      {type === "bar" ? (
        <div className={styles.loaderContainer}>
          <div className={styles.bar}>
            <div className={styles.barProgress}></div>
          </div>
          {loadingText && (
            <div className={styles.loadingText}>{loadingText}</div>
          )}
        </div>
      ) : (
        <div className={styles.loaderContainer}>
          {type === "spinner" && (
            <div className={styles.spinner}>
              <div className={styles.spinnerCircle}></div>
            </div>
          )}
          {type === "bubbles" && (
            <div className={styles.bubbles}>
              <div className={styles.bubble}></div>
              <div className={styles.bubble}></div>
              <div className={styles.bubble}></div>
            </div>
          )}
          {loadingText && (
            <div className={styles.loadingText}>{loadingText}</div>
          )}
        </div>
      )}
    </div>
  );
});

export default BusyLoader;

