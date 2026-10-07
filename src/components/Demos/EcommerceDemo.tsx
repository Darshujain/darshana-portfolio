import { useMemo, useState, type FormEvent } from 'react';
import {
  Backpack,
  Camera,
  CheckCircle2,
  Gamepad2,
  Headphones,
  Heart,
  Keyboard,
  Laptop,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Smartphone,
  Star,
  Watch,
  X,
  type LucideIcon,
} from 'lucide-react';
import { DemoShell } from './DemoShell';

interface Product {
  id: number;
  name: string;
  category: 'Audio' | 'Wearables' | 'Computing' | 'Lifestyle';
  price: number;
  rating: number;
  icon: LucideIcon;
  gradient: string;
}

const products: Product[] = [
  { id: 1, name: 'Aura Pro Headphones', category: 'Audio', price: 12999, rating: 4.8, icon: Headphones, gradient: 'from-brand-500 to-accent-500' },
  { id: 2, name: 'Pulse Smartwatch', category: 'Wearables', price: 8999, rating: 4.6, icon: Watch, gradient: 'from-cyan-400 to-brand-600' },
  { id: 3, name: 'Nova Ultrabook 14', category: 'Computing', price: 74999, rating: 4.9, icon: Laptop, gradient: 'from-zinc-400 to-zinc-700' },
  { id: 4, name: 'Flux Phone 5G', category: 'Computing', price: 34999, rating: 4.5, icon: Smartphone, gradient: 'from-accent-400 to-rose-500' },
  { id: 5, name: 'Clicky Mech Keyboard', category: 'Computing', price: 5499, rating: 4.7, icon: Keyboard, gradient: 'from-amber-300 to-orange-500' },
  { id: 6, name: 'Snap Mirrorless Cam', category: 'Lifestyle', price: 54999, rating: 4.8, icon: Camera, gradient: 'from-emerald-400 to-cyan-600' },
  { id: 7, name: 'Trail Daypack', category: 'Lifestyle', price: 2999, rating: 4.4, icon: Backpack, gradient: 'from-lime-300 to-emerald-600' },
  { id: 8, name: 'Arcade Controller', category: 'Lifestyle', price: 4499, rating: 4.6, icon: Gamepad2, gradient: 'from-violet-400 to-indigo-600' },
];

