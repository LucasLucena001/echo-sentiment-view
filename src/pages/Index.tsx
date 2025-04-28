
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import SentimentOverTime from "@/components/SentimentOverTime";
import SentimentDistribution from "@/components/SentimentDistribution";
import TopWords from "@/components/TopWords";
import { mockData } from "@/utils/mockData";
import { toast } from "sonner";

const Index = () => {
  const [data, setData] = useState(mockData);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleTimeRangeChange = (range: string) => {
    // Em uma aplicação real, isso buscaria dados para o intervalo de tempo selecionado
    console.log(`Time range changed to ${range}`);
    // Por enquanto, apenas regeneramos dados simulados para simular a mudança de dados
    const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
    setData({
      ...mockData,
      timeSeriesData: mockData.timeSeriesData.slice(-days)
    });
  };
  
  const handleTopicChange = (topic: string) => {
    // Em uma aplicação real, isso filtraria os dados por tópico
    console.log(`Topic changed to ${topic}`);
    // Simular mudança de dados
    setData({...mockData});
  };
  
  const handleKeywordSearch = (searchKeyword: string) => {
    if (!searchKeyword.trim()) {
      toast.warning("Por favor, digite uma palavra-chave para buscar");
      return;
    }
    
    setKeyword(searchKeyword);
    setIsLoading(true);
    
    // Em uma aplicação real, aqui faríamos uma chamada para a API
    // para buscar dados baseados nas palavras-chave
    console.log(`Searching for keyword: ${searchKeyword}`);
    
    // Simulando um tempo de carregamento
    setTimeout(() => {
      // Simulando novos dados baseados na palavra-chave
      // Em uma aplicação real, estes dados viriam de uma API
      const simulatedData = {
        ...mockData,
        topWords: mockData.topWords.map(word => ({
          ...word,
          word: word.word.includes(searchKeyword) 
            ? word.word 
            : word.word + (Math.random() > 0.7 ? ` ${searchKeyword}` : ''),
          frequency: Math.floor(Math.random() * 100) + 20
        })).sort((a, b) => b.frequency - a.frequency),
      };
      
      setData(simulatedData);
      setIsLoading(false);
      toast.success(`Análise realizada para: "${searchKeyword}"`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header 
          title="Análise de Sentimentos" 
          subtitle="Visualize o sentimento das postagens e interações com base em palavras-chave" 
        />
        
        <FilterBar 
          onTimeRangeChange={handleTimeRangeChange}
          onTopicChange={handleTopicChange}
          onKeywordSearch={handleKeywordSearch}
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-lg text-muted-foreground">
              Analisando dados para "{keyword}"...
            </div>
          </div>
        ) : (
          <>
            {keyword ? (
              <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Análise para: "{keyword}"</h2>
                <p className="text-muted-foreground">Resultados da análise de sentimentos para a palavra-chave especificada.</p>
              </div>
            ) : null}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <SentimentOverTime data={data.timeSeriesData} />
              <SentimentDistribution data={data.sentimentDistribution} />
            </div>
            
            <div className="mb-6">
              <TopWords data={data.topWords} />
            </div>
          </>
        )}
        
        <footer className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>Fonte de dados: API de análise de sentimentos (dados simulados para demonstração)</p>
            <p>Atualizado em: {new Date().toLocaleDateString()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
