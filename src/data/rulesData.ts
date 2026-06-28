/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LinearityRule, TaskEquivalence } from '../types';

export const LINEARITY_RULES: LinearityRule[] = [
  // SD Level
  {
    id: 'sd-1',
    studyFieldCode: '027',
    studyFieldName: 'Guru Kelas SD',
    subjectName: 'Guru Kelas (Tematik / Matematika / IPA / IPS / B. Indonesia / PPKn)',
    level: 'SD',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'sd-2',
    studyFieldCode: '220',
    studyFieldName: 'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)',
    subjectName: 'PJOK / Pendidikan Jasmani',
    level: 'SD',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'sd-3',
    studyFieldCode: '158',
    studyFieldName: 'Bahasa Inggris',
    subjectName: 'Bahasa Inggris (Muatan Lokal / Mata Pelajaran Pilihan SD)',
    level: 'SD',
    regulation: 'Permendikbudristek No. 11/2025 & Kepmen 221/P/2025'
  },
  {
    id: 'sd-4',
    studyFieldCode: '217',
    studyFieldName: 'Seni Rupa / Seni Musik / Seni Tari / Seni Teater',
    subjectName: 'Seni Budaya / Seni Pilihan',
    level: 'SD',
    regulation: 'Permendikbudristek No. 11/2025'
  },

  // SMP Level
  {
    id: 'smp-1',
    studyFieldCode: '157',
    studyFieldName: 'Matematika',
    subjectName: 'Matematika',
    level: 'SMP',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'smp-2',
    studyFieldCode: '156',
    studyFieldName: 'Bahasa Indonesia',
    subjectName: 'Bahasa Indonesia',
    level: 'SMP',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'smp-3',
    studyFieldCode: '158',
    studyFieldName: 'Bahasa Inggris',
    subjectName: 'Bahasa Inggris',
    level: 'SMP',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'smp-4',
    studyFieldCode: '097',
    studyFieldName: 'Ilmu Pengetahuan Alam (IPA)',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    level: 'SMP',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'smp-5',
    studyFieldCode: '100',
    studyFieldName: 'Ilmu Pengetahuan Sosial (IPS)',
    subjectName: 'Ilmu Pengetahuan Sosial (IPS)',
    level: 'SMP',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'smp-6',
    studyFieldCode: '154',
    studyFieldName: 'Pendidikan Pancasila dan Kewarganegaraan (PPKn)',
    subjectName: 'Pendidikan Pancasila',
    level: 'SMP',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'smp-7',
    studyFieldCode: '224',
    studyFieldName: 'Informatika',
    subjectName: 'Informatika / Teknologi Informasi dan Komunikasi',
    level: 'SMP',
    regulation: 'Permendikbudristek No. 11/2025 & Kepmen 221/P/2025'
  },
  {
    id: 'smp-8',
    studyFieldCode: '110',
    studyFieldName: 'Bimbingan dan Konseling (BK)',
    subjectName: 'Bimbingan Konseling / Konselor',
    level: 'SMP',
    regulation: 'Permendikbudristek No. 11/2025'
  },

  // SMA/SMK Level
  {
    id: 'sma-1',
    studyFieldCode: '180',
    studyFieldName: 'Fisika',
    subjectName: 'Fisika / Projek IPAS',
    level: 'SMA',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'sma-2',
    studyFieldCode: '184',
    studyFieldName: 'Kimia',
    subjectName: 'Kimia / Projek IPAS',
    level: 'SMA',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'sma-3',
    studyFieldCode: '190',
    studyFieldName: 'Biologi',
    subjectName: 'Biologi / Projek IPAS',
    level: 'SMA',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'sma-4',
    studyFieldCode: '207',
    studyFieldName: 'Geografi',
    subjectName: 'Geografi',
    level: 'SMA',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'sma-5',
    studyFieldCode: '210',
    studyFieldName: 'Ekonomi',
    subjectName: 'Ekonomi / Prakarya dan Kewirausahaan',
    level: 'SMA',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'sma-6',
    studyFieldCode: '204',
    studyFieldName: 'Sejarah',
    subjectName: 'Sejarah / Sejarah Indonesia',
    level: 'SMA',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'sma-7',
    studyFieldCode: '214',
    studyFieldName: 'Sosiologi',
    subjectName: 'Sosiologi',
    level: 'SMA',
    regulation: 'Permendikbudristek No. 11/2025'
  },
  {
    id: 'smk-atph',
    studyFieldCode: '401',
    studyFieldName: 'Agribisnis Tanaman Pangan & Hortikultura (ATPH)',
    subjectName: 'Dasar-dasar Agribisnis Tanaman / Agribisnis Tanaman Pangan / Agribisnis Tanaman Hortikultura / Pembibitan Tanaman',
    level: 'SMK',
    regulation: 'Permendikbudristek No. 11/2025 (SMKPP Negeri Bima)'
  },
  {
    id: 'smk-aphp',
    studyFieldCode: '421',
    studyFieldName: 'Agribisnis Pengolahan Hasil Pertanian (APHP)',
    subjectName: 'Dasar-dasar Penyelidikan Mutu / Pengolahan Hasil Pertanian / Pengawasan Mutu Hasil Pertanian',
    level: 'SMK',
    regulation: 'Permendikbudristek No. 11/2025 (SMKPP Negeri Bima)'
  },
  {
    id: 'smk-atr',
    studyFieldCode: '411',
    studyFieldName: 'Agribisnis Ternak Ruminansia (ATR)',
    subjectName: 'Dasar-dasar Agribisnis Ternak / Agribisnis Ternak Ruminansia / Pakan Ternak Ruminansia',
    level: 'SMK',
    regulation: 'Permendikbudristek No. 11/2025 (SMKPP Negeri Bima)'
  },
  {
    id: 'smk-atu',
    studyFieldCode: '412',
    studyFieldName: 'Agribisnis Ternak Unggas (ATU)',
    subjectName: 'Dasar-dasar Agribisnis Ternak / Agribisnis Ternak Unggas / Pakan Ternak Unggas',
    level: 'SMK',
    regulation: 'Permendikbudristek No. 11/2025 (SMKPP Negeri Bima)'
  },
  {
    id: 'smk-apt',
    studyFieldCode: '402',
    studyFieldName: 'Agribisnis Perbenihan Tanaman (APT)',
    subjectName: 'Dasar-dasar Agribisnis Perbenihan / Produksi Benih Tanaman / Pembiakan Tanaman',
    level: 'SMK',
    regulation: 'Permendikbudristek No. 11/2025 (SMKPP Negeri Bima)'
  },
  {
    id: 'smk-keswan',
    studyFieldCode: '415',
    studyFieldName: 'Kesehatan Hewan',
    subjectName: 'Dasar-dasar Kesehatan Hewan / Anatomi dan Fisiologi Hewan / Farmakologi Veteriner / Kesehatan Ternak',
    level: 'SMK',
    regulation: 'Permendikbudristek No. 11/2025 (SMKPP Negeri Bima)'
  },
  {
    id: 'smk-trrh',
    studyFieldCode: '431',
    studyFieldName: 'Teknik Reklamasi dan Rehabilitasi Hutan (TRRH)',
    subjectName: 'Dasar-dasar Kehutanan / Reklamasi Hutan / Rehabilitasi Hutan / Konservasi Tanah dan Air',
    level: 'SMK',
    regulation: 'Permendikbudristek No. 11/2025 (SMKPP Negeri Bima)'
  }
];

