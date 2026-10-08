import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Layers, TrendingUp, Megaphone, Users, Sparkles } from 'lucide-react';
import type { ClaseCatalogo, ClaseIconKey } from '../data/catalogoClases';
import './PortadaRepositorio.css';

const ICONOS_POR_CLAVE: Record<ClaseIconKey, React.ComponentType<{ size?: number }>> = {
  ventas: TrendingUp,
  marketing: Megaphone,
  liderazgo: Users,
  general: Sparkles,
};

interface TarjetaClaseProps {
  clase: ClaseCatalogo;
  /** Cantidad de diapositivas. Si no se conoce, no se muestra el dato. */
  slideCount?: number;
  animationDelay: number;
  onOpen: (classId: string) => void;
}

/** Tarjeta clickeable que representa una clase dentro del repositorio. */
export default function TarjetaClase({ clase, slideCount, animationDelay, onOpen }: TarjetaClaseProps) {
  const Icono = ICONOS_POR_CLAVE[clase.iconKey] ?? ICONOS_POR_CLAVE.general;

  return (
    <motion.button
      type="button"
      id={`btn-abrir-clase-${clase.id}`}
      onClick={() => onOpen(clase.id)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay, duration: 0.5, ease: 'easeOut' }}
      className="portada-card group text-left rounded-3xl p-6 md:p-7 flex flex-col gap-5 cursor-pointer min-w-0"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="portada-gradient w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
          <Icono size={26} />
        </div>
        <span className="portada-chip text-xs uppercase tracking-widest rounded-full px-3 py-1 truncate">
          {clase.category}
        </span>
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        <p className="portada-text-muted text-xs uppercase tracking-widest truncate">{clase.subtitle}</p>
        <h3 className="text-xl md:text-2xl font-black leading-tight tracking-tight">{clase.title}</h3>
        <p className="portada-text-muted text-sm leading-relaxed portada-clamp-3">{clase.description}</p>
      </div>

      <div className="mt-auto pt-4 flex items-center justify-between gap-3">
        {slideCount !== undefined ? (
          <span className="portada-text-muted text-sm flex items-center gap-2">
            <Layers size={16} />
            <strong>{slideCount}</strong> diapositivas
          </span>
        ) : (
          <span />
        )}
        <span className="portada-gradient-text text-sm font-bold flex items-center gap-2">
          Abrir clase
          <ArrowRight
            size={16}
            style={{ color: 'var(--portada-brand-pink)' }}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </motion.button>
  );
}
