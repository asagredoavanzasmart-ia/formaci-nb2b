import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, NotebookPen } from 'lucide-react';
import NotasEditor from './NotasEditor';

/**
 * Modal flotante "Guión del presentador" para uso en una sola pantalla.
 * Envuelve <NotasEditor> con la cabecera y el fondo del modal.
 * (Para dos pantallas, ver el "Modo presentador" / PresenterView.)
 */

interface NotasDocenteProps {
  isOpen: boolean;
  onClose: () => void;
  slideId: string;
  slideTitle: string;
  isDark: boolean;
}

export default function NotasDocente({ isOpen, onClose, slideId, slideTitle, isDark }: NotasDocenteProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="notas-docente-modal fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border ${
              isDark ? 'bg-[#161616] border-[#2a2a2a]' : 'bg-white border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Encabezado */}
            <div className={`shrink-0 flex items-center justify-between gap-3 px-5 py-4 border-b ${isDark ? 'border-[#2a2a2a]' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3 min-w-0">
                <span className="p-2 rounded-xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg shrink-0">
                  <NotebookPen size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-widest font-bold text-[#ff851d]">Guión del presentador</p>
                  <h3 className={`text-base md:text-lg font-black truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{slideTitle}</h3>
                </div>
              </div>
              <button onClick={onClose} className={`p-2 rounded-lg transition-colors shrink-0 ${isDark ? 'hover:bg-[#2a2a2a] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`} title="Cerrar" aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>

            {/* Editor reutilizable */}
            <div className="flex-1 min-h-0">
              <NotasEditor slideId={slideId} slideTitle={slideTitle} isDark={isDark} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