const categories = ['All', 'Audio', 'Wearables', 'Computing', 'Lifestyle'] as const;
const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export function EcommerceDemo() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'featured' | 'low' | 'high'>('featured');
  const [cart, setCart] = useState<Record<number, number>>({});
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'cart' | 'details' | 'done'>('cart');
  const [bump, setBump] = useState(false);
  const [orderNo, setOrderNo] = useState(0);

  const visible = useMemo(() => {
    const list = products.filter(
      (p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase()),
    );
    if (sort === 'low') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  const lines = Object.entries(cart).map(([id, qty]) => ({ product: products.find((p) => p.id === Number(id))!, qty }));
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.qty * l.product.price, 0);
  const shipping = subtotal > 0 && subtotal < 5000 ? 99 : 0;

  const add = (id: number, delta = 1) => {
    setCart((c) => {
      const qty = (c[id] ?? 0) + delta;
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
    if (delta > 0) {
      setBump(true);
      setTimeout(() => setBump(false), 300);
    }
  };

  const toggleLike = (id: number) =>
    setLiked((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    setOrderNo(Math.floor(Math.random() * 90000) + 10000);
    setStep('done');
    setCart({});
  };

  const closeCart = () => {
    setOpen(false);
    setTimeout(() => setStep('cart'), 400);
  };

  return (
    <DemoShell
      title="E-commerce Website"
      subtitle="Browse, add to cart and check out"
      actions={
        <button onClick={() => setOpen(true)} className={`icon-btn relative h-10 w-10 transition-transform ${bump ? 'scale-110' : ''}`} aria-label="Open cart">
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-1 text-[10px] font-bold text-white">
              {count}
            </span>
          )}
        </button>
      }
    >
      <div className="card-base gradient-ring relative mb-6 overflow-hidden p-8 sm:p-10">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-500/25 blur-3xl" />
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-300">Festive drop · 2026</p>
        <h2 className="mt-3 max-w-lg text-3xl font-semibold text-white sm:text-4xl">
          Gear that feels like the <span className="text-serif-accent text-gradient">future</span>
        </h2>
        <p className="mt-2 text-sm text-ink-400">Free shipping on orders above ₹5,000.</p>
      </div>

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${category === c ? 'bg-white/10 text-white' : 'text-ink-400 hover:text-white'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 lg:w-64">
            <Search className="pointer-events-none absolute z-10 left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." className="input-field rounded-full py-2 pl-10" />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="input-field w-auto rounded-full py-2"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => (
          <div key={p.id} className="card-base card-hover group flex flex-col p-2">
            <div className={`relative flex aspect-square items-center justify-center rounded-[1.25rem] bg-gradient-to-br ${p.gradient}`}>
              <p.icon className="h-16 w-16 text-white/90 drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.3} />
              <button
                onClick={() => toggleLike(p.id)}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 backdrop-blur-md"
                aria-label="Add to wishlist"
              >
                <Heart className={`h-4 w-4 ${liked.has(p.id) ? 'fill-rose-400 text-rose-400' : 'text-white'}`} />
              </button>
            </div>
            <div className="flex flex-1 flex-col p-3">
              <p className="text-[11px] text-ink-500">{p.category}</p>
              <h3 className="mt-0.5 text-sm font-medium text-white">{p.name}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-ink-400">
                <Star className="h-3 w-3 fill-amber-300 text-amber-300" /> {p.rating}
              </p>
              <div className="mt-auto flex items-center justify-between pt-3">
                <span className="font-semibold text-white">{inr(p.price)}</span>
                <button onClick={() => add(p.id)} className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/30 transition hover:scale-110" aria-label={`Add ${p.name} to cart`}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visible.length === 0 && <p className="py-16 text-center text-sm text-ink-500">No products found.</p>}

      {/* Cart drawer */}
      <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div onClick={closeCart} className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} />
        <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ink-950/95 backdrop-blur-2xl transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">
              {step === 'cart' ? 'Your cart' : step === 'details' ? 'Checkout' : 'Order placed'}
            </h2>
            <button onClick={closeCart} className="icon-btn h-9 w-9" aria-label="Close cart"><X className="h-4 w-4" /></button>
          </div>

          {step === 'done' ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-white">Thank you!</h3>
              <p className="mt-2 text-sm text-ink-400">Your order #{orderNo} is confirmed. (Demo — no payment taken.)</p>
              <button onClick={closeCart} className="btn-primary mt-6">Continue shopping</button>
            </div>
          ) : lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-ink-500">
              <ShoppingBag className="h-10 w-10" />
              <p className="mt-3 text-sm">Your cart is empty.</p>
            </div>
          ) : step === 'cart' ? (
            <>
              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                {lines.map(({ product, qty }) => (
                  <div key={product.id} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3">
                    <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${product.gradient}`}>
                      <product.icon className="h-6 w-6 text-white" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{product.name}</p>
                      <p className="text-xs text-ink-400">{inr(product.price)}</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-white/10 p-1">
                      <button onClick={() => add(product.id, -1)} className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/10" aria-label="Decrease"><Minus className="h-3 w-3" /></button>
                      <span className="w-4 text-center text-sm text-white">{qty}</span>
                      <button onClick={() => add(product.id)} className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/10" aria-label="Increase"><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-white/5 p-5 text-sm">
                <div className="flex justify-between text-ink-400"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
                <div className="flex justify-between text-ink-400"><span>Shipping</span><span>{shipping ? inr(shipping) : 'Free'}</span></div>
                <div className="flex justify-between pt-2 text-base font-semibold text-white"><span>Total</span><span>{inr(subtotal + shipping)}</span></div>
                <button onClick={() => setStep('details')} className="btn-primary mt-3 w-full">Checkout</button>
              </div>
            </>
          ) : (
            <form onSubmit={placeOrder} className="flex flex-1 flex-col gap-3 overflow-y-auto p-5">
              <input required placeholder="Full name" className="input-field" />
              <input required type="email" placeholder="Email" className="input-field" />
              <input required placeholder="Address" className="input-field" />
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="City" className="input-field" />
                <input required placeholder="PIN code" pattern="[0-9]{6}" title="6-digit PIN" className="input-field" />
              </div>
              <div className="mt-auto space-y-3 border-t border-white/5 pt-4">
                <div className="flex justify-between text-base font-semibold text-white"><span>Total</span><span>{inr(subtotal + shipping)}</span></div>
                <button type="submit" className="btn-primary w-full">Place order</button>
                <button type="button" onClick={() => setStep('cart')} className="btn-ghost w-full">Back to cart</button>
              </div>
            </form>
          )}
        </aside>
      </div>
    </DemoShell>
  );
}
