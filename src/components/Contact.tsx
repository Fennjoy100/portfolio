import React, { useState } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Mail, Send, Loader2, CheckCircle } from "lucide-react";

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Failed to send message. Please try again later.");
    }
  };

  return (
    <section id="contact" className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-slate-200 p-8 md:p-12 lg:p-16 flex flex-col relative w-full">
      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500 mb-8">04 — Contact</h3>
      
      <div className="w-full relative z-10 flex flex-col lg:flex-row gap-12">
        <motion.div
           ref={ref}
           initial={{ opacity: 0, y: 30 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
           className="flex-1"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Get In Touch.
          </h2>
          <p className="text-lg dark:text-slate-400 text-slate-600 mb-8 max-w-md">
            Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col max-w-2xl w-full">
          {status === "success" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-500/10 border border-indigo-500/30 p-6 flex flex-col items-start mb-6"
            >
              <div className="flex items-center gap-3 text-indigo-400 font-bold uppercase tracking-widest text-xs mb-2">
                <CheckCircle className="w-5 h-5" />
                Message Sent Successful
              </div>
              <p className="dark:text-slate-400 text-slate-600 text-sm mb-4">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              <button 
                type="button" 
                onClick={() => setStatus("idle")}
                className="text-[10px] uppercase tracking-widest font-bold dark:text-white text-slate-900 border-b-2 border-indigo-500 pb-1"
              >
                Send Another Message
              </button>
            </motion.div>
          )}

          <div className="space-y-6">
            <div className="group">
              <label htmlFor="name" className="block text-[10px] text-slate-500 font-bold mb-2 uppercase tracking-widest">Full Name</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-200 p-4 text-sm dark:text-slate-300 text-slate-900 dark:placeholder:text-slate-700 placeholder:text-slate-400 outline-none group-focus-within:border-indigo-500 transition-colors rounded-none shadow-none"
                placeholder="Enter your name..."
              />
            </div>
            
            <div className="group">
              <label htmlFor="email" className="block text-[10px] text-slate-500 font-bold mb-2 uppercase tracking-widest">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-200 p-4 text-sm dark:text-slate-300 text-slate-900 dark:placeholder:text-slate-700 placeholder:text-slate-400 outline-none group-focus-within:border-indigo-500 transition-colors rounded-none shadow-none"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="group">
              <label htmlFor="message" className="block text-[10px] text-slate-500 font-bold mb-2 uppercase tracking-widest">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full dark:bg-slate-950 bg-slate-50 border dark:border-slate-800 border-slate-200 p-4 text-sm dark:text-slate-300 text-slate-900 dark:placeholder:text-slate-700 placeholder:text-slate-400 outline-none group-focus-within:border-indigo-500 transition-colors rounded-none shadow-none resize-none"
                placeholder="Write your query..."
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-xs font-bold uppercase tracking-wide">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-indigo-500 py-4 text-xs font-bold uppercase tracking-widest text-white mt-4 hover:bg-indigo-400 transition-colors shadow-[0_4px_20px_rgba(99,102,241,0.2)] flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:bg-indigo-500"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
