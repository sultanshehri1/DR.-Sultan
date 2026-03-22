/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { 
  Code2, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin, 
  Terminal, 
  Cpu, 
  Database,
  ExternalLink,
  ChevronDown,
  Server,
  Layers
} from "lucide-react";

interface Profile {
  name: string;
  title: string;
  bio: string;
}

interface Skill {
  name: string;
  level: string;
  category: string;
}

interface Project {
  id: number;
  title: string;
  desc: string;
  url: string;
  stars: number;
  language: string;
  tags: string[];
}

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, skillsRes, projectsRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/skills"),
          fetch("/api/github-projects")
        ]);

        if (!profileRes.ok || !skillsRes.ok || !projectsRes.ok) {
          throw new Error("حدث خطأ أثناء جلب البيانات من الخادم.");
        }

        const [profileData, skillsData, projectsData] = await Promise.all([
          profileRes.json(),
          skillsRes.json(),
          projectsRes.json()
        ]);

        setProfile(profileData);
        setSkills(skillsData);
        setProjects(projectsData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "تعذر الاتصال بالخادم.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-deep-blue">
      <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-bold text-xl">جاري تحميل موقع د. سلطان الشهري...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-red-600 p-6 text-center">
      <Terminal className="w-16 h-16 mb-4 opacity-20" />
      <h1 className="text-2xl font-bold mb-2">عذراً، حدث خطأ تقني</h1>
      <p className="mb-6">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-deep-blue text-white rounded-xl font-bold hover:bg-royal-blue transition-colors"
      >
        إعادة المحاولة
      </button>
    </div>
  );

  if (!profile) return null;

  return (
    <div className="min-h-screen font-sans selection:bg-gold selection:text-deep-blue">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-deep-blue flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-deep-blue flex items-center justify-center text-gold">
              <Layers className="w-6 h-6" />
            </div>
            <span>جانقو<span className="text-gold">ماستر</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
            <a href="#about" className="hover:text-gold transition-colors">عني</a>
            <a href="#skills" className="hover:text-gold transition-colors">المهارات</a>
            <a href="#projects" className="hover:text-gold transition-colors">المشاريع</a>
            <a href="#contact" className="px-6 py-2 bg-deep-blue text-white rounded-full hover:bg-royal-blue transition-all shadow-lg shadow-deep-blue/20">تواصل معي</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-deep-blue/5 -skew-x-12 transform origin-top-right -z-10" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold font-semibold text-sm mb-6 border border-gold/20">
              مطور Full-Stack متخصص في Django
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-deep-blue leading-tight mb-6">
              {profile.name}
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              {profile.bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-deep-blue text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-deep-blue/30 transition-all transform hover:-translate-y-1">
                تصفح الكود (GitHub)
              </button>
              <button className="px-8 py-4 border-2 border-gold text-gold rounded-2xl font-bold text-lg hover:bg-gold hover:text-white transition-all">
                مشاهدة السيرة الذاتية
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border-8 border-white shadow-2xl bg-deep-blue p-8 aspect-square flex flex-col items-center justify-center text-gold">
              <Terminal className="w-32 h-32 mb-4" />
              <div className="text-center">
                <p className="text-2xl font-mono font-bold">python manage.py runserver</p>
                <p className="text-sm opacity-60 mt-2">Django Backend Active</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold rounded-full -z-10 blur-2xl opacity-50 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-deep-blue mb-4">خبرات جانقو وبايثون</h2>
            <div className="w-20 h-1.5 bg-gold mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-gold/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-deep-blue text-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {skill.category === "Backend" ? <Server className="w-6 h-6" /> : <Cpu className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-bold text-deep-blue mb-2">{skill.name}</h3>
                <p className="text-gold font-medium">{skill.level}</p>
                <p className="text-xs text-slate-400 mt-2">{skill.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-deep-blue text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4">مشاريع GitHub الحقيقية</h2>
              <p className="text-slate-300 max-w-md">يتم جلب هذه المشاريع مباشرة من حسابك على GitHub باستخدام API.</p>
            </div>
            <a 
              href={`https://github.com/sultanshehri1`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gold font-bold hover:underline"
            >
              مشاهدة الملف الشخصي على GitHub <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.length > 0 ? projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-gold/20 text-gold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-gold text-sm font-bold">
                    <span>{project.stars}</span>
                    <Github className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gold transition-colors">{project.title}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed line-clamp-3">
                  {project.desc}
                </p>
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-xl border border-white/20 hover:border-gold hover:text-gold transition-all font-bold"
                >
                  عرض الكود المصدري
                </a>
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/20">
                <p className="text-slate-400">جاري جلب المشاريع من GitHub...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Django Architecture Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gold/10">
                <h4 className="font-bold text-deep-blue mb-2">Models</h4>
                <p className="text-sm text-slate-500">تصميم قواعد بيانات معقدة وعلاقات متقدمة.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gold/10">
                <h4 className="font-bold text-deep-blue mb-2">Views</h4>
                <p className="text-sm text-slate-500">منطق برمجى قوي لمعالجة البيانات والطلبات.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gold/10">
                <h4 className="font-bold text-deep-blue mb-2">Templates</h4>
                <p className="text-sm text-slate-500">واجهات ديناميكية وسريعة الاستجابة.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gold/10">
                <h4 className="font-bold text-deep-blue mb-2">DRF</h4>
                <p className="text-sm text-slate-500">بناء APIs احترافية وآمنة للتطبيقات.</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold text-deep-blue mb-6">لماذا أختار Django؟</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              أؤمن بأن Django هو الإطار الأقوى لبناء تطبيقات ويب آمنة وقابلة للتوسع بسرعة. خبرتي تتركز في استغلال كامل قدرات هذا الإطار لتوفير حلول برمجية متكاملة "Batteries Included".
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-deep-blue font-semibold">
                <div className="w-2 h-2 rounded-full bg-gold" />
                أمان عالي وحماية من الثغرات
              </li>
              <li className="flex items-center gap-3 text-deep-blue font-semibold">
                <div className="w-2 h-2 rounded-full bg-gold" />
                لوحة تحكم (Admin) مخصصة واحترافية
              </li>
              <li className="flex items-center gap-3 text-deep-blue font-semibold">
                <div className="w-2 h-2 rounded-full bg-gold" />
                سرعة في التطوير والنشر
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-deep-blue text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 font-medium">© 2026 خبير بايثون وجانقو. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gold transition-colors"><Github className="w-6 h-6" /></a>
            <a href="#" className="hover:text-gold transition-colors"><Linkedin className="w-6 h-6" /></a>
            <a href="#" className="hover:text-gold transition-colors"><Twitter className="w-6 h-6" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
