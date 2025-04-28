
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import MetricCard from "./MetricCard";

interface SentimentDistributionData {
  name: string;
  value: number;
  color: string;
}

interface SentimentDistributionProps {
  data: SentimentDistributionData[];
}

const SentimentDistribution = ({ data }: SentimentDistributionProps) => {
  return (
    <MetricCard title="Distribuição de Sentimentos">
      <div className="w-full h-[300px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)}%`, '']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </MetricCard>
  );
};

export default SentimentDistribution;
