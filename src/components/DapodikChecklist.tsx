/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DAPODIK_CHECKLIST } from '../data/rulesData';
import { ClipboardCheck, Info, RotateCcw, AlertTriangle } from 'lucide-react';

interface DapodikChecklistProps {
  checkedItems: string[];
  setCheckedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function DapodikChecklist({ checkedItems, setCheckedItems }: DapodikChecklistProps) {

  // Calculate total items
  const totalItemsCount = DAPODIK_CHECKLIST.reduce((sum, section) => sum + section.items.length, 0);
  const checkedCount = checkedItems.length;
  const progressPercent = Math.round((checkedCount / totalItemsCount) * 100);

  const handleToggleItem = (itemId: string) => {
    setCheckedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const handleResetChecklist = () => {
    setCheckedItems([]);
  };

  return (
    <div id="checklist-section" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-lg">Panduan Sinkronisasi Dapodik</h3>
            <p className="text-xs text-slate-500">Checklist kepatuhan operator dan guru untuk memastikan TPG terbit SKTP</p>
          </div>
        </div>
        <button
          onClick={handleResetChecklist}
          className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-slate-50 border border-slate-200 rounded-lg transition duration-200"
          id="btn-reset-checklist"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Progress</span>
        </button>
      </div>

      {/* Progress Card */}
      <div className="bg-slate-50/80 border border-slate-250 p-5 rounded-xl mb-6">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="font-medium text-slate-700">Kesiapan Data Dapodik Anda:</span>
          <span className="font-bold text-emerald-600">{progressPercent}% ({checkedCount} dari {totalItemsCount} item)</span>
        </div>
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          *Checklist ini merupakan panduan praktis berdasarkan pengalaman sinkronisasi dapodik sukses. Centang item yang sudah dipastikan sesuai di aplikasi Dapodik lokal sekolah Anda.
        </p>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-6">
        {DAPODIK_CHECKLIST.map((section) => (
          <div key={section.section} className="border border-slate-200/80 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-250">
              <h4 className="font-bold text-slate-700 text-sm">{section.section}</h4>
            </div>
            <div className="divide-y divide-slate-100">
              {section.items.map((item) => {
                const isChecked = checkedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`p-4 flex items-start space-x-3 cursor-pointer transition duration-150 ${
                      isChecked ? 'bg-emerald-50/20' : 'hover:bg-slate-50/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // Controlled by outer div click
                      className="w-4.5 h-4.5 rounded-md text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer mt-0.5"
                    />
                    <div className="flex-1">
                      <p className={`text-sm ${isChecked ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                        {item.text}
                      </p>
                      {item.tooltip && (
                        <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 mt-1">
                          <Info className="w-3 h-3 text-slate-400" />
                          <span>{item.tooltip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sync Warning */}
      <div className="mt-6 bg-red-50/50 border border-red-100 p-4 rounded-xl flex items-start space-x-2.5">
        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-red-700">Peringatan Sinkronisasi:</span> Pastikan melakukan sinkronisasi Dapodik minimal <span className="font-bold text-red-700">10 hari sebelum akhir bulan cut-off</span> triwulanan (biasanya di akhir Maret, Juni, September, dan Desember) untuk menghindari keterlambatan data mengalir ke Info GTK pusat.
        </p>
      </div>
    </div>
  );
}
