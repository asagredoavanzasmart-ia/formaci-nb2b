import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, ChevronUp, ChevronDown, Menu, X } from 'lucide-react';
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

const initialSlides = [
  { id: 'slide-0', title: 'Título' },
  { id: 'slide-1', title: 'Introducción' },
  { id: 'slide-2', title: 'Venta Simple' },
  { id: 'slide-3', title: 'Venta Compleja' },
  { id: 'slide-cargos-roles', title: 'Cargos vs Roles' },
  { id: 'slide-estrategia', title: 'Estrategia vs Táctica' },
  { id: 'slide-pilares', title: 'Pilares de la Estrategia' },
  { id: 'slide-roles', title: 'Roles de Compra' },
  { id: 'slide-icp-content', title: 'Perfil del Cliente Ideal (ICP)' },
  { id: 'slide-icp-tool', title: 'Herramienta ICP' },
  { id: 'slide-identificar-comprador', title: 'Identificar Comprador' },
  { id: 'slide-win-results', title: 'Win-Results (Preguntas)' },
  { id: 'slide-win-results-perfiles', title: 'Win-Results por Perfil' },
  { id: 'slide-ciclo-ventas', title: 'Ciclo Normal de Ventas' },
  { id: 'slide-crm-pipeline', title: 'Pipeline CRM' },
  { id: 'slide-4', title: 'Superar Problemas' },
  { id: 'slide-5', title: 'Modos de Respuesta' },
  { id: 'slide-6', title: 'Nivel de Receptividad' },
  { id: 'slide-7', title: 'Banderas Rojas' },
  { id: 'slide-8', title: 'Comparación Vendedores' },
  { id: 'slide-9', title: 'Aterrizaje y Expansión' },
  { id: 'slide-11', title: 'Lista de Verificación' },
  { id: 'slide-12', title: 'Filosofía Ganar-Ganar' }
];

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [slidesOrder, setSlidesOrder] = useState(initialSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    
    // Adjust currentSlideIndex to follow the moved slide if it was the active one
    if (currentSlideIndex === index) {
      setCurrentSlideIndex(index + direction);
    } else if (currentSlideIndex === index + direction) {
      setCurrentSlideIndex(index);
    }
  };

  const currentSlideId = slidesOrder[currentSlideIndex].id;

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-hidden flex ${isDark ? 'bg-[#121212] text-[#f8f9fa]' : 'bg-[#f4f4f5] text-[#4f4f4f]'}`}>
      
      {/* Sidebar */}
      <div className={`transition-all duration-300 flex flex-col border-r z-50 ${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-200'} ${isSidebarOpen ? 'w-72' : 'w-0 border-r-0 overflow-hidden'}`}>
        <div className="p-4 border-b flex items-center justify-between shrink-0 h-20" style={{ borderColor: 'inherit' }}>
          <h2 className="font-bold text-lg whitespace-nowrap">Diapositivas</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-[#3a3a3a] transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar py-2 space-y-0.5">
          {slidesOrder.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`flex items-center gap-1 px-2 py-1.5 transition-colors relative group ${currentSlideIndex === index ? (isDark ? 'bg-white/10' : 'bg-black/5') : (isDark ? 'hover:bg-white/5' : 'hover:bg-black/5')}`}
            >
              {currentSlideIndex === index && (
                <motion.div 
                  layoutId="activeSlideIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff851d] to-[#ef375c] rounded-r-full"
                />
              )}
              <div className="flex flex-col gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => moveSlide(index, -1)} 
                  disabled={index === 0}
                  className={`p-0.5 rounded ${index === 0 ? 'opacity-30' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                >
                  <ChevronUp size={12} />
                </button>
                <button 
                  onClick={() => moveSlide(index, 1)} 
                  disabled={index === slidesOrder.length - 1}
                  className={`p-0.5 rounded ${index === slidesOrder.length - 1 ? 'opacity-30' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                >
                  <ChevronDown size={12} />
                </button>
              </div>
              <button 
                className={`flex-1 text-left text-sm truncate py-1 pl-1 ${currentSlideIndex === index ? 'font-bold' : 'font-medium'}`}
                onClick={() => setCurrentSlideIndex(index)}
              >
                {index + 1}. {slide.title}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <div className="absolute top-6 left-6 right-6 z-50 flex justify-between items-center pointer-events-none">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`pointer-events-auto p-2.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 ${isDark ? 'bg-[#2a2a2a] text-white border border-[#4f4f4f]' : 'bg-white text-[#4f4f4f] border border-gray-200'} ${isSidebarOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
          >
            <Menu size={20} />
          </button>

          <button 
            onClick={() => setIsDark(!isDark)}
            className={`pointer-events-auto px-6 py-2.5 rounded-full font-ubuntu font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2 ${isDark ? 'bg-gradient-to-r from-[#2a2a2a] to-[#3a3a3a] text-white border border-[#4f4f4f]' : 'bg-white text-[#4f4f4f] border border-gray-200'}`}
          >
            <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-[#ff851d]' : 'bg-[#ef375c]'}`}></div>
            {isDark ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>

        <div className="flex-1 relative flex items-center justify-center w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-24 h-full">
          <AnimatePresence mode="wait">
            
            {currentSlideId === 'slide-0' && (
              <motion.div 
                key="slide0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
                  La Realidad Actual: <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c] drop-shadow-sm">
                    Navegando el Laberinto Corporativo
                  </span>
                </h1>
                <div className="h-2 w-48 mx-auto bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-md"></div>
              </motion.div>
            )}

            {currentSlideId === 'slide-1' && (
              <motion.div 
                key="slide1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <SlideIntroduccion isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-2' && (
              <motion.div 
                key="slide2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl"
              >
                <div className={`p-12 sm:p-16 rounded-3xl shadow-2xl relative overflow-hidden ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
                  <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>

                  <h2 className="text-4xl sm:text-5xl font-bold mb-24 flex items-center justify-center gap-4">
                    Venta <span className="text-[#ef375c]">Simple</span>
                  </h2>
                  
                  <div className="w-full flex items-center justify-center relative h-48">
                    <div className={`flex flex-col items-center justify-center rounded-full shadow-2xl w-40 h-40 sm:w-48 sm:h-48 text-xl ${isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] shadow-black/80 border border-[#3a3a3a]' : 'bg-gradient-to-br from-white to-gray-100 shadow-gray-300/80 border border-gray-200'}`}>
                      <User size={32} className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                      <span className="font-ubuntu font-bold text-center px-4 drop-shadow-sm">Vendedor</span>
                    </div>
                    
                    <div className="flex-1 relative mx-8 h-16 flex items-center group max-w-md">
                      <div className="w-full h-3 bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-lg rounded-full transition-all duration-300 group-hover:h-4 group-hover:shadow-[#ef375c]/30"></div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 border-t-8 border-r-8 border-[#ef375c] transform rotate-45 rounded-sm shadow-sm transition-all duration-300 group-hover:border-t-[10px] group-hover:border-r-[10px] group-hover:w-10 group-hover:h-10"></div>
                    </div>

                    <div className={`flex flex-col items-center justify-center rounded-full shadow-2xl w-40 h-40 sm:w-48 sm:h-48 text-xl ${isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] shadow-black/80 border border-[#3a3a3a]' : 'bg-gradient-to-br from-white to-gray-100 shadow-gray-300/80 border border-gray-200'}`}>
                      <User size={32} className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                      <span className="font-ubuntu font-bold text-center px-4 drop-shadow-sm">Comprador</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentSlideId === 'slide-3' && (
              <motion.div 
                key="slide3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <ComplexVenta isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-cargos-roles' && (
              <motion.div 
                key="slide-cargos-roles"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <SlideCargosVsRoles isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-estrategia' && (
              <motion.div 
                key="slide-estrategia"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <SlideEstrategiaTactica isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-pilares' && (
              <motion.div 
                key="slide-pilares"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <SlidePilaresEstrategia isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-roles' && (
              <motion.div 
                key="slide-roles"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <SlideRolesCompra isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-icp-content' && (
              <motion.div 
                key="slide-icp-content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <SlideICPContent isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-icp-tool' && (
              <motion.div 
                key="slide-icp-tool"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <SlideICPTool isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-identificar-comprador' && (
              <motion.div 
                key="slide-identificar-comprador"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <SlideIdentificarComprador isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-win-results' && (
              <motion.div 
                key="slide-win-results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <SlideWinResults isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-win-results-perfiles' && (
              <motion.div 
                key="slide-win-results-perfiles"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <SlideWinResultsPerfiles isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-ciclo-ventas' && (
              <motion.div 
                key="slide-ciclo-ventas"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <SlideCicloVentas isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-crm-pipeline' && (
              <motion.div 
                key="slide-crm-pipeline"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <SlideCRMPipeline isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-4' && (
              <motion.div 
                key="slide4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <Slide5 isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-5' && (
              <motion.div 
                key="slide5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <Slide6 isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-6' && (
              <motion.div 
                key="slide6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <Slide7 isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-7' && (
              <motion.div 
                key="slide7"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <Slide8 isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-8' && (
              <motion.div 
                key="slide8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <Slide9 isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-9' && (
              <motion.div 
                key="slide9"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <Slide10 isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-11' && (
              <motion.div 
                key="slide11"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <Slide12 isDark={isDark} />
              </motion.div>
            )}

            {currentSlideId === 'slide-12' && (
              <motion.div 
                key="slide12"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[600px]"
              >
                <Slide13 isDark={isDark} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-0 left-0 w-full p-6 flex items-center justify-between z-40 bg-gradient-to-t from-black/10 to-transparent dark:from-black/40 pointer-events-none">
          <button 
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className={`pointer-events-auto px-8 py-3 rounded-full font-ubuntu font-bold text-lg shadow-lg transition-all duration-300 ${currentSlideIndex === 0 ? 'opacity-0 pointer-events-none' : isDark ? 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]' : 'bg-white text-[#4f4f4f] hover:bg-gray-50'}`}
          >
            ← Anterior
          </button>

          <div className="flex gap-3 pointer-events-auto flex-wrap justify-center max-w-[50%]">
            {slidesOrder.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentSlideIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlideIndex === i ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] w-8' : isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            disabled={currentSlideIndex === slidesOrder.length - 1}
            className={`pointer-events-auto px-8 py-3 rounded-full font-ubuntu font-bold text-lg shadow-lg transition-all duration-300 ${currentSlideIndex === slidesOrder.length - 1 ? 'opacity-0 pointer-events-none' : isDark ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white hover:shadow-[#ef375c]/30' : 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white hover:shadow-[#ef375c]/40'}`}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}

