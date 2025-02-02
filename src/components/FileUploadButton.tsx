import React, { useRef } from 'react';

import { AttachmentIcon } from './AttachmentIcon';

export type FileUploadButtonProps = {
  handleFiles: (files: FileList | File[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  accepts?: string | string[];
};

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  disabled = false,
  multiple = false,
  children = <AttachmentIcon />,
  handleFiles,
  accepts,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  let className = 'rfu-file-upload-button';
  if (disabled) {
    className = `${className} rfu-file-upload-button--disabled`;
  }
  return (
    <div className={className}>
      <label>
        <input
          type="file"
          ref={inputRef}
          className="rfu-file-input"
          onChange={(event) => {
            const files = event.currentTarget.files;
            if (files) {
              handleFiles(files);
            }
            if (inputRef.current !== null) {
              inputRef.current.value = '';
              inputRef.current.blur();
            }
          }}
          multiple={multiple}
          disabled={disabled}
          accept={Array.isArray(accepts) ? accepts.join(',') : accepts}
        />
        {children}
      </label>
    </div>
  );
};
