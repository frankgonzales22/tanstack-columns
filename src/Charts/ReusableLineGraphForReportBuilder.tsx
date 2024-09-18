import { Box, Heading, Flex, Text, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdOutlineBarChart, MdOutlineStackedLineChart } from "react-icons/md";
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line, Brush } from "recharts";

import { SiCircle } from "react-icons/si";
import { findLabelByName } from "../DragNDrop/DraggableItem";
import { testFncFormat } from "../Utilities/ValidateAmountFunction";
import { CustomLegend } from "../Utilities/CustomToolTip";

interface Props {
    data: any[];
    headerTitle?: string;
    columns: any[];
    lineColorArray?: any[];
    boxHeight?: string;
    XAxisDataKey: string;
    columnsToolbar?: any[];
    setBreakDownMonth?: (data: string) => void;
}

export const CustomTooltipLineForReportBuilder = (
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
}

const ReusableLineGraphForReportBuilder = ({
    data,
    headerTitle,
    columns,
    lineColorArray,
    boxHeight,
    XAxisDataKey,
    columnsToolbar,
    setBreakDownMonth,
}: Props) => {
    const [Title, setTitle] = useState<string | undefined>("");
    const [dataCount, setDataCount] = useState<number>();

    const handleGraphOnClick = (value: any) => {
        if (value && value.activePayload && value.activePayload.length > 0) {
            const clickedLineData = value.activePayload[0].payload;
            if (setBreakDownMonth) {
                setBreakDownMonth(clickedLineData.Months);
            }
        }
    };

    const customLegendArray2 = columns.map((a, index) => ({
        icon: <MdOutlineStackedLineChart size={"1.5rem"} />,
        key: index,
        label: findLabelByName(a),
        color: lineColorArray![index],
    }));

    useEffect(() => {
        setDataCount(data.length);
        setTitle(headerTitle!);
    }, [data]);

    const [focusLine, setFocusLine] = useState<any | null>(null);
    const [mouseLeave, setMouseLeave] = useState(true);

    return (
        <Box h={boxHeight}>
            <Flex h={"100%"}>
                <Box
                    bgColor="white"
                    borderRadius={10}
                    w="100%"
                    maxHeight={"100%"}
                >
                    <Heading fontSize="md" color="green.600" m={"1.5em"}>
                        {Title}
                    </Heading>
                    <ResponsiveContainer width="95%" height={"80%"}>
                        <LineChart
                            data={data}
                            onClick={handleGraphOnClick}
                            onMouseMove={(state) => {
                                if (state.isTooltipActive) {
                                    setFocusLine(state.activeTooltipIndex);
                                    setMouseLeave(false);
                                } else {
                                    setFocusLine(null);
                                    setMouseLeave(true);
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
                                    CustomTooltipLineForReportBuilder(
                                        a.active,
                                        a.payload,
                                        a.label,
                                        columns,
                                        lineColorArray!
                                    )
                                }
                            />
                            <Legend
                                content={<CustomLegend legendProps={customLegendArray2} />}
                            />
                            <CartesianGrid
                                stroke="black"
                                opacity={0.1}
                                vertical={false}
                            />

                            {columns.map((item, index) => (
                                <Line
                                    key={index}
                                    dataKey={item}
                                    stroke={lineColorArray![index]}
                                    strokeOpacity={0.6}
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                    isAnimationActive={true}
                                />
                            ))}
                            <Brush dataKey={XAxisDataKey} height={30} stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </Flex>
        </Box>
    );
};

export default ReusableLineGraphForReportBuilder;
