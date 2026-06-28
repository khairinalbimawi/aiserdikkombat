/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import ChatSection from './components/ChatSection';
import LinearitySearch from './components/LinearitySearch';
import EligibilityCalculator from './components/EligibilityCalculator';
import DapodikChecklist from './components/DapodikChecklist';
import { MessageSquare, Award, BookOpen, ClipboardCheck, Info, Clock, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'linearity' | 'calculator' | 'checklist'>('chat');
  const [currentDateString, setCurrentDateString] = useState('');

  useEffect(() => {
    // Formatted date in Indonesian
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDateString(new Date().toLocaleDateString('id-ID', options));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Main Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-teal-600/10">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                Asisten TPG SMKPP Bima
                <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  SMKPPN BIMA
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">Konsultasi & Simulasi Tunjangan Profesi Guru SMKPP Negeri Bima</p>
            </div>
          </div>

          {/* Current Date Widget */}
          <div className="flex items-center space-x-2 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full text-xs text-slate-600 font-semibold shadow-3xs">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>{currentDateString || 'Memuat tanggal...'}</span>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="col-span-1 space-y-6">
            
            {/* Nav Menu */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-3">Menu Layanan</span>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition duration-200 ${
                    activeTab === 'chat'
                      ? 'bg-teal-600 text-white shadow-xs shadow-teal-600/10'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                  id="tab-btn-chat"
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span>Konsultasi AI</span>
                </button>

                <button
                  onClick={() => setActiveTab('linearity')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition duration-200 ${
                    activeTab === 'linearity'
                      ? 'bg-teal-600 text-white shadow-xs shadow-teal-600/10'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                  id="tab-btn-linearity"
                >
                  <BookOpen className="w-4 h-4 flex-shrink-0" />
                  <span>Pencarian Linieritas</span>
                </button>

                <button
                  onClick={() => setActiveTab('calculator')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition duration-200 ${
                    activeTab === 'calculator'
                      ? 'bg-teal-600 text-white shadow-xs shadow-teal-600/10'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                  id="tab-btn-calculator"
                >
                  <Award className="w-4 h-4 flex-shrink-0" />
                  <span>Kalkulator Kelayakan</span>
                </button>

                <button
                  onClick={() => setActiveTab('checklist')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition duration-200 ${
                    activeTab === 'checklist'
                      ? 'bg-teal-600 text-white shadow-xs shadow-teal-600/10'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                  id="tab-btn-checklist"
                >
                  <ClipboardCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Panduan Sinkronisasi</span>
                </button>
              </nav>
            </div>

            {/* Reference Links & Portals */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">7 Jurusan Resmi SMKPPN Bima</span>
              <ul className="space-y-2 text-xs font-semibold text-slate-700">
                <li className="flex items-center space-x-2 p-1.5 hover:bg-teal-50 rounded-lg transition">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>Agribisnis Tanaman Pangan & Hortikultura</span>
                </li>
                <li className="flex items-center space-x-2 p-1.5 hover:bg-teal-50 rounded-lg transition">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>Agribisnis Pengolahan Hasil Pertanian</span>
                </li>
                <li className="flex items-center space-x-2 p-1.5 hover:bg-teal-50 rounded-lg transition">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>Agribisnis Ternak Ruminansia</span>
                </li>
                <li className="flex items-center space-x-2 p-1.5 hover:bg-teal-50 rounded-lg transition">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>Agribisnis Ternak Unggas</span>
                </li>
                <li className="flex items-center space-x-2 p-1.5 hover:bg-teal-50 rounded-lg transition">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>Agribisnis Perbenihan Tanaman</span>
                </li>
                <li className="flex items-center space-x-2 p-1.5 hover:bg-teal-50 rounded-lg transition">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>Kesehatan Hewan</span>
                </li>
                <li className="flex items-center space-x-2 p-1.5 hover:bg-teal-50 rounded-lg transition">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>Teknik Reklamasi & Rehabilitasi Hutan</span>
                </li>
              </ul>
            </div>

            {/* Reference Links & Portals */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">Portal Resmi GTK</span>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://info.gtk.kemdikbud.go.id/"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-between text-xs font-semibold text-teal-600 hover:text-teal-700 transition"
                  >
                    <span>Layanan Info GTK</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://dapo.kemdikbud.go.id/"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-between text-xs font-semibold text-teal-600 hover:text-teal-700 transition"
                  >
                    <span>Portal Resmi Dapodik</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://ppg.kemdikbud.go.id/"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-between text-xs font-semibold text-teal-600 hover:text-teal-700 transition"
                  >
                    <span>Direktorat PPG Kemendikbud</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Footnote */}
            <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl text-[11px] text-slate-500 leading-relaxed shadow-3xs">
              <div className="flex items-center space-x-1.5 font-bold text-slate-600 mb-1">
                <Info className="w-3.5 h-3.5 text-teal-600" />
                <span>Rujukan & Lokasi</span>
              </div>
              Asisten ini ditenagai kecerdasan buatan untuk Guru <strong>SMK Pertanian (SMKPP Negeri Bima)</strong>, mengacu pada <strong>Permendikbudristek No 11/2025</strong> (Linieritas) & <strong>Kepmen 222/O/2025</strong> (Ekuivalensi Jam Mengajar Kejuruan).
            </div>

          </div>

          {/* Tab Workspaces */}
          <div className="col-span-1 lg:col-span-3">
            {activeTab === 'chat' && (
              <ChatSection />
            )}

            {activeTab === 'linearity' && (
              <LinearitySearch />
            )}

            {activeTab === 'calculator' && (
              <EligibilityCalculator />
            )}

            {activeTab === 'checklist' && (
              <DapodikChecklist />
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-1">
          <p className="text-xs text-slate-500 font-semibold">
            &copy; 2026 Asisten TPG & Dapodik SMKPP Negeri Bima. Dibuat untuk melayani & mempermudah para pendidik SMKPPN Bima.
          </p>
          <p className="text-xs text-teal-600 font-bold tracking-wide">
            Dikembangkan oleh Tim Digitalisasi Sekolah SMKPP Negeri Bima
          </p>
        </div>
      </footer>
    </div>
  );
}
