/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface LinearityRule {
  id: string;
  studyFieldCode: string;
  studyFieldName: string; // Bidang Studi Sertifikasi
  subjectName: string; // Mata Pelajaran Linier
  level: 'SD' | 'SMP' | 'SMA' | 'SMK' | 'SLB' | 'Semua';
  regulation: string; // Rujukan regulasi (Permen 11/2025, dll)
}

export interface TaskEquivalence {
  taskName: string;
  hoursEquivalent: number;
  maxSlots: string;
}

export interface EligibilityResult {
  isEligible: boolean;
  score: number; // 0 to 100
  checklist: {
    hasSerdik: { status: boolean; label: string; details: string };
    isDapodikActive: { status: boolean; label: string; details: string };
    hasNRG: { status: boolean; label: string; details: string };
    teachingHours: { status: boolean; label: string; details: string };
    linearity: { status: boolean; label: string; details: string };
    classRatio: { status: boolean; label: string; details: string };
  };
  recommendations: string[];
}
