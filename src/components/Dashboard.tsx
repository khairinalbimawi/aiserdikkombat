/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Award, BookOpen, ClipboardCheck, MessageSquare, ExternalLink, Calendar, ShieldCheck, Zap, Heart, MapPin, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: 'chat' | 'linearity' | 'calculator' | 'checklist') => void;
  checkedCount: number;
  totalChecklistCount: number;
  calculatorScore: number | null;
}

export default function Dashboard({ onNavigate, checkedCount, totalChecklistCount, calculatorScore }: DashboardProps) {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // 1. Get dynamic greeting based on Indonesian timezone / Bima local hours
    const updateTimeAndGreeting = () => {
      const now = new Date();
      const hrs = now.getHours();
      
      if (hrs >= 4 && hrs < 11) {
        setGreeting('Selamat Pagi 🌅');
      } else if (hrs >= 11 && hrs < 15) {
        setGreeting('Selamat Siang ☀️');
      } else if (hrs >= 15 && hrs < 18) {
        setGreeting('Selamat Sore 🌇');
      } else {
        setGreeting('Selamat Malam 🌌');
      }

      // Format time
      setCurrentTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WITA');

      // Format date
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      setCurrentDate(now.toLocaleDateString('id-ID', options));
    };

    updateTimeAndGreeting();
    const interval = setInterval(updateTimeAndGreeting, 1000);
    return () => clearInterval(interval);
  }, []);

  const progressPercent = totalChecklistCount > 0 ? Math.round((checkedCount / totalChecklistCount) * 100) : 0;

  const JURUSAN_INFO = [
    { code: '401', name: 'ATPH', desc: 'Agribisnis Tanaman Pangan & Hortikultura', color: 'from-emerald-500 to-teal-600', icon: '🌱' },
    { code: '421', name: 'APHP', desc: 'Agribisnis Pengolahan Hasil Pertanian', color: 'from-orange-400 to-amber-500', icon: '🍞' },
    { code: '411', name: 'ATR', desc: 'Agribisnis Ternak Ruminansia', color: 'from-blue-500 to-indigo-600', icon: '🐂' },
    { code: '412', name: 'ATU', desc: 'Agribisnis Ternak Unggas', color: 'from-sky-400 to-blue-500', icon: '🐓' },
    { code: '402', name: 'APT', desc: 'Agribisnis Perbenihan Tanaman', color: 'from-green-400 to-emerald-600', icon: '🌾' },
    { code: '415', name: 'KESWAN', desc: 'Kesehatan Hewan (Veteriner)', color: 'from-rose-500 to-red-600', icon: '🐕' },
    { code: '431', name: 'TRRH', desc: 'Teknik Reklamasi & Rehabilitasi Hutan', color: 'from-teal-600 to-green-700', icon: '🌲' },
  ];

  return (
    <div id="dashboard-tab" className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-linear-to-r from-teal-700 via-teal-600 to-emerald-600 rounded-3xl p-6 text-white shadow-md">
        {/* Ambient background circles */}
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-emerald-400/10 blur-xl"></div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <span className="inline-block bg-white/15 backdrop-blur-md text-teal-100 text-[10px] uppercase font-extrabold px-3 py-1 rounded-full tracking-wider border border-white/10 mb-2">
                Sistem Penyelaras TPG
              </span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">{greeting}, Bapak/Ibu Guru!</h2>
              <p className="text-xs text-teal-100 font-medium max-w-lg mt-1">
                Selamat datang di asisten pintar regulasi sertifikasi dan Dapodik guru untuk <strong>SMKPP Negeri Bima</strong>.
              </p>
            </div>
            {/* Clock Widget inside banner */}
            <div className="bg-black/15 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl text-right shrink-0">
              <p className="text-lg font-mono font-bold tracking-wider leading-none text-emerald-300">{currentTime}</p>
              <p className="text-[10px] text-teal-100 font-semibold mt-1 flex items-center justify-end gap-1">
                <Calendar className="w-3 h-3 text-emerald-300" />
                {currentDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-teal-50 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/5 max-w-fit font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-300 animate-pulse shrink-0" />
            <span>SMKPPN Bima • Jln. Kyai Haji Dewantara, Kota Bima, NTB</span>
          </div>
        </div>
      </div>

      {/* Quick Action Cards / Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Action 1: AI Assistant */}
        <div 
          onClick={() => onNavigate('chat')}
          className="bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-teal-300 p-5 rounded-2xl cursor-pointer transition duration-200 group flex flex-col justify-between shadow-3xs"
          id="card-action-ai"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 group-hover:scale-105 transition">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Konsultasi AI
            </span>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm group-hover:text-teal-700 transition">Asisten Konsultasi AI</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Tanyakan rujukan Permen 11/2025, beban jam mengajar ekuivalen, atau tips Info GTK.
            </p>
            <div className="flex items-center text-teal-600 text-xs font-bold mt-3 group-hover:translate-x-1 transition duration-200">
              <span>Mulai Obrolan</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>

        {/* Action 2: Checklist Progress */}
        <div 
          onClick={() => onNavigate('checklist')}
          className="bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-emerald-300 p-5 rounded-2xl cursor-pointer transition duration-200 group flex flex-col justify-between shadow-3xs"
          id="card-action-checklist"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {progressPercent}% Sinkron
            </span>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition">Panduan Sinkronisasi</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Uji kesiapan data Dapodik sekolah induk dengan checklist interaktif tersimpan.
            </p>
            {/* Simple mini progress bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
              <div className="h-full bg-emerald-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>

        {/* Action 3: Eligibility Calculator */}
        <div 
          onClick={() => onNavigate('calculator')}
          className="bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-indigo-300 p-5 rounded-2xl cursor-pointer transition duration-200 group flex flex-col justify-between shadow-3xs"
          id="card-action-calculator"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:scale-105 transition">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {calculatorScore !== null ? `Skor: ${calculatorScore}%` : 'Uji Sekarang'}
            </span>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-700 transition">Kalkulator Kelayakan TPG</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Simulasi perhitungan jam mengajar (JJM) kumulatif dan tugas tambahan kejuruan.
            </p>
            <div className="flex items-center text-indigo-600 text-xs font-bold mt-3 group-hover:translate-x-1 transition duration-200">
              <span>Hitung Kelayakan</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>

      </div>

      {/* Main Info Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Middle Column (Rules Summary) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Rules Dashboard panel */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs">
            <h3 className="text-slate-850 font-extrabold text-sm md:text-base flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>Regulasi Utama Sertifikasi Guru Vokasi</span>
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/50 flex gap-3.5">
                <span className="text-2xl mt-0.5 shrink-0">📄</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs md:text-sm">Permendikbudristek No. 11 Tahun 2025</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    Aturan penataan linieritas bidang studi sertifikasi pendidik (Serdik). Memperbolehkan ijazah atau sertifikat kejuruan rumpun pertanian linier ke berbagai mata pelajaran kejuruan produktif dan program keahlian baru di SMK.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/50 flex gap-3.5">
                <span className="text-2xl mt-0.5 shrink-0">⚖️</span>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs md:text-sm">Kepmen Kemendikdasmen No. 222/O/2025</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    Menjamin ekuivalensi jam mengajar tambahan di SMK. Guru produktif yang menjabat <strong>Kepala Bengkel Pertanian</strong>, <strong>Kepala Unit Produksi / TEFA</strong>, atau <strong>Kepala Program Keahlian (Kaprog)</strong> diakui ekuivalen <strong>12 JP</strong>, Wali Kelas <strong>2 JP</strong>, dan Koordinator P5 <strong>2 JP per Rombel</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[10.5px] text-slate-400 font-medium">Data diperbarui mengacu pada rilis nasional semester gasal/genap 2026.</p>
              <button 
                onClick={() => onNavigate('linearity')}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 shrink-0"
              >
                <span>Cari Linieritas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 7 Jurusan SMKPPN BIMA Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs">
            <div className="mb-4">
              <h3 className="text-slate-850 font-extrabold text-sm md:text-base flex items-center gap-2">
                <Zap className="w-5 h-5 text-teal-600 animate-pulse" />
                <span>7 Program Keahlian Resmi SMKPP Negeri Bima</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">Sertifikat pendidik dari kode-kode di bawah ini terintegrasi penuh di basis data linieritas asisten.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JURUSAN_INFO.map((jur, i) => (
                <div 
                  key={jur.code}
                  className="p-3.5 rounded-xl border border-slate-150/80 bg-slate-50/50 hover:bg-slate-50 transition duration-150 flex items-start gap-3"
                >
                  <div className={`w-9 h-9 rounded-lg bg-linear-to-tr ${jur.color} flex items-center justify-center text-white text-base shadow-xs shrink-0`}>
                    {jur.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-extrabold text-slate-800 text-xs">{jur.name}</span>
                      <span className="text-[9px] font-bold bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded font-mono">Kode {jur.code}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{jur.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (GTK Portal Links & About) */}
        <div className="space-y-6 col-span-1">
          
          {/* Official Portals Widget */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs">
            <h4 className="text-slate-850 font-extrabold text-xs uppercase tracking-wider text-slate-400 mb-3.5">
              Tautan Portal Resmi GTK
            </h4>
            
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="https://info.gtk.kemdikbud.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-150 bg-slate-50 hover:bg-teal-50/40 hover:border-teal-300 hover:text-teal-700 text-slate-700 transition"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base shrink-0">🔐</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-tight">Layanan Info GTK</p>
                      <p className="text-[9.5px] text-slate-400 truncate mt-0.5">Cek kelayakan & penerbitan SKTP</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </li>
              
              <li>
                <a 
                  href="https://dapo.kemdikbud.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-150 bg-slate-50 hover:bg-teal-50/40 hover:border-teal-300 hover:text-teal-700 text-slate-700 transition"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base shrink-0">📊</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-tight">Portal Resmi Dapodik</p>
                      <p className="text-[9.5px] text-slate-400 truncate mt-0.5">Berita & rilis aplikasi terbaru</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </li>

              <li>
                <a 
                  href="https://ppg.kemdikbud.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-150 bg-slate-50 hover:bg-teal-50/40 hover:border-teal-300 hover:text-teal-700 text-slate-700 transition"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base shrink-0">🎓</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-tight">PPG Kemendikbudristek</p>
                      <p className="text-[9.5px] text-slate-400 truncate mt-0.5">Informasi sertifikasi profesi guru</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick FAQ / School Profile */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-3xs text-xs text-slate-600 leading-relaxed">
            <h4 className="font-bold text-slate-750 mb-2 flex items-center gap-1.5 text-slate-800">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Tim Digitalisasi Sekolah</span>
            </h4>
            <p className="mb-2">
              Aplikasi asisten ini dirawat dan dikembangkan oleh <strong>Tim Digitalisasi Sekolah SMKPP Negeri Bima</strong> untuk mempermudah koordinasi guru produktif dan operator dapodik.
            </p>
            <p className="font-semibold text-teal-700">
              "Keadilan bagi guru dimulai dari keakuratan data Dapodik."
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
