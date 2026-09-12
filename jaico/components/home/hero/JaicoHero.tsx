import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Factory, Truck, Store, UserCheck, Smartphone, Zap } from "lucide-react";

type NodeId = 'manufacturer' | 'distributor' | 'dealer' | 'seller' | 'jaico' | 'customer';

interface NetworkNode {
  id: NodeId;
  label: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  color: string;
}

const NODES: NetworkNode[] = [
  {
    id: "manufacturer",
    label: "Manufacturer",
    icon: <Factory className="w-8 h-8" />,
    description: "Source of products and industrial equipment.",
    features: ["Manufacturing", "Supply", "Products", "Pricing", "Availability"],
    color: "bg-blue-600",
  },
  {
    id: "distributor",
    label: "Distributor / Super Dealer",
    icon: <Truck className="w-8 h-8" />,
    description: "Regional distribution and bulk inventory.",
    features: ["Logistics", "Bulk Orders", "Warehousing", "Territory Management"],
    color: "bg-indigo-600",
  },
  {
    id: "dealer",
    label: "Dealer",
    icon: <Store className="w-8 h-8" />,
    description: "Local authorized sales and support.",
    features: ["Dealer Network", "Stock", "Demand", "Offers", "Territory"],
    color: "bg-violet-600",
  },
  {
    id: "seller",
    label: "Seller / Service Provider",
    icon: <UserCheck className="w-8 h-8" />,
    description: "Direct-to-customer retail and expert services.",
    features: ["Local Commerce", "Services", "Inventory", "Customer Reach"],
    color: "bg-fuchsia-600",
  },
  {
    id: "customer",
    label: "End User",
    icon: <Smartphone className="w-8 h-8" />,
    description: "The buyer searching for products, services, or solutions.",
    features: ["Search", "Discover", "Compare", "Buy", "Book", "Request", "Review"],
    color: "bg-emerald-600",
  },
];

const JAICO_CORE = {
  id: "jaico",
  label: "Jaico-Mart Core",
  icon: <Zap className="w-10 h-10" />,
  description: "The intelligent network layer connecting the ecosystem.",
  features: ["Marketplace", "Discovery", "Matching", "AI", "Location", "Demand", "Recommendations"],
  color: "bg-teal-500",
};

