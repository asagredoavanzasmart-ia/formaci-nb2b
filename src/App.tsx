import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, HelpCircle, ChevronUp, ChevronDown, Menu, X, ChevronLeft, ChevronRight, Sun, Moon, Maximize, Minimize } from 'lucide-react';

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
import { CompleteICP } from './types';
import logoLight from './Logos/logo horizontal ligth.png';
import logoDark from './Logos/logo horizontal dark.png';



const initialSlides = [
  { id: 'slide-0', title: 'Inicio', level: 2 },
  { id: 'slide-simple-vs-compleja', title: 'Evolución de la Venta', level: 2 },
  { id: 'slide-intro', title: 'Introducción', level: 2 },
  { id: 'slide-estrategia', title: 'Estrategia vs Táctica', level: 2 },
  { id: 'slide-comp-vendedores', title: 'Comparación Vendedores', level: 2 },
  { id: 'slide-pilares', title: 'Pilares de la Estrategia', level: 2 },
  
  { id: 'header-roles', title: 'I. Roles de Influencia', level: 1 },
  { id: 'slide-roles', title: 'Roles de Compra', level: 2 },
  { id: 'slide-ident-comprador', title: 'Identificar Comprador', level: 2 },
  { id: 'slide-gest-tecnico', title: 'Gestionar Comprador técnico', level: 2 },
  { id: 'slide-win-perfiles', title: 'Win-Results por Perfil', level: 2 },
  { id: 'slide-win-preguntas', title: 'Win-Results (Preguntas)', level: 2 },
  
  { id: 'header-icp', title: 'II. ICP + Oferta', level: 1 },
  { id: 'slide-aterrizaje', title: 'Aterrizaje y Expansión', level: 2 },
  { id: 'slide-icp', title: 'Perfil del Cliente Ideal (ICP)', level: 2 },
  { id: 'slide-icp-tool', title: 'Herramienta ICP', level: 2 },
  { id: 'slide-offer-intro', title: 'Creación de la Oferta', level: 2 },
  { id: 'slide-offer-tool', title: 'Herramienta de Oferta', level: 2 },
  
  { id: 'header-redflags', title: 'III. Red Flags y Problemas', level: 1 },
  { id: 'slide-banderas', title: 'Banderas Rojas', level: 2 },
  { id: 'slide-superar', title: 'Superar Problemas', level: 2 },
  
  { id: 'header-modos', title: 'IV. Modos de Respuesta', level: 1 },
  { id: 'slide-receptibilidad', title: 'Nivel de Receptividad', level: 2 },
  { id: 'slide-modos', title: 'Modos de Respuesta', level: 2 },
  
  { id: 'header-proceso', title: 'V. Proceso comercial', level: 1 },
  { id: 'slide-ciclo', title: 'Ciclo Normal de Ventas', level: 2 },
  { id: 'slide-flow-constructor', title: 'Creador de flujos', level: 2 },
  { id: 'slide-crm', title: 'Pipeline CRM', level: 2 },
  { id: 'slide-constructor-crm', title: 'Constructor de Procesos', level: 2 },
  { id: 'slide-lista-estrategica', title: 'Lista de Verificación Estratégica', level: 2 }
];

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [slidesOrder, setSlidesOrder] = useState(initialSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [createdIcps, setCreatedIcps] = useState<CompleteICP[]>([]);
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

  if (!slidesOrder || slidesOrder.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
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
          <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
            <X size={16} />
          </button>
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

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Top Bar - Reubicada al final para estar encima del contenido pero fija a la pantalla */}
        <div className="fixed top-6 left-6 right-6 z-[100] flex justify-between items-center pointer-events-none">
          <div className="flex items-center gap-4 pointer-events-auto">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border ${isDark ? 'bg-[#111111]/80 backdrop-blur-md text-white border-[#3a3a3a]' : 'bg-white/80 backdrop-blur-md text-[#111827] border-gray-200'} ${isSidebarOpen ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'}`}
            >
              <Menu size={20} />
            </button>
          </div>
          <div className="flex items-center gap-3 pointer-events-auto">
            <button 
              onClick={toggleFullscreen}
              className={`p-2.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border ${isDark ? 'bg-[#111111]/80 backdrop-blur-md text-gray-400 border-[#3a3a3a]' : 'bg-white/80 backdrop-blur-md text-gray-500 border-gray-100'}`}
              title="Pantalla Completa"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border ${isDark ? 'bg-[#111111]/80 backdrop-blur-md text-orange-400 border-[#3a3a3a]' : 'bg-white/80 backdrop-blur-md text-orange-500 border-gray-100'}`}
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
    </div>
  );
}
