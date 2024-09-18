import {
  Box,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Rectangle } from "recharts";
import { IconType } from "react-icons";
import { SiCircle } from "react-icons/si";
import { fncFormatCurrency } from "./ValidateAmountFunction";

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Box bgColor="white" border="1px solid #ccc" padding="10px">
        <Heading color={data.color} fontSize="md">{`${label}`}</Heading>
        <SimpleGrid columns={1}>
          {/* <Text color="gray.700">{`Value : ${data.value}`}</Text>
          <Text color="gray.700">{`Value2 : ${data.value2}`}</Text> */}
          <Text color="#00A3FF">{`Quota : ${data.quotaTotalCount.toLocaleString(
            undefined,
            {
              maximumFractionDigits: 2,
            }
          )}`}</Text>
          <Text color="#FF9843">{`Production : ${data.prodTotalCount.toLocaleString(
            undefined,
            {
              maximumFractionDigits: 2,
            }
          )}`}</Text>
        </SimpleGrid>
      </Box>
    );
  }
  return null;
};

export const CustomTooltipForQuotaOVerCollection = ({
  active,
  payload,
  label,
}: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Box bgColor="white" border="1px solid #ccc" padding="10px">
        <Heading color={data.color} fontSize="md">{`${label}`}</Heading>
        <SimpleGrid columns={1}>
          {/* <Text color="gray.700">{`Value : ${data.value}`}</Text>
          <Text color="gray.700">{`Value2 : ${data.value2}`}</Text> */}
          <Text color="#00A3FF">{`Total Quota : ${data.totalQuota.toLocaleString(
            undefined,
            {
              maximumFractionDigits: 2,
            }
          )}`}</Text>
          <Text color="#FF9843">{`Total Collection : ${data.totalCollection.toLocaleString(
            undefined,
            {
              maximumFractionDigits: 2,
            }
          )}`}</Text>
        </SimpleGrid>
      </Box>
    );
  }
  return null;
};

export const CustomTooltipForHomeCollection = ({
  active,
  payload,
  label,
}: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Box bgColor="white" border="1px solid #ccc" padding="10px">
        <Heading color={data.color} fontSize="md">{`${label}`}</Heading>
        <SimpleGrid columns={1}>
          <Text color="#00A3FF">{`New Sales Collection : ${data.totalAmountNs.toLocaleString(
            undefined,
            {
              maximumFractionDigits: 2,
            }
          )}`}</Text>
          <Text color="#FF9843">{`Deferred Collection : ${data.totalAmountDc.toLocaleString(
            undefined,
            {
              maximumFractionDigits: 2,
            }
          )}`}</Text>
        </SimpleGrid>
      </Box>
    );
  }
  return null;
};

export const CustomTooltipForGrossCol = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const QuotaComData = fncFormatCurrency(data["Quota Com"]);
    const QuotaNComData = fncFormatCurrency(data["Quota NCom"]);
    const GDCComData = fncFormatCurrency(data["GDC Com"]);

    const GDCNComData = fncFormatCurrency(data["GDC NCom"]);
    return (
      <Box bgColor="white" border="1px solid #ccc" padding="10px">
        <Heading color="gray.600" fontSize="md">{`${label}`}</Heading>
        <SimpleGrid columns={1}>
          {/* <Text color="gray.700">{`Value : ${data.value}`}</Text>
          <Text color="gray.700">{`Value2 : ${data.value2}`}</Text> */}
          <Text color="#FFBB28">{`Quota Com : ${QuotaComData}`}</Text>
          <Text color="#F97700">{`GDC Com : ${GDCComData}`}</Text>
          <Text color="#86A7FC">{`Quota NCom : ${QuotaNComData}`}</Text>
          <Text color="#3468C0">{`GDC NCom : ${GDCNComData}`}</Text>
        </SimpleGrid>
      </Box>
    );
  }
  return null;
};

export const CustomTooltipBar = (
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
          // border="1px"
        >{`${label} `}</Text>
        <Box m={2}>
          {title.map((titles, index) => (
            <HStack p={1} key={index}>
              <SiCircle color={valueColored[index]} />
              <Text color={valueColored[index]}>
                {titles} :{" "}
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

interface ICustomLegend {
  icon: JSX.Element;
  label: string;
  color: string;
}

interface customLgendProps {
  legendProps: ICustomLegend[];
}

export const CustomLegend = ({ legendProps }: customLgendProps) => {
  return (
    <>
      <Box
        style={{
          margin: "0rem",
        }}
      >
        <HStack display={"flex"} justifyContent="center" spacing={4}>
          {legendProps!.map((a, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="center"
              alignItems="center"
              color={a.color}
            >
              <Box bgSize={10}>{a.icon}</Box>
              <Box
                key={index}
                fontSize={{
                  base: "0.8rem",
                  sm: "0.7rem",
                  md: "0.8rem",
                  lg: "0.9rem",
                  xl: "0.9rem",
                }}
                lineHeight={1}
              >
                {a.label.toUpperCase()}
              </Box>
            </Box>
          ))}
        </HStack>
      </Box>
    </>
  );
};
