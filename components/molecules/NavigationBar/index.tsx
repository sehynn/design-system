import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./style.module.scss";
import Icon from "../../atoms/Icon";
import Button, { ButtonType } from "../../atoms/Button";

export type NavigationPosition = "top" | "bottom";
export type NavigationColor = "primary" | "info" | "danger" | "neutral" | "warning";

export interface INavigationItem {
  /** Unique key for the navigation item */
  key: string;
  /** Icon type */
  icon: string;
  /** Label text (optional) */
  label?: string;
  /** URL to navigate to */
  href?: string;
  /** Click handler (if href is not provided) */
  onClick?: () => void;
  /** Disable the navigation item */
  disabled?: boolean;
}

export interface NavigationBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of navigation items */
  items: INavigationItem[];
  /** Current active item key */
  activeKey?: string;
  /** Show labels below icons */
  showLabels?: boolean;
  /** Active item color */
  activeColor?: NavigationColor;
  /** Position of the navigation bar */
  position?: NavigationPosition;
  /** Navigation handler */
  onNavigate?: (key: string, item: INavigationItem) => void;
  /** Additional className */
  className?: string;
}

const NavigationBar = forwardRef<HTMLElement, NavigationBarProps>(function NavigationBar(
  {
    items,
    activeKey,
    showLabels = true,
    activeColor = "primary",
    position = "bottom",
    onNavigate,
    className,
    ...rest
  },
  ref
) {
  const handleItemClick = (item: INavigationItem) => {
    if (item.disabled) return;

    if (item.onClick) {
      item.onClick();
    }

    if (onNavigate) {
      onNavigate(item.key, item);
    }

    // If href is provided and no custom onClick, navigate using href
    if (item.href && !item.onClick && !onNavigate) {
      window.location.href = item.href;
    }
  };

  const containerCls = cn(
    styles.navigationBar,
    styles[`position-${position}`],
    styles[`color-${activeColor}`],
    className
  );

  const renderItem = (item: INavigationItem) => {
    const isActive = activeKey === item.key;
    
    const itemCls = cn(
      styles.navItem,
      {
        [styles.active]: isActive,
      }
    );

    return (
      <Button
        key={item.key}
        type="button"
        theme={ButtonType.GHOST}
        onClick={() => handleItemClick(item)}
        disabled={item.disabled}
        className={itemCls}
        aria-current={isActive ? 'page' : undefined}
      >
        <div className={styles.navContent}>
          <div className={styles.navIcon}>
            <Icon type={item.icon} />
          </div>
          {showLabels && item.label && (
            <div className={styles.navLabel}>{item.label}</div>
          )}
        </div>
      </Button>
    );
  };

  return (
    <nav
      ref={ref}
      className={containerCls}
      role="navigation"
      aria-label="Main navigation"
      {...rest}
    >
      <div className={styles.navItems}>
        {items.map(renderItem)}
      </div>
    </nav>
  );
});

export default NavigationBar;

