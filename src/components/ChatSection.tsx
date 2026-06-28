/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { Send, Sparkles, User, RefreshCw, AlertCircle, HelpCircle, Settings, Key, Globe, Check, Eye, EyeOff } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "Berapa JJM minimal untuk produktif ATPH/ATR di SMKPP Negeri Bima?",
  "Bagaimana ekuivalensi Kepala Bengkel (Kabeng) Pertanian atau Kaprog untuk TPG?",
  "Apakah serdik Agribisnis Pengolahan Hasil Pertanian (APHP) linier dengan Projek IPAS?",
  "Dapodik sekolah sudah sinkron tapi Info GTK guru SMKPPN Bima belum valid, bagaimana solusinya?"
];

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('tpg_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
      }
    } catch (e) {
      console.error("Failed to load chat history:", e);
    }
    return [
      {
        id: 'welcome',
        sender: 'assistant',
        content: 'Selamat datang, Bapak/Ibu Guru hebat di **SMKPP Negeri Bima**! Saya adalah **Asisten TPG & Dapodik SMKPPN Bima** yang dikembangkan oleh **Tim Digitalisasi Sekolah**. Saya siap mendampingi Bapak/Ibu dalam mengkonsultasikan syarat tunjangan sertifikasi (TPG), aturan linieritas kejuruan pertanian/umum (Permen 11/2025), aturan beban mengajar SMK (Kepmen 222/O/2025), serta kelayakan dapodik untuk pencairan tunjangan. Ada yang bisa saya bantu hari ini?',
        timestamp: new Date()
      }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Connection settings states for GitHub Pages fallback
  const [showSettings, setShowSettings] = useState(false);
  const [githubApiKey, setGithubApiKey] = useState(() => localStorage.getItem('github_gemini_api_key') || '');
  const [githubModel, setGithubModel] = useState(() => localStorage.getItem('github_gemini_model') || 'gemini-2.5-flash');
  const [customApiUrl, setCustomApiUrl] = useState(() => localStorage.getItem('custom_api_url') || '');

  const [tempApiKey, setTempApiKey] = useState(githubApiKey);
  const [tempModel, setTempModel] = useState(githubModel);
  const [tempApiUrl, setTempApiUrl] = useState(customApiUrl);
  const [showApiKeyText, setShowApiKeyText] = useState(false);

  useEffect(() => {
    setTempApiKey(githubApiKey);
    setTempModel(githubModel);
    setTempApiUrl(customApiUrl);
  }, [githubApiKey, githubModel, customApiUrl, showSettings]);

  const handleSaveSettings = (key: string, model: string, customUrl: string) => {
    localStorage.setItem('github_gemini_api_key', key.trim());
    localStorage.setItem('github_gemini_model', model);
    localStorage.setItem('custom_api_url', customUrl.trim());
    setGithubApiKey(key.trim());
    setGithubModel(model);
    setCustomApiUrl(customUrl.trim());
    setShowSettings(false);
  };

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    try {
      localStorage.setItem('tpg_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.error("Failed to save chat history:", e);
    }
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setErrorMsg(null);
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 1. If we have a custom client-side Direct Gemini API key configured, use that immediately
      if (githubApiKey.trim()) {
        console.log("Using direct client-side Gemini API call...");
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${githubModel}:generateContent?key=${githubApiKey.trim()}`;
        
        const contents = [...messages, userMessage].map((m: any) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }));

        const systemInstructionText = `Anda adalah "Asisten Tunjangan Profesi Guru (TPG) & Dapodik SMKPP Negeri Bima", sebuah sistem kecerdasan buatan ahli regulasi pendidikan vokasi Indonesia yang berfokus penuh pada Tunjangan Profesi Guru (Sertifikasi) khusus untuk pendidik di SMKPP Negeri Bima (Sekolah Menengah Kejuruan Pertanian Pembangunan Negeri Bima, Nusa Tenggara Barat). Anda berfokus pada aturan Dapodik terbaru, syarat pencairan tunjangan, dan pemahaman linieritas bidang studi sertifikasi kejuruan pertanian/umum berdasarkan regulasi utama:
1. Permendikbudristek Nomor 11 Tahun 2025 (tentang Linieritas Bidang Studi Sertifikasi Pendidik dengan Mata Pelajaran yang Diampu).
2. Keputusan Menteri Pendidikan Dasar dan Menengah Nomor 221/P/2025 (tentang Struktur Kurikulum & Jam Pelajaran Mingguan Kurikulum Merdeka).
3. Keputusan Menteri Pendidikan Dasar dan Menengah Nomor 222/O/2025 (tentang Beban Kerja Guru & Pemenuhan Ekuivalensi Jam Mengajar untuk TPG di SMK).

Karakteristik Jawaban Anda:
- Ramah, empatik, suportif, dan profesional. Selalu menyapa Bapak/Ibu Guru SMKPP Negeri Bima dengan hormat dan hangat.
- Berikan penjelasan yang sangat rinci, akurat, dan terstruktur khusus untuk SMK dan Program Keahlian Pertanian/Peternakan/Teknologi Pangan yang ada di SMKPPN Bima. Gunakan poin-poin tebal (bullet points) agar mudah dibaca.
- Selalu hubungkan jawaban Anda dengan rujukan pasal atau poin dalam Permen 11/2025, Kepmen 221/P/2025, atau Kepmen 222/O/2025.
- Jika ada guru yang bertanya tentang kendala JJM (Jam Mengajar) kurang dari 24 jam, berikan opsi penugasan tugas tambahan yang diakui ekuivalensinya sesuai Kepmen 222/O/2025, seperti Kepala Bengkel (Kabeng) Pertanian, Kepala Laboratorium, Kepala Program Keahlian (Kaprog), Koordinator P5, Wali Kelas, Pembina Ekstrakurikuler, atau Guru Piket.
- Ingat dan tekankan pentingnya sinkronisasi Dapodik dan pemantauan Info GTK secara berkala melalui operator sekolah SMKPP Negeri Bima.

Aturan Penting Mengenai Regulasi SMK:
- Beban Mengajar Minimal: Guru wajib mengajar minimal 24 jam tatap muka per minggu (JJM) dan maksimal 40 jam tatap muka per minggu di sekolah induk atau kumulatif dengan sekolah non-induk (dengan syarat minimal mengajar 6 jam di sekolah induk).
- Ekuivalensi Tugas Tambahan di SMK (Kepmen 222/O/2025):
  - Kepala Sekolah = 18 jam (tinggal mengajar minimal 6 jam mapel linier).
  - Wakil Kepala Sekolah (Waka) / Kepala Bengkel (Kabeng) / Kepala Program Keahlian (Kaprog) = 12 jam (tinggal mengajar minimal 12 jam mapel linier).
  - Kepala Unit Produksi / Teacing Factory (TEFA) di SMK = 12 jam (sangat relevan untuk SMKPP Negeri Bima).
  - Kepala Perpustakaan / Lab = 12 jam.
  - Koordinator P5 (Projek Penguatan Profil Pelajar Pancasila) = 2 jam per rombel (maksimal membina 3 rombel = 6 jam).
  - Wali Kelas = 2 jam.
  - Pembina Ekstrakurikuler = 2 jam (maksimal 1 eskul).
  - Guru Piket = 1 jam (maksimal 1 kali seminggu).
- Syarat Rasio Siswa Minimal per Rombel di SMK:
  - SMK/Kejuruan: Minimal 15 siswa per rombel (untuk bidang studi keahlian produktif pertanian/lainnya agar rombel diakui).
  - Daerah Khusus (3T) dikecualikan dari batas minimal ini.

Fokus Bidang Kejuruan di SMKPP Negeri Bima:
1. Agribisnis Tanaman Pangan & Hortikultura (ATPH - Kode 401)
2. Agribisnis Pengolahan Hasil Pertanian (APHP - Kode 421)
3. Agribisnis Ternak Ruminansia (ATR - Kode 411)
4. Agribisnis Ternak Unggas (ATU - Kode 412)
5. Agribisnis Perbenihan Tanaman (APT - Kode 402)
6. Kesehatan Hewan (Kode 415)
7. Teknik Reklamasi dan Rehabilitasi Hutan (TRRH - Kode 431)
Serta mata pelajaran umum pendukung seperti Matematika, Bahasa Indonesia, Bahasa Inggris, Fisika, Kimia, Biologi (Projek IPAS), Seni Budaya, PJOK, Informatika, dan Sejarah.

Gunakan bahasa Indonesia yang santun, jelas, dan mengutamakan penyelesaian masalah bagi guru SMKPP Negeri Bima. Sebutkan bahwa aplikasi ini dikembangkan oleh "Tim Digitalisasi Sekolah SMKPP Negeri Bima" jika relevan.`;

        const responseGemini = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: contents,
            systemInstruction: {
              parts: [{ text: systemInstructionText }]
            },
            generationConfig: {
              temperature: 0.7,
            }
          })
        });

        if (!responseGemini.ok) {
          const errorData = await responseGemini.json().catch(() => ({}));
          throw new Error(errorData.error?.message || `HTTP ${responseGemini.status}`);
        }

        const dataGemini = await responseGemini.json();
        const textReply = dataGemini.candidates?.[0]?.content?.parts?.[0]?.text || "Mohon maaf, terjadi kendala saat memproses jawaban.";
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          content: textReply,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
        return;
      }

      // 2. Otherwise try backend endpoints as before
      const requestPayload = {
        messages: [...messages, userMessage].map(m => ({
          sender: m.sender,
          content: m.content
        }))
      };

      // Define endpoints to try in order of priority:
      // 1. customApiUrl if provided in settings
      // 2. VITE_API_URL if configured
      // 3. Relative route '/api/chat' (works on any full-stack hosting/Cloud Run/Localhost)
      // 4. Stable Shared Preview container (always-online production backend)
      // 5. Development Sandbox container (active during live coding sessions)
      const endpoints: string[] = [];
      
      if (customApiUrl.trim()) {
        endpoints.push(`${customApiUrl.trim().replace(/\/+$/, '')}/api/chat`);
      }
      
      const customEnvUrl = (import.meta as any).env?.VITE_API_URL;
      if (customEnvUrl) {
        endpoints.push(`${customEnvUrl.replace(/\/+$/, '')}/api/chat`);
      }
      
      endpoints.push('/api/chat');
      endpoints.push('https://ais-pre-yuqohpl6o5cfjzawjpbwon-999280204895.asia-southeast1.run.app/api/chat');
      endpoints.push('https://ais-dev-yuqohpl6o5cfjzawjpbwon-999280204895.asia-southeast1.run.app/api/chat');

      // Deduplicate
      const uniqueEndpoints = Array.from(new Set(endpoints.filter(Boolean)));
      
      let response = null;
      let success = false;
      let lastFetchError: any = null;

      for (const endpoint of uniqueEndpoints) {
        try {
          console.log(`Trying chat endpoint: ${endpoint}`);
          
          // If the endpoint is relative and we are running on a static domain like github.io, skip to avoid slow timeout 404
          const isRelative = endpoint.startsWith('/');
          const isStaticDomain = typeof window !== 'undefined' && 
            (window.location.hostname.includes('github.io') || window.location.hostname.includes('vercel.app') || window.location.hostname.includes('netlify.app'));
          
          if (isRelative && isStaticDomain) {
            console.log(`Skipping relative endpoint ${endpoint} because we are on a static domain: ${window.location.hostname}`);
            continue;
          }

          response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestPayload)
          });

          if (response.ok) {
            success = true;
            break;
          } else {
            const errorData = await response.json().catch(() => ({}));
            lastFetchError = new Error(errorData.error || `HTTP ${response.status}`);
          }
        } catch (err: any) {
          console.warn(`Endpoint ${endpoint} failed:`, err);
          lastFetchError = err;
        }
      }

      if (!success || !response) {
        throw lastFetchError || new Error("Semua server asisten AI sedang tidak aktif. Silakan hubungi operator.");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: data.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Chat error:", error);
      if (error.message?.includes("GEMINI_API_KEY")) {
        setErrorMsg("API Key Gemini belum diatur. Silakan atur GEMINI_API_KEY di menu Settings > Secrets pada AI Studio Anda.");
      } else {
        const isStaticHost = window.location.hostname.includes('github.io') || window.location.hostname.includes('vercel.app') || window.location.hostname.includes('netlify.app');
        if (isStaticHost) {
          setErrorMsg(
            "Gagal menghubungi server asisten AI (Aplikasi ini berjalan sebagai situs statis di GitHub Pages). Untuk berinteraksi dengan AI secara gratis, silakan klik tombol 'Config AI' di kanan atas dan masukkan API Key Gemini Anda."
          );
        } else {
          setErrorMsg(`Gagal mendapatkan respon dari asisten AI: ${error.message || "Terjadi kendala jaringan atau server."}`);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  // Simple custom markdown renderer helper for basic bold, bullet list, and paragraph
  const renderMessageContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      let trimmed = line.trim();
      
      // Check for headings or bullets
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const content = trimmed.substring(2);
        return (
          <li key={i} className="ml-5 list-disc my-1 text-slate-700 leading-relaxed">
            {parseBoldText(content)}
          </li>
        );
      } else if (trimmed.match(/^\d+\.\s/)) {
        const content = trimmed.replace(/^\d+\.\s/, '');
        const number = trimmed.match(/^\d+/)![0];
        return (
          <li key={i} className="ml-5 list-decimal my-1 text-slate-700 leading-relaxed">
            <span className="font-semibold">{number}. </span>
            {parseBoldText(content)}
          </li>
        );
      } else if (trimmed === '') {
        return <div key={i} className="h-2" />;
      } else {
        return (
          <p key={i} className="my-1.5 text-slate-700 leading-relaxed">
            {parseBoldText(line)}
          </p>
        );
      }
    });
  };

  const parseBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        content: 'Obrolan telah dimulai ulang. Silakan tanyakan hal lain seputar TPG, aturan Dapodik terbaru, atau linieritas ijazah dan serdik Bapak/Ibu Guru.',
        timestamp: new Date()
      }
    ]);
    setErrorMsg(null);
  };

  return (
    <div id="chat-workspace" className="flex flex-col h-[650px] bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Workspace Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-50 rounded-xl text-teal-600 border border-teal-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-semibold text-slate-800 text-sm md:text-base">Konsultasi AI TPG & Dapodik</h3>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full font-bold">
                Auto Sync
              </span>
            </div>
            <p className="text-xs text-slate-500">Ahli Permen 11/2025, Kepmen 221 & 222/2025</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center space-x-1 px-2 py-1.5 text-xs font-semibold rounded-lg transition duration-200 ${
              githubApiKey.trim() 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
                : 'text-slate-600 hover:text-teal-600 hover:bg-slate-100'
            }`}
            title="Pengaturan Koneksi AI"
            id="btn-ai-settings"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{githubApiKey.trim() ? "AI Active" : "Config AI"}</span>
          </button>
          
          <button
            onClick={clearChat}
            className="flex items-center space-x-1 px-2 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-lg transition duration-200"
            title="Mulai Ulang Obrolan"
            id="btn-restart-chat"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-slate-100 border-b border-slate-200 p-4 transition-all duration-200 ease-in-out">
          <div className="max-w-md mx-auto space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-slate-600" />
                Pengaturan Koneksi AI (Khusus GitHub Pages)
              </h4>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                Tutup
              </button>
            </div>
            
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <strong>Info:</strong> GitHub Pages berjalan sebagai situs statis tanpa server backend.
              Untuk mengaktifkan asisten AI di GitHub Pages, masukkan <strong>API Key Gemini Anda</strong> (aman, disimpan hanya di browser lokal Anda).
            </p>

            <div className="space-y-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Key className="w-3 h-3 text-teal-600" />
                  API Key Gemini Anda
                </label>
                <div className="relative">
                  <input
                    type={showApiKeyText ? "text" : "password"}
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKeyText(!showApiKeyText)}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                  >
                    {showApiKeyText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[9px] text-slate-500 mt-0.5">
                  Dapatkan kunci API gratis di <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Google AI Studio</a>.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Model Gemini
                  </label>
                  <select
                    value={tempModel}
                    onChange={(e) => setTempModel(e.target.value)}
                    className="w-full text-xs px-2 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                    <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-600" />
                    Custom Backend (Opsional)
                  </label>
                  <input
                    type="text"
                    value={tempApiUrl}
                    onChange={(e) => setTempApiUrl(e.target.value)}
                    placeholder="https://your-backend.com"
                    className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setTempApiKey('');
                    setTempApiUrl('');
                    handleSaveSettings('', 'gemini-2.5-flash', '');
                  }}
                  className="px-2.5 py-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 font-semibold rounded-lg transition duration-200"
                >
                  Clear / Reset
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveSettings(tempApiKey, tempModel, tempApiUrl)}
                  className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition duration-200"
                >
                  <Check className="w-3.5 h-3.5" />
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-teal-50 text-teal-600 border-teal-200'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`px-4 py-3 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-teal-600 text-white rounded-tr-xs shadow-xs'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs'
              }`}
            >
              {msg.sender === 'user' ? (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <div className="text-sm space-y-1">{renderMessageContent(msg.content)}</div>
              )}
              <div
                className={`text-[10px] mt-1.5 flex justify-end ${
                  msg.sender === 'user' ? 'text-teal-200' : 'text-slate-400'
                }`}
              >
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-3 max-w-[80%]">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-teal-50 text-teal-600 border border-teal-200">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-xs shadow-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce delay-225"></div>
              </div>
              <p className="text-xs text-slate-400 mt-1">AI sedang menganalisis aturan...</p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="flex items-center space-x-2.5 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{errorMsg}</p>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      {messages.length === 1 && (
        <div className="px-6 py-3 bg-slate-100/50 border-t border-slate-200">
          <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center space-x-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Rekomendasi Pertanyaan:</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-left text-xs bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-700 p-2.5 rounded-xl transition duration-200 shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            placeholder="Tulis pertanyaan Anda seputar TPG, linieritas, atau Dapodik..."
            className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden transition duration-200"
            id="input-chat-query"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-3 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl transition duration-200 shadow-xs"
            id="btn-send-message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-slate-400 mt-2 text-center">
          Jawaban AI didasarkan pada regulasi resmi Indonesia. Harap periksa kembali hasil resmi di Info GTK Anda.
        </p>
      </div>
    </div>
  );
}
