import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 font-mono mt-2 mb-8 px-2 md:px-0 gap-4">
      <div>© {new Date().getFullYear()} FENNJOY. J | BUILT WITH MERN STACK</div>
      <div className="flex gap-6 uppercase tracking-widest font-bold">
        <a href="https://github.com/Fennjoy100" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">GitHub</a>
        <a href="https://www.linkedin.com/jobs/" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">LinkedIn</a>
        <a href="mailto:fennjoy.j@gmail.com" className="hover:text-indigo-400 transition-colors">Email</a>
      </div>
    </footer>
  );
}
