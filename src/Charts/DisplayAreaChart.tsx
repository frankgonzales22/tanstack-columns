import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltipBar } from "../Utilities/CustomToolTip";

interface DisplayAreChartProps {
  data?: any[];
  row?: string[];
  col?: string[];
}

const DisplayAreaChart = ({ data, row, col }: DisplayAreChartProps) => {
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
    // if (value >= 1_000_000) {
    //     // Convert to millions and format with 2 decimal places
    //     const millionValue = (value / 1_000_000).toLocaleString(undefined, {
    //         maximumFractionDigits: 2,
    //     });
    //     return `${millionValue}M`;

    // };
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
    <>
      {/* <div
                style={{
                    // height: '40px',
                    // paddingTop: '10px',
                    // marginTop: '10px',
                    marginLeft: '60px'
                }}
            > */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart key={Math.random()} width={800} height={350} data={data}>
          <CartesianGrid
            stroke="black"
            strokeDasharray="10 10 "
            opacity={0.1}
            vertical={false}
          />
          {/* <XAxis
                        //  xAxisId={0} 
                        dataKey="regioncode"
                    // width={300}
                    /> */}
          {/* {row?.map((i, index) =>
                        i && <XAxis key={index} dataKey={i} xAxisId={index} />
                    )} */}

          {/* {
                        row?.map((i, index) =>
                            col?.[index] && <XAxis key={index} dataKey={i} xAxisId={index} />
                        )
                    }
                     */}
          {row
            ?.slice()
            .reverse()
            .map((i, index): any => (
              <XAxis
                key={Math.random()}
                dataKey={i}
                xAxisId={index}
                //  interval={index === 2 ? 10 : index === 1 ? 3 : 1}
                tickLine={true}
              />
            ))}

          <YAxis
            //  width={105}
            tickFormatter={formatYAxisLabel}
          />

          <Legend iconType="square" />

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

          {/* <Area type="monotone" dataKey="qouta" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="nsTotal" stackId="1" stroke="#82ca9d" fill="#82ca9d" /> */}
          {col?.map((i, index) => (
            // <XAxis dataKey={i} xAxisId={index} />

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
          ))}

          {/* <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
          {row
            ?.slice()
            .reverse()
            .map((i: any, index: any) => (
              <Brush key={index} dataKey={i} height={30} stroke="#8884d8" />
            ))}
        </AreaChart>
      </ResponsiveContainer>
      {/* </div > */}
    </>
  );
};

export default DisplayAreaChart;
