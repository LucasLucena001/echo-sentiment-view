
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import SentimentOverTime from "@/components/SentimentOverTime";
import SentimentDistribution from "@/components/SentimentDistribution";
import TopWords from "@/components/TopWords";
import SentimentHeatmap from "@/components/SentimentHeatmap";
import { mockData } from "@/utils/mockData";

const Index = () => {
  const [data, setData] = useState(mockData);
  
  const handleTimeRangeChange = (range: string) => {
    // In a real app, this would fetch data for the selected time range
    console.log(`Time range changed to ${range}`);
    // For now, we'll just regenerate mock data to simulate data change
    const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
    setData({
      ...mockData,
      timeSeriesData: mockData.timeSeriesData.slice(-days)
    });
  };
  
  const handleTopicChange = (topic: string) => {
    // In a real app, this would filter data by topic
    console.log(`Topic changed to ${topic}`);
    // Simulate data change
    setData({...mockData});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header 
          title="Análise de Sentimentos" 
          subtitle="Visualize o sentimento das postagens e interações com base em tópicos populares" 
        />
        
        <FilterBar 
          onTimeRangeChange={handleTimeRangeChange}
          onTopicChange={handleTopicChange}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SentimentOverTime data={data.timeSeriesData} />
          <SentimentDistribution data={data.sentimentDistribution} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TopWords data={data.topWords} />
          <SentimentHeatmap data={data.subredditSentiments} />
        </div>
        
        <footer className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>Fonte de dados: Reddit API (mock data para demonstração)</p>
            <p>Atualizado em: {new Date().toLocaleDateString()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
