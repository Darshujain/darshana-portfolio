import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock, Package, Plus, Radio, Search, Truck, X, XCircle } from 'lucide-react';
import { DemoShell } from './DemoShell';

type Status = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

interface Order {
  id: string;
  po: string;
  customer: string;
  items: number;
  amount: number;
  status: Status;
  updated: number;
}

const customers = ['Aarav Textiles', 'Meera Foods', 'Kabir Electronics', 'Zoya Interiors', 'Nimbus Pharma', 'Vihaan Motors', 'Ira Boutique', 'Orbit Logistics'];
const flow: Status[] = ['Pending', 'Processing', 'Shipped', 'Delivered'];

const statusStyle: Record<Status, string> = {
  Pending: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
  Processing: 'bg-brand-500/10 text-brand-200 border-brand-400/20',
  Shipped: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20',
  Delivered: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
  Cancelled: 'bg-rose-400/10 text-rose-300 border-rose-400/20',
};

const statusIcon: Record<Status, typeof Clock> = {
  Pending: Clock,
  Processing: Package,
  Shipped: Truck,
  Delivered: CheckCircle2,
  Cancelled: XCircle,
};

let seq = 1040;
const makeOrder = (status?: Status): Order => {
  seq += 1;
  return {
    id: `ORD-${seq}`,
    po: `PO-${(seq * 7) % 9000 + 1000}`,
    customer: customers[seq % customers.length],
    items: (seq % 9) + 1,
    amount: ((seq * seq * 7919) % 90000) + 4500,
    status: status ?? flow[seq % flow.length],
    updated: Date.now() - (seq % 50) * 60000,
  };
};

const initial: Order[] = [...Array.from({ length: 11 }, () => makeOrder()), makeOrder('Cancelled')];

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
const ago = (ts: number) => {
  const m = Math.round((Date.now() - ts) / 60000);
  return m < 1 ? 'just now' : m < 60 ? `${m}m ago` : `${Math.round(m / 60)}h ago`;
};

