import React, { useState } from 'react';
import { Table, Button } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import { useGrossDeferredCol } from './data';
import { lapse } from './lapse';

import DragAndDropComponent from '../ReportBuilder/DragAndDropComponent';
// Define TypeScript types for your data
interface DataItem {
    territoryCode: string;
    yrSale: string; // Ensure yrSale is treated as a string
    oneToFour: number; // Ensure oneToFour is treated as a number
    adecom: number;
    cvecom: number;
    regionCode?: string;
}

const ExpandableTable: React.FC = () => {

    const [selectedRowDrop, setSelectedRowDrop] = useState<string[]>([]);
    const [selectedColumnDrop, setSelectedColumnDrop] = useState<string[]>([]);
    const [selectedValueDrop, setSelectedValueDrop] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState<any[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any[]>([]);
   


    const handleRow = (item: { name: string }) => {
        if (!selectedRow.includes(item.name)) {
            // If it doesn't exist, add it to selectedRow
            setSelectedRowDrop([...selectedRowDrop, item.name]);
            setSelectedRow([...selectedRow, item.name]);
        }
        console.log('handleRow')
    }
    const handleColumn = (item: { name: string }) => {
        setSelectedColumnDrop([...selectedColumnDrop, item.name]);
        setSelectedColumn([...selectedColumn, item.name]);
        console.log('handleColumn')
    }

    const handleValue = (item: { name: string }) => {
        setSelectedValueDrop([item.name]);
        setSelectedValue([item.name]);

        console.log('handle value')
    }


    const handleClear = () => {
        setSelectedRowDrop([])
        setSelectedRow([])
        setSelectedColumnDrop([])
        setSelectedColumn([])
        setSelectedValueDrop([])
        setSelectedValue([])
    }


    const { data } = useGrossDeferredCol()
    if (!data) return <p>Loading...</p>

    // Extract unique yrSale values
    const yrSales = Array.from(new Set(data.map((item: DataItem) => item.yrSale)))

    // Create a mapping of territoryCode to yrSale to oneToFour
    const aggregatedData = data.reduce((acc: any, item: any) => {
        const rowKey = item[selectedRowDrop[0]]; // Dynamically access the selected row key
        if (!acc[rowKey]) {
            acc[rowKey] = {};
        }
        if (!acc[rowKey][item.yrSale]) {
            acc[rowKey][item.yrSale] = {
                adecom: 0,
                cvecom: 0
            };
        }
        acc[rowKey][item.yrSale].adecom += item.adecom;
        acc[rowKey][item.yrSale].cvecom += item.cvecom;
        return acc;
    }, {} as { [key: string]: { [key: string]: { adecom: number, cvecom: number } } });
const summaryData = Object.keys(aggregatedData).map((rowKey, index) => {
    const dataItem = aggregatedData[rowKey];
    return {
        key: `${rowKey}-${index}`, // Ensure each row has a unique key
        [selectedRowDrop[0]]: rowKey, // Dynamically set the key for this row
        ...yrSales.reduce((obj: any, year: string) => {
            obj[`${year}_adecom`] = dataItem[year]?.adecom || 0;
            obj[`${year}_cvecom`] = dataItem[year]?.cvecom || 0;
            return obj;
        }, {})
    };
});

    const columns = [
        {
            title: selectedRowDrop[0],
            dataIndex: selectedRowDrop[0],
            key: selectedRowDrop[0]
        },
        ...yrSales.map(year => ({
            title: year.toString(),
            children: [
                {
                    title: 'Adecom',
                    dataIndex: `${year}_adecom`,
                    key: `${year}_adecom`
                },
                {
                    title: 'Cvecom',
                    dataIndex: `${year}_cvecom`,
                    key: `${year}_cvecom`
                }
            ]
        }))
    ];

    const generateExpandedRowRender = (data: any[], level = 0) => (record: any) => {
        if (level >= selectedRowDrop.length - 1) return null; // Base case: if no more levels

        const currentKey = selectedRowDrop[level];
        const nextKey = selectedRowDrop[level + 1];

        // Filter items for the current record
        const items = data.filter(item => item[currentKey] === record[currentKey]);

        // Group data by the next level in selectedRowDrop
        const groupedData = items.reduce((acc: any, item: any) => {
            const groupKey = item[nextKey];
            if (!acc[groupKey]) {
                acc[groupKey] = {
                    [nextKey]: groupKey,
                    ...yrSales.reduce((obj: any, year: string) => {
                        obj[`${year}_adecom`] = 0;
                        obj[`${year}_cvecom`] = 0;
                        return obj;
                    }, {})
                };
            }
            yrSales.forEach(year => {
                if (item.yrSale === year) {
                    acc[groupKey][`${year}_adecom`] += item.adecom;
                    acc[groupKey][`${year}_cvecom`] += item.cvecom;
                }
            });
            return acc;
        }, {});

        // Convert groupedData into an array for Ant Design's Table
        const expandedData = Object.keys(groupedData).map(groupKey => ({
            ...groupedData[groupKey],
        }));

        const columns = [
            {
                title: nextKey,
                dataIndex: nextKey,
                key: nextKey,
            },
            ...yrSales.map(year => ({
                title: year.toString(),
                children: [
                    {
                        title: 'Adecom',
                        dataIndex: `${year}_adecom`,
                        key: `${year}_adecom`,
                        render: (text: any) => text || 0, // Handle empty cells
                    },
                    {
                        title: 'Cvecom',
                        dataIndex: `${year}_cvecom`,
                        key: `${year}_cvecom`,
                        render: (text: any) => text || 0, // Handle empty cells
                    }
                ]
            }))
        ];

        return (
            <Table
                columns={columns}
                dataSource={expandedData}
                rowKey={nextKey}
                pagination={false}
                expandable={{
                    expandedRowRender: generateExpandedRowRender(items, level + 1),
                    rowExpandable: () => level < selectedRowDrop.length - 2, // Remove the + icon for the last level
                }}
            />
        );
    };


    return (
        <>

            <DragAndDropComponent
                handleClear={handleClear}
                data={data}
                handleRow={handleRow}
                handleColumn={handleColumn}
                handleValue={handleValue}
                selectedRowDrop={selectedRowDrop}
                selectedColumnDrop={selectedColumnDrop}
                selectedValueDrop={selectedValueDrop}
                setSelectedRowDrop={setSelectedRowDrop}
                setSelectedColumnDrop={setSelectedColumnDrop}

                handleFilter={() => {}}
                selectedFilterDrop={['']}
                setSelectedFilterDrop={() => {}}
                setSelectedValueDrop={() => {}}
            />

            <Table
                columns={columns}
                expandable={
                    selectedRowDrop.length > 1
                        ? {
                            expandedRowRender: generateExpandedRowRender(data, 0),
                            rowExpandable: () => true,
                        }
                        : undefined // No expandable rows if only one item in selectedRowDrop
                }
                dataSource={summaryData}
                rowKey={selectedRowDrop[0]}
                pagination={false}
            />
        </>
    )
}

export default ExpandableTable
