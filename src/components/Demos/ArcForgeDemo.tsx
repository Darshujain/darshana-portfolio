import { useEffect, useRef, useState } from 'react';
import { Cloud, Database, HardDrive, KeyRound, Loader2, Play, Server, Sparkles, Terminal, Trash2, Zap, type LucideIcon } from 'lucide-react';
import { DemoShell } from './DemoShell';

type Kit = 'node' | 'python';
type Method = 'GET' | 'POST' | 'DELETE';
type NodeId = 'gateway' | 'compute' | 'postgres' | 'redis' | 's3' | 'llm';

interface Endpoint {
  id: string;
  module: 'platform' | 'demo' | 'files' | 'ai';
  method: Method;
  path: string;
  body?: object;
  auth?: boolean;
  touches: NodeId[];
}

const endpoints: Endpoint[] = [
  { id: 'health', module: 'platform', method: 'GET', path: '/health', touches: ['gateway', 'compute'] },
  { id: 'login', module: 'platform', method: 'POST', path: '/auth/login', body: { email: 'dev@arcforge.io', password: '••••••••' }, touches: ['gateway', 'compute', 'postgres', 'redis'] },
  { id: 'me', module: 'platform', method: 'GET', path: '/me', auth: true, touches: ['gateway', 'compute', 'redis'] },
  { id: 'list', module: 'demo', method: 'GET', path: '/demo/items', auth: true, touches: ['gateway', 'compute', 'postgres'] },
  { id: 'create', module: 'demo', method: 'POST', path: '/demo/items', auth: true, body: { title: 'Ship v2 launch', priority: 'high' }, touches: ['gateway', 'compute', 'postgres'] },
  { id: 'presign', module: 'files', method: 'POST', path: '/files/presign', auth: true, body: { filename: 'report.pdf', contentType: 'application/pdf' }, touches: ['gateway', 'compute', 's3'] },
  { id: 'chat', module: 'ai', method: 'POST', path: '/ai/chat', auth: true, body: { prompt: 'Summarize this repo in one line' }, touches: ['gateway', 'compute', 'llm'] },
];

const methodStyle: Record<Method, string> = {
  GET: 'text-emerald-300 bg-emerald-400/10',
  POST: 'text-brand-200 bg-brand-500/15',
  DELETE: 'text-rose-300 bg-rose-400/10',
};

const nodes: Record<NodeId, { label: (k: Kit) => string; icon: LucideIcon }> = {
  gateway: { label: (k) => (k === 'node' ? 'API Gateway' : 'Uvicorn'), icon: Cloud },
  compute: { label: (k) => (k === 'node' ? 'Lambda (TS)' : 'FastAPI'), icon: Server },
  postgres: { label: () => 'Postgres', icon: Database },
  redis: { label: () => 'Redis', icon: Zap },
  s3: { label: () => 'S3 Files', icon: HardDrive },
  llm: { label: () => 'AI Provider', icon: Sparkles },
};

interface Item { id: number; title: string; priority: string; createdAt: string }
interface LogLine { t: string; text: string; tone: 'info' | 'ok' | 'err' | 'dim' }

const stamp = () => new Date().toLocaleTimeString('en-GB');

