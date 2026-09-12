import re

with open('jilink/components/JiLinkApp.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'export function JiLinkApp({ onExitToAAi }: { onExitToAAi?: () => void }) {',
    'export function JiLinkApp({ onExitToAAi, context }: { onExitToAAi?: () => void; context?: any }) {'
)

with open('jilink/components/JiLinkApp.tsx', 'w') as f:
    f.write(content)
