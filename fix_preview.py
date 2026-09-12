import re

with open('app/preview/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'applicationId={currentTab === "NGLiving" ? "ngliving" : currentTab === "Jaico" ? "jaico" : "parakkai"}',
    'applicationId={currentTab === "NGLiving" ? "ngliving" : currentTab === "Jaico" ? "jaico" : currentTab === "JiLink" ? "jilink" : "parakkai"}'
)

content = content.replace(
    ') : currentTab === "Parakkai" || currentTab === "NGLiving" || currentTab === "Jaico" ? applicationView : universeView}',
    ') : currentTab === "Parakkai" || currentTab === "NGLiving" || currentTab === "Jaico" || currentTab === "JiLink" ? applicationView : universeView}'
)

with open('app/preview/page.tsx', 'w') as f:
    f.write(content)
