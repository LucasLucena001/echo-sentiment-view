
import { WordFrequency } from "@/utils/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import MetricCard from "./MetricCard";

interface TopWordsProps {
  data: WordFrequency[];
}

const TopWords = ({ data }: TopWordsProps) => {
  // Prepare the data for the horizontal bar chart
  const chartData = [...data].sort((a, b) => a.frequency - b.frequency);
  
  // Map sentiment to color
  const getBarColor = (sentiment: string) => {
    switch(sentiment) {
      case 'positive':
        return '#1EAEDB';
      case 'negative':
        return '#F97316';
      case 'neutral':
      default:
        return '#8E9196';
    }
  };

  return (
    <MetricCard title="Palavras Relacionadas por Sentimento">
      <div className="w-full h-[500px] p-4"> {/* Increased height for better visibility */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis 
              dataKey="word" 
              type="category" 
              tick={{ fontSize: 12 }} 
              width={80}
            />
            <Tooltip
              formatter={(value: number) => [`${value} ocorrências`, '']}
              labelFormatter={(label) => `Palavra: ${label}`}
            />
            <Bar
              dataKey="frequency"
              name="Frequência"
              radius={[0, 4, 4, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.sentiment)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="px-4 pb-4">
        <div className="flex justify-center gap-6">
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2 rounded-full bg-[#1EAEDB]"></div>
            <span>Positivo</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2 rounded-full bg-[#F97316]"></div>
            <span>Negativo</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2 rounded-full bg-[#8E9196]"></div>
            <span>Neutro</span>
          </div>
        </div>
      </div>
    </MetricCard>
  );
};

export default TopWords;
