import { motion } from "motion/react";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="dark:bg-slate-900/50 bg-slate-100/50 border dark:border-slate-800 border-slate-200 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative group min-h-[60vh] md:min-h-[70vh]">
      <div className="absolute top-4 right-4 text-[100px] md:text-[150px] font-black dark:text-slate-800/30 text-slate-200 select-none leading-none">01</div>
      
      <div className="relative z-10 w-full flex flex-col items-start justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left"
        >
          <h2 className="text-indigo-400 font-mono text-xs sm:text-sm font-bold inline-block mb-4 uppercase tracking-[0.3em]">Aspiring MERN Stack Developer</h2>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] 2xl:text-[5rem] font-bold tracking-tight dark:text-white text-slate-900 leading-[1.1] mb-6 w-full whitespace-nowrap">
            Building Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Experiences.</span>
          </h1>
          
          <p className="text-lg md:text-xl dark:text-slate-400 text-slate-600 leading-relaxed max-w-5xl italic">
            Specialized in the MERN stack. I transform complex business requirements into seamless, high-performance web applications. With a strong foundation in modern frontend architectures and scalable backend databases, I focus on writing clean, maintainable code that delivers exceptional user value and pixel-perfect designs.
          </p>

          <div className="flex flex-wrap items-center justify-start gap-4 mt-10">
            <a 
              href="https://www.linkedin.com/jobs/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-transparent border dark:border-slate-800 border-slate-200 dark:text-slate-300 text-slate-600 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:border-indigo-500 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              <Linkedin className="w-4 h-4 mr-1" />
              LinkedIn
            </a>
            <a 
              href="https://github.com/Fennjoy100"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-transparent border dark:border-slate-800 border-slate-200 dark:text-slate-300 text-slate-600 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:border-indigo-500 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
            >
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </a>
            <a 
              href="#projects" 
              className="inline-flex items-center justify-center gap-2 bg-indigo-500 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-indigo-400 transition-colors shadow-[0_4px_20px_rgba(99,102,241,0.2)]"
            >
              View My Work
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
