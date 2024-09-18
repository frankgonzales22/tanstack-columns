import { Tooltip } from "antd";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import { monthOrder } from "../ANT D WITH REACT-TABLE/months";

interface MyBarChartProps {
  summaryData: any[];
  selectedRowDrop: any[];
  selectedColumnDrop: any[];
  selectedValueDrop: any[];
  data1: any[];
}

const MyBarChart: React.FC<MyBarChartProps> = ({ summaryData, selectedRowDrop, selectedColumnDrop, selectedValueDrop, data1 }) => {

  // Dynamically set the XAxis dataKey using the first selectedRowDrop item
  const xAxisDataKey = selectedRowDrop.length > 0 ? selectedRowDrop[0] : 'key'; // Default to 'key' if no row drop is selected
  // Extract unique values from summaryData based on selectedColumnDrop
  const getUniqueColumnValues = (data: any[], column: any): string[] => {
    // Check if the column is valid and exists in the data
    if (!column || !data.some(item => item.hasOwnProperty(column))) {
      return [];
    }
    return Array.from(new Set(data.map(item => item[column]).filter(Boolean))); // Ensure no undefined/null values
  }

  
  // Recursive function to build nested structure for dataKey
  const sortByCustomOrder = (a: string, b: string) => {
    const indexA = monthOrder.indexOf(a);
    const indexB = monthOrder.indexOf(b);
    if (indexA === -1 || indexB === -1) return 0; // If not found in the customSortOrder, don't sort them
    return indexA - indexB;
  };
  
  const generateNestedBars = (colIndex: number, accumulatedKey: string, filteredData: any[]): JSX.Element[] => {
    if (colIndex >= selectedColumnDrop.length) {
      return []; // Stop recursion if we've processed all columns
    }
  
    const col = selectedColumnDrop[colIndex];
    let uniqueColValues = getUniqueColumnValues(filteredData, col); // Get unique values for the current column in the filtered data
  
    // Ensure we have unique values to process
    if (!uniqueColValues || uniqueColValues.length === 0) {
      return []; // Stop further processing if no unique values are found
    }
  
    // Sort uniqueColValues based on the customSortOrder
    uniqueColValues = uniqueColValues.sort(sortByCustomOrder);
  
    return uniqueColValues.flatMap((colValue) => {
      const newAccumulatedKey = accumulatedKey ? `${accumulatedKey}_${colValue}` : colValue;
  
      // Filter the data for the next level based on the current column value
      const nextFilteredData = filteredData.filter(item => item[col] === colValue);
  
      // If this is the last column, generate bars for selectedValueDrop
      if (colIndex === selectedColumnDrop.length - 1) {
        return selectedValueDrop.map((selectedVal, valueIndex) => {
          const finalDataKey = `${newAccumulatedKey}_${selectedVal}`;
          return (
            <Bar
              key={finalDataKey}
              dataKey={finalDataKey} // Use the accumulated dataKey
              fill={valueIndex % 2 === 0 ? "#8884d8" : "#82ca9d"} // Alternate fill color
              name={finalDataKey} // Label includes the full accumulated key
            />
          )
        });
      }
  
      // Recursively build the nested structure with sorted and filtered data
      return generateNestedBars(colIndex + 1, newAccumulatedKey, nextFilteredData);
    });
  };
  // Check if data is empty and render a fallback message or return null
  if (summaryData.length === 0 || data1.length === 0) {
    return <p>No data available to display.</p>; // You can customize this message or add a loading spinner
  }


  return (
    <ResponsiveContainer width="100%" height={400}>
      
      <BarChart
        width={800}
        height={400}
        data={summaryData}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} /> {/* XAxis dataKey is now dynamic */}
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Start the recursive generation of nested bars */}
        {generateNestedBars(0, '', data1)}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default MyBarChart;
