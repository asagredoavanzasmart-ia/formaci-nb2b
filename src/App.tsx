import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, ChevronUp, ChevronDown, Menu, X, ChevronLeft, ChevronRight, Sun, Moon, Maximize, Minimize } from 'lucide-react';
import ComplexVenta from './components/ComplexVenta';
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
import SlideEvaluacionEstrategica from './components/SlideEvaluacionEstrategica';
import SlideListaEstrategica from './components/SlideListaEstrategica';


// Orden final solicitado por el usuario
const initialSlides = [
  { id: 'slide-0', title: 'Título' },
  { id: 'slide-simple', title: 'Venta Simple' },
  { id: 'slide-compleja', title: 'Venta Compleja' },
  { id: 'slide-intro', title: 'Introducción' },
  { id: 'slide-cargos-roles', title: 'Cargos vs Roles' },
  { id: 'slide-estrategia', title: 'Estrategia vs Táctica' },
  { id: 'slide-comp-vendedores', title: 'Comparación Vendedores' },
  { id: 'slide-pilares', title: 'Pilares de la Estrategia' },
  { id: 'slide-icp', title: 'Perfil del Cliente Ideal (ICP)' },
  { id: 'slide-icp-tool', title: 'Herramienta ICP' },
  { id: 'slide-roles', title: 'Roles de Compra' },
  { id: 'slide-ident-comprador', title: 'Identificar Comprador' },
  { id: 'slide-gest-tecnico', title: 'Gestionar Comprador Técnico' },
  { id: 'slide-win-perfiles', title: 'Win-Results por Perfil' },
  { id: 'slide-win-preguntas', title: 'Win-Results (Preguntas)' },
  { id: 'slide-superar', title: 'Superar Problemas' },
  { id: 'slide-receptibilidad', title: 'Nivel de Receptividad' },
  { id: 'slide-modos', title: 'Modos de Respuesta' },
  { id: 'slide-banderas', title: 'Banderas Rojas' },
  { id: 'slide-crm', title: 'Pipeline CRM' },
  { id: 'slide-ciclo', title: 'Ciclo Normal de Ventas' },
  { id: 'slide-eval-estrategia', title: 'Evaluación Estratégica (Radar)' },
  { id: 'slide-lista-estrategica', title: 'Lista de Verificación Estratégica' },

  { id: 'slide-aterrizaje', title: 'Aterrizaje y Expansión' }
];

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [slidesOrder, setSlidesOrder] = useState(initialSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const nextSlide = () => {
    if (currentSlideIndex < slidesOrder.length - 1) setCurrentSlideIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(prev => prev - 1);
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

  const currentSlideId = slidesOrder[currentSlideIndex].id;
  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-hidden flex ${isDark ? 'bg-[#0a0a0a] text-[#f8f9fa]' : 'bg-[#e5e7eb] text-[#4f4f4f]'}`}>
      
      {/* Sidebar - Índice convencional y minimalista */}
      <aside 
        className={`transition-all duration-300 z-50 fixed left-0 top-1/2 -translate-y-1/2 ml-4 flex flex-col rounded-2xl border shadow-xl overflow-hidden ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-100'} ${isSidebarOpen ? 'w-60 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-full pointer-events-none'}`}
        style={{ 
          maxHeight: '80vh',
        }}
      >
        <div className="p-3 flex items-center justify-between shrink-0 border-b border-gray-100 dark:border-[#2a2a2a]">
          <h2 className="font-bold text-xs uppercase tracking-widest opacity-50 px-2 pb-0.5">Contenido</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
            <X size={14} />
          </button>
        </div>
        
        {/* Lista de diapositivas tipo link simple */}
        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          <div className="flex flex-col">
            {slidesOrder.map((slide, index) => (
              <button 
                key={slide.id}
                onClick={() => setCurrentSlideIndex(index)}
                className={`flex items-center gap-3 px-4 py-1.5 text-left transition-all relative ${
                  currentSlideIndex === index 
                    ? 'text-[#ef375c] font-bold bg-gradient-to-r from-[#ff851d]/5 to-transparent' 
                    : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <span className={`text-[10px] w-5 shrink-0 tabular-nums ${currentSlideIndex === index ? 'text-[#ff851d]' : 'opacity-30'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[11px] truncate">{slide.title}</span>
                
                {currentSlideIndex === index && (
                  <motion.div 
                    layoutId="activePointer"
                    className="absolute left-0 w-0.5 h-3 bg-gradient-to-b from-[#ff851d] to-[#ef375c] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
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
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 min-h-0 relative">
          
          {/* Contenedor Externo (Solo posicionamiento, sin marco visual) */}
          <div 
            className="relative transition-all duration-500 ease-out"
            style={{
              aspectRatio: '16 / 9',
              width: '100%',
              maxWidth: `calc((100vh - 160px) * 16 / 9)`,
              maxHeight: `calc(100vh - 160px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* 
              Contenedor de Escalado (Capa de Contenido):
              Diseñamos sobre 1280x720 (16:9) y escalamos para llenar el contenedor.
            */}
            <div 
              style={{
                width: '1280px',
                height: '720px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${Math.min(
                  (windowSize.width - (isSidebarOpen ? 360 : 100)) / 1280,
                  (windowSize.height - 180) / 720
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
                {currentSlideId === 'slide-0' && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                      La Realidad Actual: <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
                        Navegando el Laberinto Corporativo
                      </span>
                    </h1>
                    <div className="h-1.5 w-32 mx-auto bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full"></div>
                  </div>
                )}
                {currentSlideId === 'slide-simple' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full max-w-3xl px-12">
                      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        Venta <span className="text-[#ef375c]">Simple</span>
                      </h2>
                      <div className="flex items-center justify-center">
                        <div className={`flex flex-col items-center justify-center rounded-full shadow-lg w-32 h-32 shrink-0 ${isDark ? 'bg-[#2a2a2a] border border-[#3a3a3a]' : 'bg-gray-50 border border-gray-200'}`}>
                          <User size={28} className="mb-1" />
                          <span className="font-bold text-sm">Vendedor</span>
                        </div>
                        <div className="flex-1 mx-6 h-3 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 border-t-4 border-r-4 border-[#ef375c] rotate-45"></div>
                        </div>
                        <div className={`flex flex-col items-center justify-center rounded-full shadow-lg w-32 h-32 shrink-0 ${isDark ? 'bg-[#2a2a2a] border border-[#3a3a3a]' : 'bg-gray-50 border border-gray-200'}`}>
                          <User size={28} className="mb-1" />
                          <span className="font-bold text-sm">Comprador</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {currentSlideId === 'slide-compleja' && <ComplexVenta isDark={isDark} />}
                {currentSlideId === 'slide-intro' && <SlideIntroduccion isDark={isDark} />}
                {currentSlideId === 'slide-cargos-roles' && <SlideCargosVsRoles isDark={isDark} />}
                {currentSlideId === 'slide-estrategia' && <SlideEstrategiaTactica isDark={isDark} />}
                {currentSlideId === 'slide-comp-vendedores' && <Slide9 isDark={isDark} />}
                {currentSlideId === 'slide-pilares' && <SlidePilaresEstrategia isDark={isDark} />}
                {currentSlideId === 'slide-icp' && <SlideICPContent isDark={isDark} />}
                {currentSlideId === 'slide-icp-tool' && <SlideICPTool isDark={isDark} />}
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
                {currentSlideId === 'slide-ciclo' && <SlideCicloVentas isDark={isDark} />}
                {currentSlideId === 'slide-eval-estrategia' && <SlideEvaluacionEstrategica isDark={isDark} />}
                {currentSlideId === 'slide-lista-estrategica' && <SlideListaEstrategica isDark={isDark} />}
                {currentSlideId === 'slide-aterrizaje' && <Slide10 isDark={isDark} />}

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Top Bar - Reubicada al final para estar encima del contenido pero fija a la pantalla */}
        <div className="fixed top-4 left-4 right-4 z-[100] flex justify-between items-center pointer-events-none">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`pointer-events-auto p-2.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border ${isDark ? 'bg-[#1e1e1e]/80 backdrop-blur-md text-white border-[#3a3a3a]' : 'bg-white/80 backdrop-blur-md text-[#4f4f4f] border-gray-200'} ${isSidebarOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3 pointer-events-auto">
            <button 
              onClick={toggleFullscreen}
              className={`p-2.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border ${isDark ? 'bg-[#1e1e1e]/80 backdrop-blur-md text-gray-400 border-[#3a3a3a]' : 'bg-white/80 backdrop-blur-md text-gray-500 border-gray-100'}`}
              title="Pantalla Completa"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border ${isDark ? 'bg-[#1e1e1e]/80 backdrop-blur-md text-orange-400 border-[#3a3a3a]' : 'bg-white/80 backdrop-blur-md text-orange-500 border-gray-100'}`}
              title={isDark ? "Modo Claro" : "Modo Oscuro"}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="h-16 shrink-0 z-40 px-6 flex items-center justify-between">
          <button 
            onClick={prevSlide} 
            disabled={currentSlideIndex === 0}
            className={`group px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-all font-bold text-sm ${
              currentSlideIndex === 0 
                ? 'opacity-0 pointer-events-none' 
                : isDark 
                  ? 'bg-[#2a2a2a] text-white border border-[#4a4a4a] hover:bg-[#3a3a3a] shadow-lg' 
                  : 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 shadow-md'
            }`}
          >
            <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Anterior
          </button>

          <div className="flex items-center gap-2">
            {slidesOrder.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlideIndex(i)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlideIndex === i 
                    ? 'w-8 h-2 bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-sm' 
                    : `w-2 h-2 ${isDark ? 'bg-gray-700 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`
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
    </div>
  );
}
