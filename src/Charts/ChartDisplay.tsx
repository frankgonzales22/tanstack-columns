// ChartDisplay.tsx
import React from 'react';
import { Box } from '@chakra-ui/react'; // Import Box from your UI library
import ReusableBarGraphForReportBuilder from './ReusableBarGraphForReportBuilder';
import ReusableLineGraphForReportBuilder from './ReusableLineGraphForReportBuilder';
import ReusableAreaGraphForReportBuilder from './ReusableAreaGraphForReportBuilder';
import ReusableComposedGraphForReportBuilder from './ReusableComposedGraphForReportBuilder';
import ReusableStackedBarGraphForReportBuilder from './ReusableStackedBarGraphForReportBuilder';


interface ChartDisplayProps {
  selectedChart: string | null;
  filteredDynamicData: any; // Adjust the type according to your data structure
  draggedItem?: any; // Adjust the type according to your data structure
  droppedItems: any[]; // Adjust the type according to your data structure
  // interval ?: number
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ selectedChart, filteredDynamicData, draggedItem, droppedItems, }) => {

  return (
    <Box
      style={{
        height: "100%",
        // marginTop: "50px",
      }}
    >
      {selectedChart === "barChart" && (

        <ReusableBarGraphForReportBuilder
          data={filteredDynamicData}
          barColorArray={['blue', 'green', 'red', 'gold']}
          columns={droppedItems}
          boxHeight="100%"
          XAxisDataKey="row"
        />

      )}
      {selectedChart === "stackedChart" && (

        <ReusableStackedBarGraphForReportBuilder
          data={filteredDynamicData}
          barColorArray={['blue', 'green', 'red', 'gold']}
          columns={droppedItems}
          boxHeight="100%"
          XAxisDataKey="row"
        />

      )}
      {selectedChart === "areaChart" && (

        <ReusableAreaGraphForReportBuilder
          data={filteredDynamicData}
          areaColorArray={['blue', 'green', 'red', 'gold']}
          columns={droppedItems}
          boxHeight="100%"
          XAxisDataKey="row"
        />
      )}
      {selectedChart === "lineChart" && (
        <ReusableLineGraphForReportBuilder
          data={filteredDynamicData}
          lineColorArray={['blue', 'green', 'red', 'gold']}
          columns={droppedItems}
          boxHeight="100%"
          XAxisDataKey="row"
        />
      )}
      {selectedChart === "composedChart" && (
        <ReusableComposedGraphForReportBuilder
          data={filteredDynamicData}
          colors={['blue', 'green', 'red', 'gold']}
          columns={droppedItems}
          boxHeight="100%"
          XAxisDataKey="row"
        />
      )}
    </Box>
  );
};

export default ChartDisplay;
