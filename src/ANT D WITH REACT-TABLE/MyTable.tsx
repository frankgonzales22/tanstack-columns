import React from 'react';
import { Table } from 'antd';

const data = [
  { key: '1', 'January': 10, 'February': 15, 'March': 20 },
  { key: '2', 'January': 5, 'February': 25, 'March': 30 },
];

// Extract months and sort them
const months = ['February', 'March','January']; // This can be dynamically generated
const sortedMonths = months.sort((a, b) => new Date(Date.parse(a +" 1, 2024")).getTime() - new Date(Date.parse(b +" 1, 2024")).getTime());

// Define columns
const columns = [
  { title: 'Key', dataIndex: 'key', key: 'key' },
  ...sortedMonths.map(month => ({
    title: month,
    dataIndex: month,
    key: month,
    // sorter: (a:any, b:any) => a[month] - b[month], // Sort the data based on values
  })),
];

const MyTable = () => (
  <Table dataSource={data} columns={columns} />
);

export default MyTable;
