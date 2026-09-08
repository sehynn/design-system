import React, { forwardRef, useState, useRef, ChangeEvent, DragEvent } from "react";
import cn from "classnames";
import styles from "./style.module.scss";
import Button, { ButtonType } from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import FileItem from "../../atoms/FileItem";
import ProgressBar from "../../atoms/ProgressBar";

export type UploaderAppearance = "default" | "compact";
export type UploadedItemsAppearance = "list" | "grid";
export type CornerRadius = "smooth" | "sharp" | "rounded";

export interface IMetaDataHeader {
  type: string;
  formatter: (date: string) => string;
}

export interface IFileData {
  path: string;
  name: string;
  id: number;
}

export interface IUploadedFile extends File {
  id?: number;
  preview?: string;
  error?: string;
  progress?: number;
  isUploading?: boolean;
}

export interface FileUploaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** metaDataHeaders is an object where type can be "LAST-MODIFIED" and formatter that returns callback function */
  metaDataHeaders?: IMetaDataHeader;
  /** Change files size with any custom string */
  additionalContext?: string;
  /** Browse label text */
  browseLabel?: string;
  /** Choose file label text */
  chooseFileLabel?: string;
  /** Custom headers for fetch request. Example: { 'Content-Type': 'application/json'} */
  customHeaders?: Record<string, string>;
  /** Default data for loaded items */
  data?: IFileData[];
  /** Drag text */
  draggText?: string;
  /** Drop here label text */
  dropHereLabel?: string;
  /** File chosen text */
  fileChosenText?: string;
  /** Upload holder icon */
  icon?: string;
  /** images - an array of URL strings; required for a controlled component */
  images?: string[];
  /** Information message text */
  informationMessage?: string;
  /** initialImages - an array of URL strings. Use to specify the initial value */
  initialImages?: string[];
  /** Loading label text */
  loadingLabel?: string;
  /** No file chosen text */
  noFileChosenText?: string;
  /** Start upload label text */
  startUploadLabel?: string;
  /** Type error message. TYPE_LIST will be replaced with typesList prop */
  typeErrorMsg?: string;
  /** Uploading label */
  uploadingLabel?: string;
  /** Disable type check */
  allTypesAccepted?: boolean;
  /** Get initial state function */
  getInitialState?: () => void;
  /** Immediate upload after selecting or using the "Start Upload" button */
  immediatelyUploadAfterSelect?: boolean;
  /** Activation drugover */
  isActiveDrop?: boolean;
  /** Disable uploader */
  isDisabled?: boolean;
  /** Enable image upload mode */
  isImageUpload?: boolean;
  /** Maximum upload file count */
  maxFileCount?: number;
  /** Max upload file size in bytes */
  maxFileSize?: number;
  /** Show/Hide Download icon */
  showDownloadButton?: boolean;
  /** Show/Hide Preview icon */
  showPreviewButton?: boolean;
  /** Show/Hide Reset icon */
  showResetButton?: boolean;
  /** Show/Hide trash icon */
  showTrash?: boolean;
  /** Delete action to process delete default data */
  deleteAction?: (file: IFileData | IUploadedFile) => void;
  /** File list changes handling */
  onChange?: (files: IUploadedFile[]) => void;
  /** Upload file function */
  upload?: (files: { uploadedFiles: IUploadedFile[]; deletedFiles: IUploadedFile[] }) => Promise<void>;
  /** Control Uploader validation */
  isValid?: boolean;
  /** Show local validation errors */
  showLocalErrors?: boolean;
  /** Size error message. MAX_FILE_SIZE will be replaced with maxFileSize prop */
  sizeErrorMsg?: string;
  /** Upload error text showing in tooltip */
  uploadErrorText?: string;
  /** Set true to hide image name from preview mode */
  hideName?: boolean;
  /** Multi file upload option */
  multiple?: boolean;
  /** Required file */
  required?: boolean;
  /** Array of upload item types */
  typesList?: string[];
  /** Button corner radius */
  cornerRadius?: CornerRadius;
  /** ExtendedInput corner radius */
  inputCornerRadius?: CornerRadius;
  /** Uploaded items appearance */
  uploadedItemsAppearance?: UploadedItemsAppearance;
  /** Uploader appearance */
  uploaderAppearance?: UploaderAppearance;
  /** Show progress bar for overall upload */
  showProgress?: boolean;
  /** Show individual progress bar for each file */
  showIndividualProgress?: boolean;
  /** Additional className */
  className?: string;
}

const noop = () => {};

