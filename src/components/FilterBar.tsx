
import { Calendar, Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterBarProps {
  onTimeRangeChange: (range: string) => void;
  onTopicChange: (topic: string) => void;
}

const FilterBar = ({ onTimeRangeChange, onTopicChange }: FilterBarProps) => {
  const [timeRange, setTimeRange] = useState("30d");
  const [topic, setTopic] = useState("all");

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    onTimeRangeChange(value);
  };

  const handleTopicChange = (value: string) => {
    setTopic(value);
    onTopicChange(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm animate-fade-in">
      <div className="flex items-center">
        <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
        <span className="text-sm font-medium">Filtros:</span>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
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
      </div>
      
      <div className="ml-auto">
        <Button variant="outline" size="sm">
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
