import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./style.module.scss";
import Icon from "../Icon";

export type AvatarColor = "default" | "primary" | "info" | "danger" | "neutral";
export type AvatarShape = "circle" | "square";
export type AvatarSize = "small" | "default" | "large";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The property will show first two letters in upper case. This will work when "src" or "icon" are not specified. */
  children?: React.ReactNode;
  /** The property will show icon. This property will work when "src" is not specified. */
  icon?: string;
  /** Background image source */
  src?: string;
  /** Avatar color */
  color?: AvatarColor;
  /** Avatar shape */
  shape?: AvatarShape;
  /** Avatar size */
  size?: AvatarSize;
  /** Handle click event on avatar component */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Additional className */
  className?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    children,
    icon,
    src,
    color = "default",
    shape = "circle",
    size = "default",
    onClick,
    className,
    ...rest
  },
  ref
) {
  const cls = cn(
    styles.avatar,
    styles[`color-${color}`],
    styles[`shape-${shape}`],
    styles[`size-${size}`],
    {
      [styles.clickable]: !!onClick,
    },
    className
  );

  // Extract first two letters from children
  const getInitials = () => {
    if (typeof children === "string") {
      return children.slice(0, 2).toUpperCase();
    }
    return children;
  };

  const renderContent = () => {
    if (src) {
      return (
        <img
          src={src}
          alt="avatar"
          className={styles.image}
        />
      );
    }

    if (icon) {
      return <Icon type={icon} className={styles.icon} />;
    }

    if (children) {
      return <span className={styles.initials}>{getInitials()}</span>;
    }

    return <Icon type="person" className={styles.icon} />;
  };

  return (
    <div
      ref={ref}
      className={cls}
      onClick={onClick}
      {...rest}
    >
      {renderContent()}
    </div>
  );
});

export default Avatar;

