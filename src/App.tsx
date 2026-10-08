import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, HelpCircle, ChevronUp, ChevronDown, Menu, X, ChevronLeft, ChevronRight, Sun, Moon, Maximize, Minimize, Save, LayoutGrid, NotebookPen, Presentation } from 'lucide-react';

import Slide5 from './components/Slide5';
import Slide6 from './components/Slide6';
import Slide7 from './components/Slide7';
import Slide8 from './components/Slide8';
import Slide9 from './components/Slide9';
import Slide10 from './components/Slide10';
import Slide11 from './components/Slide11';
import Slide12 from './components/Slide12';
import Slide13 from './components/Slide13';
import SlideIntroduccion from './components/SlideIntroduccion';
import SlideCargosVsRoles from './components/SlideCargosVsRoles';
import SlideCRMPipeline from './components/SlideCRMPipeline';
import SlideEstrategiaTactica from './components/SlideEstrategiaTactica';
import SlideRolesCompra from './components/SlideRolesCompra';
import SlideICPContent from './components/SlideICPContent';
import SlideICPTool from './components/SlideICPTool';
import SlideIdentificarComprador from './components/SlideIdentificarComprador';
import SlidePilaresEstrategia from './components/SlidePilaresEstrategia';
import SlideWinResults from './components/SlideWinResults';
import SlideWinResultsPerfiles from './components/SlideWinResultsPerfiles';
import SlideCicloVentas from './components/SlideCicloVentas';
import SlideGestionarCompradorTecnico from './components/SlideGestionarCompradorTecnico';
import SlideListaEstrategica from './components/SlideListaEstrategica';
import SlideConstructorCRM from './components/SlideConstructorCRM';
import SlideVentaSimpleVsCompleja from './components/SlideVentaSimpleVsCompleja';
import SlideOfferTool from './components/SlideOfferTool';
import SlideOfferIntro from './components/SlideOfferIntro';
import SlideFlowConstructor from './components/SlideFlowConstructor';
import PortadaRepositorio from './components/PortadaRepositorio';
import ClaseMetodologias from './components/ClaseMetodologias';
import ClaseArquitecturaEquipos from './components/ClaseArquitecturaEquipos';
import ClaseMeddpicc from './components/ClaseMeddpicc';
import ClaseSpin from './components/ClaseSpin';
import ClaseKahneman from './components/ClaseKahneman';
import ClaseChallenger from './components/ClaseChallenger';
import ClaseTrampas from './components/ClaseTrampas';
import NotasDocente from './components/NotasDocente';
import { catalogoClases } from './data/catalogoClases';
import { initialSlides, slidesByClass, slideCountByClassId } from './data/slidesByClass';
import { presenterBus } from './lib/presenterBus';
import { CompleteICP } from './types';
import logoLight from './Logos/logo horizontal ligth.png';
import logoDark from './Logos/logo horizontal dark.png';



