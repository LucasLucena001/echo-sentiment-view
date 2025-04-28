
import { SubredditSentiment } from "@/utils/mockData";
import { scaleLinear } from "recharts";
import MetricCard from "./MetricCard";

interface SentimentHeatmapProps {
  data: SubredditSentiment[];
}

const SentimentHeatmap = ({ data }: SentimentHeatmapProps) => {
  // Find max values for scaling
  const maxPositive = Math.max(...data.map(d => d.positive));
  const maxNegative = Math.max(...data.map(d => d.negative));
  const maxNeutral = Math.max(...data.map(d => d.neutral));
  const maxValue = Math.max(maxPositive, maxNegative, maxNeutral);
  
  // Create color scales
  const positiveColorScale = scaleLinear()
    .domain([0, maxValue])
    .range(['#E3F2FD', '#1EAEDB'] as any);
    
  const negativeColorScale = scaleLinear()
    .domain([0, maxValue])
    .range(['#FFF3E0', '#F97316'] as any);
    
  const neutralColorScale = scaleLinear()
    .domain([0, maxValue])
    .range(['#F5F5F5', '#8E9196'] as any);
    
  const getIntensityClass = (value: number) => {
    const percentage = value / maxValue;
    if (percentage < 0.2) return "opacity-10";
    if (percentage < 0.4) return "opacity-30";
    if (percentage < 0.6) return "opacity-50";
    if (percentage < 0.8) return "opacity-70";
    return "opacity-100";
  };

  return (
    <MetricCard title="Mapa de Calor de Sentimentos por Subreddit">
      <div className="p-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Subreddit</th>
              <th className="py-2 px-4 text-center text-sm font-medium text-gray-500">Positivo</th>
              <th className="py-2 px-4 text-center text-sm font-medium text-gray-500">Neutro</th>
              <th className="py-2 px-4 text-center text-sm font-medium text-gray-500">Negativo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-muted/50">
                <td className="py-3 px-4 text-sm font-medium">{item.subreddit}</td>
                <td className="py-3 px-4">
                  <div 
                    className={`h-6 w-full bg-sentiment-positive ${getIntensityClass(item.positive)} rounded`}
                    title={`${item.positive.toFixed(0)} menções positivas`}
                  ></div>
                </td>
                <td className="py-3 px-4">
                  <div 
                    className={`h-6 w-full bg-sentiment-neutral ${getIntensityClass(item.neutral)} rounded`}
                    title={`${item.neutral.toFixed(0)} menções neutras`}
                  ></div>
                </td>
                <td className="py-3 px-4">
                  <div 
                    className={`h-6 w-full bg-sentiment-negative ${getIntensityClass(item.negative)} rounded`}
                    title={`${item.negative.toFixed(0)} menções negativas`}
                  ></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MetricCard>
  );
};

export default SentimentHeatmap;