export const TASK_EQUIVALENCES: TaskEquivalence[] = [
  { taskName: 'Kepala Sekolah', hoursEquivalent: 18, maxSlots: '1 per Sekolah' },
  { taskName: 'Wakil Kepala Sekolah', hoursEquivalent: 12, maxSlots: '1 s.d 4 (tergantung rombel sekolah)' },
  { taskName: 'Kepala Perpustakaan', hoursEquivalent: 12, maxSlots: '1 per Sekolah' },
  { taskName: 'Kepala Laboratorium / Bengkel', hoursEquivalent: 12, maxSlots: '1 per Lab yang terdaftar' },
  { taskName: 'Koordinator P5 (Projek Penguatan Profil Pelajar Pancasila)', hoursEquivalent: 2, maxSlots: 'Maksimal mengoordinasikan 3 rombel' },
  { taskName: 'Wali Kelas', hoursEquivalent: 2, maxSlots: '1 per Rombongan Belajar' },
  { taskName: 'Pembina Ekstrakurikuler', hoursEquivalent: 2, maxSlots: 'Maksimal 1 ekstrakurikuler per Guru' },
  { taskName: 'Guru Piket', hoursEquivalent: 1, maxSlots: 'Maksimal 1 Guru per hari piket' }
];

export const DAPODIK_CHECKLIST = [
  {
    section: 'Data Pribadi Guru (Individual)',
    items: [
      { id: 'dp-1', text: 'Nama, NIK, dan Tanggal Lahir harus sesuai dengan data Dukcapil pusat.', tooltip: 'Periksa status Valid Kependudukan di Verval PTK.' },
      { id: 'dp-2', text: 'Nomor Registrasi Guru (NRG) terisi dengan benar di Dapodik.', tooltip: 'Hanya bisa diedit melalui dinas atau Verval PTK jika salah.' },
      { id: 'dp-3', text: 'Kualifikasi pendidikan S1/D4 sudah tervalidasi di Sivil / Verval Ijazah.', tooltip: 'Wajib melakukan Verval Ijazah S1 di Info GTK.' },
      { id: 'dp-4', text: 'Status Kepegawaian terisi dengan benar (PNS, PPPK, GTY, atau Honor Daerah).', tooltip: 'Status kepegawaian menentukan jenis pembayaran tunjangan.' }
    ]
  },
  {
    section: 'Pembagian Tugas Mengajar & Jadwal',
    items: [
      { id: 'pt-1', text: 'Nomor SK Pembagian Tugas Mengajar dan Tanggal SK terinput di Dapodik.', tooltip: 'SK dari Kepala Sekolah yang berlaku pada semester berjalan.' },
      { id: 'pt-2', text: 'Jam Mengajar Tatap Muka (JJM) minimal 24 jam seminggu.', tooltip: 'Mata pelajaran wajib linier dengan Sertifikat Pendidik (Permen 11/2025).' },
      { id: 'pt-3', text: 'Mata pelajaran diinput di bagian Jadwal Mingguan dengan tepat.', tooltip: 'JJM tidak akan dihitung jika tidak dijadwalkan ke ruang kelas di Dapodik.' },
      { id: 'pt-4', text: 'Tugas Tambahan terinput dan memiliki SK yang sah.', tooltip: 'Ekuivalensi jam mengajar tugas tambahan dihitung otomatis (Kepmen 222/O/2025).' }
    ]
  },
  {
    section: 'Rombongan Belajar (Rombel) & Siswa',
    items: [
      { id: 'rb-1', text: 'Jumlah siswa minimal per rombel memenuhi standar minimal nasional.', tooltip: 'Misal: SD min 15 siswa, SMP/SMA min 20 siswa. Pengecualian untuk sekolah daerah 3T.' },
      { id: 'rb-2', text: 'Rombel bertipe Reguler dan memiliki wali kelas yang ditunjuk.', tooltip: 'Rombel non-reguler tidak dihitung dalam perhitungan JJM TPG.' },
      { id: 'rb-3', text: 'Siswa di dalam rombel berstatus aktif dan memiliki NISN.', tooltip: 'Siswa tanpa NISN yang valid dapat membuat rombel dianggap tidak memenuhi syarat.' }
    ]
  },
  {
    section: 'Verifikasi & Sinkronisasi',
    items: [
      { id: 'vs-1', text: 'Operator Sekolah melakukan sinkronisasi tanpa invalid data.', tooltip: 'Pastikan tab validasi Dapodik sudah 0 invalid sebelum sinkron.' },
      { id: 'vs-2', text: 'Guru memantau Info GTK secara berkala pasca-sinkron.', tooltip: 'Biasanya membutuhkan waktu 3-7 hari setelah sinkron untuk data ter-update di Info GTK.' },
      { id: 'vs-3', text: 'Keaktifan bulanan guru dicentang oleh Kepala Sekolah / Operator di Dapodik.', tooltip: 'Wajib mencentang keaktifan di menu kehadiran guru bulanan.' }
    ]
  }
];
