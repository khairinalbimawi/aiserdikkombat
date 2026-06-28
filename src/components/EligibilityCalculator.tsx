/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EligibilityResult } from '../types';
import { TASK_EQUIVALENCES } from '../data/rulesData';
import { Calculator, CheckCircle2, XCircle, ChevronRight, RefreshCw, AlertCircle } from 'lucide-react';

interface EligibilityCalculatorProps {
  onScoreChange?: (score: number | null) => void;
}

export default function EligibilityCalculator({ onScoreChange }: EligibilityCalculatorProps) {
  // Form State
  const [hasSerdik, setHasSerdik] = useState<boolean | null>(null);
  const [isDapodikActive, setIsDapodikActive] = useState<boolean | null>(null);
  const [hasNRG, setHasNRG] = useState<boolean | null>(null);
  const [teachingHours, setTeachingHours] = useState<number>(18);
  const [isLinear, setIsLinear] = useState<boolean | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [isRatioMet, setIsRatioMet] = useState<boolean | null>(null);

  // Result state
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const handleToggleTask = (taskName: string) => {
    setSelectedTasks(prev =>
      prev.includes(taskName) ? prev.filter(t => t !== taskName) : [...prev, taskName]
    );
  };

  const calculateEligibility = () => {
    if (hasSerdik === null || isDapodikActive === null || hasNRG === null || isLinear === null || isRatioMet === null) {
      alert("Harap jawab semua pertanyaan terlebih dahulu.");
      return;
    }

    // Calculate total hours
    let taskHours = 0;
    selectedTasks.forEach(taskName => {
      const task = TASK_EQUIVALENCES.find(t => t.taskName === taskName);
      if (task) {
        taskHours += task.hoursEquivalent;
      }
    });

    const totalHours = teachingHours + taskHours;
    const hoursMeet = totalHours >= 24;

    const checklist = {
      hasSerdik: {
        status: !!hasSerdik,
        label: 'Sertifikat Pendidik (Serdik)',
        details: hasSerdik ? 'Mempunyai Serdik resmi.' : 'Belum bersertifikat pendidik (TPG hanya untuk guru bersertifikasi).'
      },
      isDapodikActive: {
        status: !!isDapodikActive,
        label: 'Kekaktifan di Dapodik',
        details: isDapodikActive ? 'Data guru aktif dan terdaftar di rombel sekolah induk.' : 'Guru belum aktif atau belum masuk rombel Dapodik.'
      },
      hasNRG: {
        status: !!hasNRG,
        label: 'Nomor Registrasi Guru (NRG)',
        details: hasNRG ? 'NRG terbit dan valid.' : 'Belum memiliki NRG dari pusat.'
      },
      teachingHours: {
        status: hoursMeet,
        label: `Beban Jam Mengajar (Kumulatif: ${totalHours} Jam)`,
        details: hoursMeet
          ? `Memenuhi syarat minimal 24 jam seminggu (Tatap muka: ${teachingHours} jam + Tugas Tambahan: ${taskHours} jam).`
          : `Kurang ${24 - totalHours} jam untuk mencapai minimal 24 jam (Tatap muka: ${teachingHours} jam + Tugas Tambahan: ${taskHours} jam).`
      },
      linearity: {
        status: !!isLinear,
        label: 'Kesesuaian Linieritas (Permen 11/2025)',
        details: isLinear ? 'Mata pelajaran yang diajar linier dengan bidang studi Serdik.' : 'Mata pelajaran yang diajar TIDAK linier dengan Serdik.'
      },
      classRatio: {
        status: !!isRatioMet,
        label: 'Rasio Minimal Jumlah Siswa',
        details: isRatioMet ? 'Memenuhi rasio minimal per rombel (SD>=15, SMP/SMA>=20 siswa) atau di daerah khusus.' : 'Jumlah siswa di bawah standar rombel nasional.'
      }
    };

    // Calculate score
    let score = 0;
    if (hasSerdik) score += 20;
    if (isDapodikActive) score += 15;
    if (hasNRG) score += 15;
    if (hoursMeet) score += 20;
    if (isLinear) score += 15;
    if (isRatioMet) score += 15;

    const isEligible = hasSerdik && isDapodikActive && hasNRG && hoursMeet && isLinear && isRatioMet;

    // Generate recommendations
    const recommendations: string[] = [];
    if (!hasSerdik) recommendations.push("Segera ikuti seleksi Pendidikan Profesi Guru (PPG) atau seleksi PPG Dalam Jabatan terbaru.");
    if (!isDapodikActive) recommendations.push("Koordinasikan dengan Operator Sekolah untuk memasukkan nama Anda dalam pembagian rombel di Dapodik semester ini.");
    if (!hasNRG) recommendations.push("Pastikan Anda memantau kelulusan PPG dan pengusulan NRG melalui Dinas Pendidikan setempat.");
    if (!hoursMeet) {
      recommendations.push(`Tambahkan jam mengajar atau ajukan tugas tambahan (seperti Wali Kelas, Koordinator P5, atau Pembina Ekstrakurikuler) di Dapodik untuk menambah ekuivalensi jam mengajar sebesar ${24 - totalHours} jam lagi.`);
    }
    if (!isLinear) recommendations.push("Sesuaikan mata pelajaran yang Anda ampu dengan tabel linieritas Permendikbudristek No 11 Tahun 2025.");
    if (!isRatioMet) recommendations.push("Jika jumlah murid kurang, koordinasikan untuk penggabungan kelas (regrouping) atau pastikan sekolah berstatus sekolah khusus/3T yang terdaftar resmi.");

    if (isEligible) {
      recommendations.push("Selamat! Data Anda sangat berpotensi layak. Pertahankan keaktifan dan sinkronisasikan Dapodik secara berkala sebelum tenggat waktu (cut-off).");
    }

    setResult({
      isEligible,
      score,
      checklist,
      recommendations
    });
    if (onScoreChange) {
      onScoreChange(score);
    }
  };

  const handleReset = () => {
    setHasSerdik(null);
    setIsDapodikActive(null);
    setHasNRG(null);
    setTeachingHours(18);
    setIsLinear(null);
    setSelectedTasks([]);
    setIsRatioMet(null);
    setResult(null);
    if (onScoreChange) {
      onScoreChange(null);
    }
  };

  return (
    <div id="calculator-section" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 text-lg">Kalkulator Kelayakan TPG</h3>
          <p className="text-xs text-slate-500">Estimasi kelayakan tunjangan sertifikasi berdasarkan syarat nasional terbaru</p>
        </div>
      </div>

      {!result ? (
        <div className="space-y-6">
          {/* Question Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Q1: Serdik */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <label className="block text-sm font-medium text-slate-700 mb-2">1. Apakah Bapak/Ibu sudah memiliki Sertifikat Pendidik (Serdik)?</label>
              <div className="flex space-x-3">
                <button
                  onClick={() => setHasSerdik(true)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-200 border ${
                    hasSerdik === true
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Ya
                </button>
                <button
                  onClick={() => setHasSerdik(false)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-200 border ${
                    hasSerdik === false
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Belum
                </button>
              </div>
            </div>

            {/* Q2: Dapodik Active */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <label className="block text-sm font-medium text-slate-700 mb-2">2. Apakah data mengajar terdaftar aktif di Dapodik sekolah induk?</label>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsDapodikActive(true)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-200 border ${
                    isDapodikActive === true
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Ya, Aktif
                </button>
                <button
                  onClick={() => setIsDapodikActive(false)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-200 border ${
                    isDapodikActive === false
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Tidak / Belum Tahu
                </button>
              </div>
            </div>

            {/* Q3: NRG */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <label className="block text-sm font-medium text-slate-700 mb-2">3. Apakah sudah memiliki Nomor Registrasi Guru (NRG) resmi?</label>
              <div className="flex space-x-3">
                <button
                  onClick={() => setHasNRG(true)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-200 border ${
                    hasNRG === true
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Ya, Sudah Terbit
                </button>
                <button
                  onClick={() => setHasNRG(false)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-200 border ${
                    hasNRG === false
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Belum / Masih Proses
                </button>
              </div>
            </div>

            {/* Q4: Linearity */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <label className="block text-sm font-medium text-slate-700 mb-2">4. Apakah mata pelajaran di SK mengajar linier dengan Serdik Anda?</label>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsLinear(true)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-200 border ${
                    isLinear === true
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Ya, Sesuai
                </button>
                <button
                  onClick={() => setIsLinear(false)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-200 border ${
                    isLinear === false
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Tidak Linier
                </button>
              </div>
            </div>

            {/* Q5: Teaching Hours slider */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 col-span-1 md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700">5. Berapa Jam Mengajar Tatap Muka murni (JJM) seminggu?</label>
                <span className="text-lg font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-0.5 rounded-lg">{teachingHours} JP</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={teachingHours}
                onChange={(e) => setTeachingHours(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>0 JP</span>
                <span>12 JP</span>
                <span className="font-semibold text-indigo-500">24 JP (Minimal)</span>
                <span>32 JP</span>
                <span>40 JP</span>
              </div>
            </div>

            {/* Q6: Additional Duties checkboxes */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">6. Apakah memiliki tugas tambahan di sekolah? (Centang jika ada)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {TASK_EQUIVALENCES.map((task) => (
                  <button
                    key={task.taskName}
                    type="button"
                    onClick={() => handleToggleTask(task.taskName)}
                    className={`flex items-center justify-between text-left p-2.5 rounded-lg border text-xs transition duration-200 ${
                      selectedTasks.includes(task.taskName)
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-800 font-medium'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{task.taskName}</span>
                    <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-semibold text-[10px]">
                      +{task.hoursEquivalent} JP
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                *Ekuivalensi tugas tambahan sesuai regulasi Kepmen 222/O/2025.
              </p>
            </div>

            {/* Q7: Ratio Met */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">7. Apakah jumlah murid di kelas memenuhi syarat rasio minimal nasional (SD: &gt;=15, SMP/SMA: &gt;=20)?</label>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsRatioMet(true)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-200 border ${
                    isRatioMet === true
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Ya / Di Daerah Khusus 3T
                </button>
                <button
                  onClick={() => setIsRatioMet(false)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition duration-200 border ${
                    isRatioMet === false
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Tidak Memenuhi Minimal
                </button>
              </div>
            </div>

          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={calculateEligibility}
              disabled={hasSerdik === null || isDapodikActive === null || hasNRG === null || isLinear === null || isRatioMet === null}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white disabled:text-slate-400 py-3 px-6 rounded-xl font-medium text-sm transition duration-200 shadow-md"
              id="btn-calculate-eligibility"
            >
              <span>Periksa Kelayakan</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center ${
            result.isEligible ? 'bg-emerald-50 border border-emerald-100' : 'bg-rose-50 border border-rose-100'
          }`}>
            <div className="mb-3">
              {result.isEligible ? (
                <CheckCircle2 className="w-16 h-16 text-emerald-600" />
              ) : (
                <XCircle className="w-16 h-16 text-rose-500" />
              )}
            </div>
            <h4 className="font-bold text-xl text-slate-800">
              {result.isEligible ? 'SANGAT BERPOTENSI LAYAK!' : 'BELUM MEMENUHI SYARAT'}
            </h4>
            <p className="text-sm text-slate-500 mt-1 max-w-md">
              {result.isEligible
                ? 'Seluruh indikator utama terdeteksi valid. Pertahankan sinkronisasi Dapodik Anda.'
                : 'Terdapat beberapa indikator yang belum lolos validasi nasional. Silakan ikuti rekomendasi perbaikan.'}
            </p>

            {/* Score Bar */}
            <div className="w-full max-w-xs mt-4">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1">
                <span>Skor Validitas:</span>
                <span>{result.score}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    result.score >= 80 ? 'bg-emerald-500' : result.score >= 50 ? 'bg-amber-400' : 'bg-rose-500'
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Checklist Report */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
              <h5 className="font-semibold text-slate-700 text-sm">Laporan Hasil Diagnosis</h5>
            </div>
            <div className="divide-y divide-slate-100">
              {Object.entries(result.checklist).map(([key, item]: [string, any]) => (
                <div key={key} className="p-4 flex items-start space-x-3 text-sm">
                  {item.status ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-semibold text-slate-800 block">{item.label}</span>
                    <span className="text-xs text-slate-500">{item.details}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations list */}
          <div className="bg-amber-50/60 border border-amber-100 p-5 rounded-xl">
            <h5 className="font-semibold text-amber-800 text-sm mb-3 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Rekomendasi Langkah Perbaikan:</span>
            </h5>
            <ul className="space-y-2 text-xs text-slate-700">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="bg-amber-200 text-amber-800 font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reset button */}
          <div className="flex justify-end">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 py-2.5 px-5 rounded-xl text-sm font-medium transition duration-200"
              id="btn-recalculate"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Hitung Ulang</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
