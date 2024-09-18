import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { CustomTooltipBar } from "../Utilities/CustomToolTip";

interface DisplayLineChartProps {
  data?: any[];
  row?: string[];
  col?: string[];
}

const DisplayLineChart = ({ data, row, col }: DisplayLineChartProps) => {
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
  };
  const barColors = ["#252B48", "#5B9A8B", "#445069", "#F7E987"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart key={Math.random()} width={800} height={350} data={data}>
        {JSON.stringify(col)}
        <CartesianGrid
          stroke="black"
          strokeDasharray="10 10 "
          opacity={0.1}
          vertical={false}
        />
        {row
          ?.slice()
          .reverse()
          .map((i: any, index: any) => (
            <XAxis
              key={Math.random()}
              dataKey={i}
              xAxisId={index}
              //  interval={index === 2 ? 10 : index === 1 ? 3 : 1}
              tickLine={true}
            />
          ))}
        <YAxis
          // width={105}
          tickFormatter={formatYAxisLabel}
        />
        {/* <Tooltip formatter={tooltipFormatter} /> */}
        <Tooltip
            cursor={{ fill: "transparent" }}
            content={(a) =>
              a.payload && col &&
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
          <Line
            key={i}
            dataKey={i}
            // syncId={index}
            // fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
            fill={barColors[index % 20]}
            stroke={barColors[index % 20]}
          />
        ))}
        {row
          ?.slice()
          .reverse()
          .map((i: any, index: any) => (
            <Brush key={index} dataKey={i} height={30} stroke="#8884d8" />
          ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DisplayLineChart;
