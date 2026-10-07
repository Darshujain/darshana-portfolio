import { useState } from 'react';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Code,
  Database,
  GraduationCap,
  Moon,
  Sun,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react';
import { DemoShell } from './DemoShell';

interface Course {
  title: string;
  icon: LucideIcon;
  topics: string[];
  duration: string;
  badge?: 'Most Popular' | 'Trending' | 'New';
  track: 'Development' | 'Testing' | 'Career';
  gradient: string;
}

const courses: Course[] = [
  { title: 'Full Stack Web Development', icon: Code, topics: ['React.js', 'Node.js', 'MongoDB', 'TypeScript', 'REST APIs', 'AWS'], duration: '6 months', badge: 'Most Popular', track: 'Development', gradient: 'from-brand-500 to-accent-500' },
  { title: 'QA Automation', icon: Activity, topics: ['Java', 'Selenium WebDriver', 'TestNG', 'Playwright', 'API Testing', 'CI/CD'], duration: '4 months', badge: 'Trending', track: 'Testing', gradient: 'from-orange-400 to-rose-500' },
  { title: 'DSA Mastery Program', icon: Database, topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'DP', 'System Design'], duration: '4 months', badge: 'New', track: 'Development', gradient: 'from-emerald-400 to-cyan-500' },
  { title: 'Interview Preparation', icon: BookOpen, topics: ['Technical Rounds', 'HR Rounds', 'Live Coding', 'Feedback Sessions', 'Resume Building'], duration: '2 months', track: 'Career', gradient: 'from-cyan-400 to-brand-600' },
  { title: 'Career Mentorship', icon: Users, topics: ['Career Planning', 'Job Placement', 'Portfolio Development', 'Industry Networking'], duration: 'Flexible', track: 'Career', gradient: 'from-accent-400 to-brand-600' },
  { title: 'Project Support', icon: Wrench, topics: ['Minor Projects', 'Major Projects', 'Code Reviews', 'Architecture Design'], duration: 'As needed', track: 'Development', gradient: 'from-amber-300 to-orange-500' },
];

const mentors = [
  { name: 'Sandesh Uttawar', role: 'Full Stack Developer', skills: ['TypeScript', 'React', 'Angular', 'Node.js'] },
  { name: 'Hardik Shah', role: 'Full Stack Developer', skills: ['TypeScript', 'Node.js', 'React', 'AWS'] },
  { name: 'Kishor Chate', role: 'QA Automation Expert', skills: ['Java', 'Selenium', 'TestNG', 'Playwright'] },
  { name: 'Er. Lakhan Lal Gupta', role: 'Software Engineer', skills: ['Data Science', 'Python', 'ML', 'AI'] },
];

const badgeStyle = {
  'Most Popular': 'from-purple-600 to-pink-600',
  Trending: 'from-orange-500 to-red-500',
  New: 'from-green-500 to-emerald-500',
};

const tracks = ['All', 'Development', 'Testing', 'Career'] as const;
const interviewTracks = ['Frontend (React)', 'Backend (Node.js)', 'Full Stack', 'QA Automation', 'DSA'];

function nextDays(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });
}
const slots = ['10:00 AM', '12:30 PM', '3:00 PM', '6:00 PM', '8:30 PM'];

