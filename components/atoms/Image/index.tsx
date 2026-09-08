import React, { forwardRef, useState } from "react";
import cn from "classnames";
import styles from "./style.module.scss";

export interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image path to display */
  src?: string;
  /** The property will render "actions" when "selectMode" is not set to "true". Any valid React node */
  actions?: React.ReactNode;
  /** Empty state text for component */
  emptyText?: string;
  /** Will add a title to the top of Image atom. Any valid React node */
  title?: string;
  /** Native title tooltip shown on hover. Renders as the DOM "title" attribute, so it must be plain text. */
  tooltipTitle?: string;
  /** Will add a border when set to "true" */
  withBorder?: boolean;
  /** The property will add a checkbox and an overlay over the image */
  selectMode?: boolean;
  /** Customize checkbox (will be rendered only when "selectMode" is set to "true") */
  checkboxProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** Additional className */
  className?: string;
  /** Customize image tag with this property */
  imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  /** Image atom also can be included in "Form" organism. It can be validated as other "Form" elements */
  isValid?: boolean;
}

const Image = forwardRef<HTMLDivElement, ImageProps>(function Image(
  {
    src,
    actions,
    emptyText = "No image to display",
    title,
    tooltipTitle,
    withBorder = true,
    selectMode = false,
    checkboxProps,
    className,
    imageProps,
    isValid,
    ...rest
  },
  ref
) {
  const [isSelected, setIsSelected] = useState(false);
  const [imageError, setImageError] = useState(false);

  const containerCls = cn(
    styles.imageContainer,
    {
      [styles.withBorder]: withBorder,
      [styles.selectMode]: selectMode,
      [styles.selected]: isSelected && selectMode,
      [styles.invalid]: isValid === false,
    },
    className
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);
    checkboxProps?.onChange?.(e);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const showEmpty = !src || imageError;

  return (
    <div {...rest} ref={ref} className={containerCls} title={tooltipTitle}>
      {title && <div className={styles.title}>{title}</div>}
      
      <div className={styles.imageWrapper}>
        {showEmpty ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🖼️</span>
            <span className={styles.emptyText}>{emptyText}</span>
          </div>
        ) : (
          <>
            <img
              {...imageProps}
              src={src}
              alt={imageProps?.alt || ""}
              className={cn(styles.image, imageProps?.className)}
              onError={(e) => {
                handleImageError();
                imageProps?.onError?.(e);
              }}
            />
            
            {selectMode && (
              <div className={styles.selectOverlay}>
                <input
                  {...checkboxProps}
                  type="checkbox"
                  checked={isSelected}
                  onChange={handleCheckboxChange}
                  className={cn(styles.checkbox, checkboxProps?.className)}
                />
              </div>
            )}
            
            {!selectMode && actions && (
              <div className={styles.actions}>
                {actions}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default Image;

