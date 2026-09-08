import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./style.module.scss";
import Icon, { IconProps } from "../../atoms/Icon";

export type AlertType = "success" | "info" | "warning" | "error" | "note" | "message";
export type AlertScreenType = "desktop" | "mobile";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Main field to describe alert information. Any valid React node */
  title: React.ReactNode;
  /** Use this field for describing information more verbose. Any valid React node */
  message?: React.ReactNode;
  /** Alert type is for specifying information message to be delivered */
  type?: AlertType;
  /** Same as "Icon" atom props */
  iconProps?: Partial<IconProps>;
  /** Use this prop for replace main "Icon". Note that when the prop is specified "type" prop will not work */
  swapIcon?: React.ReactNode;
  /** The switch between mobile and desktop version of Alert */
  screenType?: AlertScreenType;
  /** Additional classname */
  className?: string;
}

// Default icons for each alert type
const DEFAULT_ICONS: Record<AlertType, string> = {
  success: "check_circle",
  info: "info",
  warning: "warning",
  error: "error",
  note: "note",
  message: "message",
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    title,
    message,
    type = "info",
    iconProps,
    swapIcon,
    screenType,
    className,
    ...rest
  },
  ref
) {
  const containerCls = cn(
    styles.alert,
    styles[`type-${type}`],
    {
      [styles[`screen-${screenType}`]]: screenType,
    },
    className
  );

  const renderIcon = () => {
    if (swapIcon) {
      return <div className={styles.alertIcon}>{swapIcon}</div>;
    }

    const defaultIconType = DEFAULT_ICONS[type];
    return (
      <div className={styles.alertIcon}>
        <Icon 
          type={defaultIconType} 
          {...iconProps}
        />
      </div>
    );
  };

  return (
    <div ref={ref} className={containerCls} role="alert" {...rest}>
      {renderIcon()}
      <div className={styles.alertContent}>
        <div className={styles.alertTitle}>{title}</div>
        {message && <div className={styles.alertMessage}>{message}</div>}
      </div>
    </div>
  );
});

export default Alert;

