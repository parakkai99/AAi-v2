import re

with open('/app/applet/jaico/components/home/hero/JaicoHero.tsx', 'r') as f:
    content = f.read()

# Replace main container padding
content = content.replace(
    'className="relative w-full overflow-hidden bg-slate-900 text-white min-h-[600px] flex flex-col items-center py-16 px-4"',
    'className="relative w-full overflow-hidden bg-slate-900 text-white min-h-[500px] flex flex-col items-center pt-8 pb-4 px-4"'
)

# Replace the background block
old_bg = """      {/* Background ambient effects */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>"""

new_bg = """      {/* Background ambient effects - Busy Market Activity */}
      <MarketActivityBackground />"""

content = content.replace(old_bg, new_bg)

# Replace text container
old_text_container = """      <div className="relative z-10 text-center mb-12 max-w-3xl">"""
new_text_container = """      <div className="relative z-10 text-center mb-4 max-w-4xl">"""
content = content.replace(old_text_container, new_text_container)

# Replace the h1 text
old_h1 = """        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          The Intelligent Business Ecosystem
        </motion.h1>"""
        
new_h1 = """        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 whitespace-nowrap"
        >
          The Intelligent Business Ecosystem
        </motion.h1>"""
content = content.replace(old_h1, new_h1)

# Add the MarketActivityBackground component at the end of the file
market_activity_component = """

function MarketActivityBackground() {
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => setMounted(true), []);
  
  if (!mounted) return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Existing blurred blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Busy market activity particles connecting ecosystems */}
      {Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 3 + 2;
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 2 === 0 ? 'bg-teal-400' : 'bg-blue-400'}`}
            style={{ width: size, height: size }}
            initial={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
}
"""
content += market_activity_component

with open('/app/applet/jaico/components/home/hero/JaicoHero.tsx', 'w') as f:
    f.write(content)

print("Done replacing.")
