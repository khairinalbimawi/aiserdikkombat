/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Dashboard from './components/Dashboard';
import ChatSection from './components/ChatSection';
import LinearitySearch from './components/LinearitySearch';
import EligibilityCalculator from './components/EligibilityCalculator';
import DapodikChecklist from './components/DapodikChecklist';
import { DAPODIK_CHECKLIST } from './data/rulesData';
import { 
  Home, 
  MessageSquare, 
  BookOpen, 
  Calculator, 
  ClipboardCheck, 
  Award, 
  Clock, 
  ExternalLink, 
  Info,
  Smartphone,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'linearity' | 'calculator' | 'checklist'>('dashboard');
  const [currentDateString, setCurrentDateString] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Shared state: Dapodik checklist items
  const [checkedItems, setCheckedItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dapodik_checklist_items');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dapodik_checklist_items', JSON.stringify(checkedItems));
    } catch (e) {
      console.error("Failed to save checklist state:", e);
    }
  }, [checkedItems]);

  // 2. Shared state: Calculator score
  const [calculatorScore, setCalculatorScore] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('tpg_calculator_score');
      return saved ? parseInt(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const handleScoreChange = (score: number | null) => {
    setCalculatorScore(score);
    try {
      if (score === null) {
        localStorage.removeItem('tpg_calculator_score');
      } else {
        localStorage.setItem('tpg_calculator_score', score.toString());
      }
    } catch (e) {
      console.error("Failed to save calculator score:", e);
    }
  };

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDateString(new Date().toLocaleDateString('id-ID', options));
  }, []);

  const totalChecklistCount = DAPODIK_CHECKLIST.reduce((sum, section) => sum + section.items.length, 0);
  const checkedCount = checkedItems.length;
  const progressPercent = totalChecklistCount > 0 ? Math.round((checkedCount / totalChecklistCount) * 100) : 0;

  const navigateToTab = (tab: 'dashboard' | 'chat' | 'linearity' | 'calculator' | 'checklist') => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20 md:pb-0 flex flex-col justify-between">
      
      {/* Dynamic Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateToTab('dashboard')}>
            <div className="w-9 h-9 bg-linear-to-tr from-teal-600 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-teal-600/10 transition hover:rotate-6">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm md:text-base font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
                Asisten TPG & Dapodik
                <span className="hidden sm:inline-block text-[9px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded-full font-bold tracking-wider">
                  BIMA
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">SMKPP Negeri Bima</p>
            </div>
          </div>

          {/* Right Header Controls (Tablet/Desktop Info) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Sync Badge */}
            <div className="flex items-center space-x-1.5 bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-700 px-3 py-1.5 rounded-full font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Data Sync Aktif</span>
            </div>

            {/* Platform indicator */}
            <div className="flex items-center space-x-1.5 bg-slate-100 border border-slate-200 text-[11px] text-slate-600 px-3 py-1.5 rounded-full font-bold">
              <Smartphone className="w-3.5 h-3.5 text-slate-500" />
              <span>Android Ready</span>
            </div>
          </div>

          {/* Mobile hamburger menu (just for additional accessibility) */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center space-x-1 bg-emerald-50 border border-emerald-100 text-[10px] text-emerald-700 px-2 py-1 rounded-full font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.div 
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-40 md:hidden p-5 space-y-4"
            >
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Pilih Layanan Utama</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigateToTab('dashboard')}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold gap-2 transition ${
                    activeTab === 'dashboard' ? 'bg-teal-50 border-teal-300 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <Home className="w-5 h-5 text-teal-600" />
                  <span>Beranda</span>
                </button>
                <button
                  onClick={() => navigateToTab('chat')}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold gap-2 transition ${
                    activeTab === 'chat' ? 'bg-teal-50 border-teal-300 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 text-teal-600" />
                  <span>Konsultasi AI</span>
                </button>
                <button
                  onClick={() => navigateToTab('linearity')}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold gap-2 transition ${
                    activeTab === 'linearity' ? 'bg-teal-50 border-teal-300 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  <span>Linieritas</span>
                </button>
                <button
                  onClick={() => navigateToTab('calculator')}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold gap-2 transition ${
                    activeTab === 'calculator' ? 'bg-teal-50 border-teal-300 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <Calculator className="w-5 h-5 text-teal-600" />
                  <span>Kalkulator</span>
                </button>
              </div>
              <button
                onClick={() => navigateToTab('checklist')}
                className={`w-full flex items-center justify-center p-3.5 rounded-xl border text-xs font-bold gap-2 transition ${
                  activeTab === 'checklist' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Panduan Sinkronisasi ({progressPercent}% Selesai)</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Sidebar Navigation (Hidden on mobile bottom bar view, visible on desktop) */}
          <div className="hidden lg:block col-span-1 space-y-6 sticky top-24">
            
            {/* Navigation Workspace Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-2xs">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 block mb-3.5">Menu Utama Layanan</span>
              <nav className="space-y-1.5">
                
                <button
                  onClick={() => navigateToTab('dashboard')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition duration-150 ${
                    activeTab === 'dashboard'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  id="tab-btn-dashboard"
                >
                  <div className="flex items-center space-x-3">
                    <Home className="w-4 h-4 shrink-0" />
                    <span>Beranda Utama</span>
                  </div>
                </button>

                <button
                  onClick={() => navigateToTab('chat')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition duration-150 ${
                    activeTab === 'chat'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  id="tab-btn-chat"
                >
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>Konsultasi AI</span>
                  </div>
                </button>

                <button
                  onClick={() => navigateToTab('linearity')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition duration-150 ${
                    activeTab === 'linearity'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  id="tab-btn-linearity"
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>Pencarian Linieritas</span>
                  </div>
                </button>

                <button
                  onClick={() => navigateToTab('calculator')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition duration-150 ${
                    activeTab === 'calculator'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  id="tab-btn-calculator"
                >
                  <div className="flex items-center space-x-3">
                    <Calculator className="w-4 h-4 shrink-0" />
                    <span>Kalkulator Kelayakan</span>
                  </div>
                  {calculatorScore !== null && (
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                      {calculatorScore}%
                    </span>
                  )}
                </button>

                <button
                  onClick={() => navigateToTab('checklist')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition duration-150 ${
                    activeTab === 'checklist'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  id="tab-btn-checklist"
                >
                  <div className="flex items-center space-x-3">
                    <ClipboardCheck className="w-4 h-4 shrink-0" />
                    <span>Sinkronisasi Dapodik</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    progressPercent === 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'
                  }`}>
                    {progressPercent}%
                  </span>
                </button>

              </nav>
            </div>

            {/* Portal GTK Quicklinks inside sidebar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4.5 shadow-2xs">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-3">Tautan Resmi GTK</span>
              <ul className="space-y-2.5 text-xs font-bold text-slate-700">
                <li>
                  <a href="https://info.gtk.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-teal-600 hover:text-teal-700 transition">
                    <span>Layanan Info GTK</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a href="https://dapo.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-teal-600 hover:text-teal-700 transition">
                    <span>Portal Dapodik</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a href="https://ppg.kemdikbud.go.id/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-teal-600 hover:text-teal-700 transition">
                    <span>Direktorat PPG</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Legal Card */}
            <div className="bg-slate-150/40 border border-slate-200/80 p-4.5 rounded-2xl text-[11px] text-slate-500 leading-relaxed">
              <div className="flex items-center space-x-1.5 font-extrabold text-slate-700 mb-1">
                <Info className="w-3.5 h-3.5 text-teal-600" />
                <span>Rujukan Regulasi</span>
              </div>
              Acuan utama meliputi <strong>Permendikbudristek No 11/2025</strong> (Linieritas Baru) & <strong>Kepmen 222/O/2025</strong> (Ekuivalensi Jam Kerja Kejuruan Pertanian).
            </div>

          </div>

          {/* Active Screen Tab Viewports */}
          <div className="col-span-1 lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                {activeTab === 'dashboard' && (
                  <Dashboard 
                    onNavigate={navigateToTab} 
                    checkedCount={checkedCount} 
                    totalChecklistCount={totalChecklistCount}
                    calculatorScore={calculatorScore}
                  />
                )}

                {activeTab === 'chat' && (
                  <ChatSection />
                )}

                {activeTab === 'linearity' && (
                  <LinearitySearch />
                )}

                {activeTab === 'calculator' && (
                  <EligibilityCalculator onScoreChange={handleScoreChange} />
                )}

                {activeTab === 'checklist' && (
                  <DapodikChecklist checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* Footer (Hidden on Mobile view, visible on desktop) */}
      <footer className="hidden md:block bg-white border-t border-slate-200 py-6 mt-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-1">
          <p className="text-[11px] text-slate-400 font-bold">
            &copy; 2026 Asisten TPG & Dapodik SMKPP Negeri Bima. Dibuat untuk melayani & mempermudah para pendidik SMKPPN Bima.
          </p>
          <p className="text-[10px] text-teal-600 font-extrabold tracking-wide">
            Dikembangkan oleh Tim Digitalisasi Sekolah SMKPP Negeri Bima
          </p>
        </div>
      </footer>

      {/* Bottom Navigation Bar (Exclusive for Mobile / Android viewport native experiences) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 flex items-center justify-around px-2 shadow-lg">
        
        {/* Tab: Home/Beranda */}
        <button
          onClick={() => navigateToTab('dashboard')}
          className={`flex flex-col items-center justify-center w-14 h-full relative transition duration-150 ${
            activeTab === 'dashboard' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'dashboard' && (
            <motion.div layoutId="activeMobileIndicator" className="absolute top-1.5 w-8 h-1 bg-teal-500 rounded-full" />
          )}
          <Home className="w-5.5 h-5.5 mt-2" />
          <span className="text-[9px] font-black tracking-tight mt-1">Beranda</span>
        </button>

        {/* Tab: Chat AI */}
        <button
          onClick={() => navigateToTab('chat')}
          className={`flex flex-col items-center justify-center w-14 h-full relative transition duration-150 ${
            activeTab === 'chat' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'chat' && (
            <motion.div layoutId="activeMobileIndicator" className="absolute top-1.5 w-8 h-1 bg-teal-500 rounded-full" />
          )}
          <MessageSquare className="w-5.5 h-5.5 mt-2" />
          <span className="text-[9px] font-black tracking-tight mt-1">Chat AI</span>
        </button>

        {/* Tab: Linieritas */}
        <button
          onClick={() => navigateToTab('linearity')}
          className={`flex flex-col items-center justify-center w-14 h-full relative transition duration-150 ${
            activeTab === 'linearity' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'linearity' && (
            <motion.div layoutId="activeMobileIndicator" className="absolute top-1.5 w-8 h-1 bg-teal-500 rounded-full" />
          )}
          <BookOpen className="w-5.5 h-5.5 mt-2" />
          <span className="text-[9px] font-black tracking-tight mt-1">Linieritas</span>
        </button>

        {/* Tab: Kalkulator */}
        <button
          onClick={() => navigateToTab('calculator')}
          className={`flex flex-col items-center justify-center w-14 h-full relative transition duration-150 ${
            activeTab === 'calculator' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'calculator' && (
            <motion.div layoutId="activeMobileIndicator" className="absolute top-1.5 w-8 h-1 bg-teal-500 rounded-full" />
          )}
          <Calculator className="w-5.5 h-5.5 mt-2" />
          <span className="text-[9px] font-black tracking-tight mt-1">Kalkulator</span>
        </button>

        {/* Tab: Checklist Sync */}
        <button
          onClick={() => navigateToTab('checklist')}
          className={`flex flex-col items-center justify-center w-14 h-full relative transition duration-150 ${
            activeTab === 'checklist' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {activeTab === 'checklist' && (
            <motion.div layoutId="activeMobileIndicator" className="absolute top-1.5 w-8 h-1 bg-teal-500 rounded-full" />
          )}
          <div className="relative">
            <ClipboardCheck className="w-5.5 h-5.5 mt-2" />
            {progressPercent < 100 && (
              <span className="absolute top-1 -right-1 w-2 h-2 rounded-full bg-orange-500"></span>
            )}
          </div>
          <span className="text-[9px] font-black tracking-tight mt-1">Sync</span>
        </button>

      </div>

    </div>
  );
}