export default function App() {
  const [isDark, setIsDark] = useState(false);
  // null = se muestra la portada del repositorio; con id = se muestra esa clase
  const [activeClassId, setActiveClassId] = useState<string | null>(null);
  const [slidesOrder, setSlidesOrder] = useState(initialSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [createdIcps, setCreatedIcps] = useState<CompleteICP[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  // Índice fijado por la ventana de presentador: evita reenviar el cambio en bucle.
  const lastRemoteIndex = useRef<number | null>(null);
  
  const [editedTexts, setEditedTexts] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('B2B_EDITED_TEXTS');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1280, 
    height: typeof window !== 'undefined' ? window.innerHeight : 720 
  });

  // Manejador de redimensión para el escalado dinámico
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Forzar horizontal en móviles mediante API de orientación si es posible
  useEffect(() => {
    const lockOrientation = async () => {
      try {
        if (screen.orientation && (screen.orientation as any).lock) {
          await (screen.orientation as any).lock('landscape');
        }
      } catch (e) {
        console.log('Orientation lock not supported or failed');
      }
    };
    lockOrientation();
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => {
        console.error(`Error attempting to enable full-screen mode: ${e.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // --- Sincronización con la ventana de "Modo presentador" ---
  // Responde al estado que pide la ventana presentador y acepta su navegación.
  useEffect(() => {
    const unsub = presenterBus.subscribe((msg) => {
      if (msg.type === 'request-state') {
        presenterBus.post({ type: 'state', activeClassId, slideIndex: currentSlideIndex, isDark });
      } else if (msg.type === 'navigate') {
        setCurrentSlideIndex((prev) => {
          if (prev === msg.slideIndex) return prev;
          lastRemoteIndex.current = msg.slideIndex;
          return msg.slideIndex;
        });
      }
    });
    return unsub;
  }, [activeClassId, currentSlideIndex, isDark]);

  // Difunde el cambio de diapositiva a la ventana presentador (salvo que el cambio
  // haya venido de ella, para no reenviarlo en bucle).
  useEffect(() => {
    if (lastRemoteIndex.current === currentSlideIndex) {
      lastRemoteIndex.current = null;
      return;
    }
    presenterBus.post({ type: 'navigate', slideIndex: currentSlideIndex });
  }, [currentSlideIndex]);

  // Difunde la clase activa y el tema cuando cambian.
  useEffect(() => {
    presenterBus.post({ type: 'state', activeClassId, slideIndex: currentSlideIndex, isDark });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeClassId, isDark]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Habilitar la edición por doble clic en todos los elementos de texto de forma global
  useEffect(() => {
    const handleDblClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Lista de etiquetas de texto elegibles
      const textTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI', 'STRONG', 'EM', 'B', 'I', 'TD', 'TH'];
      
      // Verificar si el elemento es elegible para ser editado
      if (
        !target ||
        !textTags.includes(target.tagName) ||
        target.contentEditable === 'true' ||
        target.closest('[pointer-events="none"]') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.react-flow') ||
        target.closest('.notas-docente-modal')
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const originalHTML = target.innerHTML;
      
      // Intentar obtener el texto de fábrica
      let originalText = target.getAttribute('data-original-text');
      if (!originalText) {
        originalText = target.innerText.trim();
        target.setAttribute('data-original-text', originalText);
      }

      // Hacer editable
      target.contentEditable = 'true';
      target.setAttribute('spellcheck', 'false');

      // Poner el foco en el elemento
      target.focus();
      
      // Seleccionar todo el texto para edición rápida
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }

      const finishEditing = (save: boolean) => {
        target.contentEditable = 'false';

        if (!save) {
          target.innerHTML = originalHTML; // revertir
        } else {
          const newText = target.innerText.trim();
          if (newText === '') {
            target.innerHTML = originalHTML;
          } else if (newText !== originalText) {
            // Guardar en cambios pendientes
            setPendingChanges(prev => ({
              ...prev,
              [originalText!]: newText
            }));
          }
        }

        // Remover event listeners temporales
        target.removeEventListener('blur', handleBlur);
        target.removeEventListener('keydown', handleKeyDown);
      };

      const handleBlur = () => {
        finishEditing(true);
      };

      const handleKeyDown = (keyEvent: KeyboardEvent) => {
        if (keyEvent.key === 'Enter') {
          // Si es un párrafo largo o descripción (H1-H2 o P), no cancelar el enter a menos que sea una sola línea o se presione Shift
          const singleLineTags = ['SPAN', 'LI', 'STRONG', 'B', 'I', 'TD', 'TH', 'H3', 'H4', 'H5', 'H6'];
          if (singleLineTags.includes(target.tagName) || !keyEvent.shiftKey) {
            keyEvent.preventDefault();
            finishEditing(true);
          }
        } else if (keyEvent.key === 'Escape') {
          keyEvent.preventDefault();
          finishEditing(false);
        }
      };

      target.addEventListener('blur', handleBlur);
      target.addEventListener('keydown', handleKeyDown);
    };

    window.addEventListener('dblclick', handleDblClick);
    return () => {
      window.removeEventListener('dblclick', handleDblClick);
    };
  }, [isDark]);

  // Aplicar las ediciones de texto guardadas en todo el DOM
  useEffect(() => {
    const applySavedTexts = (root: Node) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node: Text | null;
      while ((node = walker.nextNode() as Text | null)) {
        const textVal = node.nodeValue?.trim();
        if (textVal && editedTexts[textVal]) {
          node.nodeValue = node.nodeValue.replace(textVal, editedTexts[textVal]);
        }
      }
    };

    applySavedTexts(document.body);

    // Observer para elementos dinámicos
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          applySavedTexts(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [editedTexts, currentSlideIndex]);

  const saveChangesToDisk = () => {
    const merged = { ...editedTexts, ...pendingChanges };
    setEditedTexts(merged);
    setPendingChanges({});
    localStorage.setItem('B2B_EDITED_TEXTS', JSON.stringify(merged));
    
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 2000);
  };

  const nextSlide = () => {
    if (currentSlideIndex < slidesOrder.length - 1) setCurrentSlideIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(prev => prev - 1);
  };

  // Abre una clase: carga su guion de diapositivas y empieza desde el inicio.
  const openClass = (classId: string) => {
    setSlidesOrder(slidesByClass[classId] ?? initialSlides);
    setCurrentSlideIndex(0);
    setActiveClassId(classId);
  };

  // Abre la ventana de "Modo presentador" en una segunda pantalla.
  const openPresenter = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('present', '1');
    const win = window.open(
      url.toString(),
      'clase-presenter',
      'width=1180,height=800,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes',
    );
    if (win) {
      win.focus();
      // Reenvía el estado por si la ventana aún no se había suscrito al pedirlo.
      window.setTimeout(() => {
        presenterBus.post({ type: 'state', activeClassId, slideIndex: currentSlideIndex, isDark });
      }, 600);
    }
  };

  const moveSlide = (index: number, direction: number) => {
    if (index + direction < 0 || index + direction >= slidesOrder.length) return;
    const newOrder = [...slidesOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index + direction];
    newOrder[index + direction] = temp;
    setSlidesOrder(newOrder);
    
    if (currentSlideIndex === index) {
      setCurrentSlideIndex(index + direction);
    } else if (currentSlideIndex === index + direction) {
      setCurrentSlideIndex(index);
    }
  };

  if (!slidesOrder || slidesOrder.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (activeClassId === null) {
    return (
      <PortadaRepositorio
        isDark={isDark}
        logoSrc={isDark ? logoDark : logoLight}
        catalog={catalogoClases}
        slideCountByClassId={slideCountByClassId}
        onToggleTheme={() => setIsDark(prev => !prev)}
        onOpenClass={openClass}
      />
    );
  }

  const currentSlide = slidesOrder[currentSlideIndex] || slidesOrder[0];
  const currentSlideId = currentSlide.id;

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-hidden flex ${isDark ? 'bg-[#000000] text-[#f8f9fa]' : 'bg-[#f0f2f5] text-[#111827]'}`}>
      
      {/* Sidebar - Ocupa altura completa y empuja el contenido */}
      <aside 
        className={`transition-all duration-300 z-50 flex flex-col h-screen border-r shadow-xl overflow-hidden ${isDark ? 'bg-[#111111] border-[#2a2a2a]' : 'bg-white border-gray-100'} ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
      >
        <div className="p-5 flex items-center justify-between shrink-0 border-b border-gray-100 dark:border-[#2a2a2a]">
          <div className="px-1">
            <img 
              src={isDark ? logoDark : logoLight} 
              alt="Logo Avanza Smart" 
              className="h-7 object-contain"
            />
          </div>
          <div className="flex items-center gap-1">
            <button
              id="btn-volver-portada"
              onClick={() => setActiveClassId(null)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
              title="Volver a la portada"
              aria-label="Volver a la portada"
            >
              <LayoutGrid size={16} />
            </button>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
        
        {/* Lista de diapositivas tipo link simple */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <div className="flex flex-col">
            {slidesOrder.map((slide, index) => {
              const isH1 = slide.level === 1;
              return (
                <button 
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(index)}
                  className={`flex items-center gap-3 px-5 py-2 text-left transition-all relative ${
                    isH1 
                      ? 'mt-6 mb-1' 
                      : 'ml-4'
                  }`}
                  style={{
                    backgroundColor: currentSlideIndex === index ? (isDark ? 'rgba(255,133,29,0.1)' : '#fff7ed') : 'transparent',
                    borderRadius: '12px',
                    marginRight: '12px'
                  }}
                >
                  {!isH1 && (
                    <span 
                      className={`text-[11px] w-5 shrink-0 tabular-nums font-bold`}
                      style={{ color: currentSlideIndex === index ? '#ff851d' : (isDark ? 'rgba(255,255,255,0.3)' : '#000000') }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  )}
                  <span 
                    className={`${isH1 ? 'text-[11px] uppercase tracking-[0.1em]' : 'text-[14px]'} font-bold truncate`}
                    style={{ 
                      color: currentSlideIndex === index ? '#ef375c' : (isH1 ? (isDark ? '#ffffff' : '#000000') : (isDark ? 'rgba(255,255,255,0.7)' : '#000000')),
                      letterSpacing: isH1 ? '0.05em' : 'normal'
                    }}
                  >
                    {slide.title}
                  </span>
                  
                  {currentSlideIndex === index && (
                    <motion.div 
                      layoutId="activePointer"
                      className="absolute left-0 w-1 h-4 bg-gradient-to-b from-[#ff851d] to-[#ef375c] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Acceso al guion del docente (apuntes por diapositiva) */}
        <div className={`shrink-0 p-4 border-t flex flex-col gap-2 ${isDark ? 'border-[#2a2a2a]' : 'border-gray-100'}`}>
          <button
            id="btn-modo-presentador"
            onClick={openPresenter}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-lg shadow-red-500/20 hover:shadow-xl hover:scale-[1.02] transition-all"
            title="Abrir el guion en una segunda pantalla (modo presentador)"
          >
            <Presentation size={16} />
            Modo presentador
          </button>
          <button
            id="btn-guion-docente"
            onClick={() => setIsNotesOpen(true)}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold border transition-all ${
              isDark ? 'border-[#3a3a3a] text-gray-300 hover:bg-[#2a2a2a]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
            title="Ver el guión en esta misma pantalla"
          >
            <NotebookPen size={16} />
            Ver guión aquí
          </button>
        </div>
      </aside>


      {/* Main Content */}
      <div className="flex-1 relative flex flex-col h-screen overflow-hidden">
        
        {/* 
          Escenario de la Diapositiva:
          Mantiene un ratio FIJO de 16:9.
          Utilizamos un sistema de escalado (transform: scale) para que el contenido
          interno se diseñe sobre una base de 1280x720 y se adapte al espacio disponible.
        */}
        <div className="flex-1 flex items-center justify-center p-0 md:p-8 min-h-0 relative">
          
          <div 
            className="relative transition-all duration-500 ease-out w-full h-full flex items-center justify-center p-0"
          >
            {/* 
              Contenedor de Escalado (Capa de Contenido):
              Diseñamos sobre 1280x720 (16:9) y escalamos para llenar el contenedor.
            */}
            <div 
              style={currentSlideId === 'slide-flow-constructor' ? {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'auto'
              } : {
                width: '1280px',
                height: '720px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${Math.min(
                  (windowSize.width - (windowSize.width < 768 ? 40 : (isSidebarOpen ? 320 : 80))) / 1280,
                  (windowSize.height - (windowSize.width < 768 ? 60 : 120)) / 720
                )})`,
                transformOrigin: 'center center',
                pointerEvents: 'auto'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                {/* Renderizado de Slides de Nivel 1 (Encabezados) */}
                {slidesOrder[currentSlideIndex].level === 1 && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-16 rounded-[4rem] border-4 ${isDark ? 'bg-[#111111] border-[#2a2a2a] shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}
                    >
                      <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter flex flex-wrap justify-center gap-x-4">
                        <span className={isDark ? 'text-white/50' : 'text-gray-900'}>
                          {slidesOrder[currentSlideIndex].title.split(' ').slice(0, Math.ceil(slidesOrder[currentSlideIndex].title.split(' ').length / 2)).join(' ')}
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
                          {slidesOrder[currentSlideIndex].title.split(' ').slice(Math.ceil(slidesOrder[currentSlideIndex].title.split(' ').length / 2)).join(' ')}
                        </span>
                      </h1>
                      <div className="h-2 w-48 mx-auto bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full"></div>
                    </motion.div>
                  </div>
                )}

                {currentSlideId === 'slide-0' && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center">
                    <motion.img 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      src={isDark ? logoDark : logoLight} 
                      alt="Logo Avanza Smart" 
                      className="h-20 md:h-24 object-contain mb-8"
                    />
                    <h1 className={`text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      FORMACIÓN ESTRATÉGICA
                    </h1>
                    <h2 className={`text-2xl md:text-4xl font-bold mb-12 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                      Ventas B2B de Alto Impacto
                    </h2>
                    <div className="h-1.5 w-48 mx-auto bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20"></div>
                  </div>
                )}
                {currentSlideId === 'slide-simple-vs-compleja' && <SlideVentaSimpleVsCompleja isDark={isDark} />}
                {currentSlideId === 'slide-intro' && <SlideIntroduccion isDark={isDark} />}
                {currentSlideId === 'slide-estrategia' && <SlideEstrategiaTactica isDark={isDark} />}
                {currentSlideId === 'slide-comp-vendedores' && <Slide9 isDark={isDark} />}
                {currentSlideId === 'slide-pilares' && <SlidePilaresEstrategia isDark={isDark} />}
                {currentSlideId === 'slide-icp' && <SlideICPContent isDark={isDark} />}
                {currentSlideId === 'slide-icp-tool' && (
                  <SlideICPTool 
                    isDark={isDark} 
                    onIcpCreated={(icp) => setCreatedIcps(prev => [...prev, icp])}
                    savedIcps={createdIcps}
                  />
                )}
                {currentSlideId === 'slide-offer-intro' && <SlideOfferIntro isDark={isDark} />}
                {currentSlideId === 'slide-offer-tool' && <SlideOfferTool isDark={isDark} icps={createdIcps} />}
                {currentSlideId === 'slide-roles' && <SlideRolesCompra isDark={isDark} />}
                {currentSlideId === 'slide-ident-comprador' && <SlideIdentificarComprador isDark={isDark} />}
                {currentSlideId === 'slide-gest-tecnico' && <SlideGestionarCompradorTecnico isDark={isDark} />}
                {currentSlideId === 'slide-win-perfiles' && <SlideWinResultsPerfiles isDark={isDark} />}
                {currentSlideId === 'slide-win-preguntas' && <SlideWinResults isDark={isDark} />}
                {currentSlideId === 'slide-superar' && <Slide5 isDark={isDark} />}
                {currentSlideId === 'slide-receptibilidad' && <Slide7 isDark={isDark} />}
                {currentSlideId === 'slide-modos' && <Slide6 isDark={isDark} />}
                {currentSlideId === 'slide-banderas' && <Slide8 isDark={isDark} />}
                {currentSlideId === 'slide-crm' && <SlideCRMPipeline isDark={isDark} />}
                {currentSlideId === 'slide-constructor-crm' && <SlideConstructorCRM isDark={isDark} />}
                {currentSlideId === 'slide-flow-constructor' && <SlideFlowConstructor isDark={isDark} />}
                {currentSlideId === 'slide-ciclo' && <SlideCicloVentas isDark={isDark} />}
                {currentSlideId === 'slide-lista-estrategica' && <SlideListaEstrategica isDark={isDark} />}
                {currentSlideId === 'slide-aterrizaje' && <Slide10 isDark={isDark} />}

                {/* Clase "La Ciencia de Vender": todas las diapositivas de contenido (mv-*) */}
                {currentSlideId.startsWith('mv-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseMetodologias slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Arquitectura de Equipos de Ventas": diapositivas de contenido (eq-*) */}
                {currentSlideId.startsWith('eq-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseArquitecturaEquipos slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "MEDDPICC: calificar con rigor": diapositivas de contenido (md-*) */}
                {currentSlideId.startsWith('md-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseMeddpicc slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "SPIN Selling": diapositivas de contenido (sp-*) */}
                {currentSlideId.startsWith('sp-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseSpin slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Pensar rápido, pensar despacio": diapositivas de contenido (kn-*) */}
                {currentSlideId.startsWith('kn-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseKahneman slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "El Vendedor Desafiante": diapositivas de contenido (ch-*) */}
                {currentSlideId.startsWith('ch-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseChallenger slideId={currentSlideId} isDark={isDark} />
                )}

                {/* Clase "Las Trampas del Deseo": diapositivas de contenido (td-*) */}
                {currentSlideId.startsWith('td-') && slidesOrder[currentSlideIndex].level !== 1 && (
                  <ClaseTrampas slideId={currentSlideId} isDark={isDark} />
                )}

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="fixed top-6 left-6 right-6 z-[100] flex justify-between items-start pointer-events-none">
          <div className="flex items-center gap-4 pointer-events-auto">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border ${isDark ? 'bg-[#111111]/80 backdrop-blur-md text-white border-[#3a3a3a]' : 'bg-white/80 backdrop-blur-md text-[#111827] border-gray-200'} ${isSidebarOpen ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'}`}
            >
              <Menu size={20} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-3 pointer-events-auto">
            <button 
              onClick={toggleFullscreen}
              className="p-2.5 rounded-full shadow-md bg-white hover:bg-gray-50 border border-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110"
              title="Pantalla Completa"
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
            {/* Botón de Guardar Cambios */}
            <button 
              onClick={saveChangesToDisk}
              className={`p-2.5 rounded-full shadow-md bg-white hover:bg-gray-50 border border-gray-100 transition-all duration-300 hover:scale-110 ${
                isSavedFeedback
                  ? 'text-green-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Guardar todos los cambios"
              id="btn-save-changes"
            >
              <Save size={18} />
            </button>
          </div>
        </div>

        {/* Botones de Navegación Flotantes (Solo en Móvil/Responsive) */}
        <div className="md:hidden contents">
          <button 
            onClick={prevSlide} 
            disabled={currentSlideIndex === 0}
            className={`fixed left-4 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full shadow-2xl transition-all border ${
              currentSlideIndex === 0 
                ? 'opacity-0 pointer-events-none' 
                : isDark 
                  ? 'bg-[#111111]/90 backdrop-blur-md text-white border-[#3a3a3a]' 
                  : 'bg-white/90 backdrop-blur-md text-[#111827] border-gray-200'
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            onClick={nextSlide} 
            disabled={currentSlideIndex === slidesOrder.length - 1}
            className={`fixed right-4 top-1/2 -translate-y-1/2 z-[110] p-3 rounded-full shadow-2xl transition-all border ${
              currentSlideIndex === slidesOrder.length - 1
                ? 'opacity-0 pointer-events-none' 
                : 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white border-transparent'
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Footer Navigation (Oculto en móvil, visible en Desktop) */}
        <div className="hidden md:flex h-16 shrink-0 z-40 px-6 items-center justify-between">
          <button 
            onClick={prevSlide} 
            disabled={currentSlideIndex === 0}
            className={`group px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-all font-bold text-sm ${
              currentSlideIndex === 0 
                ? 'opacity-0 pointer-events-none' 
                : isDark 
                  ? 'bg-[#181818] text-white border border-[#4a4a4a] hover:bg-[#3a3a3a] shadow-lg' 
                  : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-md font-bold'
            }`}
          >
            <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Anterior
          </button>

          <div className="flex items-center gap-2">
            {slidesOrder.map((slide, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlideIndex(i)}
                className={`transition-all duration-300 ${
                  slide.level === 1 
                    ? currentSlideIndex === i 
                      ? 'w-4 h-4 rounded-md bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-lg' 
                      : `w-3 h-3 rounded-md border-2 ${isDark ? 'border-gray-700 bg-transparent' : 'border-gray-300 bg-transparent'}`
                    : currentSlideIndex === i 
                      ? 'w-8 h-2 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-lg' 
                      : `w-2 h-2 rounded-full ${isDark ? 'bg-white/20 hover:bg-white/40' : 'bg-gray-300 hover:bg-gray-400'}`
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide} 
            disabled={currentSlideIndex === slidesOrder.length - 1}
            className={`group px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-all font-bold text-sm ${
              currentSlideIndex === slidesOrder.length - 1
                ? 'opacity-0 pointer-events-none'
                : 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40'
            }`}
          >
            Siguiente
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Modal flotante con el guion del docente para la diapositiva actual */}
      <NotasDocente
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        slideId={currentSlideId}
        slideTitle={currentSlide.title}
        isDark={isDark}
      />

    </div>
  );
}
