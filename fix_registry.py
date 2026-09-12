import re

with open('src/applications/ApplicationRegistry.ts', 'r') as f:
    content = f.read()

import_statement = 'import { JaicoApp } from "@/jaico/components/JaicoApp";\nimport { JiLinkApp } from "@/jilink/components/JiLinkApp";'
content = content.replace('import { JaicoApp } from "@/jaico/components/JaicoApp";', import_statement)

app_registration = """  ngliving: {
    id: "ngliving",
    component: NGLivingApp,
  },
  jilink: {
    id: "jilink",
    component: JiLinkApp,
  }"""
content = content.replace("""  ngliving: {
    id: "ngliving",
    component: NGLivingApp,
  }""", app_registration)

with open('src/applications/ApplicationRegistry.ts', 'w') as f:
    f.write(content)
