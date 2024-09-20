import React, { useState } from "react";
import { Table, Button, TableColumnsType } from "antd";

// Define the data structure
interface ExpandedContent {
  id: string;
  content: string;
}

interface DataType {
  key: string;
  name: string;
  age: number;
  details: string;
  expandedContent: ExpandedContent[];
}

const CombinedData: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    { key: '1', name: 'John', age: 32, details: 'John Details', expandedContent: [{ id: 'a', content: 'Extra data for John' }] },
    { key: '2', name: 'Doe', age: 42, details: 'Doe Details', expandedContent: [{ id: 'b', content: 'Extra data for Doe' }] },
    { key: '3', name: 'Jane', age: 25, details: 'Jane Details', expandedContent: [{ id: 'c', content: 'Extra data for Jane' }] },
  ]);

  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  // Define the columns
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
  ];

  // Handle expansion of rows
  const handleExpand = (expanded: boolean, record: DataType) => {
    const newExpandedRows = expanded
      ? [...expandedRows, record.key]
      : expandedRows.filter(key => key !== record.key);
    setExpandedRows(newExpandedRows);
  };

  // Combine the main and expanded data
  const combineData = (sortedData: DataType[]) => {
    return sortedData.map(item => {
      const expanded = expandedRows.includes(item.key) ? item.expandedContent : [];
      return { ...item, expandedData: expanded };
    });
  };

  // Log combined data (main + expanded) when sorting or expanding changes
  const onChange = (
    pagination: any, 
    filters: any, 
    sorter: any, 
    extra: { currentDataSource: DataType[] }
  ) => {
    const sortedData = extra.currentDataSource;
    const combinedData = combineData(sortedData);

    console.log("Combined Data (main + expanded): ", combinedData);
  };

  // Render expanded content for each row
  const expandedRowRender = (record: DataType) => {
    return (
      <ul>
        {record.expandedContent.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Table<DataType>
        dataSource={dataSource}
        columns={columns}
        onChange={onChange}
        expandedRowRender={expandedRowRender}
        onExpand={handleExpand}
      />
      <Button
        onClick={() => {
          // Log full data including expanded rows
          const combinedData = combineData(dataSource);
          console.log("Current Combined Rows Data: ", combinedData);
        }}
      >
        Log Combined Data
      </Button>
    </div>
  );
};

export default CombinedData;
