
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from "recharts";

type SkillProps = {
  name: string;
  icon: React.ReactNode;
};

interface SkillsNetworkProps {
  skills: SkillProps[];
}

const SkillsNetwork = ({ skills }: SkillsNetworkProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [skillsData, setSkillsData] = useState<Array<any>>([]);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const colors = [
    "#8b5cf6", "#d946ef", "#f97316", "#0ea5e9", "#0891b2", 
    "#10b981", "#84cc16", "#fbbf24", "#fb7185", "#6366f1"
  ];

  // Generate random positions for skills
  const generateSkillsPositions = () => {
    const newPositions = skills.map((skill, index) => {
      const quadrant = index % 4;
      const radius = Math.random() * 0.5 + 0.2; // Between 0.2 and 0.7
      const angle = (Math.PI / 2) * quadrant + (Math.random() * Math.PI / 2);
      
      return {
        name: skill.name,
        x: Math.cos(angle) * radius * 100 + 50,
        y: Math.sin(angle) * radius * 100 + 50,
        z: 10 + Math.random() * 20,
        icon: skill.icon,
        color: colors[index % colors.length]
      };
    });
    
    setSkillsData(newPositions);
  };

  // Update chart dimensions when container size changes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = isMobile ? 400 : 500;
        setDimensions({ width, height });
      }
    };

    generateSkillsPositions();
    updateDimensions();
    
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isMobile]);

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 rounded-lg border shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">{data.name}</span>
            <div className="text-primary">{data.icon}</div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="absolute top-0 right-0 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={generateSkillsPositions}
          className="text-muted-foreground hover:text-foreground"
        >
          <Shuffle className="h-4 w-4 mr-2" />
          Shuffle
        </Button>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full overflow-hidden"
      >
        <ChartContainer config={{}} className="h-[500px] md:h-[600px]">
          <ScatterChart
            width={dimensions.width}
            height={dimensions.height}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <XAxis 
              type="number" 
              dataKey="x" 
              domain={[0, 100]} 
              hide={true} 
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              domain={[0, 100]} 
              hide={true} 
            />
            <ZAxis 
              type="number" 
              dataKey="z" 
              range={[isMobile ? 80 : 100, isMobile ? 400 : 600]} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              data={skillsData} 
              fill="#8884d8"
            >
              {skillsData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || colors[index % colors.length]} 
                  className="cursor-pointer hover:opacity-80"
                  onClick={() => setActiveSkill(entry.name)}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ChartContainer>
      </motion.div>
      
      {/* Skill labels */}
      <div className="absolute inset-0 pointer-events-none">
        {skillsData.map((skill, index) => (
          <motion.div
            key={`label-${index}`}
            className="absolute flex flex-col items-center pointer-events-auto cursor-pointer"
            style={{
              left: `${skill.x}%`,
              top: `${skill.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.2 }}
          >
            <div className="bg-card p-2 rounded-full shadow-lg border border-border">
              {skill.icon}
            </div>
            <span className={`mt-1 text-xs font-medium bg-background/80 px-2 py-0.5 rounded ${activeSkill === skill.name ? 'text-primary' : ''}`}>
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsNetwork;
