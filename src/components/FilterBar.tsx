
import { Calendar, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FilterBarProps {
  onTimeRangeChange: (range: string) => void;
  onTopicChange: (topic: string) => void;
  onKeywordSearch: (keyword: string) => void;
}

const FilterBar = ({ onTimeRangeChange, onTopicChange, onKeywordSearch }: FilterBarProps) => {
  const [timeRange, setTimeRange] = useState("30d");
  const [topic, setTopic] = useState("all");
  const [keyword, setKeyword] = useState("");

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    onTimeRangeChange(value);
  };

  const handleTopicChange = (value: string) => {
    setTopic(value);
    onTopicChange(value);
  };

  const handleKeywordSearch = () => {
    onKeywordSearch(keyword);
  };

  return (
    <div className="flex flex-col gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm animate-fade-in">
      <div className="flex items-center mb-2">
        <Search className="h-5 w-5 mr-2 text-primary" />
        <span className="text-lg font-semibold">Análise por Palavra-chave</span>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Digite uma palavra-chave para análise de sentimentos"
            className="w-full"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleKeywordSearch();
              }
            }}
          />
        </div>
        <Button onClick={handleKeywordSearch} className="whitespace-nowrap">
          <Search className="h-4 w-4 mr-2" />
          Analisar
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-2">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filtros adicionais:</span>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 dias</SelectItem>
                <SelectItem value="30d">30 dias</SelectItem>
                <SelectItem value="90d">90 dias</SelectItem>
                <SelectItem value="1y">1 ano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={topic} onValueChange={handleTopicChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Tópico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="tech">Tecnologia</SelectItem>
                <SelectItem value="politics">Política</SelectItem>
                <SelectItem value="entertainment">Entretenimento</SelectItem>
                <SelectItem value="sports">Esportes</SelectItem>
                <SelectItem value="science">Ciência</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm" className="ml-auto">
            Exportar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
