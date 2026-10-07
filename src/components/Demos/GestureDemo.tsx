import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { Lightbulb, Mic, MicOff, Moon, Pause, Play, SkipForward, Smartphone, Sun, Vibrate, Volume2 } from 'lucide-react';
import { DemoShell } from './DemoShell';

interface SpeechResultEvent {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
  resultIndex: number;
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: SpeechResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
}

const tracks = ['Midnight Drive', 'Neon Rain', 'Orbit', 'Golden Hour'];
const suggestions = ['lights on', 'lights off', 'play', 'pause', 'next song', 'volume up', 'dark mode', 'light mode'];

interface LogItem { id: number; source: 'voice' | 'motion' | 'system'; text: string }

export function GestureDemo() {
  const [lights, setLights] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [volume, setVolume] = useState(50);
  const [dark, setDark] = useState(true);
  const [listening, setListening] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [typed, setTyped] = useState('');
  const [log, setLog] = useState<LogItem[]>([{ id: 0, source: 'system', text: 'Ready — try a voice command or shake.' }]);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const idRef = useRef(1);
  const lastShake = useRef(0);

  const SpeechCtor =
    typeof window !== 'undefined'
      ? ((window as unknown as Record<string, unknown>).SpeechRecognition ??
          (window as unknown as Record<string, unknown>).webkitSpeechRecognition) as (new () => SpeechRecognitionLike) | undefined
      : undefined;

  const push = useCallback((source: LogItem['source'], text: string) => {
    setLog((l) => [{ id: idRef.current++, source, text }, ...l].slice(0, 8));
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.toLowerCase().trim();
      if (!cmd) return;
      let action = 'Not recognised';
      if (/light.*(on|chalu)/.test(cmd)) { setLights(true); action = 'Lights on'; }
      else if (/light.*(off|band)/.test(cmd)) { setLights(false); action = 'Lights off'; }
      else if (/(play|start|chalao)/.test(cmd)) { setPlaying(true); action = 'Playing music'; }
      else if (/(pause|stop|ruko)/.test(cmd)) { setPlaying(false); action = 'Paused'; }
      else if (/(next|skip|agla)/.test(cmd)) { setTrack((t) => (t + 1) % tracks.length); setPlaying(true); action = 'Next track'; }
      else if (/volume.*(up|badha)|louder/.test(cmd)) { setVolume((v) => Math.min(100, v + 15)); action = 'Volume up'; }
      else if (/volume.*(down|kam)|quieter/.test(cmd)) { setVolume((v) => Math.max(0, v - 15)); action = 'Volume down'; }
      else if (/dark/.test(cmd)) { setDark(true); action = 'Dark mode'; }
      else if (/light mode|bright/.test(cmd)) { setDark(false); action = 'Light mode'; }
      push('voice', `"${raw}" → ${action}`);
    },
    [push],
  );

  const onShake = useCallback(() => {
    const now = Date.now();
    if (now - lastShake.current < 900) return;
    lastShake.current = now;
    setShaking(true);
    setTrack((t) => (t + 1) % tracks.length);
    setPlaying(true);
    if (navigator.vibrate) navigator.vibrate(120);
    push('motion', 'Shake detected → Shuffle to next track');
    setTimeout(() => setShaking(false), 600);
  }, [push]);

  useEffect(() => {
    const handler = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a || a.x == null || a.y == null || a.z == null) return;
      const force = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
      if (force > 25) onShake();
    };
    window.addEventListener('devicemotion', handler);
    const key = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 's' && (e.target as HTMLElement).tagName !== 'INPUT') onShake();
    };
    window.addEventListener('keydown', key);
    return () => {
      window.removeEventListener('devicemotion', handler);
      window.removeEventListener('keydown', key);
    };
  }, [onShake]);

  useEffect(() => () => recRef.current?.stop(), []);

  const toggleMic = () => {
    if (!SpeechCtor) {
      push('system', 'Speech recognition not supported in this browser — type a command below.');
      return;
    }
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const rec = new SpeechCtor();
    rec.lang = 'en-IN';
    rec.continuous = true;
    rec.interimResults = false;
    rec.onresult = (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript;
      runCommand(transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = (e) => push('system', `Mic error: ${e.error}`);
    recRef.current = rec;
    rec.start();
    setListening(true);
    push('system', 'Listening… speak a command');
  };

  const onType = (e: FormEvent) => {
    e.preventDefault();
    runCommand(typed);
    setTyped('');
  };

  const screen = dark ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900';
  const tile = dark ? 'bg-white/[0.06]' : 'bg-white shadow-sm';

  return (
    <DemoShell title="Gesture Controller" subtitle="Hands-free control with voice & motion">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px_1fr]">
        {/* Controls */}
        <div className="order-2 space-y-4 lg:order-1">
          <div className="card-base p-5">
            <h2 className="font-semibold text-white">Voice</h2>
            <p className="mt-1 text-sm text-ink-400">
              {SpeechCtor ? 'Tap the mic and speak (Chrome / Edge).' : 'Mic not supported here — type commands instead.'}
            </p>
            <button
              onClick={toggleMic}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition ${
                listening ? 'bg-rose-500/20 text-rose-200 ring-1 ring-rose-400/40' : 'btn-primary'
              }`}
            >
              {listening ? <><MicOff className="h-4 w-4" /> Stop listening</> : <><Mic className="h-4 w-4" /> Start voice</>}
            </button>
            <form onSubmit={onType} className="mt-3 flex gap-2">
              <input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder='Type e.g. "lights off"' className="input-field rounded-full py-2" />
              <button type="submit" className="btn-secondary px-4 py-2">Run</button>
            </form>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button key={s} onClick={() => runCommand(s)} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-ink-400 transition hover:border-brand-400/50 hover:text-white">
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="card-base p-5">
            <h2 className="font-semibold text-white">Motion</h2>
            <p className="mt-1 text-sm text-ink-400">On a phone, shake it. On desktop press <kbd className="rounded border border-white/10 px-1.5 font-mono text-xs">S</kbd> or tap below.</p>
            <button
              onClick={() => {
                const motion = window.DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> };
                motion?.requestPermission?.().catch(() => undefined);
                onShake();
              }}
              className="btn-secondary mt-4 w-full"
            >
              <Vibrate className="h-4 w-4" /> Simulate shake
            </button>
          </div>
        </div>

        {/* Phone */}
        <div className="order-1 flex justify-center lg:order-2">
          <div className={`relative w-[300px] rounded-[3rem] border border-white/15 bg-zinc-900 p-3 shadow-2xl shadow-brand-900/40 transition-transform ${shaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
            <div className="absolute left-1/2 top-5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
            <div className={`relative h-[600px] overflow-hidden rounded-[2.4rem] p-5 pt-14 transition-colors duration-500 ${screen}`}>
              <div className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${lights ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-300/30 blur-3xl" />
              </div>

              <p className="relative text-xs opacity-60">Gesture Controller</p>
              <h3 className="relative text-2xl font-semibold">Home</h3>

              <div className="relative mt-5 grid grid-cols-2 gap-3">
                <div className={`rounded-3xl p-4 ${tile}`}>
                  <Lightbulb className={`h-6 w-6 transition ${lights ? 'fill-amber-300 text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.9)]' : 'opacity-40'}`} />
                  <p className="mt-3 text-sm font-medium">Lights</p>
                  <p className="text-xs opacity-60">{lights ? 'On' : 'Off'}</p>
                </div>
                <div className={`rounded-3xl p-4 ${tile}`}>
                  {dark ? <Moon className="h-6 w-6 text-brand-300" /> : <Sun className="h-6 w-6 text-amber-500" />}
                  <p className="mt-3 text-sm font-medium">Theme</p>
                  <p className="text-xs opacity-60">{dark ? 'Dark' : 'Light'}</p>
                </div>
              </div>

              <div className={`relative mt-3 rounded-3xl p-4 ${tile}`}>
                <div className="flex items-center gap-3">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-accent-500 to-cyan-400 ${playing ? 'animate-pulse' : ''}`}>
                    <Volume2 className="h-6 w-6 text-white" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{tracks[track]}</p>
                    <p className="text-xs opacity-60">{playing ? 'Now playing' : 'Paused'}</p>
                  </div>
                </div>
                <div className="mt-4 flex h-8 items-end justify-center gap-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-1.5 rounded-full bg-gradient-to-t from-brand-500 to-accent-400 transition-all duration-300"
                      style={{ height: playing ? `${20 + ((i * 37 + track * 13) % 80)}%` : '12%', animation: playing ? `pulse ${0.6 + (i % 4) * 0.2}s ease-in-out infinite` : undefined }}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-6">
                  <button onClick={() => setPlaying((p) => !p)} aria-label="Play/pause" className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white">
                    {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <button onClick={() => setTrack((t) => (t + 1) % tracks.length)} aria-label="Next" className="opacity-70 hover:opacity-100">
                    <SkipForward className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-[11px] opacity-60"><span>Volume</span><span>{volume}%</span></div>
                  <div className={`mt-1 h-1.5 rounded-full ${dark ? 'bg-white/10' : 'bg-zinc-200'}`}>
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all" style={{ width: `${volume}%` }} />
                  </div>
                </div>
              </div>

              <div className={`absolute inset-x-5 bottom-6 flex items-center gap-2 rounded-full px-4 py-3 text-xs ${tile}`}>
                <span className={`h-2 w-2 rounded-full ${listening ? 'animate-ping bg-rose-400' : 'bg-zinc-500'}`} />
                <span className="opacity-70">{listening ? 'Listening…' : shaking ? 'Shake detected!' : 'Voice idle · Motion idle'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Log */}
        <div className="order-3 card-base p-5">
          <h2 className="flex items-center gap-2 font-semibold text-white"><Smartphone className="h-4 w-4 text-brand-300" /> Event log</h2>
          <ul className="mt-4 space-y-2">
            {log.map((l) => (
              <li key={l.id} className="animate-fade-in rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm">
                <span className={`mr-2 rounded-md px-1.5 py-0.5 font-mono text-[10px] uppercase ${l.source === 'voice' ? 'bg-brand-500/15 text-brand-200' : l.source === 'motion' ? 'bg-accent-500/15 text-accent-200' : 'bg-white/5 text-ink-400'}`}>
                  {l.source}
                </span>
                <span className="text-ink-200">{l.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DemoShell>
  );
}
