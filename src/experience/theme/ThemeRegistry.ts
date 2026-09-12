import type { ExperienceTheme } from './ThemeDefinition';

export const experienceThemes: ExperienceTheme[] = [
  {
    id:'aai-live',
    name:'AAi Live',
    category:'dark',
    description:'ArchitectAny live foundation — immersive dark workspace with cyan intelligence accents.',
    typography:{display:'Inter, ui-sans-serif, system-ui, sans-serif',body:'Inter, ui-sans-serif, system-ui, sans-serif',mono:'ui-monospace, SFMono-Regular, Menlo, monospace'},
    background:{mode:'gradient',value:'linear-gradient(135deg,#020914 0%,#04182b 48%,#00151f 100%)',overlay:'radial-gradient(circle at 50% 25%,rgba(0,227,253,.16),transparent 42%)'},
    tokens:{ background:'#020914', surface:'#061525', surfaceAlt:'#0b2238', text:'#eaf7ff', textMuted:'#82a5bb', primary:'#00e3fd', secondary:'#1598d6', accent:'#00e3fd', border:'rgba(0,227,253,.22)', radius:'14px', shadow:'0 20px 60px rgba(0,227,253,.16)', heroOverlay:'linear-gradient(135deg,rgba(2,9,20,.08),rgba(0,227,253,.28))' },
  },
  {
    id:'ai-era', name:'AI Era', category:'ai', description:'Futuristic, intelligent and immersive.',
    typography:{display:'Georgia, serif',body:'Inter, ui-sans-serif, system-ui, sans-serif',mono:'ui-monospace, SFMono-Regular, Menlo, monospace'},
    background:{mode:'gradient',value:'linear-gradient(135deg,#05030f 0%,#15102d 100%)'},
    tokens:{ background:'#05030f', surface:'#0b0a1c', surfaceAlt:'#15102d', text:'#f5f3ff', textMuted:'#aaa2c8', primary:'#5b5cff', secondary:'#8b5cf6', accent:'#22d3ee', border:'rgba(139,92,246,.35)', radius:'16px', shadow:'0 20px 60px rgba(91,92,255,.24)', heroOverlay:'linear-gradient(135deg,rgba(5,3,15,.08),rgba(91,92,255,.72))' },
  },
  {
    id:'serene-blue', name:'Serene Blue', category:'nature', description:'Calm, modern and professional.',
    typography:{display:'Inter, ui-sans-serif, system-ui, sans-serif',body:'Inter, ui-sans-serif, system-ui, sans-serif',mono:'ui-monospace, SFMono-Regular, Menlo, monospace'},
    background:{mode:'gradient',value:'linear-gradient(135deg,#eff8ff 0%,#e8f5ff 100%)'},
    tokens:{ background:'#eff8ff', surface:'#ffffff', surfaceAlt:'#e8f5ff', text:'#082f49', textMuted:'#4f7188', primary:'#0284c7', secondary:'#0ea5e9', accent:'#14b8a6', border:'rgba(2,132,199,.18)', radius:'14px', shadow:'0 18px 50px rgba(2,132,199,.14)', heroOverlay:'linear-gradient(135deg,rgba(2,132,199,.05),rgba(20,184,166,.28))' },
  },
  {
    id:'commerce-trusted', name:'Commerce Trusted', category:'commerce', description:'Clear, scalable and conversion focused.',
    typography:{display:'Inter, ui-sans-serif, system-ui, sans-serif',body:'Inter, ui-sans-serif, system-ui, sans-serif',mono:'ui-monospace, SFMono-Regular, Menlo, monospace'},
    background:{mode:'gradient',value:'linear-gradient(135deg,#f6f7f9 0%,#eef1f5 100%)'},
    tokens:{ background:'#f6f7f9', surface:'#ffffff', surfaceAlt:'#eef1f5', text:'#172033', textMuted:'#5d687a', primary:'#ff9900', secondary:'#146eb4', accent:'#232f3e', border:'rgba(35,47,62,.14)', radius:'10px', shadow:'0 10px 28px rgba(35,47,62,.12)', heroOverlay:'linear-gradient(135deg,rgba(35,47,62,.76),rgba(255,153,0,.22))' },
  },
  {
    id:'forest-green', name:'Forest Green', category:'nature', description:'Growth, sustainability and community.',
    typography:{display:'Georgia, serif',body:'Inter, ui-sans-serif, system-ui, sans-serif',mono:'ui-monospace, SFMono-Regular, Menlo, monospace'},
    background:{mode:'gradient',value:'linear-gradient(135deg,#f2f8f4 0%,#e5f2e9 100%)'},
    tokens:{ background:'#f2f8f4', surface:'#ffffff', surfaceAlt:'#e5f2e9', text:'#17352a', textMuted:'#557264', primary:'#15803d', secondary:'#166534', accent:'#14b8a6', border:'rgba(21,128,61,.16)', radius:'14px', shadow:'0 18px 45px rgba(21,128,61,.12)', heroOverlay:'linear-gradient(135deg,rgba(23,53,42,.16),rgba(21,128,61,.45))' },
  },
  {
    id:'sunset-orange', name:'Sunset Orange', category:'creative', description:'Energy, optimism and innovation.',
    typography:{display:'Georgia, serif',body:'Inter, ui-sans-serif, system-ui, sans-serif',mono:'ui-monospace, SFMono-Regular, Menlo, monospace'},
    background:{mode:'gradient',value:'linear-gradient(135deg,#fff8f3 0%,#fff0e6 100%)'},
    tokens:{ background:'#fff8f3', surface:'#ffffff', surfaceAlt:'#fff0e6', text:'#431407', textMuted:'#8a4b32', primary:'#ea580c', secondary:'#f97316', accent:'#facc15', border:'rgba(234,88,12,.18)', radius:'14px', shadow:'0 18px 45px rgba(234,88,12,.14)', heroOverlay:'linear-gradient(135deg,rgba(67,20,7,.12),rgba(249,115,22,.48))' },
  },
  {
    id:'midnight-dark', name:'Midnight Dark', category:'dark', description:'Professional dark mode.',
    typography:{display:'Inter, ui-sans-serif, system-ui, sans-serif',body:'Inter, ui-sans-serif, system-ui, sans-serif',mono:'ui-monospace, SFMono-Regular, Menlo, monospace'},
    background:{mode:'color',value:'#020617'},
    tokens:{ background:'#020617', surface:'#0b1220', surfaceAlt:'#111c30', text:'#f1f5f9', textMuted:'#94a3b8', primary:'#38bdf8', secondary:'#6366f1', accent:'#a78bfa', border:'rgba(148,163,184,.18)', radius:'14px', shadow:'0 20px 60px rgba(0,0,0,.42)', heroOverlay:'linear-gradient(135deg,rgba(2,6,23,.18),rgba(30,64,175,.55))' },
  },
  {
    id:'pure-white', name:'Pure White', category:'minimal', description:'Clean, minimal and content first.',
    typography:{display:'Inter, ui-sans-serif, system-ui, sans-serif',body:'Inter, ui-sans-serif, system-ui, sans-serif',mono:'ui-monospace, SFMono-Regular, Menlo, monospace'},
    background:{mode:'color',value:'#ffffff'},
    tokens:{ background:'#ffffff', surface:'#ffffff', surfaceAlt:'#f8fafc', text:'#0f172a', textMuted:'#64748b', primary:'#2563eb', secondary:'#475569', accent:'#0ea5e9', border:'rgba(15,23,42,.10)', radius:'12px', shadow:'0 8px 24px rgba(15,23,42,.08)', heroOverlay:'linear-gradient(135deg,rgba(255,255,255,.12),rgba(226,232,240,.45))' },
  },
  {
    id:'royal-purple', name:'Royal Purple', category:'creative', description:'Creative, premium and expressive.',
    typography:{display:'Georgia, serif',body:'Inter, ui-sans-serif, system-ui, sans-serif',mono:'ui-monospace, SFMono-Regular, Menlo, monospace'},
    background:{mode:'gradient',value:'linear-gradient(135deg,#faf7ff 0%,#f3eefe 100%)'},
    tokens:{ background:'#faf7ff', surface:'#ffffff', surfaceAlt:'#f3eefe', text:'#26113f', textMuted:'#725b86', primary:'#7c3aed', secondary:'#a855f7', accent:'#ec4899', border:'rgba(124,58,237,.16)', radius:'16px', shadow:'0 18px 50px rgba(124,58,237,.14)', heroOverlay:'linear-gradient(135deg,rgba(38,17,63,.12),rgba(168,85,247,.46))' },
  },
];

export function getExperienceTheme(id: string): ExperienceTheme {
  return experienceThemes.find(theme => theme.id === id) ?? experienceThemes[0];
}
