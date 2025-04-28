
import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { SentimentDataPoint } from "@/utils/mockData";
import MetricCard from "./MetricCard";

interface SentimentOverTimeProps {
  data: SentimentDataPoint[];
}

const SentimentOverTime = ({ data }: SentimentOverTimeProps) => {
  const [chartData, setChartData] = useState<SentimentDataPoint[]>([]);

  useEffect(() => {
    // Process data for the chart
    setChartData(data);
  }, [data]);

  return (
    <MetricCard title="Sentimentos ao Longo do Tempo">
      <div className="w-full h-[300px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickMargin={10}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
            />
            <YAxis tick={{ fontSize: 12 }} tickMargin={10} />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)}%`, '']}
              labelFormatter={(label) => `Data: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="positive" 
              stroke="#1EAEDB" 
              strokeWidth={2} 
              name="Positivo"
              dot={{ r: 1 }}
              activeDot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="negative" 
              stroke="#F97316" 
              strokeWidth={2} 
              name="Negativo"
              dot={{ r: 1 }}
              activeDot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="neutral" 
              stroke="#8E9196" 
              strokeWidth={2} 
              name="Neutro"
              dot={{ r: 1 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </MetricCard>
  );
};

export default SentimentOverTime;
