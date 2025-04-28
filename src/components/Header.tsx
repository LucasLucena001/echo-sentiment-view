
import { ChartLine } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full mb-8 animate-fade-in">
      <div className="flex items-center">
        <ChartLine className="h-8 w-8 mr-3 text-sentiment-positive" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="mt-4 md:mt-0">
        <div className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default Header;
