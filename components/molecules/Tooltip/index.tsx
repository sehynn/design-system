import React, { forwardRef, useState, useRef, useEffect } from "react";
import cn from "classnames";
import styles from "./style.module.scss";

export type TooltipPosition = "top" | "right" | "bottom" | "left";
export type TooltipSize = "default" | "small";
export type TooltipScreenType = "desktop" | "mobile";

export interface ICustomPosition {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Any valid React node. */
  children: React.ReactNode;
  /** Main content for the component. */
  text?: string;
  /** Title for the component. */
  title?: string;
  /** Positions where will be displayed the Tooltip relates the child component. */
  position?: TooltipPosition;
  /** The Tooltip component size */
  size?: TooltipSize;
  /** Tooltip padding related to the target element */
  padding?: number;
  /** Control with screenType appearance of component */
  screenType?: TooltipScreenType;
  /** Will display the component in the specified location. */
  customPosition?: ICustomPosition;
  /** In case of false value, the children component will rendered without Tooltip. */
  isVisible?: boolean;
  /** If true the component will be visible without any action. */
  alwaysShow?: boolean;
  /** Style object, to have extra styles. */
  style?: React.CSSProperties;
  /** onClick event */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Additional className */
  className?: string;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  {
    children,
    text,
    title,
    position = "top",
    size = "default",
    padding = 5,
    screenType = "desktop",
    customPosition,
    isVisible = true,
    alwaysShow = false,
    style,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(alwaysShow);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (alwaysShow) {
      setIsOpen(true);
    }
  }, [alwaysShow]);

  if (!isVisible || (!text && !title)) {
    return <>{children}</>;
  }

  const handleMouseEnter = () => {
    if (!alwaysShow) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!alwaysShow) {
      setIsOpen(false);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const containerCls = cn(
    styles.tooltipContainer,
    styles[`screen-${screenType}`],
    className
  );

  const tooltipCls = cn(
    styles.tooltip,
    styles[`position-${position}`],
    styles[`size-${size}`],
    {
      [styles.visible]: isOpen,
      [styles.alwaysShow]: alwaysShow,
    }
  );

  const tooltipStyle: React.CSSProperties = {
    ...style,
    ...customPosition,
  };

  return (
    <div
      {...rest}
      ref={ref}
      className={containerCls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={styles.tooltipTrigger}>{children}</div>
      <div
        ref={tooltipRef}
        className={tooltipCls}
        style={tooltipStyle}
        role="tooltip"
      >
        <div className={styles.tooltipContent}>
          {title && <div className={styles.tooltipTitle}>{title}</div>}
          {text && <div className={styles.tooltipText}>{text}</div>}
        </div>
        <div className={styles.tooltipArrow} />
      </div>
    </div>
  );
});

export default Tooltip;

