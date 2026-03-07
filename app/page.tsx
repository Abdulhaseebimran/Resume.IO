import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowRight, Sparkles, FileText, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-primary-bg overflow-x-hidden selection:bg-accent/30">
      {/* Premium Navbar */}
      <nav className="fixed top-0 w-full z-[100] transition-all duration-300">
        <div className="absolute inset-0 bg-primary-bg/60 backdrop-blur-xl border-b border-border-custom/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-accent/20 rotate-[-4deg] group-hover:rotate-0 transition-all duration-500">
              <FileText className="text-white" size={26} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-text-primary leading-none">
                ResumeAI<span className="text-accent italic">.</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/60">Professional</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Features', 'Templates', 'Pricing', 'Testimonials'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-text-secondary hover:text-accent transition-colors uppercase tracking-widest">{item}</Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <ThemeToggle />
            <div className="h-6 w-[1px] bg-border-custom hidden sm:block" />
            <Link
              href="/login"
              className="hidden sm:block text-sm font-black text-text-secondary hover:text-accent transition-colors uppercase tracking-widest"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="btn-gradient !rounded-full !px-8 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20 group"
            >
              <span className="text-sm font-black uppercase tracking-widest">Get Started</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Elite Hero Section */}
        <section className="relative pt-48 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Animated Background Orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
          </div>

          <div className="max-w-7xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-accent/5 border border-accent/10 text-accent font-black text-xs uppercase tracking-[0.2em] mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
              <Sparkles size={14} className="animate-spin-slow" />
              <span>Next-Gen AI Resume Builder</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-text-primary tracking-[-0.04em] leading-[0.9] mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              Craft Your Future with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-500 to-indigo-600">AI Perfection.</span>
            </h1>

            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-text-secondary leading-relaxed mb-14 font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              The world's most advanced AI resume builder. Designed by Abdul Haseeb to beat ATS,
              impress recruiters, and land you the job you deserve in seconds.
            </p>

            <div className="flex flex-col sm:row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
              <Link href="/signup" className="group btn-gradient text-lg px-12 py-5 !rounded-2xl shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all flex items-center justify-center w-full sm:w-auto">
                <span className="font-black uppercase tracking-widest">Build My Resume</span>
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={24} />
              </Link>
              <Link href="#templates" className="px-12 py-5 rounded-2xl bg-secondary-bg hover:bg-border-custom text-text-primary font-black uppercase tracking-widest text-sm border border-border-custom transition-all shadow-lg flex items-center justify-center w-full sm:w-auto">
                Browse Templates
              </Link>
            </div>

            {/* Floating Trust Badge */}
            <div className="mt-20 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary opacity-50">Trusted by over 50,000 Professionals</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale contrast-125">
                {['Google', 'Meta', 'Amazon', 'Apple', 'Netflix'].map(brand => (
                  <span key={brand} className="text-2xl font-black tracking-tighter text-text-primary">{brand}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Experience Section */}
        <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 bg-secondary-bg/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="text-amber-500" size={32} />,
                  title: "Smart Content Generation",
                  desc: "Our AI analyzes your experience and generates high-impact bullet points that scream 'Expert'.",
                  gradient: "from-amber-500/20 to-orange-500/20"
                },
                {
                  icon: <CheckCircle className="text-emerald-500" size={32} />,
                  title: "Total ATS Optimization",
                  desc: "Every template is engineered to pass through ATS filters with a 99% success rate guaranteed.",
                  gradient: "from-emerald-500/20 to-teal-500/20"
                },
                {
                  icon: <Sparkles className="text-accent" size={32} />,
                  title: "Real-time AI Advisor",
                  desc: "Get instant feedback and ATS scoring as you type. It's like having a career coach beside you.",
                  gradient: "from-accent/20 to-blue-500/20"
                }
              ].map((feature, i) => (
                <div key={i} className="group p-10 rounded-[2.5rem] bg-card-bg border border-border-custom hover:border-accent/30 transition-all duration-500 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} blur-[60px] group-hover:blur-[40px] transition-all`}></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary-bg flex items-center justify-center shadow-inner mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-black text-text-primary mb-4 leading-tight">{feature.title}</h3>
                    <p className="text-text-secondary leading-relaxed font-bold opacity-80">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Templates Gallery */}
        <section id="templates" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-primary-bg">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30">
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full"></div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:row items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-black text-[10px] uppercase tracking-widest mb-6">
                  <Sparkles size={12} />
                  <span>Premium Designs</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight leading-tight">
                  Templates that <br />
                  <span className="text-accent">Recruiters Adore.</span>
                </h2>
              </div>
              <p className="max-w-md text-text-secondary font-bold text-lg mb-2">
                Hand-crafted by design experts and career coaches to balance visual impact with perfect readability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { name: 'The Minimalist', tag: 'Modern', color: 'bg-slate-900', text: 'text-white', delay: '0' },
                { name: 'Executive Suite', tag: 'Professional', color: 'bg-blue-600', text: 'text-white', delay: '100' },
                { name: 'Creative Pulse', tag: 'Vibrant', color: 'bg-accent', text: 'text-white', delay: '200' },
              ].map((template, idx) => (
                <div key={idx} className={`group relative animate-in fade-in slide-in-from-bottom-8 duration-700`} style={{ animationDelay: `${template.delay}ms` }}>
                  <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-secondary-bg border border-border-custom shadow-2xl group-hover:shadow-accent/20 transition-all duration-500 scale-100 group-hover:scale-[1.02]">
                    {/* Template Preview Mockup */}
                    <div className="absolute inset-0 p-8 flex flex-col gap-6">
                      <div className="w-1/2 h-4 bg-border-custom rounded-full"></div>
                      <div className="w-full h-2 bg-border-custom/50 rounded-full"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-20 col-span-1 bg-border-custom/30 rounded-xl"></div>
                        <div className="h-20 col-span-2 bg-border-custom/30 rounded-xl"></div>
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3, 4].map(i => <div key={i} className="w-full h-2 bg-border-custom/20 rounded-full"></div>)}
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary-bg/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-10 text-center">
                      <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center text-white mb-6 scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl shadow-accent/40">
                        <ArrowRight size={40} />
                      </div>
                      <h3 className="text-2xl font-black text-text-primary mb-2">{template.name}</h3>
                      <p className="text-text-secondary font-bold mb-8">Optimized for high-growth tech roles and creative industries.</p>
                      <Link href="/signup" className="btn-gradient !rounded-xl px-10">Use This Template</Link>
                    </div>

                    {/* Static Info */}
                    <div className="absolute top-6 left-6 flex gap-2">
                      <span className="px-4 py-1.5 rounded-full bg-primary-bg/90 backdrop-blur text-[10px] font-black uppercase tracking-widest text-text-primary shadow-sm border border-border-custom">
                        {template.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <Link href="/signup" className="inline-flex items-center gap-4 text-text-secondary hover:text-accent font-black uppercase tracking-[0.3em] text-sm group transition-all">
                Discover 20+ More Layouts
                <div className="w-10 h-10 rounded-full bg-secondary-bg border border-border-custom flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Dashboard Showcase (Mockup) */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-secondary-bg/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-text-primary tracking-tight mb-6">Designed for <span className="text-accent">Power Users.</span></h2>
              <p className="text-xl text-text-secondary font-bold">A beautiful, intuitive workspace that keeps you organized and focused.</p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-blue-500/20 to-purple-600/20 rounded-[3rem] blur-3xl opacity-50"></div>
              <div className="relative bg-card-bg border border-border-custom rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_100px_-10px_rgba(59,130,246,0.1)]">
                <div className="bg-secondary-bg/80 backdrop-blur-md border-b border-border-custom p-6 flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-400 shadow-lg shadow-red-400/20"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/20"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/20"></div>
                  </div>
                  <div className="flex-1 max-w-md mx-auto bg-primary-bg/50 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-secondary border border-border-custom text-center">
                    resumeai-pro.com/dashboard/editor
                  </div>
                  <div className="w-20" /> {/* Spacer */}
                </div>
                <div className="aspect-[16/10] bg-grid-slate-200 dark:bg-grid-slate-800 flex items-center justify-center p-12">
                  <div className="w-full h-full bg-white dark:bg-slate-900 shadow-2xl rounded-[1.5rem] p-10 flex gap-10">
                    <div className="w-[30%] space-y-8">
                      <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl w-3/4"></div>
                      <div className="space-y-3">
                        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-full"></div>
                        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-full"></div>
                        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-2/3"></div>
                      </div>
                      <div className="h-56 bg-accent/5 border border-accent/10 rounded-3xl p-8 flex flex-col justify-center items-center text-accent text-center gap-4 group/ai">
                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center animate-pulse">
                          <Sparkles size={32} />
                        </div>
                        <div className="space-y-1">
                          <span className="block text-xs font-black uppercase tracking-widest">ATS Score</span>
                          <span className="block text-4xl font-black">98<span className="text-lg">%</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 flex flex-col gap-6">
                      <div className="h-6 bg-white dark:bg-slate-700 rounded-lg w-1/4"></div>
                      <div className="flex-1 bg-white dark:bg-slate-700 rounded-xl shadow-inner relative overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-2 bg-accent opacity-20"></div>
                        <div className="p-8 space-y-6">
                          <div className="h-12 bg-slate-100 dark:bg-slate-600 rounded-lg w-1/2"></div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="h-4 bg-slate-100 dark:bg-slate-600 rounded-full"></div>
                            <div className="h-4 bg-slate-100 dark:bg-slate-600 rounded-full"></div>
                          </div>
                          <div className="space-y-3 pt-4">
                            <div className="h-3 bg-slate-100 dark:bg-slate-600 rounded-full w-full"></div>
                            <div className="h-3 bg-slate-100 dark:bg-slate-600 rounded-full w-full"></div>
                            <div className="h-3 bg-slate-100 dark:bg-slate-600 rounded-full w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Elite Pricing Section */}
        <section id="pricing" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-primary-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-6">Simple, Transparent <span className="text-accent">Pricing.</span></h2>
              <p className="text-xl text-text-secondary font-bold">Everything you need to land your next big role.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Starter', price: '0',
                  features: ['3 AI Resumes', 'Basic Templates', 'ATS Keyword Check', 'PDF Export'],
                  btn: 'Join for Free', popular: false
                },
                {
                  name: 'Professional', price: '2,500',
                  features: ['Unlimited Resumes', 'AI Writing Assistant', 'All Premium Templates', 'Live ATS Scoring', 'Priority Support'],
                  btn: 'Get Pro Access', popular: true
                },
                {
                  name: 'Enterprise', price: '12,000',
                  features: ['Team Workspaces', 'Custom Branding', 'Advanced Analytics', 'Resume API Access', 'Dedicated Account Manager'],
                  btn: 'Contact Sales', popular: false
                }
              ].map((plan, i) => (
                <div key={i} className={`relative group p-10 rounded-[2.5rem] border ${plan.popular ? 'border-accent bg-accent/5' : 'border-border-custom bg-card-bg'} transition-all duration-500 hover:scale-[1.02]'}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-10 -translate-y-1/2 bg-accent text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent/20">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-text-primary mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-text-secondary font-black mr-1 text-xl">Rs.</span>
                    <span className="text-4xl font-black text-text-primary">{plan.price}</span>
                    <span className="text-text-secondary font-bold">/mo</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm font-bold text-text-secondary">
                        <CheckCircle size={18} className="text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup" className={`w-full py-4 rounded-2xl flex items-center justify-center font-black uppercase tracking-widest text-xs transition-all ${plan.popular ? 'btn-gradient shadow-lg shadow-accent/20' : 'bg-secondary-bg hover:bg-border-custom border border-border-custom text-text-primary'}`}>
                    {plan.btn}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* High-Fidelity Testimonials */}
        <section id="testimonials" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-secondary-bg/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-6">Success Stories from <br /><span className="text-accent">Real Professionals.</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  name: 'Sarah Johnson', role: 'Software Engineer @ Google',
                  text: "ResumeAI transformed my job search. The AI gave me bullet points that actually sounded like me, just way better. Landed my dream job in 2 weeks!",
                  avatar: 'SJ'
                },
                {
                  name: 'Mark Thompson', role: 'Product Manager @ Meta',
                  text: "The ATS scoring is a literal cheat code. I went from zero callbacks to being flooded with interview requests almost overnight. Truly incredible tool.",
                  avatar: 'MT'
                },
                {
                  name: 'Emily Chen', role: 'Marketing Director @ Nike',
                  text: "Elegant designs and super intuitive. I used the 'Creative Pulse' template and the hiring manager specifically complimented my resume's layout.",
                  avatar: 'EC'
                }
              ].map((t, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-card-bg border border-border-custom hover:border-accent/20 transition-all duration-500 relative group">
                  <div className="flex gap-1 text-amber-500 mb-6">
                    {[1, 2, 3, 4, 5].map(star => <Sparkles key={star} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-lg font-bold text-text-primary mb-8 leading-relaxed italic">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center font-black text-accent">
                      {t.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-text-primary">{t.name}</h4>
                      <p className="text-xs font-bold text-text-secondary">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent -z-10 opacity-[0.03]"></div>
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-accent to-blue-600 rounded-[3rem] p-16 text-center shadow-2xl shadow-accent/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -rotate-45 translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Ready to Level Up Your Career?</h2>
            <p className="text-xl text-white/80 font-bold mb-12 max-w-2xl mx-auto">Join 50,000+ others who are already landing jobs with ResumeAI.</p>
            <Link href="/signup" className="inline-flex py-5 px-12 bg-white text-accent rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
              Get Started Now
            </Link>
          </div>
        </section>
      </main>

      {/* Extreme Footer */}
      <footer className="bg-card-bg border-t border-border-custom pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1 border-r border-border-custom pr-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="text-white" size={22} />
                </div>
                <span className="text-xl font-black tracking-tight text-text-primary">
                  ResumeAI<span className="text-accent">.</span>
                </span>
              </div>
              <p className="text-text-secondary font-bold leading-relaxed mb-8">
                The ultimate AI-powered resume builder for the modern career.
              </p>
              <div className="flex gap-4">
                {['twitter', 'github', 'linkedin'].map(social => (
                  <div key={social} className="w-10 h-10 rounded-xl bg-secondary-bg border border-border-custom flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all cursor-pointer">
                    <div className="w-4 h-4 bg-current rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-3 grid grid-cols-2 md:grid-cols-3 gap-12">
              {[
                { title: 'Platform', links: ['Templates', 'AI Features', 'ATS Statistics', 'Reviews'] },
                { title: 'Company', links: ['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'] },
                { title: 'Support', links: ['Help Center', 'API Docs', 'Contact Us', 'Status'] }
              ].map(col => (
                <div key={col.title}>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-8">{col.title}</h4>
                  <ul className="space-y-4">
                    {col.links.map(link => (
                      <li key={link}>
                        <Link href="#" className="text-sm font-bold text-text-secondary hover:text-text-primary transition-colors">{link}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-12 border-t border-border-custom flex flex-col md:row items-center justify-between gap-8">
            <p className="text-text-secondary text-xs font-black uppercase tracking-widest leading-none">
              © 2026 ResumeAI Pro. All rights reserved. <span className="mx-2 opacity-20">|</span> Built with ❤️ by Abdul Haseeb Imran
            </p>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-text-secondary">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              System Status: Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
