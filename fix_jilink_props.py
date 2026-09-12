import re

with open('jilink/components/JiLinkApp.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'export function JiLinkApp() {',
    'export function JiLinkApp({ onExitToAAi }: { onExitToAAi?: () => void }) {'
)

old_buttons = """          ) : (
            <button 
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              <Shield className="w-4 h-4" /> Admin Login
            </button>
          )}"""

new_buttons = """          ) : (
            <div className="flex items-center gap-3">
              {onExitToAAi && (
                <button 
                  onClick={onExitToAAi}
                  className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Return to AAi Universe
                </button>
              )}
              <button 
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                <Shield className="w-4 h-4" /> Admin Login
              </button>
            </div>
          )}"""

content = content.replace(old_buttons, new_buttons)

with open('jilink/components/JiLinkApp.tsx', 'w') as f:
    f.write(content)