export function NextGenDemo() {
  const [light, setLight] = useState(false);
  const [track, setTrack] = useState<(typeof tracks)[number]>('All');
  const [open, setOpen] = useState<Course | null>(null);
  const [enrolled, setEnrolled] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<'courses' | 'interview' | 'mentors'>('courses');

  const [iTrack, setITrack] = useState(interviewTracks[0]);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState<string | null>(null);

  const days = nextDays(6);
  const visible = courses.filter((c) => track === 'All' || c.track === track);

  const surface = light ? 'bg-white text-zinc-800 border-zinc-200' : '';
  const muted = light ? 'text-zinc-500' : 'text-ink-400';
  const strong = light ? 'text-zinc-900' : 'text-white';

  return (
    <DemoShell
      title="NextGen Devs"
      subtitle="Full stack & QA career-training platform"
      actions={
        <button onClick={() => setLight((l) => !l)} className="icon-btn h-10 w-10" aria-label="Toggle theme">
          {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      }
    >
      <div className={`rounded-[2rem] p-4 transition-colors duration-500 sm:p-6 ${light ? 'bg-zinc-50' : ''}`}>
        {/* Hero */}
        <div className={`relative overflow-hidden rounded-3xl p-8 sm:p-12 ${light ? 'bg-gradient-to-br from-violet-100 to-fuchsia-100' : 'card-base gradient-ring'}`}>
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-accent-500/25 blur-3xl" />
          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${light ? 'bg-white text-violet-700' : 'bg-white/5 text-brand-200'}`}>
            <GraduationCap className="h-3.5 w-3.5" /> 2026 cohorts open
          </span>
          <h2 className={`relative mt-4 max-w-2xl text-3xl font-semibold sm:text-5xl ${strong}`}>
            Launch your tech career with <span className="text-gradient">industry mentors</span>
          </h2>
          <p className={`relative mt-3 max-w-xl ${muted}`}>
            Full Stack Development, QA Automation and complete interview preparation — with mock interviews and 1-on-1 guidance.
          </p>
          <div className="relative mt-6 flex flex-wrap gap-3">
            <button onClick={() => setTab('courses')} className="btn-primary">Explore courses <ArrowRight className="h-4 w-4" /></button>
            <button onClick={() => setTab('interview')} className={light ? 'btn-secondary bg-white' : 'btn-secondary'}>
              <Calendar className="h-4 w-4" /> Book mock interview
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`mx-auto my-6 flex w-fit gap-1 rounded-full border p-1 ${light ? 'border-zinc-200 bg-white' : 'border-white/10 bg-white/[0.03]'}`}>
          {([
            ['courses', 'Courses'],
            ['interview', 'Mock interview'],
            ['mentors', 'Mentors'],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                tab === id ? 'bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow' : muted
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'courses' && (
          <>
            <div className="mb-4 flex flex-wrap justify-center gap-1.5">
              {tracks.map((t) => (
                <button
                  key={t}
                  onClick={() => setTrack(t)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    track === t
                      ? light ? 'border-violet-300 bg-violet-50 text-violet-700' : 'border-brand-400/40 bg-brand-500/10 text-white'
                      : light ? 'border-zinc-200 text-zinc-500' : 'border-white/10 text-ink-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((c) => (
                <button
                  key={c.title}
                  onClick={() => setOpen(c)}
                  className={`group relative flex flex-col rounded-3xl border p-6 text-left transition hover:-translate-y-1 ${light ? `${surface} shadow-sm hover:shadow-xl` : 'card-base card-hover'}`}
                >
                  {c.badge && (
                    <span className={`absolute right-4 top-4 rounded-full bg-gradient-to-r ${badgeStyle[c.badge]} px-2.5 py-0.5 text-[10px] font-semibold text-white`}>
                      {c.badge}
                    </span>
                  )}
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.gradient} text-white shadow-lg`}>
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className={`mt-4 text-lg font-semibold ${strong}`}>{c.title}</h3>
                  <p className={`mt-1 flex items-center gap-1.5 text-xs ${muted}`}><Clock className="h-3.5 w-3.5" /> {c.duration}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.topics.slice(0, 4).map((t) => (
                      <span key={t} className={light ? 'rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600' : 'tech-badge'}>{t}</span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-400">
                    {enrolled.has(c.title) ? <><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Enrolled</> : <>View details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></>}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {tab === 'interview' && (
          <div className={`mx-auto max-w-2xl rounded-3xl border p-6 sm:p-8 ${light ? surface : 'card-base'}`}>
            {booked ? (
              <div className="py-6 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-white">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h3 className={`mt-4 text-xl font-semibold ${strong}`}>Mock interview booked!</h3>
                <p className={`mt-2 text-sm ${muted}`}>{booked}</p>
                <button onClick={() => { setBooked(null); setSlot(null); }} className="btn-secondary mt-6">Book another</button>
              </div>
            ) : (
              <>
                <h3 className={`text-xl font-semibold ${strong}`}>Book a mock interview</h3>
                <p className={`mt-1 text-sm ${muted}`}>Real interview format with detailed feedback.</p>

                <p className={`mb-2 mt-6 text-xs font-medium uppercase tracking-wider ${muted}`}>Track</p>
                <div className="flex flex-wrap gap-2">
                  {interviewTracks.map((t) => (
                    <button key={t} onClick={() => setITrack(t)} className={`rounded-full border px-3 py-1.5 text-sm transition ${iTrack === t ? 'border-brand-400 bg-brand-500/15 text-brand-300' : light ? 'border-zinc-200 text-zinc-600' : 'border-white/10 text-ink-300'}`}>
                      {t}
                    </button>
                  ))}
                </div>

                <p className={`mb-2 mt-6 text-xs font-medium uppercase tracking-wider ${muted}`}>Date</p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {days.map((d, i) => (
                    <button key={i} onClick={() => setDay(i)} className={`rounded-2xl border py-2 text-center transition ${day === i ? 'border-brand-400 bg-brand-500/15' : light ? 'border-zinc-200' : 'border-white/10'}`}>
                      <p className={`text-[11px] ${muted}`}>{d.toLocaleDateString('en', { weekday: 'short' })}</p>
                      <p className={`text-lg font-semibold ${strong}`}>{d.getDate()}</p>
                    </button>
                  ))}
                </div>

                <p className={`mb-2 mt-6 text-xs font-medium uppercase tracking-wider ${muted}`}>Time</p>
                <div className="flex flex-wrap gap-2">
                  {slots.map((s, i) => {
                    const taken = (day + i) % 4 === 0;
                    return (
                      <button
                        key={s}
                        disabled={taken}
                        onClick={() => setSlot(s)}
                        className={`rounded-full border px-3 py-1.5 text-sm transition disabled:cursor-not-allowed disabled:line-through disabled:opacity-40 ${slot === s ? 'border-brand-400 bg-brand-500/15 text-brand-300' : light ? 'border-zinc-200 text-zinc-600' : 'border-white/10 text-ink-300'}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={!slot}
                  onClick={() => setBooked(`${iTrack} · ${days[day].toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'short' })} at ${slot}`)}
                  className="btn-primary mt-8 w-full"
                >
                  Confirm booking
                </button>
              </>
            )}
          </div>
        )}

        {tab === 'mentors' && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mentors.map((m, i) => (
              <div key={m.name} className={`rounded-3xl border p-6 text-center ${light ? surface : 'card-base card-hover'}`}>
                <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${['from-brand-500 to-accent-500', 'from-cyan-400 to-brand-500', 'from-orange-400 to-rose-500', 'from-emerald-400 to-cyan-500'][i]} text-xl font-semibold text-white`}>
                  {m.name.replace('Er. ', '').split(' ').map((p) => p[0]).slice(0, 2).join('')}
                </span>
                <h3 className={`mt-4 font-semibold ${strong}`}>{m.name}</h3>
                <p className={`flex items-center justify-center gap-1 text-xs ${muted}`}><Briefcase className="h-3 w-3" /> {m.role}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {m.skills.map((s) => (
                    <span key={s} className={light ? 'rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600' : 'tech-badge'}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Course modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setOpen(null)} className="absolute inset-0 animate-fade-in bg-black/60 backdrop-blur-sm" />
          <div className="card-base gradient-ring relative w-full max-w-lg animate-fade-in-up p-7">
            <button onClick={() => setOpen(null)} className="icon-btn absolute right-4 top-4 h-9 w-9" aria-label="Close"><X className="h-4 w-4" /></button>
            <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${open.gradient} text-white`}>
              <open.icon className="h-7 w-7" />
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-white">{open.title}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-400"><Clock className="h-4 w-4" /> {open.duration} · {open.track}</p>
            <h4 className="mb-3 mt-6 font-mono text-xs uppercase tracking-[0.18em] text-ink-400">Curriculum</h4>
            <ol className="space-y-2">
              {open.topics.map((t, i) => (
                <li key={t} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-ink-200">
                  <span className="font-mono text-xs text-brand-300">{String(i + 1).padStart(2, '0')}</span>
                  {t}
                </li>
              ))}
            </ol>
            <button
              onClick={() => {
                setEnrolled((s) => new Set(s).add(open.title));
                setOpen(null);
              }}
              disabled={enrolled.has(open.title)}
              className="btn-primary mt-6 w-full"
            >
              {enrolled.has(open.title) ? 'Already enrolled' : 'Enroll now'}
            </button>
          </div>
        </div>
      )}
    </DemoShell>
  );
}
