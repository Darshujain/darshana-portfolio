import { useCallback, useEffect, useState, type FormEvent } from 'react';
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  Loader2,
  MapPin,
  Search,
  Sun,
  Thermometer,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import { DemoShell } from './DemoShell';

interface Place {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface WeatherData {
  current: { temp: number; feels: number; humidity: number; wind: number; code: number };
  hourly: { time: string; temp: number }[];
  daily: { date: string; max: number; min: number; code: number }[];
}

const quickCities = ['Mumbai', 'Delhi', 'Bengaluru', 'Indore', 'London', 'New York', 'Tokyo'];

function describe(code: number): { label: string; icon: LucideIcon } {
  if (code === 0) return { label: 'Clear sky', icon: Sun };
  if (code <= 2) return { label: 'Partly cloudy', icon: CloudSun };
  if (code === 3) return { label: 'Overcast', icon: Cloud };
  if (code <= 48) return { label: 'Fog', icon: CloudFog };
  if (code <= 57) return { label: 'Drizzle', icon: CloudDrizzle };
  if (code <= 67 || (code >= 80 && code <= 82)) return { label: 'Rain', icon: CloudRain };
  if (code <= 77 || code === 85 || code === 86) return { label: 'Snow', icon: CloudSnow };
  return { label: 'Thunderstorm', icon: CloudLightning };
}

const fallback: WeatherData = {
  current: { temp: 29, feels: 32, humidity: 68, wind: 12, code: 2 },
  hourly: Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, '0')}:00`,
    temp: Math.round(26 + 5 * Math.sin(((i - 9) / 24) * Math.PI * 2)),
  })),
  daily: Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return { date: d.toISOString().slice(0, 10), max: 31 - (i % 3), min: 24 + (i % 2), code: [2, 1, 61, 3, 0, 80, 2][i] };
  }),
};

async function geocode(name: string): Promise<Place | null> {
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1`);
  const json = await res.json();
  const r = json.results?.[0];
  return r ? { name: r.name, country: r.country_code ?? r.country, latitude: r.latitude, longitude: r.longitude } : null;
}