export function OrianaDemo() {
  const [orders, setOrders] = useState<Order[]>(initial);
  const [filter, setFilter] = useState<Status | 'All'>('All');
  const [query, setQuery] = useState('');
  const [live, setLive] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [, tick] = useState(0);

  useEffect(() => {
    if (!live) return undefined;
    const timer = setInterval(() => {
      setOrders((prev) => {
        const movable = prev.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled');
        if (!movable.length) return prev;
        const target = movable[Math.floor(Math.random() * movable.length)];
        setFlash(target.id);
        return prev.map((o) =>
          o.id === target.id ? { ...o, status: flow[flow.indexOf(o.status) + 1], updated: Date.now() } : o,
        );
      });
      tick((n) => n + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, [live]);

  useEffect(() => {
    if (!selected) return;
    const fresh = orders.find((o) => o.id === selected.id);
    if (fresh && fresh !== selected) setSelected(fresh);
  }, [orders, selected]);

  const visible = useMemo(
    () =>
      orders.filter(
        (o) =>
          (filter === 'All' || o.status === filter) &&
          `${o.id} ${o.po} ${o.customer}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [orders, filter, query],
  );

  const stats = [
    { label: 'Total orders', value: orders.length, accent: 'from-brand-500 to-accent-500' },
    { label: 'In transit', value: orders.filter((o) => o.status === 'Shipped').length, accent: 'from-cyan-400 to-brand-500' },
    { label: 'Delivered', value: orders.filter((o) => o.status === 'Delivered').length, accent: 'from-emerald-400 to-cyan-400' },
    { label: 'Revenue', value: inr(orders.filter((o) => o.status !== 'Cancelled').reduce((s, o) => s + o.amount, 0)), accent: 'from-amber-300 to-accent-500' },
  ];

  const addOrder = () => {
    const o = { ...makeOrder('Pending'), updated: Date.now() };
    setOrders((prev) => [o, ...prev]);
    setFlash(o.id);
  };

  return (
    <DemoShell
      title="Oriana Order Tracking"
      subtitle="Orders & purchase orders, updated in real time"
      actions={
        <>
          <button
            onClick={() => setLive((l) => !l)}
            className={`hidden items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition sm:inline-flex ${
              live ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border-white/10 text-ink-400'
            }`}
          >
            <Radio className={`h-3.5 w-3.5 ${live ? 'animate-pulse' : ''}`} />
            {live ? 'Live' : 'Paused'}
          </button>
          <button onClick={addOrder} className="btn-primary px-4 py-2 text-xs">
            <Plus className="h-4 w-4" /> New order
          </button>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-base p-5">
            <p className="text-xs text-ink-500">{s.label}</p>
            <p className={`mt-2 bg-gradient-to-r ${s.accent} bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card-base mt-4 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-white/5 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {(['All', ...flow, 'Cancelled'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  filter === s ? 'bg-white/10 text-white' : 'text-ink-400 hover:text-white'
                }`}
              >
                {s}
                <span className="ml-1.5 text-ink-500">{s === 'All' ? orders.length : orders.filter((o) => o.status === s).length}</span>
              </button>
            ))}
          </div>
          <div className="relative lg:w-72">
            <Search className="pointer-events-none absolute z-10 left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search order, PO, customer..." className="input-field rounded-full py-2 pl-10" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="text-left font-mono text-[11px] uppercase tracking-wider text-ink-500">
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">PO</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((o) => {
                const Icon = statusIcon[o.status];
                return (
                  <tr
                    key={o.id}
                    onClick={() => setSelected(o)}
                    onAnimationEnd={() => setFlash(null)}
                    className={`cursor-pointer border-t border-white/5 transition-colors hover:bg-white/[0.03] ${flash === o.id ? 'animate-fade-in bg-brand-500/10' : ''}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-white">{o.id}</td>
                    <td className="px-4 py-3 font-mono text-xs text-ink-400">{o.po}</td>
                    <td className="px-4 py-3 text-ink-200">{o.customer}</td>
                    <td className="px-4 py-3 text-ink-400">{o.items}</td>
                    <td className="px-4 py-3 text-ink-200">{inr(o.amount)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs ${statusStyle[o.status]}`}>
                        <Icon className="h-3 w-3" />
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-ink-500">{ago(o.updated)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {visible.length === 0 && <p className="py-12 text-center text-sm text-ink-500">No orders match your filters.</p>}
        </div>
      </div>

      {/* Detail drawer */}
      <div className={`fixed inset-0 z-50 transition ${selected ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div onClick={() => setSelected(null)} className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${selected ? 'opacity-100' : 'opacity-0'}`} />
        <aside className={`absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-ink-950/95 p-6 backdrop-blur-2xl transition-transform duration-500 ${selected ? 'translate-x-0' : 'translate-x-full'}`}>
          {selected && (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-xs text-ink-500">{selected.po}</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">{selected.id}</h2>
                  <p className="text-sm text-ink-400">{selected.customer}</p>
                </div>
                <button onClick={() => setSelected(null)} className="icon-btn h-9 w-9" aria-label="Close"><X className="h-4 w-4" /></button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4"><p className="text-xs text-ink-500">Amount</p><p className="mt-1 text-lg font-semibold text-white">{inr(selected.amount)}</p></div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4"><p className="text-xs text-ink-500">Items</p><p className="mt-1 text-lg font-semibold text-white">{selected.items}</p></div>
              </div>

              <h3 className="mb-4 mt-8 font-mono text-xs uppercase tracking-[0.18em] text-ink-400">Timeline</h3>
              <ol className="space-y-5">
                {flow.map((step, i) => {
                  const reached = selected.status !== 'Cancelled' && flow.indexOf(selected.status) >= i;
                  const Icon = statusIcon[step];
                  return (
                    <li key={step} className="flex items-center gap-3">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${reached ? 'bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/30' : 'border border-white/10 text-ink-600'}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className={reached ? 'text-white' : 'text-ink-600'}>{step}</span>
                    </li>
                  );
                })}
              </ol>

              {selected.status !== 'Delivered' && selected.status !== 'Cancelled' && (
                <div className="mt-8 flex gap-2">
                  <button
                    onClick={() => setOrders((prev) => prev.map((o) => (o.id === selected.id ? { ...o, status: flow[flow.indexOf(o.status) + 1], updated: Date.now() } : o)))}
                    className="btn-primary flex-1"
                  >
                    Advance to {flow[flow.indexOf(selected.status) + 1]}
                  </button>
                  <button
                    onClick={() => setOrders((prev) => prev.map((o) => (o.id === selected.id ? { ...o, status: 'Cancelled', updated: Date.now() } : o)))}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          )}
        </aside>
      </div>
    </DemoShell>
  );
}
