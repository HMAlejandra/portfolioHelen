"use client"

import { FadeIn, TextReveal, Magnetic, LineReveal } from "@/components/animations"
import { ArrowUpRight, Mail, Github, Linkedin, MessageSquare } from "lucide-react"

const socialLinks = [
  { name: "GitHub", url: "https://github.com/helenmoncayo", icon: Github, label: "source_code" },
  { name: "LinkedIn", url: "https://linkedin.com/in/helenmoncayo", icon: Linkedin, label: "professional_net" },
]

export function Contact() {
  return (
    <section 
      id="contact" 
      className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{ backgroundColor: '#fcfaf7' }}
    >
      {/* --- DECORACIÓN TÉCNICA (PCB) --- */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none">
        <path d="M0 600h300v-200h400v-400" fill="none" stroke="#ff4d00" strokeWidth="1" />
        <circle cx="700" cy="0" r="4" fill="#ff4d00" />
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          
          {/* COLUMNA IZQUIERDA: Mensaje Principal */}
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-[1px] bg-[#ff4d00]" />
                <p className="text-[#ff4d00] text-[10px] font-black tracking-[0.4em] uppercase">
                  Network_Protocol
                </p>
              </div>
            </FadeIn>
            
            <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] text-[#111111] mb-12">
              <TextReveal>{`Let's build`}</TextReveal> <br />
              <span className="text-[#ff4d00] italic"><TextReveal delay={0.2}>the future</TextReveal></span>
            </h2>

            <FadeIn delay={0.4}>
              <div className="border-l-2 border-[#ff4d00]/20 pl-8 mb-16">
                <p className="text-xl text-[#111111]/70 leading-relaxed italic max-w-md">
                  {`Whether it's a software project, a research collaboration, or just a technical chat, my inbox is always open for new logic challenges.`}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <Magnetic>
                <a
                  href="mailto:helenmoncayo@gmail.com"
                  className="group inline-flex items-center gap-6"
                  data-cursor-hover
                >
                  <span className="w-20 h-20 rounded-full bg-[#111111] text-white flex items-center justify-center group-hover:bg-[#ff4d00] group-hover:scale-110 transition-all duration-500 shadow-2xl">
                    <Mail className="w-8 h-8" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[#ff4d00] font-mono text-[10px] mb-1">Direct_Access:</span>
                    <span className="text-2xl md:text-3xl font-serif text-[#111111] border-b-2 border-transparent group-hover:border-[#ff4d00] transition-all">
                      helenmoncayo@gmail.com
                    </span>
                  </div>
                </a>
              </Magnetic>
            </FadeIn>
          </div>

          {/* COLUMNA DERECHA: Social & Status */}
          <div className="lg:pt-24">
            <FadeIn delay={0.3}>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#111111]/40 mb-8 flex items-center gap-2">
                <MessageSquare className="w-3 h-3" /> External_Nodes
              </p>
            </FadeIn>

            <div className="space-y-2 mb-20">
              {socialLinks.map((link, index) => (
                <FadeIn key={link.name} delay={0.4 + index * 0.1}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-6 hover:translate-x-2 transition-all duration-500"
                    data-cursor-hover
                  >
                    <div className="flex items-center gap-6">
                      <link.icon className="w-6 h-6 text-[#111111]/30 group-hover:text-[#ff4d00] transition-colors" />
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-[#ff4d00] opacity-0 group-hover:opacity-100 transition-opacity">
                          {`./connect --${link.label}`}
                        </span>
                        <span className="text-2xl font-serif text-[#111111]">
                          {link.name}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-[#111111]/5 flex items-center justify-center group-hover:bg-[#111111] group-hover:border-[#111111] transition-all">
                      <ArrowUpRight className="w-5 h-5 text-[#111111] group-hover:text-white transition-colors" />
                    </div>
                  </a>
                  <div className="h-[1px] bg-[#111111]/5 w-full relative">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      className="absolute inset-0 bg-[#ff4d00]/20 origin-left" 
                    />
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* STATUS CARD: Estilo Dashboard de Ingeniería */}
            <FadeIn delay={0.8}>
              <div className="p-8 bg-[#111111] rounded-sm relative overflow-hidden group shadow-2xl">
                {/* Decoración interna de la tarjeta */}
                <div className="absolute top-0 right-0 p-4 font-mono text-[40px] text-white opacity-[0.03] select-none">
                  UCC
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <span className="text-white font-mono text-[10px] tracking-[0.2em] uppercase">
                    System_Status: Online
                  </span>
                </div>
                
                <h4 className="text-white text-lg font-serif mb-2">Available for new challenges</h4>
                <p className="text-white/50 text-xs leading-relaxed font-mono">
                  {`> Location: Pasto, CO`} <br />
                  {`> Latency: Low`} <br />
                  {`> Current_Focus: Web_Dev & AI`}
                </p>

                <div className="mt-6 h-[2px] bg-white/5 w-full">
                  <motion.div 
                    className="h-full bg-[#ff4d00]" 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* FOOTER SIMPLE */}
        <div className="mt-32 pt-8 border-t border-[#111111]/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono text-[#111111]/40 uppercase tracking-widest">
            © 2026 Helen Moncayo — Engineer Portfolio
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] font-mono text-[#ff4d00]">Built with Next.js</span>
            <span className="text-[10px] font-mono text-[#111111]/40">Pasto, Colombia</span>
          </div>
        </div>
      </div>
    </section>
  )
}