async function fetchWeather(p: Place): Promise<WeatherData> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}` +
    '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m' +
    '&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7';
  const json = await (await fetch(url)).json();
  const nowHour = new Date(json.current.time).getHours();
  return {
    current: {
      temp: Math.round(json.current.temperature_2m),
      feels: Math.round(json.current.apparent_temperature),
      humidity: json.current.relative_humidity_2m,
      wind: Math.round(json.current.wind_speed_10m),
      code: json.current.weather_code,
    },
    hourly: (json.hourly.time as string[]).slice(nowHour, nowHour + 24).map((t, i) => ({
      time: t.slice(11, 16),
      temp: Math.round(json.hourly.temperature_2m[nowHour + i]),
    })),
    daily: (json.daily.time as string[]).map((d, i) => ({
      date: d,
      max: Math.round(json.daily.temperature_2m_max[i]),
      min: Math.round(json.daily.temperature_2m_min[i]),
      code: json.daily.weather_code[i],
    })),
  };
}

export function WeatherDemo() {
  const [query, setQuery] = useState('');
  const [place, setPlace] = useState<Place>({ name: 'Mumbai', country: 'IN', latitude: 19.07, longitude: 72.88 });
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const load = useCallback(async (p: Place) => {
    setLoading(true);
    setError('');
    try {
      setData(await fetchWeather(p));
      setPlace(p);
    } catch {
      setData(fallback);
      setError('Live weather unavailable right now — showing sample data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(place);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = async (name: string) => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const p = await geocode(name.trim());
      if (!p) {
        setError(`No city found for "${name}".`);
        setLoading(false);
        return;
      }
      await load(p);
    } catch {
      setError('Search failed — check your connection.');
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    search(query);
  };

  const t = (c: number) => (unit === 'C' ? c : Math.round((c * 9) / 5 + 32));
  const current = data ? describe(data.current.code) : null;
  const temps = data?.hourly.map((h) => h.temp) ?? [];
  const hi = Math.max(...temps, 1);
  const lo = Math.min(...temps, 0);
  const points = data?.hourly
    .map((h, i) => `${(i / Math.max(data.hourly.length - 1, 1)) * 100},${40 - ((h.temp - lo) / Math.max(hi - lo, 1)) * 32 - 4}`)
    .join(' ');

  return (
    <DemoShell
      title="Weather Website"
      subtitle="Real-time forecast powered by Open-Meteo"
      actions={
        <div className="flex rounded-full border border-white/10 p-0.5 text-xs">
          {(['C', 'F'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`rounded-full px-3 py-1 font-medium transition ${unit === u ? 'bg-white/10 text-white' : 'text-ink-400 hover:text-white'}`}
            >
              °{u}
            </button>
          ))}
        </div>
      }
    >
      <form onSubmit={onSubmit} className="mx-auto mb-4 flex max-w-2xl gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute z-10 left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any city..."
            className="input-field rounded-full pl-11"
          />
        </div>
        <button type="submit" className="btn-primary px-5">Search</button>
      </form>
      <div className="mx-auto mb-8 flex max-w-2xl flex-wrap justify-center gap-2">
        {quickCities.map((c) => (
          <button key={c} onClick={() => search(c)} className="skill-badge py-1 text-xs">
            {c}
          </button>
        ))}
      </div>

      {error && <p className="mx-auto mb-4 max-w-2xl text-center text-sm text-amber-400">{error}</p>}

      {!data ? (
        <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-brand-400" /></div>
      ) : (
        <div className={`grid gap-4 transition-opacity lg:grid-cols-3 ${loading ? 'opacity-50' : ''}`}>
          <div className="card-base gradient-ring relative overflow-hidden p-7 lg:col-span-2">
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gradient-to-br from-amber-300/30 to-accent-500/20 blur-3xl" />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="flex items-center gap-1.5 text-sm text-ink-400"><MapPin className="h-4 w-4" />{place.name}, {place.country}</p>
                <p className="mt-4 text-7xl font-semibold tracking-tight text-white sm:text-8xl">{t(data.current.temp)}°</p>
                <p className="mt-2 text-lg text-ink-300">{current?.label}</p>
              </div>
              {current && <current.icon className="h-24 w-24 text-amber-300 drop-shadow-[0_0_30px_rgba(252,211,77,0.5)] sm:h-32 sm:w-32" strokeWidth={1.2} />}
            </div>
            <div className="relative mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: Thermometer, label: 'Feels like', value: `${t(data.current.feels)}°` },
                { icon: Droplets, label: 'Humidity', value: `${data.current.humidity}%` },
                { icon: Wind, label: 'Wind', value: `${data.current.wind} km/h` },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
                  <s.icon className="h-4 w-4 text-brand-300" />
                  <p className="mt-2 text-xs text-ink-500">{s.label}</p>
                  <p className="text-lg font-semibold text-white">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-base p-5">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-400">7-day forecast</h2>
            <div className="space-y-1">
              {data.daily.map((d, i) => {
                const w = describe(d.code);
                return (
                  <div key={d.date} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/[0.03]">
                    <span className="w-12 text-sm text-ink-300">{i === 0 ? 'Today' : new Date(d.date).toLocaleDateString('en', { weekday: 'short' })}</span>
                    <w.icon className="h-5 w-5 text-brand-300" />
                    <span className="flex-1 truncate text-xs text-ink-500">{w.label}</span>
                    <span className="text-sm text-ink-500">{t(d.min)}°</span>
                    <span className="w-9 text-right text-sm font-semibold text-white">{t(d.max)}°</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-base p-5 lg:col-span-3">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-400">Next 24 hours</h2>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-28 w-full">
              <defs>
                <linearGradient id="temp-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="temp-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#e879f9" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <polygon points={`0,40 ${points} 100,40`} fill="url(#temp-fill)" />
              <polyline points={points} fill="none" stroke="url(#temp-line)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2.5 }} />
            </svg>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-ink-500">
              {data.hourly.filter((_, i) => i % 4 === 0).map((h) => (
                <span key={h.time}>{h.time} · {t(h.temp)}°</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </DemoShell>
  );
}
