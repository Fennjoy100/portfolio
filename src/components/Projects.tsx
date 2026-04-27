import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo?: string;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch projects", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="dark:bg-indigo-600 bg-slate-50 border-t dark:border-slate-800 border-slate-200 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative">
      <motion.div
         ref={ref}
         initial={{ opacity: 0, y: 30 }}
         animate={inView ? { opacity: 1, y: 0 } : {}}
         transition={{ duration: 0.6 }}
      >
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] dark:text-indigo-200 text-indigo-600 mb-8">06 — Featured Projects</h3>
      </motion.div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse dark:bg-slate-950/20 bg-slate-200 border dark:border-white/10 border-slate-300 h-[300px]" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="dark:bg-slate-950/20 bg-white border dark:border-white/10 border-slate-200 group flex flex-col dark:hover:bg-slate-950/40 hover:bg-slate-50 transition-colors p-6 shadow-sm"
              >
                <div className="relative aspect-video overflow-hidden border dark:border-white/10 border-slate-200 mb-6 dark:bg-slate-900 bg-slate-100">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply group-hover:bg-transparent transition-colors" />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h4 className="font-bold text-xl dark:text-white text-slate-900 mb-2">{project.title}</h4>
                  <p className="text-sm dark:text-indigo-100 text-slate-600 mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, i) => i < 3 && (
                      <span key={tag} className="text-[10px] font-mono tracking-widest uppercase font-bold dark:text-indigo-200 text-indigo-700 dark:bg-slate-950/50 bg-indigo-50 px-2 py-1 border dark:border-indigo-400/30 border-indigo-200">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 mt-auto text-[10px] font-bold uppercase tracking-widest dark:text-white text-slate-900">
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noreferrer"
                        className="border-b-2 dark:border-white/40 border-slate-300 dark:hover:border-white hover:border-slate-900 dark:hover:text-white hover:text-indigo-600 pb-1 transition-all flex items-center gap-2"
                      >
                        Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer"
                        className="border-b-2 dark:border-white/40 border-slate-300 dark:hover:border-white hover:border-slate-900 dark:hover:text-white hover:text-indigo-600 pb-1 transition-all flex items-center gap-2"
                      >
                        GitHub <Github className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
           ))}
        </div>
      )}

      <div className="mt-12 text-right">
        <a 
          href="https://github.com/Fennjoy100" 
          target="_blank" 
          rel="noreferrer"
          className="inline-block text-[10px] font-bold uppercase tracking-widest border-2 dark:border-white/50 border-slate-300 px-6 py-3 dark:text-white text-slate-900 dark:hover:bg-white hover:bg-slate-900 dark:hover:text-indigo-600 hover:text-white transition-all"
        >
          View All Repositories
        </a>
      </div>
    </section>
  );
}
