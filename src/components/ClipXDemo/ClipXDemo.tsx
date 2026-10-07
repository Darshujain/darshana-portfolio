import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  CircleHelp,
  Film,
  Grid2X2,
  Maximize2,
  Music2,
  Pause,
  Play,
  Plus,
  Redo2,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Split,
  Undo2,
  Upload,
  Volume2,
  WandSparkles,
  X,
} from 'lucide-react';

interface TimelineClip {
  id: number;
  name: string;
  type: 'video' | 'audio' | 'text';
  duration: number;
  color: string;
  waveform?: string;
}

const initialClips: TimelineClip[] = [
  { id: 1, name: 'hero-shot.mp4', type: 'video', duration: 7.8, color: 'from-cyan-500/80 to-sky-600/80' },
  { id: 2, name: 'city-cut.mp4', type: 'video', duration: 5.4, color: 'from-emerald-500/80 to-teal-600/80' },
  { id: 3, name: 'product-detail.mp4', type: 'video', duration: 6.6, color: 'from-amber-400/80 to-orange-500/80' },
  { id: 4, name: 'ambient-bed.wav', type: 'audio', duration: 19.8, color: 'from-slate-500/70 to-slate-700/70', waveform: 'M0 30 L5 25 L10 34 L15 18 L20 30 L25 22 L30 37 L35 20 L40 27 L45 15 L50 32 L55 25 L60 34 L65 17 L70 30 L75 20 L80 36 L85 24 L90 31 L95 16 L100 29' },
];

const mediaItems = [
  { name: 'hero-shot.mp4', meta: '00:07 · 4K', type: 'video', gradient: 'from-cyan-400 via-sky-500 to-slate-900' },
  { name: 'city-cut.mp4', meta: '00:05 · 1080p', type: 'video', gradient: 'from-emerald-400 via-teal-600 to-slate-900' },
  { name: 'product-detail.mp4', meta: '00:06 · 4K', type: 'video', gradient: 'from-amber-300 via-orange-600 to-slate-900' },
  { name: 'ambient-bed.wav', meta: '00:19 · Audio', type: 'audio', gradient: 'from-slate-500 to-slate-800' },
];

const formatTime = (seconds: number) => `00:${seconds.toFixed(2).padStart(5, '0')}`;

