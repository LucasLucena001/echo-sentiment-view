
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  className?: string;
  children: ReactNode;
}

const MetricCard = ({ title, className, children }: MetricCardProps) => {
  return (
    <Card className={cn("overflow-hidden animate-fade-in", className)}>
      <CardHeader className="bg-muted/50 py-4">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {children}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
