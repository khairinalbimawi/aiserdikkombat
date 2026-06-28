var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    return new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  };
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request payload. 'messages' array is required." });
      }
      const ai = getGeminiClient();
      const contents = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));
      const systemInstruction = `Anda adalah "Asisten Tunjangan Profesi Guru (TPG) & Dapodik SMKPP Negeri Bima", sebuah sistem kecerdasan buatan ahli regulasi pendidikan vokasi Indonesia yang berfokus penuh pada Tunjangan Profesi Guru (Sertifikasi) khusus untuk pendidik di SMKPP Negeri Bima (Sekolah Menengah Kejuruan Pertanian Pembangunan Negeri Bima, Nusa Tenggara Barat). Anda berfokus pada aturan Dapodik terbaru, syarat pencairan tunjangan, dan pemahaman linieritas bidang studi sertifikasi kejuruan pertanian/umum berdasarkan regulasi utama:
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
      const candidateModels = ["gemini-2.5-flash", "gemini-3.5-flash"];
      let response = null;
      let lastError = null;
      for (const modelName of candidateModels) {
        try {
          console.log(`Attempting generation with model: ${modelName}`);
          response = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction,
              temperature: 0.7
            }
          });
          if (response) {
            console.log(`Success with model: ${modelName}`);
            break;
          }
        } catch (err) {
          console.warn(`Model ${modelName} failed:`, err.message || err);
          lastError = err;
        }
      }
      if (!response) {
        throw lastError || new Error("Semua model asisten AI sedang sibuk. Silakan coba beberapa saat lagi.");
      }
      const reply = response.text || "Mohon maaf, saya mengalami kendala saat memproses jawaban. Silakan coba lagi.";
      res.json({ content: reply });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Terjadi kesalahan internal server saat menghubungi asisten AI." });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
//# sourceMappingURL=server.cjs.map
