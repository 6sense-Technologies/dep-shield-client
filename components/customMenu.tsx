import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  anchorRef: React.RefObject<HTMLElement>;
};

const CustomMenu: React.FC<MenuProps> = ({ isOpen, onClose, children, anchorRef }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && !anchorRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  useEffect(() => {
    if (isOpen && anchorRef.current && menuRef.current) {
      const anchorRect = anchorRef.current.getBoundingClientRect();
      menuRef.current.style.top = `${anchorRect.bottom + window.scrollY}px`;
      menuRef.current.style.left = `${anchorRect.left + window.scrollX - 200}px`; // Adjust left position
    }
  }, [isOpen, anchorRef]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div ref={menuRef} className="absolute bg-white rounded-lg shadow-lg w-[254px] z-50">
      {children}
    </div>,
    document.body
  );
};

export default CustomMenu;