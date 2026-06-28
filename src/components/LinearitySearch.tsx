/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LINEARITY_RULES } from '../data/rulesData';
import { Search, Filter, BookOpen, AlertCircle } from 'lucide-react';

export default function LinearitySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('SMK');

  const filteredRules = LINEARITY_RULES.filter(rule => {
    const matchesSearch =
      rule.studyFieldName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.studyFieldCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.subjectName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel = selectedLevel === 'Semua' || rule.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  return (
    <div id="linearity-section" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      {/* Title */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl border border-teal-100">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 text-lg">Pencarian Linieritas Mapel (Permen 11/2025)</h3>
          <p className="text-xs text-slate-500">Cek kesesuaian Sertifikat Pendidik (Serdik) dengan mata pelajaran yang Anda ampu</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start space-x-2.5 text-xs text-blue-800 mb-6">
        <AlertCircle className="w-4.5 h-4.5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Informasi Penting Permen 11/2025:</span> Berdasarkan regulasi linieritas terbaru tahun 2025, kesesuaian ijazah dan serdik ditata ulang agar lebih inklusif (termasuk penyesuaian mata pelajaran Informatika dan transisi kurikulum baru). Pastikan kode bidang studi di sertifikat Anda sama dengan yang terinput di Dapodik.
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search input */}
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kode, nama serdik, atau mata pelajaran..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-teal-500 rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:bg-white transition duration-200"
            id="input-search-linearity"
          />
        </div>

        {/* Level Filters */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-slate-500 font-medium mr-2 flex items-center space-x-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Jenjang:</span>
          </span>
          {['Semua', 'SD', 'SMP', 'SMA', 'SMK'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition duration-200 ${
                selectedLevel === lvl
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Table */}
      <div className="overflow-x-auto border border-slate-150 rounded-xl shadow-2xs">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-150 text-slate-600 font-semibold text-xs uppercase tracking-wider">
              <th className="py-3 px-4 w-24">Kode</th>
              <th className="py-3 px-4">Bidang Studi Sertifikasi (Serdik)</th>
              <th className="py-3 px-4">Mata Pelajaran yang Linier</th>
              <th className="py-3 px-4 w-28">Jenjang</th>
              <th className="py-3 px-4">Rujukan Aturan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRules.length > 0 ? (
              filteredRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5 px-4 font-mono text-xs font-bold text-slate-700">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
                      {rule.studyFieldCode}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {rule.studyFieldName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {rule.subjectName}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      rule.level === 'SD' ? 'bg-amber-100 text-amber-800' :
                      rule.level === 'SMP' ? 'bg-blue-100 text-blue-800' :
                      rule.level === 'SMA' ? 'bg-purple-100 text-purple-800' :
                      rule.level === 'SMK' ? 'bg-orange-100 text-orange-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {rule.level}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500 font-medium">
                    {rule.regulation}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 px-4 text-center text-slate-400 text-sm">
                  Tidak ada data linieritas yang cocok dengan pencarian Anda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right">
        <p className="text-[10px] text-slate-400">
          *Daftar di atas adalah rangkuman dari Permendikbudristek No 11/2025. Rujukan utuh silakan tanyakan pada Konsultasi AI.
        </p>
      </div>
    </div>
  );
}
