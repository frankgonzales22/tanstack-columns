import { Box, Heading, Flex, Text, HStack, VStack, Icon } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdOutlineBarChart, MdOutlineStackedLineChart, MdAreaChart } from "react-icons/md";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, Bar, Line, Brush } from "recharts";

import { SiCircle } from "react-icons/si";
import { findLabelByName } from "../DragNDrop/DraggableItem";
import { testFncFormat } from "../Utilities/ValidateAmountFunction";


interface Props {
  data: any[];
  headerTitle?: string;
  columns: any[];
  colors?: any[];
  boxHeight?: string;
  XAxisDataKey: string;
  columnsToolbar?: any[];
  setBreakDownMonth?: (data: string) => void;
}

const CustomTooltipComposedForReportBuilder = (
  active: any,
  payload: any,
  label: any,
  title: string[],
  color: string[]
) => {
  if (active && payload && payload.length) {
    const values = payload.map((item: any) => item.value);
    const valueColored = color.map((item: any) => item);
    return (
      <Box bgColor="white" opacity={0.96} shadow="xl" borderRadius={10}>
        <Text
          borderTopRadius={10}
          fontWeight={600}
          bgColor="#F5F5F5"
          pl={3}
          pt={3}
          pb={2}
          fontSize="md"
          color="gray.600"
        >{`${label} ${payload[0].payload.column}`}</Text>
        <Box m={2}>
          {title.map((titles, index) => (
            <HStack p={1} key={index}>
              <SiCircle color={valueColored[index]} />
              <Text color={valueColored[index]}>
                {findLabelByName(titles)} :{" "}
                {values[index]?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Text>
            </HStack>
          ))}
        </Box>
      </Box>
    );
  }
  return null;
};

const CustomLegend = ({ legendProps }: any) => {
  return (
    <Box textAlign="center" p={2} m={1}>
      <Flex justify="center" mt={4}>
        {legendProps.map((item: any, index: any) => (
          <HStack key={index} align="center" mx={2}>
            <Box display="flex" justifyContent="center" alignItems="center" color={item.color}>
              <Icon as={item.icon} boxSize={6} />
              <Box
                fontSize={{
                  base: '0.8rem',
                  sm: '0.7rem',
                  md: '0.8rem',
                  lg: '0.9rem',
                  xl: '0.9rem',
                }}
                lineHeight={1}
                ml={2}
              >
                {findLabelByName(item.label).toUpperCase()}
              </Box>
            </Box>
          </HStack>
        ))}
      </Flex>
    </Box>
  );
};
const ReusableComposedGraphForReportBuilder = ({
  data,
  headerTitle,
  columns,
  colors,
  boxHeight,
  XAxisDataKey,
  columnsToolbar,
  setBreakDownMonth,
}: Props) => {
  const [Title, setTitle] = useState<string | undefined>("");
  const [dataCount, setDataCount] = useState<number>();

  const handleGraphOnClick = (value: any) => {
    if (value && value.activePayload && value.activePayload.length > 0) {
      const clickedData = value.activePayload[0].payload;
      if (setBreakDownMonth) {
        setBreakDownMonth(clickedData.Months);
      }
    }
  };

  const customLegendArray = columns.map((a, index) => ({
    icon: (index + 1) % 3 === 0 ? MdOutlineStackedLineChart :
      (index + 1) % 2 === 0 ? MdAreaChart :
        MdOutlineBarChart,
    key: index,
    label: a,
    color: colors![index],
  }));

  useEffect(() => {
    setDataCount(data.length);
    setTitle(headerTitle!);
  }, [data]);

  const [focusArea, setFocusArea] = useState<any | null>(null);

  const getChartElement = (index: number, dataKey: string) => {
    const color = colors![index % colors!.length];
    switch ((index + 1) % 3) {
      case 0:
        return <Line key={index} type="monotone" dataKey={dataKey} fillOpacity={0.5} strokeOpacity={0.6} strokeWidth={2}
          stroke={color} />;
      case 2:
        return <Area key={index} type="monotone" dataKey={dataKey} stackId={index.toString()} fillOpacity={0.5}
          fill={color} stroke={color} />;
      default:
        return <Bar key={index} type="monotone" dataKey={dataKey} stackId={index.toString()} fillOpacity={0.5}
          fill={color} stroke={color} />;
    }
  };

  return (
    <Box h={boxHeight}>
      <Flex h={"100%"}>
        <Box bgColor="white" borderRadius={10} w="100%" maxHeight={"100%"}>
          <Heading fontSize="md" color="green.600" m={"1.5em"}>
            {Title}
          </Heading>
          <ResponsiveContainer width="95%" height={"80%"}>
            <ComposedChart
              data={data}
              onClick={handleGraphOnClick}
              onMouseMove={(state) => {
                if (state.isTooltipActive) {
                  setFocusArea(state.activeTooltipIndex);
                } else {
                  setFocusArea(null);
                }
              }}
            >
              <XAxis
                dataKey={XAxisDataKey}
                fontSize="0.8rem"
                key={Math.random()}
                interval={0}
              />
              <YAxis
                type="number"
                tickFormatter={testFncFormat}
                fontSize={"0.8rem"}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={(a) =>
                  CustomTooltipComposedForReportBuilder(
                    a.active,
                    a.payload,
                    a.label,
                    columns,
                    colors!
                  )
                }
              />
              <Legend content={<CustomLegend legendProps={customLegendArray} />} />
              <CartesianGrid stroke="black" opacity={0.1} vertical={false} />
              {columns.map((item, index) => getChartElement(index, item))}
              <Brush dataKey={XAxisDataKey} height={30} stroke="#8884d8" />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </Flex>
    </Box>
  );
};

export default ReusableComposedGraphForReportBuilder;
