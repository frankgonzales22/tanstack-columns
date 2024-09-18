import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  Bar,
  Line,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { CustomTooltipBar } from "../../../../utility/GenericFunction/CustomToolTip";

interface DisplayComposedChartProps {
  data?: any[];
  row?: string[];
  col?: string[];
}

const DisplayComposedChart = ({
  data,
  row,
  col,
}: DisplayComposedChartProps) => {
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
  const barColors = ["#0088FE", "#FFBB28", "#00C49F", "#8884D8"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart key={Math.random()} width={800} height={350} data={data}>
        {row
          ?.slice()
          .reverse()
          .map((i, index) => (
            <XAxis key={Math.random()} dataKey={i} xAxisId={index} />
          ))}
        <YAxis
          //  width={105}
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

        {/* 'line' | 'plainline' | 'square' */}

        {/* {col?.map((i, index) =>
                    <Legend iconType={(index + 1) % 3 === 0 ? 'plainline' : (index + 1) % 2 === 0 ? 'circle' : 'square'} />
                )} */}
        {/* <Legend iconType='plainline' /> */}
        <Legend />
        <CartesianGrid
          stroke="black"
          strokeDasharray="10 10 "
          opacity={0.1}
          vertical={false}
        />
        {col?.map((i, index) =>
          (index + 1) % 3 === 0 ? (
            <Line
              type="monotone"
              key={index}
              dataKey={i}
              // stackId={index}
              // stroke={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
              // fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
              fill={barColors[index % 20]}
              stroke={barColors[index % 20]}
            />
          ) : (index + 1) % 2 === 0 ? (
            <Area
              type="monotone"
              key={index}
              dataKey={i}
              stackId={index}
              // stroke={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
              // fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
              fill={barColors[index % 20]}
              stroke={barColors[index % 20]}
            />
          ) : (
            <Bar
              type="monotone"
              key={index}
              dataKey={i}
              stackId={index}
              // stroke={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
              // fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
              fill={barColors[index % 20]}
              stroke={barColors[index % 20]}
            />
          )
        )}
        {/* {col?.map((i, index) =>
                <Bar type="monotone"
                    dataKey={i}
                    stackId={index}
                    stroke={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                    fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                />
            )} */}
        {/* {col?.map((i, index) =>
                <Line type="monotone"
                    dataKey={i}
                    // stackId={index}
                    stroke={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                    fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                />
            )} */}
        {row
          ?.slice()
          .reverse()
          .map((i: any, index: any) => (
            <Brush key={index} dataKey={i} height={30} stroke="#8884d8" />
          ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default DisplayComposedChart;
