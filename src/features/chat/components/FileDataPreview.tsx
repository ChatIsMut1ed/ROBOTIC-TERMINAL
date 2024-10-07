import { IMAGE_MAX_ZOOM } from "@/global/constants/appConstants";
import { FileDataRef } from "@/global/types/chat/FileData";
import { Tooltip } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconMathSymbols,
  IconX,
} from "@tabler/icons-react";
import React, { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  fileDataRef: FileDataRef[];
  removeFileData?: (index: number, file: FileDataRef) => void;
  readOnly?: boolean;
  allowImageAttachment?: boolean;
}

const FileDataPreview: React.FC<Props> = ({
  fileDataRef,
  removeFileData,
  readOnly = false,
  allowImageAttachment = true,
}) => {
  const [viewedFileIndex, setViewedFileIndex] = useState<number | null>(null);
  const [imageStyle, setImageStyle] = useState<React.CSSProperties>({});

  const determineAndSetImageStyle = (imgElement: HTMLImageElement) => {
    const naturalWidth = imgElement.naturalWidth;
    const naturalHeight = imgElement.naturalHeight;
    const maxWidth = window.innerWidth * 0.8; // 80vw
    const maxHeight = window.innerHeight * 0.8; // 80vh
    const maxZoomFactor = IMAGE_MAX_ZOOM;

    let width = naturalWidth;
    let height = naturalHeight;

    // Calculate the zoom factor needed to fit the image within 80vw or 80vh
    const widthZoomFactor = maxWidth / naturalWidth;
    const heightZoomFactor = maxHeight / naturalHeight;
    const zoomFactor = Math.min(
      widthZoomFactor,
      heightZoomFactor,
      maxZoomFactor
    );

    width = naturalWidth * zoomFactor;
    height = naturalHeight * zoomFactor;

    setImageStyle({ width: `${width}px`, height: `${height}px` });
  };

  const handleRemoveFile = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
    fileRef: FileDataRef
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (removeFileData) {
      removeFileData(index, fileRef);
    }
  };

  const toggleViewFile = (index: number) => {
    if (viewedFileIndex === index) {
      setImageStyle({});
      setViewedFileIndex(null);
    } else {
      setViewedFileIndex(index);
    }
  };

  const handleNextPrev = (direction: "next" | "prev") => {
    if (direction === "next" && viewedFileIndex !== null) {
      const nextIndex =
        viewedFileIndex + 1 < fileDataRef.length ? viewedFileIndex + 1 : 0;
      toggleViewFile(nextIndex);
    } else if (direction === "prev" && viewedFileIndex !== null) {
      const prevIndex =
        viewedFileIndex - 1 >= 0 ? viewedFileIndex - 1 : fileDataRef.length - 1;
      toggleViewFile(prevIndex);
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNextPrev("next");
      } else if (event.key === "ArrowLeft") {
        handleNextPrev("prev");
      } else if (event.key === "Escape") {
        // Close the full view when Escape is pressed
        setViewedFileIndex(null);
      }
    },
    [viewedFileIndex, fileDataRef.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const renderFileData = (fileRef: FileDataRef, index: number) => (
    <div key={index}>
      <div>
        <div>
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            onClick={() => fileRef.fileData && toggleViewFile(index)}
          >
            <span
              style={{ backgroundImage: `url("${fileRef.fileData?.data}")` }}
            >
              {!allowImageAttachment && (
                <Tooltip label={"model-does-not-support-images"}>
                  <span>
                    <IconMathSymbols
                      size={24}
                      style={{
                        color: "rgba(255, 0, 0, 0.75)",
                        right: "50%",
                        top: "50%",
                        transform: "translate(50%, -50%)",
                      }}
                    />
                  </span>
                </Tooltip>
              )}
            </span>
          </button>
        </div>
      </div>
      {!readOnly && (
        <Tooltip label="Remove file">
          <button
            name="remove-file"
            onClick={(e) => handleRemoveFile(e, index, fileRef)}
          >
            <IconX size={24} />
          </button>
        </Tooltip>
      )}
    </div>
  );

  const renderFullViewFile = () =>
    viewedFileIndex !== null &&
    createPortal(
      <div
        onClick={() => setViewedFileIndex(null)}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="relative">
          {viewedFileIndex > 0 && (
            <button
              style={{ width: "48px", height: "48px" }}
              onClick={(e) => {
                e.stopPropagation();
                handleNextPrev("prev");
              }}
            >
              <IconChevronLeft size={24} />
            </button>
          )}
          <img
            src={fileDataRef[viewedFileIndex]?.fileData?.data ?? undefined}
            onLoad={(e) => determineAndSetImageStyle(e.currentTarget)}
            style={{
              ...imageStyle,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
            }}
            alt="Full view"
          />
          {viewedFileIndex < fileDataRef.length - 1 && (
            <button
              style={{ width: "48px", height: "48px" }} // Adjust size as needed
              onClick={(e) => {
                e.stopPropagation();
                handleNextPrev("next");
              }}
            >
              <IconChevronRight size={24} />
            </button>
          )}
        </div>
      </div>,
      document.body
    );

  return (
    <div>
      {fileDataRef.map(renderFileData)}
      {renderFullViewFile()}
    </div>
  );
};

export default FileDataPreview;