export function ClipXDemo() {
  const [clips, setClips] = useState<TimelineClip[]>(initialClips);
  const [selectedClip, setSelectedClip] = useState(1);
  const [currentTime, setCurrentTime] = useState(4.26);
  const [playing, setPlaying] = useState(false);
  const [activePanel, setActivePanel] = useState<'media' | 'text' | 'audio'>('media');
  const [showExport, setShowExport] = useState(false);
  const [exported, setExported] = useState(false);
  const [zoom, setZoom] = useState(1);

  const totalDuration = useMemo(() => clips.filter((clip) => clip.type !== 'audio').reduce((total, clip) => total + clip.duration, 0), [clips]);
  const progress = Math.min((currentTime / totalDuration) * 100, 100);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setCurrentTime((time) => {
        if (time >= totalDuration) {
          setPlaying(false);
          return 0;
        }
        return time + 0.1;
      });
    }, 100);
    return () => window.clearInterval(timer);
  }, [playing, totalDuration]);

  const addClip = (itemName: string) => {
    const source = mediaItems.find((item) => item.name === itemName);
    if (!source || source.type === 'audio') return;
    const newClip: TimelineClip = {
      id: Date.now(),
      name: source.name,
      type: 'video',
      duration: source.name === 'city-cut.mp4' ? 5.4 : 6.6,
      color: source.gradient,
    };
    setClips((current) => [...current.filter((clip) => clip.type !== 'audio'), newClip, ...current.filter((clip) => clip.type === 'audio')]);
    setSelectedClip(newClip.id);
  };

  const removeSelectedClip = () => {
    if (clips.filter((clip) => clip.type === 'video').length <= 1) return;
    setClips((current) => current.filter((clip) => clip.id !== selectedClip));
    setSelectedClip(clips.find((clip) => clip.id !== selectedClip && clip.type === 'video')?.id ?? 1);
  };

  const handleExport = () => {
    setExported(true);
    setShowExport(false);
    window.setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#071018] text-slate-100 selection:bg-cyan-400/30">
      <header className="flex h-14 items-center justify-between border-b border-white/[0.08] bg-[#0b1720] px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <a href="/" className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 text-slate-950" aria-label="Back to portfolio"><Sparkles className="h-4 w-4" /></a>
          <div className="flex items-center gap-2"><span className="font-display text-sm font-bold text-white">ClipX</span><span className="hidden rounded bg-white/[0.06] px-2 py-1 text-[10px] uppercase tracking-wider text-slate-500 sm:inline">Studio</span></div>
          <span className="hidden text-slate-700 sm:inline">/</span>
          <span className="hidden text-xs text-slate-400 sm:inline">Product launch · 16:9</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          <button className="hidden rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white sm:block" aria-label="Undo"><Undo2 className="h-4 w-4" /></button>
          <button className="hidden rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white sm:block" aria-label="Redo"><Redo2 className="h-4 w-4" /></button>
          <span className="mx-1 hidden h-5 w-px bg-white/10 sm:block" />
          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white" aria-label="Help"><CircleHelp className="h-4 w-4" /></button>
          <button onClick={() => setShowExport(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 px-3 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-400/15 transition hover:brightness-110 sm:px-4"><Upload className="h-3.5 w-3.5" />Export</button>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-[1600px] grid-rows-[auto_auto_1fr] lg:grid-cols-[250px_1fr_280px] lg:grid-rows-1">
        <aside className="order-2 border-b border-white/[0.08] bg-[#0b1720] p-3 lg:order-1 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between"><p className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">Library</p><button className="rounded-md p-1.5 text-slate-500 hover:bg-white/5 hover:text-white" aria-label="Add media"><Plus className="h-4 w-4" /></button></div>
          <div className="mb-4 flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2"><Search className="h-3.5 w-3.5 text-slate-600" /><input className="w-full bg-transparent text-xs text-white outline-none placeholder:text-slate-600" placeholder="Search media" /></div>
          <div className="mb-4 grid grid-cols-3 gap-1 rounded-lg bg-white/[0.04] p-1">
            {[
              { label: 'Media', icon: Film, panel: 'media' as const },
              { label: 'Text', icon: WandSparkles, panel: 'text' as const },
              { label: 'Audio', icon: Music2, panel: 'audio' as const },
            ].map((item) => <button key={item.label} onClick={() => setActivePanel(item.panel)} className={`flex flex-col items-center gap-1 rounded-md py-2 text-[10px] transition ${activePanel === item.panel ? 'bg-cyan-400/10 text-cyan-300' : 'text-slate-500 hover:text-slate-300'}`}><item.icon className="h-3.5 w-3.5" />{item.label}</button>)}
          </div>
          {activePanel === 'media' && <div className="grid grid-cols-2 gap-2">{mediaItems.map((item) => <button key={item.name} onDoubleClick={() => addClip(item.name)} className="group text-left" title="Double-click to add to timeline"><div className={`relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br ${item.gradient} p-2 ring-1 ring-white/10 transition group-hover:ring-cyan-400/60`}>{item.type === 'video' ? <div className="absolute bottom-2 left-2 rounded bg-black/40 px-1.5 py-0.5 text-[9px] text-white">▶ 00:0{item.name === 'hero-shot.mp4' ? '7' : item.name === 'city-cut.mp4' ? '5' : '6'}</div> : <Music2 className="absolute bottom-2 left-2 h-4 w-4 text-white/60" />}<Plus className="absolute right-2 top-2 h-3.5 w-3.5 text-white opacity-0 transition group-hover:opacity-100" /></div><p className="mt-1.5 truncate text-[10px] text-slate-300">{item.name}</p><p className="text-[9px] text-slate-600">{item.meta}</p></button>)}</div>}
          {activePanel === 'text' && <div className="space-y-2">{['Title card', 'Lower third', 'Caption', 'End screen'].map((item) => <button key={item} onClick={() => setActivePanel('media')} className="flex w-full items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.03] p-3 text-left text-xs text-slate-300 transition hover:border-cyan-400/30 hover:text-white"><WandSparkles className="h-3.5 w-3.5 text-cyan-300" />{item}<Plus className="ml-auto h-3.5 w-3.5 text-slate-600" /></button>)}</div>}
          {activePanel === 'audio' && <div className="rounded-xl border border-dashed border-white/10 p-5 text-center"><Music2 className="mx-auto h-6 w-6 text-cyan-300" /><p className="mt-3 text-xs font-medium text-slate-300">Drop audio here</p><p className="mt-1 text-[10px] leading-relaxed text-slate-600">MP3, WAV or M4A up to 2GB</p></div>}
          <div className="mt-6 hidden rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 lg:block"><div className="flex items-center gap-2 text-xs text-slate-400"><Grid2X2 className="h-3.5 w-3.5 text-cyan-300" />AI scene detection</div><p className="mt-2 text-[10px] leading-relaxed text-slate-600">Automatically find cuts, people and key moments in your footage.</p><button className="mt-3 text-[10px] font-semibold text-cyan-300">Try it on this project →</button></div>
        </aside>

        <section className="order-1 flex min-w-0 flex-col bg-[#071018] lg:order-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3 sm:px-6"><div className="flex items-center gap-2"><button className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white lg:hidden" aria-label="Back"><ArrowLeft className="h-4 w-4" /></button><span className="text-xs text-slate-500">Sequence</span><ChevronDown className="h-3.5 w-3.5 text-slate-600" /></div><div className="flex items-center gap-2 text-[10px] text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Saved just now <button className="ml-2 rounded-lg p-1.5 hover:bg-white/5 hover:text-white" aria-label="Project settings"><Settings2 className="h-3.5 w-3.5" /></button></div></div>
          <div className="flex flex-1 flex-col justify-center px-4 py-6 sm:px-8 lg:px-10"><div className="mx-auto w-full max-w-4xl"><div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#102f3e] via-[#123b46] to-[#071018] shadow-2xl shadow-black/30"><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.25),transparent_32%),linear-gradient(135deg,transparent_45%,rgba(16,185,129,0.15))]" /><div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)', backgroundSize: '42px 42px' }} /><div className="absolute left-[12%] top-[24%] h-24 w-24 rounded-full bg-cyan-300/20 blur-2xl" /><div className="absolute right-[15%] top-[20%] h-32 w-32 rounded-full bg-emerald-300/20 blur-3xl" /><div className="absolute inset-0 flex flex-col items-center justify-center"><div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">{playing ? <Pause className="h-5 w-5 fill-white text-white" /> : <Play className="ml-0.5 h-5 w-5 fill-white text-white" />}</div><p className="font-display text-lg font-bold tracking-tight text-white sm:text-2xl">Make something people remember.</p><p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-cyan-200/70">ClipX creative studio</p></div><div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] text-white/60"><span>4K · 24 FPS</span><span>Product launch / Scene 01</span></div></div><div className="mt-4 flex items-center gap-3"><button onClick={() => setCurrentTime(0)} className="text-xs text-slate-500 transition hover:text-white">00:00</button><button onClick={() => setPlaying((value) => !value)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-950 transition hover:scale-105">{playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}</button><button onClick={() => setCurrentTime(totalDuration)} className="text-xs text-slate-500 transition hover:text-white">{formatTime(totalDuration)}</button><div className="relative h-1.5 flex-1 cursor-pointer rounded-full bg-white/10" onClick={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setCurrentTime(((event.clientX - rect.left) / rect.width) * totalDuration); }}><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${progress}%` }} /><div className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-lg" style={{ left: `calc(${progress}% - 6px)` }} /></div><button className="text-slate-500 transition hover:text-white" aria-label="Volume"><Volume2 className="h-4 w-4" /></button><button className="hidden text-slate-500 transition hover:text-white sm:block" aria-label="Fullscreen"><Maximize2 className="h-4 w-4" /></button></div></div></div>
        </section>

        <aside className="order-3 hidden border-l border-white/[0.08] bg-[#0b1720] lg:block"><div className="flex border-b border-white/[0.08]"><button className="flex-1 border-b-2 border-cyan-400 px-3 py-3 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">Inspector</button><button className="flex-1 px-3 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">Effects</button></div>{selectedClip && <div className="p-5"><div className="mb-5 flex items-start justify-between"><div><p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">Selected clip</p><h3 className="mt-1 max-w-[170px] truncate text-sm font-semibold text-white">{clips.find((clip) => clip.id === selectedClip)?.name ?? 'Clip'}</h3></div><button onClick={removeSelectedClip} className="rounded-md p-1.5 text-slate-600 transition hover:bg-rose-400/10 hover:text-rose-300" aria-label="Remove clip"><X className="h-3.5 w-3.5" /></button></div><div className="space-y-5"><div><div className="mb-2 flex justify-between text-[10px] text-slate-500"><span>Transform</span><button className="text-cyan-300">Reset</button></div><div className="grid grid-cols-2 gap-2"><label className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2"><span className="block text-[9px] text-slate-600">Position X</span><span className="text-xs text-slate-300">0 px</span></label><label className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2"><span className="block text-[9px] text-slate-600">Position Y</span><span className="text-xs text-slate-300">0 px</span></label><label className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2"><span className="block text-[9px] text-slate-600">Scale</span><span className="text-xs text-slate-300">100%</span></label><label className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2"><span className="block text-[9px] text-slate-600">Rotation</span><span className="text-xs text-slate-300">0°</span></label></div></div><div><div className="mb-2 flex items-center justify-between text-[10px] text-slate-500"><span>Opacity</span><span className="text-slate-300">100%</span></div><input type="range" defaultValue="100" className="h-1 w-full accent-cyan-400" /></div><div><div className="mb-2 flex items-center justify-between text-[10px] text-slate-500"><span>Blend mode</span><ChevronDown className="h-3 w-3" /></div><button className="flex w-full items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-xs text-slate-300">Normal<ChevronDown className="h-3 w-3 text-slate-600" /></button></div><button className="flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/5 py-2.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/10"><SlidersHorizontal className="h-3.5 w-3.5" />Open advanced controls</button></div></div>}</aside>
      </main>

      <section className="border-t border-white/[0.08] bg-[#09151e] px-3 pb-5 pt-3 sm:px-6"><div className="mx-auto max-w-[1600px]"><div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-3"><span className="text-xs font-semibold text-slate-300">Timeline</span><span className="hidden text-[10px] text-slate-600 sm:inline">Drag clips to arrange your story</span></div><div className="flex items-center gap-3"><button className="rounded-md p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-cyan-300" aria-label="Split clip"><Split className="h-3.5 w-3.5" /></button><button onClick={() => setZoom((value) => value === 1 ? 1.5 : 1)} className="text-[10px] text-slate-500 transition hover:text-white">Zoom {zoom === 1 ? '100%' : '150%'}</button></div></div><div className="relative overflow-x-auto rounded-xl border border-white/[0.08] bg-[#071018] p-3"><div className="min-w-[700px]" style={{ width: `${zoom * 100}%` }}><div className="mb-2 ml-20 flex justify-between text-[9px] text-slate-600"><span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span><span>00:20</span><span>00:25</span></div><div className="relative space-y-2"><div className="pointer-events-none absolute bottom-0 left-20 top-0 z-10 w-px bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]" style={{ left: `calc(80px + ${progress}% * (100% - 80px) / 100)` }} /><div className="flex h-14 items-stretch gap-1"><div className="flex w-16 shrink-0 items-center gap-2 rounded-lg bg-white/[0.03] px-2"><Film className="h-3.5 w-3.5 text-cyan-300" /><span className="text-[10px] text-slate-500">Video</span></div><div className="flex min-w-0 flex-1 gap-1">{clips.filter((clip) => clip.type === 'video').map((clip) => <button key={clip.id} onClick={() => setSelectedClip(clip.id)} className={`relative min-w-0 overflow-hidden rounded-lg bg-gradient-to-r ${clip.color} px-3 text-left ring-1 transition ${selectedClip === clip.id ? 'ring-2 ring-cyan-300' : 'ring-white/10 hover:ring-white/30'}`} style={{ flex: clip.duration }}><span className="block truncate text-[10px] font-semibold text-white">{clip.name}</span><span className="mt-1 block text-[9px] text-white/60">{formatTime(clip.duration)}</span><span className="absolute inset-x-0 bottom-0 flex h-3 items-center gap-0.5 overflow-hidden px-1 opacity-50">{Array.from({ length: 18 }).map((_, index) => <span key={index} className="w-1 rounded-full bg-white" style={{ height: `${4 + ((index * 13) % 8)}px` }} />)}</span></button>)}</div></div><div className="flex h-10 items-stretch gap-1"><div className="flex w-16 shrink-0 items-center gap-2 rounded-lg bg-white/[0.03] px-2"><Music2 className="h-3.5 w-3.5 text-emerald-300" /><span className="text-[10px] text-slate-500">Audio</span></div><div className="relative flex-1 overflow-hidden rounded-lg bg-gradient-to-r from-slate-600/70 to-slate-700/50 px-3"><span className="relative z-10 text-[10px] font-medium text-slate-300">ambient-bed.wav</span><svg className="absolute inset-x-0 bottom-0 h-5 w-full opacity-40" preserveAspectRatio="none" viewBox="0 0 100 40"><path d={initialClips[3].waveform} fill="none" stroke="#67e8f9" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /></svg></div></div></div></div></div></div></section>

      {exported && <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300 shadow-2xl backdrop-blur-xl"><Sparkles className="h-4 w-4" />Export queued · 4K MP4</div>}
      {showExport && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#10212e] p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-[10px] uppercase tracking-[0.18em] text-cyan-300">Render project</p><h2 className="mt-1 font-display text-xl font-bold text-white">Export your story</h2></div><button onClick={() => setShowExport(false)} className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white" aria-label="Close export"><X className="h-4 w-4" /></button></div><div className="mt-6 space-y-2">{['4K · H.264 MP4 · Best quality', '1080p · H.264 MP4 · Recommended', 'Vertical · 1080 × 1920 · Social'].map((option, index) => <button key={option} className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm ${index === 1 ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200' : 'border-white/[0.08] text-slate-400 hover:border-white/20'}`}><span>{option}</span>{index === 1 && <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Recommended</span>}</button>)}</div><button onClick={handleExport} className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 py-3 text-sm font-bold text-slate-950 transition hover:brightness-110">Start export</button></div></div>}
    </div>
  );
}
