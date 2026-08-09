"use client";

import React, {
  ReactNode,
  useEffect,
  useState,
} from "react";
import { X } from "lucide-react";

interface ModalProps {
  children: ReactNode;

  title?: string;

  /**
   * Controlled mode
   */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  /**
   * Uncontrolled mode
   */
  defaultOpen?: boolean;
  trigger?: ReactNode;
}

const Modal = ({
  children,
  title,
  open,
  onOpenChange,
  defaultOpen = false,
  trigger,
}: ModalProps) => {
  const [internalOpen, setInternalOpen] =
    useState(defaultOpen);

  /**
   * Nếu truyền open thì dùng controlled mode.
   * Nếu không thì dùng internal state.
   */
  const isControlled =
    open !== undefined;

  const isOpen = isControlled
    ? open
    : internalOpen;

  const setOpen = (value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }

    onOpenChange?.(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isOpen]);

  return (
    <>
      {/* Uncontrolled trigger */}
      {trigger && (
        <div
          onClick={() => setOpen(true)}
          className="inline-block"
        >
          {trigger}
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[1px]"
          onMouseDown={handleClose}
        >
          <div
            className="w-full max-w-lg rounded-xl bg-white shadow-2xl"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-semibold text-slate-900">
                {title}
              </h2>

              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
