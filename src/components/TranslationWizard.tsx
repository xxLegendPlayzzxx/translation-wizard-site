import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { BookOpen } from "lucide-react";

// Beautiful, production-ready upload → options → progress UI.
// Connected to NovelPort API endpoints.
// TailwindCSS required. Dark-mode ready.

interface TranslationProject {
  id: string;
  status: "idle" | "analysing" | "translating" | "postediting" | "rendering" | "done";
  progress: number;
  downloadEPUB?: string;
  downloadPDF?: string;
}

export default function TranslationWizard() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [glossary, setGlossary] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("en");
  const [stylePreset, setStylePreset] = useState<"literal" | "natural" | "academic">("natural");
  const [keepHonorifics, setKeepHonorifics] = useState(true);
  const [britishPunctuation, setBritishPunctuation] = useState(true);
  const [agreeRights, setAgreeRights] = useState(false);
  const [estChars, setEstChars] = useState<number | null>(null);
  const [project, setProject] = useState<TranslationProject | null>(null);
  const [error, setError] = useState<string | null>(null);

  const readableSize = (bytes?: number | null) => {
    if (!bytes) return "";
    const units = ["B", "KB", "MB", "GB"]; 
    let i = 0; 
    let b = bytes;
    while (b >= 1024 && i < units.length - 1) { b /= 1024; i++; }
    return `${b.toFixed(1)} ${units[i]}`;
  };

  const canStart = useMemo(() => file && agreeRights, [file, agreeRights]);

  async function handleEstimate() {
    setError(null);
    if (!file) return;
    
    setProject({ id: "", status: "analysing", progress: 8 });
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (glossary) formData.append('glossary', glossary);
      
      const response = await fetch('/api/estimate', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Failed to get estimate');
      
      const data = await response.json();
      setEstChars(data.characters);
      setProject(null);
      
      toast({
        title: "Estimation Complete",
        description: `Approximately ${data.characters.toLocaleString()} characters detected`,
      });
    } catch (e: any) {
      setError(e?.message || "Couldn't estimate characters. Please try again.");
      setProject(null);
      toast({
        title: "Estimation Failed", 
        description: e?.message || "Please try again",
        variant: "destructive",
      });
    }
  }

  async function handleStart() {
    setError(null);
    if (!file || !agreeRights) return;
    
    setProject({ id: "", status: "analysing", progress: 12 });

    try {
      // 1) Upload files and create project
      const formData = new FormData();
      formData.append('file', file);
      if (glossary) formData.append('glossary', glossary);
      
      const uploadResponse = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });
      
      if (!uploadResponse.ok) throw new Error('Failed to create project');
      const { projectId } = await uploadResponse.json();
      
      // 2) Start translation
      const translateResponse = await fetch(`/api/projects/${projectId}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceLang,
          targetLang,
          stylePreset,
          keepHonorifics,
          britishPunctuation,
        }),
      });
      
      if (!translateResponse.ok) throw new Error('Failed to start translation');
      
      // 3) Poll for progress
      const pollProgress = async () => {
        try {
          const statusResponse = await fetch(`/api/projects/${projectId}/status`);
          if (!statusResponse.ok) throw new Error('Failed to get status');
          
          const status = await statusResponse.json();
          setProject({
            id: projectId,
            status: status.phase,
            progress: status.progress,
            downloadEPUB: status.downloadEPUB,
            downloadPDF: status.downloadPDF,
          });
          
          if (status.phase === "done") {
            toast({
              title: "Translation Complete!",
              description: "Your translated novel is ready for download",
            });
          } else if (status.phase !== "idle") {
            setTimeout(pollProgress, 2000); // Poll every 2 seconds
          }
        } catch (e: any) {
          setError(e?.message || "Lost connection to translation service");
          setProject(null);
        }
      };
      
      setTimeout(pollProgress, 1000);
      
    } catch (e: any) {
      setError(e?.message || "Something went wrong. Please try again.");
      setProject(null);
      toast({
        title: "Translation Failed",
        description: e?.message || "Please try again",
        variant: "destructive",
      });
    }
  }

  const estCost = useMemo(() => {
    if (!estChars) return null;
    // Example: provider cost ~US$20 per 1M characters round-trip → add 2.5x markup
    const provider = (estChars / 1_000_000) * 20;
    const yourPrice = provider * 2.5;
    return { provider, yourPrice };
  }, [estChars]);

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-surface/80 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-brand" />
              <span className="text-xl font-bold text-ink">NovelPort</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>
      
      <div className="mx-auto max-w-4xl px-4 py-10 pt-24">
        <motion.header 
          initial={{ opacity: 0, y: -8 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink font-ui">
            NovelPort — UGC Light‑Novel Translator
          </h1>
          <p className="mt-2 text-muted">
            Upload your novel → set style & glossary → get a polished EPUB/PDF.
          </p>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0, y: 12 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4 }}
          className="bg-surface border border-border rounded-2xl shadow-sm p-6 md:p-8"
        >

          {/* Upload row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-ink mb-2">
                Source file (.epub, .docx, .txt, .pdf)
              </label>
              <div className="bg-[color-mix(in_oklab,var(--ink)_1%,transparent)] border border-border rounded-xl p-4">
                <input
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  type="file"
                  accept=".epub,.docx,.txt,.pdf"
                  className="file:mr-4 file:rounded-full file:border-0 file:bg-brand file:px-4 file:py-2 file:text-white file:hover:bg-brand-600 w-full text-sm text-ink"
                />
                {file && (
                  <p className="mt-2 text-xs text-muted">
                    {file.name} · {readableSize(file.size)}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Optional glossary (.csv)
              </label>
              <div className="bg-[color-mix(in_oklab,var(--ink)_1%,transparent)] border border-border rounded-xl p-4">
                <input
                  onChange={(e) => setGlossary(e.target.files?.[0] || null)}
                  type="file"
                  accept=".csv"
                  className="file:mr-4 file:rounded-xl file:border-0 file:bg-[color-mix(in_oklab,var(--ink)_4%,transparent)] file:px-4 file:py-2 file:text-ink file:hover:bg-[color-mix(in_oklab,var(--ink)_8%,transparent)] w-full text-sm text-ink"
                />
                {glossary && (
                  <p className="mt-2 text-xs text-muted">
                    {glossary.name} · {readableSize(glossary.size)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Source language</label>
              <select 
                value={sourceLang} 
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full rounded-xl bg-surface border border-border px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              >
                <option value="auto">Auto‑detect</option>
                <option value="ja">Japanese</option>
                <option value="zh">Chinese</option>
                <option value="ko">Korean</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Target language</label>
              <select 
                value={targetLang} 
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full rounded-xl bg-surface border border-border px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-indigo focus:border-indigo"
              >
                <option value="en">English (UK)</option>
                <option value="en-US">English (US)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Style preset</label>
              <div className="grid grid-cols-3 gap-2">
                {(["literal", "natural", "academic"] as const).map(k => (
                  <Button
                    key={k}
                    variant={stylePreset === k ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setStylePreset(k)}
                    className="text-sm"
                  >
                    {k.charAt(0).toUpperCase() + k.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <label className="flex items-center gap-3 text-sm text-ink cursor-pointer">
              <input 
                type="checkbox" 
                checked={keepHonorifics} 
                onChange={(e) => setKeepHonorifics(e.target.checked)} 
                className="h-4 w-4 rounded border-border bg-surface accent-brand focus:ring-2 focus:ring-indigo focus:ring-offset-2" 
              />
              Keep honorifics (‑san, ‑kun, etc.)
            </label>
            <label className="flex items-center gap-3 text-sm text-ink cursor-pointer">
              <input 
                type="checkbox" 
                checked={britishPunctuation} 
                onChange={(e) => setBritishPunctuation(e.target.checked)} 
                className="h-4 w-4 rounded border-border bg-surface accent-brand focus:ring-2 focus:ring-indigo focus:ring-offset-2" 
              />
              British punctuation & spelling
            </label>
            <label className="flex items-center gap-3 text-sm text-ink cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreeRights} 
                onChange={(e) => setAgreeRights(e.target.checked)} 
                className="h-4 w-4 rounded border-border bg-surface accent-brand focus:ring-2 focus:ring-indigo focus:ring-offset-2" 
              />
              I own the rights / have permission
            </label>
          </div>

          {/* Estimate & Actions */}
          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <Button 
                onClick={handleEstimate} 
                disabled={!file}
                variant="secondary"
                size="sm"
                className="text-sm"
              >
                Estimate characters & cost
              </Button>
              {estChars && (
                <div className="mt-2 text-xs text-muted">
                  ≈ {estChars.toLocaleString()} characters
                  {estCost && (
                    <>
                      <span className="mx-2">•</span>
                      Provider est: US${estCost.provider.toFixed(2)}
                      <span className="mx-2">•</span>
                      Your price (2.5×): US${estCost.yourPrice.toFixed(2)}
                    </>
                  )}
                </div>
              )}
            </div>

            <Button 
              onClick={handleStart} 
              disabled={!canStart}
              variant="sakura"
              className="px-5 py-2.5 font-medium text-sm shadow-lg disabled:opacity-50"
            >
              Start translation
            </Button>
          </div>

          {/* Progress */}
          {project && project.status !== "idle" && (
            <div className="mt-8">
              <div className="flex items-center justify-between text-xs text-muted mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                <div 
                  className="h-full bg-brand transition-all duration-500" 
                  style={{ width: `${project.progress}%` }} 
                />
              </div>
              <p className="mt-2 text-sm text-muted capitalize">{project.status}</p>
            </div>
          )}

          {/* Done */}
          {project?.status === "done" && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                asChild
                variant="secondary"
                className="w-full py-4 text-center"
              >
                <a href={project.downloadEPUB || "#"}>
                  Download EPUB
                </a>
              </Button>
              <Button 
                asChild
                variant="secondary"
                className="w-full py-4 text-center"
              >
                <a href={project.downloadPDF || "#"}>
                  Download PDF
                </a>
              </Button>
            </div>
          )}

          {error && (
            <p className="mt-6 text-sm text-danger">{error}</p>
          )}

          {/* Fine print */}
          <p className="mt-8 text-xs text-muted">
            We process uploads securely and purge them after 7 days by default. Use a glossary to lock names/terms. Style presets control a light post‑edit pass; we do not add or remove facts.
          </p>
        </motion.div>
      </div>
    </div>
  );
}