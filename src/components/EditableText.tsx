import React, { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  isDark: boolean;
  className?: string;
  isTextArea?: boolean;
}

export default function EditableText({
  value,
  onSave,
  isDark,
  className = '',
  isTextArea = false,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Mantener el valor temporal sincronizado si cambia desde afuera
  useEffect(() => {
    setTempValue(value || '');
  }, [value]);

  // Manejar el auto-focus e ir al final del texto al abrir
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      const length = (tempValue || '').length;
      if ('setSelectionRange' in inputRef.current) {
        inputRef.current.setSelectionRange(length, length);
      }
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    const trimmed = (tempValue || '').trim();
    if (trimmed !== '' && trimmed !== value) {
      onSave(trimmed);
    } else {
      setTempValue(value || ''); // Revertir al original si está vacío o no cambió
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTextArea) {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setTempValue(value);
    }
  };

  if (isEditing) {
    const inputStyle = `w-full bg-transparent border-b border-[#ff851d] outline-none focus:border-[#ef375c] transition-colors py-0.5 px-1 font-inherit resize-none focus:ring-0 ${
      isDark ? 'text-white' : 'text-gray-900'
    }`;

    return isTextArea ? (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`${inputStyle} ${className}`}
        rows={3}
      />
    ) : (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`${inputStyle} ${className}`}
      />
    );
  }

  return (
    <span
      onDoubleClick={(e) => {
        e.stopPropagation(); // Evitar que el clic active eventos del contenedor (como dar vuelta las tarjetas)
        setIsEditing(true);
      }}
      className={className}
    >
      {value}
    </span>
  );
}
