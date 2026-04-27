import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Database, Server, Atom, Cpu, Wind, FileCode2, GitBranch, Figma } from "lucide-react";

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCards = [
    { name: "React", icon: Atom },
    { name: "Node.js", icon: Server },
    { name: "MongoDB", icon: Database },
    { name: "Express", icon: Cpu },
    { name: "Tailwind CSS", icon: Wind },
    { name: "TypeScript", icon: FileCode2 },
    { name: "Git", icon: GitBranch },
    { name: "Figma", icon: Figma },
  ];

  return (
    <section id="about" className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-8 md:p-12 lg:p-16 relative">
      <div className="flex justify-between items-start mb-8">
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500">02 — Technical Stack & About</h3>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative z-10 w-full mb-16">
        
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6 text-lg dark:text-slate-400 text-slate-600 leading-relaxed font-sans"
        >
          <div>
            <h2 className="font-cursive dark:text-white text-slate-900 text-5xl md:text-6xl mb-4 leading-none select-none tracking-tight">
              I am Fennjoy J.
            </h2>
            <p>
              An aspiring MERN Stack Web Developer passionate about building functional and beautifully designed web applications.
            </p>
          </div>
          <p>
            My journey into web development started with a curiosity for how the digital world operates. Since then, I've dedicated myself to mastering the MERN stack—<span className="dark:text-white text-slate-900 font-semibold">MongoDB, Express, React, and Node.js</span>. I truly believe in building technology that empowers people and solves real-world problems.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="w-full self-center lg:self-start lg:w-auto shrink-0 mt-8 lg:mt-0"
        >
           <div className="grid grid-cols-2 gap-4 w-full sm:w-[320px] max-w-sm mx-auto lg:mx-0">
              <div className="dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-200 p-6 flex flex-col justify-center rounded-xl min-h-[140px]">
                <p className="text-4xl font-bold dark:text-white text-slate-900 mb-2">10+</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Projects Built</p>
              </div>
              <div className="dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-200 p-6 flex flex-col justify-center rounded-xl min-h-[140px]">
                <p className="text-4xl font-bold dark:text-white text-slate-900 mb-2">∞</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Lines of Code</p>
              </div>
           </div>
        </motion.div>
      </div>

      {/* Skills & Expertise Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 w-full"
      >
         <h4 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500 select-none">
           Skills & Expertise
         </h4>
         
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skillCards.map((skill) => (
              <div 
                key={skill.name} 
                className="group flex flex-col items-center justify-center p-6 sm:p-8 dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-2xl hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] dark:hover:border-indigo-500/50 hover:border-indigo-500/50 transition-all duration-300"
              >
                <skill.icon className="w-8 h-8 md:w-10 md:h-10 mb-4 dark:text-slate-400 text-slate-500 group-hover:text-indigo-400 transition-colors" strokeWidth={1.5} />
                <span className="text-xs sm:text-sm font-bold dark:text-slate-300 text-slate-700 text-center uppercase tracking-widest">{skill.name}</span>
              </div>
            ))}
         </div>
      </motion.div>
    </section>
  );
}
