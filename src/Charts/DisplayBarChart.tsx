import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltipBar } from "../Utilities/CustomToolTip";

interface DisplayBarChartProps {
  data?: any[];
  row?: string[];
  col?: string[];
  interval?: number;
}

const DisplayBarChart = ({
  data,
  row,
  col,
  interval,
}: DisplayBarChartProps) => {
  // const revRows = row?.reverse();
  const tooltipFormatter = (value: number) => {
    if (value >= 1_000_000) {
      // Convert to millions and format with 2 decimal places
      const millionValue = (value / 1_000_000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return `${millionValue}M`;
    } else if (value >= 1000) {
      // Convert to millions and format with 2 decimal places
      const millionValue = (value / 1000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return `${millionValue}K`;
    } else {
      return `${value}`;
    }
  };

  const formatYAxisLabel = (value: number) => {
    if (value >= 1_000_000) {
      // Convert to millions and format with 2 decimal places
      const millionValue = (value / 1_000_000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return `${millionValue}M`;
    } else if (value >= 1000) {
      // Convert to millions and format with 2 decimal places
      const millionValue = (value / 1000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return `${millionValue}K`;
    } else {
      return `${value}`;
    }

    // For values less than a million, format with 2 decimal places
    // return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  // row?.reverse()
  const barColors = ["#00C49F", "#FFBB28", "#0088FE", "#FFBB28", "#8884D8"];

  const [dataCount, setDataCount] = useState<number>();
  useEffect(() => {
    setDataCount(data?.length);
  }, [data]);

  const formatXAxisLabel = (value: string, index: number) => {
    if (dataCount! > 7 && typeof value === "string") {
      return value.slice(0, 4);
    }
    return value.toString();
  };
  const item = ["1", "2", "3"] as any[];

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={800} height={350} data={data} key={Math.random()}>
          <CartesianGrid
            stroke="black"
            strokeDasharray="10 10 "
            opacity={0.1}
            vertical={false}
          />
          {row
            ?.slice()
            .reverse()
            .map((i, index) => (
              <XAxis
                key={Math.random()}
                dataKey={i}
                xAxisId={index}
                // tickFormatter={formatXAxisLabel}
                tickLine={true}
                // interval={interval}
              />
            ))}

          <YAxis type="number" tickFormatter={formatYAxisLabel} />
          {/* <Tooltip formatter={tooltipFormatter} /> */}
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={(a) =>
              a.payload &&
              col &&
              CustomTooltipBar(
                a.active,
                a.payload,
                // a.label,
                `${a.label} ${a?.payload[0]?.payload?.column}`,
                // `${a.label} ${JSON.stringify(a?.payload[0])}`,
                col,
                barColors!
              )
            }
          />
          <Legend />

          {col?.map((i, index) => (
            <Bar
              key={index}
              dataKey={i}
              stackId={index}
              fill={barColors[index % 20]}
            />
          ))}

          {row
            ?.slice()
            .reverse()
            .map((i: any, index: any) => (
              <Brush
                key={index}
                dataKey={i}
                height={30}
                stroke={barColors[index % 20]}
              />
            ))}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default DisplayBarChart;