export function JaicoHero() {
  const [activeNode, setActiveNode] = useState<NodeId | null>(null);

  const getFlowType = () => {
    if (!activeNode) return "Ecosystem Overview";
    if (activeNode === "manufacturer" || activeNode === "distributor") return "Product & Supply Flow";
    if (activeNode === "customer") return "Demand & Search Flow";
    if (activeNode === "seller" || activeNode === "dealer") return "Availability & Service Flow";
    if (activeNode === "jaico") return "Intelligence & Matching Flow";
    return "";
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 text-white min-h-[500px] flex flex-col items-center pt-8 pb-4 px-4">
      {/* Background ambient effects - Busy Market Activity */}
      <MarketActivityBackground />

      <div className="relative z-10 text-center mb-4 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 whitespace-nowrap"
        >
          The Intelligent Business Ecosystem
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-300 h-8"
        >
          {getFlowType()}
        </motion.p>
      </div>

      {/* Interactive Ecosystem Diagram */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 mt-8">
        
        {/* Supply Side */}
        <div className="flex flex-col space-y-6 w-full md:w-1/3">
          {NODES.slice(0, 3).map((node, i) => (
            <EcosystemNode 
              key={node.id} 
              node={node} 
              isActive={activeNode === node.id || activeNode === "jaico"}
              isDimmed={activeNode !== null && activeNode !== node.id && activeNode !== "jaico" && activeNode !== "customer"}
              onHover={() => setActiveNode(node.id)}
              onLeave={() => setActiveNode(null)}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Jaico Core */}
        <div className="w-full md:w-1/3 flex justify-center py-12 md:py-0 relative">
          <svg className="absolute inset-0 w-full h-full -z-10 hidden md:block" style={{ overflow: 'visible' }}>
            <ConnectionLine isActive={activeNode === "manufacturer" || activeNode === "jaico"} start={{x: 0, y: '15%'}} end={{x: '50%', y: '50%'}} />
            <ConnectionLine isActive={activeNode === "distributor" || activeNode === "jaico"} start={{x: 0, y: '50%'}} end={{x: '50%', y: '50%'}} />
            <ConnectionLine isActive={activeNode === "dealer" || activeNode === "jaico"} start={{x: 0, y: '85%'}} end={{x: '50%', y: '50%'}} />
            <ConnectionLine isActive={activeNode === "seller" || activeNode === "jaico"} start={{x: '100%', y: '25%'}} end={{x: '50%', y: '50%'}} />
            <ConnectionLine isActive={activeNode === "customer" || activeNode === "jaico"} start={{x: '100%', y: '75%'}} end={{x: '50%', y: '50%'}} />
          </svg>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
            onMouseEnter={() => setActiveNode("jaico")}
            onMouseLeave={() => setActiveNode(null)}
            className={`relative flex flex-col items-center justify-center p-8 rounded-full cursor-pointer border-2 transition-all duration-300 ${
              activeNode === "jaico" 
                ? "border-teal-400 bg-slate-800/80 shadow-[0_0_40px_rgba(45,212,191,0.4)]" 
                : activeNode ? "border-slate-700 bg-slate-800/40 opacity-70" : "border-slate-600 bg-slate-800/60 hover:border-teal-500"
            } backdrop-blur-md z-20 aspect-square w-48 md:w-56`}
          >
            <div className={`p-4 rounded-full ${JAICO_CORE.color} mb-3`}>
              {JAICO_CORE.icon}
            </div>
            <span className="font-bold text-center">{JAICO_CORE.label}</span>
            
            <AnimatePresence>
              {(activeNode === "jaico" || activeNode === "customer") && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  exit={{ opacity: 0, scale: 1 }}
                  className="absolute inset-0 rounded-full border border-teal-500 -z-10 animate-ping"
                  style={{ animationDuration: '2s' }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Demand Side */}
        <div className="flex flex-col space-y-12 w-full md:w-1/3">
           {NODES.slice(3).map((node, i) => (
            <EcosystemNode 
              key={node.id} 
              node={node} 
              isActive={activeNode === node.id || activeNode === "jaico" || (activeNode === "customer" && node.id === "seller")}
              isDimmed={activeNode !== null && activeNode !== node.id && activeNode !== "jaico" && !(activeNode === "customer" && node.id === "seller")}
              onHover={() => setActiveNode(node.id)}
              onLeave={() => setActiveNode(null)}
              delay={0.4 + (i * 0.2)}
              align="left"
            />
          ))}
        </div>
      </div>

      {/* Dynamic Feature Display */}
      <div className="relative z-10 mt-8 h-24 w-full max-w-4xl flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeNode ? (
            <motion.div 
              key={activeNode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {(activeNode === "jaico" ? JAICO_CORE : NODES.find(n => n.id === activeNode))?.features.map((feature, i) => (
                <span key={i} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-sm font-medium text-teal-300">
                  {feature}
                </span>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-slate-500 italic text-sm"
            >
              Hover over any node in the ecosystem to explore capabilities
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

function EcosystemNode({ 
  node, 
  isActive, 
  isDimmed, 
  onHover, 
  onLeave, 
  delay,
  align = "right"
}: { 
  node: NetworkNode, 
  isActive: boolean, 
  isDimmed: boolean, 
  onHover: () => void, 
  onLeave: () => void,
  delay: number,
  align?: "left" | "right"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "right" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 bg-slate-800/40 border backdrop-blur-sm ${
        isActive 
          ? "border-slate-400 shadow-lg scale-105 z-20 bg-slate-800/80" 
          : isDimmed 
            ? "border-slate-800 opacity-40 scale-95" 
            : "border-slate-700 hover:border-slate-500"
      }`}
    >
      <div className={`p-3 rounded-lg ${node.color} mr-4`}>
        {node.icon}
      </div>
      <div>
        <h3 className={`font-bold ${isActive ? 'text-white' : 'text-slate-200'}`}>{node.label}</h3>
        {isActive && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-xs text-slate-400 mt-1"
          >
            {node.description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

function ConnectionLine({ isActive, start, end }: { isActive: boolean, start: {x: string | number, y: string | number}, end: {x: string | number, y: string | number} }) {
  return (
    <g>
      <line 
        x1={start.x} y1={start.y} 
        x2={end.x} y2={end.y} 
        stroke={isActive ? "rgba(45, 212, 191, 0.5)" : "rgba(51, 65, 85, 0.5)"}
        strokeWidth={isActive ? 3 : 1}
        strokeDasharray={isActive ? "4 4" : "none"}
        className={isActive ? "animate-[dash_1s_linear_infinite]" : ""}
      />
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -8;
          }
        }
      `}</style>
    </g>
  );
}


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
