import { Card, CardContent } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
interface StatsCardsProps {
  stat: {
    title: string;
    value: number;
    change?: string;
    changeType?: "positive" | "negative";
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  };
}

export function StatsCards({ stat }: StatsCardsProps) {
  return (
    <Card key={stat.title} className="bg-white shadow-md">
      <CardContent className="p-6 px-20 space-y-2">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
            <stat.icon className="w-6 h-6 font-bold" />
          </div>
          <p
            className={`text-lg font-semibold ${
              stat.changeType === "positive" ? "text-green-500" : "text-red-500"
            }`}
          >
            {stat.change}
          </p>
        </div>
        <div>
          <p className="text-lg font-bold ">{stat.title}</p>
          <NumberTicker value={stat.value} className="text-2xl font-bold" />
        </div>
      </CardContent>
    </Card>
  );
}
