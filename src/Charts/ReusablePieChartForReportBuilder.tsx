import React, { useState, useEffect } from 'react';
import { Box, Heading, Flex, Text, HStack } from '@chakra-ui/react';
import { MdOutlineStackedLineChart } from 'react-icons/md';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { SiCircle } from 'react-icons/si';
import { findLabelByName } from '../DragNDrop/DraggableItem';
import { CustomLegend } from '../Utilities/CustomToolTip';


interface Props {
  data: any[];
  headerTitle?: string;
  columns: string[];
  lineColorArray?: string[];
  boxHeight?: string;
  XAxisDataKey: string;
  columnsToolbar?: any[];
  setBreakDownMonth?: (data: string) => void;
}

const CustomTooltipPieForReportBuilder = ({
  active,
  payload,
  label,
  title,
  color
}: {
  active: boolean;
  payload: any[];
  label: string;
  title: string[];
  color: string[];
}) => {
  if (active && payload && payload.length) {
    const values = payload.map((item: any) => item.value);
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
        >{`${label}`}</Text>
        <Box m={2}>
          {title.map((titles, index) => (
            <HStack p={1} key={index}>
              <SiCircle color={color[index]} />
              <Text color={color[index]}>
                {findLabelByName(titles)} :{' '}
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

const ReusablePieChartForReportBuilder = ({
  data,
  headerTitle,
  columns,
  lineColorArray = [],
  boxHeight = '400px',
  XAxisDataKey,
  columnsToolbar,
  setBreakDownMonth,
}: Props) => {
  const [Title, setTitle] = useState<string | undefined>('');
  const [dataCount, setDataCount] = useState<number>();

  useEffect(() => {
    setDataCount(data.length);
    setTitle(headerTitle || '');
  }, [data, headerTitle]);

  const customLegendArray2 = columns.map((a, index) => ({
    icon: <MdOutlineStackedLineChart size={'1.5rem'} />,
    key: index,
    label: findLabelByName(a),
    color: lineColorArray[index] || '#000', // Fallback color if undefined
  }));

  return (
    <Box h={boxHeight}>
      <Flex h={'100%'}>
        <Box bgColor="white" borderRadius={10} w="100%" maxHeight={'100%'}>
          <Heading fontSize="md" color="green.600" m={'1.5em'}>
            {Title}
          </Heading>
          <ResponsiveContainer width="95%" height={'80%'}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value" // Ensure your data has a 'value' key
                nameKey={XAxisDataKey}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={lineColorArray[index % lineColorArray.length] || '#000'} />
                ))}
              </Pie>
              <Tooltip
                content={(props) =>
                  CustomTooltipPieForReportBuilder({
                    active: props.active!,
                    payload: props.payload!,
                    label: props.label,
                    title: columns,
                    color: lineColorArray,
                  })
                }
              />
              <Legend content={<CustomLegend legendProps={customLegendArray2} />} />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Flex>
    </Box>
  );
};

export default ReusablePieChartForReportBuilder;