export function ArcForgeDemo() {
  const [kit, setKit] = useState<Kit>('node');
  const [selected, setSelected] = useState<Endpoint>(endpoints[0]);
  const [body, setBody] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([{ id: 1, title: 'Bootstrap CDK stack', priority: 'medium', createdAt: '2026-09-03T14:20:00Z' }]);
  const [response, setResponse] = useState<{ status: number; ms: number; json: unknown } | null>(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<NodeId[]>([]);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBody(selected.body ? JSON.stringify(selected.body, null, 2) : '');
    setResponse(null);
  }, [selected]);

  useEffect(() => {
    setLogs([
      { t: stamp(), text: kit === 'node' ? '$ npm run dev' : '$ uvicorn app.main:app --reload --port 4000', tone: 'dim' },
      { t: stamp(), text: kit === 'node' ? 'docker compose up -d postgres redis ✓' : 'docker compose up -d postgres redis ✓', tone: 'ok' },
      { t: stamp(), text: `${kit === 'node' ? 'dev-server' : 'FastAPI'} listening on http://localhost:4000`, tone: 'info' },
    ]);
  }, [kit]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [logs]);

  const log = (text: string, tone: LogLine['tone'] = 'info') => setLogs((l) => [...l.slice(-60), { t: stamp(), text, tone }]);

  const resolve = (ep: Endpoint, parsed: Record<string, unknown>): { status: number; json: unknown } => {
    if (ep.auth && !token) return { status: 401, json: { error: 'unauthorized', message: 'Missing or invalid bearer token. Call POST /auth/login first.' } };
    switch (ep.id) {
      case 'health':
        return { status: 200, json: { status: 'ok', runtime: kit === 'node' ? 'nodejs20.x' : 'python3.12', version: '2.0.0', uptime: Math.round(performance.now() / 1000) } };
      case 'login': {
        const t = `eyJhbGciOiJIUzI1NiJ9.${btoa(String(parsed.email ?? 'dev')).slice(0, 12)}.${Math.random().toString(36).slice(2, 10)}`;
        setToken(t);
        return { status: 200, json: { accessToken: t, expiresIn: 3600, user: { id: 'usr_01', email: parsed.email } } };
      }
      case 'me':
        return { status: 200, json: { id: 'usr_01', email: 'dev@arcforge.io', role: 'admin', workspace: 'techpotato' } };
      case 'list':
        return { status: 200, json: { data: items, count: items.length } };
      case 'create': {
        if (!parsed.title) return { status: 422, json: { error: 'validation_error', fields: { title: 'Required' } } };
        const item = { id: items.length + 1, title: String(parsed.title), priority: String(parsed.priority ?? 'low'), createdAt: new Date().toISOString() };
        setItems((i) => [...i, item]);
        return { status: 201, json: item };
      }
      case 'presign':
        return { status: 200, json: { uploadUrl: `https://arcforge-files.s3.ap-south-1.amazonaws.com/uploads/${parsed.filename}?X-Amz-Signature=…`, expiresIn: 900 } };
      case 'chat':
        return { status: 200, json: { model: 'provider/default', reply: 'ArcForge: copy-and-go backend kits for TypeScript Lambda and Python FastAPI.', tokens: 24 } };
      default:
        return { status: 404, json: { error: 'not_found' } };
    }
  };

  const send = async () => {
    let parsed: Record<string, unknown> = {};
    if (body.trim()) {
      try {
        parsed = JSON.parse(body);
      } catch {
        setResponse({ status: 400, ms: 0, json: { error: 'invalid_json', message: 'Request body is not valid JSON.' } });
        log(`${selected.method} ${selected.path} → 400 invalid JSON`, 'err');
        return;
      }
    }
    setLoading(true);
    setResponse(null);
    log(`→ ${selected.method} ${selected.path}`, 'dim');
    const path = selected.touches;
    for (let i = 0; i < path.length; i++) {
      setActive(path.slice(0, i + 1));
      await new Promise((r) => setTimeout(r, 160));
    }
    const ms = Math.round(18 + Math.random() * (selected.id === 'chat' ? 600 : 70));
    const result = resolve(selected, parsed);
    setResponse({ ...result, ms });
    log(`${selected.method} ${selected.path} ${result.status} ${ms}ms`, result.status < 300 ? 'ok' : 'err');
    setLoading(false);
    setTimeout(() => setActive([]), 900);
  };

  const statusTone = response ? (response.status < 300 ? 'text-emerald-300' : response.status < 500 ? 'text-amber-300' : 'text-rose-300') : '';

  return (
    <DemoShell
      title="ArcForge (CloudArc v2)"
      subtitle="Backend starter kits — interactive API playground"
      actions={
        <div className="flex rounded-full border border-white/10 p-0.5 text-xs">
          {(['node', 'python'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setKit(k)}
              className={`rounded-full px-3 py-1 font-medium transition ${kit === k ? 'bg-gradient-to-r from-brand-600 to-accent-500 text-white' : 'text-ink-400 hover:text-white'}`}
            >
              {k === 'node' ? 'node-cloud-arc' : 'python-cloud-arc'}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        {/* Endpoints */}
        <aside className="card-base p-3">
          <div className="mb-2 flex items-center justify-between px-2 py-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">Endpoints</p>
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] ${token ? 'bg-emerald-400/10 text-emerald-300' : 'bg-white/5 text-ink-500'}`}>
              <KeyRound className="h-3 w-3" /> {token ? 'Authed' : 'Guest'}
            </span>
          </div>
          {(['platform', 'demo', 'files', 'ai'] as const).map((mod) => (
            <div key={mod} className="mb-2">
              <p className="px-2 pb-1 pt-2 font-mono text-[10px] text-ink-600">modules/{mod}</p>
              {endpoints.filter((e) => e.module === mod).map((e) => (
                <button
                  key={e.id}
                  onClick={() => setSelected(e)}
                  className={`flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left transition ${selected.id === e.id ? 'bg-white/[0.07]' : 'hover:bg-white/[0.03]'}`}
                >
                  <span className={`w-12 rounded-md px-1 py-0.5 text-center font-mono text-[10px] font-semibold ${methodStyle[e.method]}`}>{e.method}</span>
                  <span className="truncate font-mono text-xs text-ink-200">{e.path}</span>
                  {e.auth && <KeyRound className="ml-auto h-3 w-3 shrink-0 text-ink-600" />}
                </button>
              ))}
            </div>
          ))}
          {token && (
            <button onClick={() => { setToken(null); log('token cleared', 'dim'); }} className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs text-ink-500 hover:text-rose-300">
              <Trash2 className="h-3.5 w-3.5" /> Clear token
            </button>
          )}
        </aside>

        <div className="grid min-w-0 gap-4">
          {/* Request */}
          <div className="card-base p-4">
            <div className="flex items-center gap-2">
              <span className={`rounded-lg px-2 py-1.5 font-mono text-xs font-semibold ${methodStyle[selected.method]}`}>{selected.method}</span>
              <div className="min-w-0 flex-1 truncate rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-sm text-ink-200">
                <span className="text-ink-500">http://localhost:4000</span>{selected.path}
              </div>
              <button onClick={send} disabled={loading} className="btn-primary px-4 py-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />} Send
              </button>
            </div>
            {selected.body && (
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                spellCheck={false}
                rows={4}
                className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-ink-950/60 p-3 font-mono text-xs text-brand-100 focus:border-brand-400/60 focus:outline-none"
              />
            )}
          </div>

          <div className="grid min-w-0 gap-4 xl:grid-cols-2">
            {/* Response */}
            <div className="card-base flex min-h-[220px] flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">Response</p>
                {response && (
                  <p className="font-mono text-xs">
                    <span className={statusTone}>{response.status}</span>
                    <span className="text-ink-500"> · {response.ms}ms</span>
                  </p>
                )}
              </div>
              <pre className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-ink-200">
                {loading ? <span className="text-ink-500">waiting for response…</span> : response ? JSON.stringify(response.json, null, 2) : <span className="text-ink-600">Hit Send to call the endpoint.</span>}
              </pre>
            </div>

            {/* Architecture */}
            <div className="card-base p-4">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">Request flow</p>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(nodes) as NodeId[]).map((id) => {
                  const n = nodes[id];
                  const on = active.includes(id);
                  return (
                    <div
                      key={id}
                      className={`flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 transition-all duration-300 ${
                        on ? 'border-brand-400/60 bg-brand-500/15 shadow-[0_0_24px_-6px_rgba(167,139,250,0.8)]' : 'border-white/5 bg-white/[0.02]'
                      }`}
                    >
                      <span className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${on ? 'bg-gradient-to-br from-brand-500 to-accent-500 text-white' : 'bg-white/5 text-ink-500'}`}>
                        <n.icon className="h-4 w-4" />
                      </span>
                      <span className={`text-xs font-medium ${on ? 'text-white' : 'text-ink-400'}`}>{n.label(kit)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="card-base overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
              <Terminal className="h-3.5 w-3.5 text-ink-500" />
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">Server logs</p>
            </div>
            <div ref={logRef} className="h-36 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
              {logs.map((l, i) => (
                <p key={i} className={l.tone === 'ok' ? 'text-emerald-300' : l.tone === 'err' ? 'text-rose-300' : l.tone === 'dim' ? 'text-ink-500' : 'text-ink-200'}>
                  <span className="text-ink-600">[{l.t}]</span> {l.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
