
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
    <MetricCard title="Top 10 Palavras por Sentimento">
      <div className="w-full h-[400px] p-4">
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
    </MetricCard>
  );
};

export default TopWords;