const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(function FileUploader(
  {
    metaDataHeaders,
    additionalContext,
    browseLabel = "Browse",
    chooseFileLabel = "Upload File",
    customHeaders,
    data = [],
    draggText,
    dropHereLabel = "Drop here",
    fileChosenText,
    icon,
    images,
    informationMessage,
    initialImages,
    loadingLabel = "Uploading...",
    noFileChosenText,
    startUploadLabel = "Start Upload",
    typeErrorMsg = "You can only upload TYPE_LIST File.",
    uploadingLabel,
    allTypesAccepted = true,
    getInitialState,
    immediatelyUploadAfterSelect = true,
    isActiveDrop = false,
    isDisabled = false,
    isImageUpload = false,
    maxFileCount,
    maxFileSize = 5000000,
    showDownloadButton = true,
    showPreviewButton = true,
    showResetButton = true,
    showTrash = true,
    deleteAction,
    onChange = noop,
    upload,
    isValid = true,
    showLocalErrors = false,
    sizeErrorMsg = "File must be smaller than MAX_FILE_SIZE bytes.",
    uploadErrorText = "Upload Error",
    hideName = false,
    multiple,
    required = false,
    typesList = [],
    cornerRadius = "smooth",
    inputCornerRadius,
    uploadedItemsAppearance = "list",
    uploaderAppearance = "default",
    showProgress = true,
    showIndividualProgress = false,
    className,
    ...rest
  },
  ref
) {
  const [uploadedFiles, setUploadedFiles] = useState<IUploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate overall upload progress
  const calculateOverallProgress = (): number => {
    if (uploadedFiles.length === 0) return 0;
    const totalProgress = uploadedFiles.reduce((sum, file) => sum + (file.progress || 0), 0);
    return Math.round(totalProgress / uploadedFiles.length);
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize) {
      return sizeErrorMsg.replace("MAX_FILE_SIZE", maxFileSize.toString());
    }

    // Check file type
    if (!allTypesAccepted && typesList.length > 0) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !typesList.includes(fileExtension)) {
        return typeErrorMsg.replace("TYPE_LIST", typesList.join(", "));
      }
    }

    // Check max file count
    if (maxFileCount && uploadedFiles.length >= maxFileCount) {
      return `Maximum ${maxFileCount} files allowed.`;
    }

    return null;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    processFiles(Array.from(files));
  };

  const processFiles = async (files: File[]) => {
    const newErrors: string[] = [];
    const validFiles: IUploadedFile[] = [];

    files.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        const uploadedFile = file as IUploadedFile;
        uploadedFile.id = Date.now() + Math.random();
        
        // Create preview for images
        if (isImageUpload) {
          uploadedFile.preview = URL.createObjectURL(file);
        }
        
        validFiles.push(uploadedFile);
      }
    });

    setErrors(newErrors);

    if (validFiles.length > 0) {
      const newUploadedFiles = multiple ? [...uploadedFiles, ...validFiles] : validFiles;
      setUploadedFiles(newUploadedFiles);
      onChange(newUploadedFiles);

      if (immediatelyUploadAfterSelect && upload) {
        setIsUploading(true);
        try {
          await upload({ uploadedFiles: newUploadedFiles, deletedFiles: [] });
        } catch (error) {
          console.error("Upload failed:", error);
        } finally {
          setIsUploading(false);
        }
      }
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isActiveDrop && !isDisabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (isDisabled || !isActiveDrop) return;

    const files = event.dataTransfer.files;
    if (files) {
      processFiles(Array.from(files));
    }
  };

  const handleBrowseClick = () => {
    if (!isDisabled) {
      fileInputRef.current?.click();
    }
  };

  const handleDownloadFile = (file: IUploadedFile) => {
    const url = file.preview || URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (!file.preview) {
      URL.revokeObjectURL(url);
    }
  };

  const handleDeleteFile = (fileToDelete: IUploadedFile) => {
    const newUploadedFiles = uploadedFiles.filter(f => f.id !== fileToDelete.id);
    setUploadedFiles(newUploadedFiles);
    onChange(newUploadedFiles);
    
    if (deleteAction) {
      deleteAction(fileToDelete);
    }

    // Revoke object URL for images
    if (fileToDelete.preview) {
      URL.revokeObjectURL(fileToDelete.preview);
    }
  };

  const handleStartUpload = async () => {
    if (upload && uploadedFiles.length > 0) {
      setIsUploading(true);
      try {
        await upload({ uploadedFiles, deletedFiles: [] });
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleReset = () => {
    uploadedFiles.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setUploadedFiles([]);
    setErrors([]);
    onChange([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const containerCls = cn(
    styles.fileUploader,
    styles[`appearance-${uploaderAppearance}`],
    styles[`corner-${cornerRadius}`],
    {
      [styles.disabled]: isDisabled,
      [styles.dragging]: isDragging,
      [styles.invalid]: !isValid,
      [styles.imageMode]: isImageUpload,
    },
    className
  );

  const dropZoneCls = cn(
    styles.dropZone,
    {
      [styles.active]: isDragging && isActiveDrop,
    }
  );

  const uploadedItemsCls = cn(
    styles.uploadedItems,
    styles[`items-${uploadedItemsAppearance}`]
  );

  const formatFileSize = (bytes: number): string => {
    if (additionalContext) return additionalContext;
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileMetadata = (file: IUploadedFile) => {
    if (metaDataHeaders && metaDataHeaders.type === "LAST-MODIFIED") {
      return metaDataHeaders.formatter(file.lastModified.toString());
    }
    return null;
  };

  return (
    <div
      {...rest}
      ref={ref}
      className={containerCls}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        className={styles.fileInput}
        onChange={handleFileChange}
        multiple={multiple}
        disabled={isDisabled}
        accept={typesList.length > 0 ? typesList.map(t => `.${t}`).join(',') : undefined}
      />

      <div className={dropZoneCls}>
        {icon && (
          <div className={styles.uploadIcon}>
            {typeof icon === 'string' ? <Icon type={icon} /> : icon}
          </div>
        )}
        
        <div className={styles.uploadContent}>
          <div className={styles.uploadLabel}>
            {chooseFileLabel}
            {required && <span className={styles.required}>*</span>}
          </div>
          
          {isActiveDrop && (
            <div className={styles.dropLabel}>
              {isDragging ? dropHereLabel : (draggText || `Drag files here or`)}
            </div>
          )}
          
          <Button
            type="button"
            theme={ButtonType.FILL}
            color="info"
            size="md"
            onClick={handleBrowseClick}
            disabled={isDisabled}
            className={styles.browseButton}
          >
            {browseLabel}
          </Button>
          
          {informationMessage && (
            <div className={styles.infoMessage}>{informationMessage}</div>
          )}
        </div>
      </div>

      {showLocalErrors && errors.length > 0 && (
        <div className={styles.errors}>
          {errors.map((error, index) => (
            <div key={index} className={styles.errorMessage}>{error}</div>
          ))}
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className={uploadedItemsCls}>
          {uploadedFiles.map((file) => (
            <div key={file.id} className={styles.fileItemWrapper}>
              <FileItem
                fileName={file.name}
                fileSize={file.size}
                preview={isImageUpload ? file.preview : undefined}
                metadata={getFileMetadata(file) || undefined}
                onPreview={file.preview ? () => window.open(file.preview, '_blank') : undefined}
                onDownload={showDownloadButton ? () => handleDownloadFile(file) : undefined}
                onDelete={() => handleDeleteFile(file)}
                showPreview={showPreviewButton}
                showDownload={showDownloadButton}
                showDelete={showTrash}
                hideName={hideName}
                layout={uploadedItemsAppearance === 'grid' ? 'vertical' : 'horizontal'}
                className={styles.uploadedItem}
              />
              {showIndividualProgress && file.isUploading && (
                <ProgressBar
                  value={file.progress || 0}
                  size="sm"
                  showLabel
                  animated
                  className={styles.fileProgress}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {isUploading && showProgress && (
        <div className={styles.uploadingProgress}>
          <div className={styles.progressLabel}>{loadingLabel}</div>
          <ProgressBar
            value={calculateOverallProgress()}
            size="md"
            showLabel
            animated
            striped
            className={styles.overallProgress}
          />
        </div>
      )}

      {!immediatelyUploadAfterSelect && uploadedFiles.length > 0 && !isUploading && (
        <div className={styles.uploadActions}>
          <Button
            type="button"
            theme={ButtonType.FILL}
            color="info"
            size="md"
            onClick={handleStartUpload}
            disabled={isDisabled}
            className={styles.startUploadButton}
          >
            {startUploadLabel}
          </Button>
          
          {showResetButton && (
            <Button
              type="button"
              theme={ButtonType.OUTLINE}
              color="danger"
              size="md"
              onClick={handleReset}
              disabled={isDisabled}
              className={styles.resetButton}
            >
              Reset
            </Button>
          )}
        </div>
      )}
    </div>
  );
});

export default FileUploader;

