/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen dark:bg-slate-950 bg-slate-50 flex justify-center font-sans dark:text-slate-100 text-slate-900 transition-colors duration-300">
      <div className="w-full max-w-[1400px] px-4 md:px-8 py-6 flex flex-col gap-6">
        <Navbar />
        <main className="flex flex-col gap-6">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
