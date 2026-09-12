import re

with open('/app/applet/jaico/components/home/hero/JaicoHero.tsx', 'r') as f:
    content = f.read()

old_feature = """      {/* Dynamic Feature Display */}
      <div className="relative z-10 mt-16 h-32 w-full max-w-4xl flex items-center justify-center">"""
      
new_feature = """      {/* Dynamic Feature Display */}
      <div className="relative z-10 mt-8 h-24 w-full max-w-4xl flex items-center justify-center">"""

content = content.replace(old_feature, new_feature)

with open('/app/applet/jaico/components/home/hero/JaicoHero.tsx', 'w') as f:
    f.write(content)

print("Done replacing 2.")
