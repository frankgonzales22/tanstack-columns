import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import { useGrossDeferredCol } from './data';
import DragAndDropComponent from '../ReportBuilder/DragAndDropComponent';
import PopoverComponent from '../PopOverComponent';
import MyBarChart from '../Charts/MyBarchart';
import { VStack } from '@chakra-ui/react';
import { SortOrder } from 'antd/es/table/interface';
import { monthOrder } from './months';


// Define TypeScript types for TableColumn
interface TableColumn {
    title: string;
    key: string;
    children?: TableColumn[];
    dataIndex?: string;
}
interface LegitFilter {
    id: string;
    value: any[];
}

const ExpandableTable: React.FC = () => {

    const [selectedRowDrop, setSelectedRowDrop] = useState<string[]>([]);
    const [selectedColumnDrop, setSelectedColumnDrop] = useState<string[]>([]);
    const [selectedValueDrop, setSelectedValueDrop] = useState<string[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any[]>([]);
    const [selectedFilterDrop, setSelectedFilterDrop] = useState<any>([]);
    const [itemToFilter, setItemToFilter] = useState<any>([]);
    const [legitFilter, setLegitFilter] = useState<any>([]);

    const handleRow = (item: { name: string }) => {
        if (!selectedRow.includes(item.name)) {
            setSelectedRowDrop([...selectedRowDrop, item.name]);
            setSelectedRow([...selectedRow, item.name]);
        }
    };

    const handleColumn = (item: { name: string }) => {
        setSelectedColumnDrop([...selectedColumnDrop, item.name]);
        setSelectedColumn([...selectedColumn, item.name]);
    };

    const handleValue = (item: { name: string }) => {
        setSelectedValueDrop([...selectedValueDrop, item.name]);
    };

    const handleClear = () => {
        setSelectedRowDrop([]);
        setSelectedRow([]);
        setSelectedColumnDrop([]);
        setSelectedColumn([]);
        setSelectedValueDrop([]);
        setSelectedFilterDrop([]);
        setLegitFilter([])
    };


    const { data } = useGrossDeferredCol();
    if (!data) return <p>Loading...</p>;

    const [filteredDataForTable, setFilteredDataForTable] = useState<any>([])

    useEffect(() => {
        const filterData = (data: any[], legitFilter: LegitFilter[]) => {
            return data.filter(item =>
                legitFilter.every(filter => {
                    const itemValue = item[filter.id];
                    // Check if filter.value contains the string or number representation of itemValue
                    return filter.value.includes(itemValue?.toString()) ||
                        filter.value.includes(Number(itemValue));
                })
            );
        };

        const filteredData = filterData(data, legitFilter);
        setFilteredDataForTable(filteredData)
    }, [legitFilter])



    // Sorting function using monthOrder
    const customSorter4 = (a: string, b: string) => {
        const indexA = monthOrder.indexOf(a.toUpperCase());
        const indexB = monthOrder.indexOf(b.toUpperCase());

        // Handle cases where the path is not found in the monthOrder array
        if (indexA === -1 && indexB === -1) return 0; // If both are not found, they are considered equal
        if (indexA === -1) return 1; // If 'a' is not found, it should come after 'b'
        if (indexB === -1) return -1; // If 'b' is not found, it should come after 'a'

        return indexA - indexB;
    };
    const customSorter2 = (a: string, b: string) => {
        return monthOrder.indexOf(a.toUpperCase()) - monthOrder.indexOf(b.toUpperCase());
    };
    // const columnKey = selectedColumnDrop[selectedColumnDrop.length - 1];
    const aggregatedData = filteredDataForTable.reduce((acc: any, item: any) => {
        const rowKey = item[selectedRowDrop[0]];
        if (!acc[rowKey]) {
            acc[rowKey] = {};
        }
        let currentPath = '';
        selectedColumnDrop.forEach((col, idx) => {
            const value = item[col];
            currentPath = currentPath ? `${currentPath}_${value}` : value;
            if (!acc[rowKey][currentPath]) {
                acc[rowKey][currentPath] = selectedValueDrop.reduce((obj: any, val: string) => {
                    obj[val] = 0;
                    return obj;
                }, {});
            }
            if (idx === selectedColumnDrop.length - 1) {
                selectedValueDrop.forEach((val: string) => {
                    const itemValue = item[val];
                    if (typeof itemValue === 'string') {
                        // Increment the count for strings
                        acc[rowKey][currentPath][val] += 1;
                    } else if (typeof itemValue === 'number') {
                        // Add the numeric value
                        acc[rowKey][currentPath][val] += itemValue;
                    }
                });
            }
        });
        return acc
    }, {})


    const summaryData = Object.keys(aggregatedData).map((rowKey, index) => {
        const dataItem = aggregatedData[rowKey];

        // Sort paths using customSorter2 with monthOrder to ensure proper order (JANUARY before FEBRUARY)
        const sortedPaths = Object.keys(dataItem).sort((a, b) => customSorter4(a, b));

        // Construct an array to ensure the correct key order
        const sortedDataArray = sortedPaths.reduce((acc: any[], path: string) => {
            selectedValueDrop.forEach((val: string) => {
                acc.push({ [`${path}_${val}`]: dataItem[path][val] || 0 });
            });
            return acc;
        }, []);

        // Flatten the array of objects into a single object, preserving the correct order
        const sortedData = Object.assign({}, ...sortedDataArray);


        // Return sorted row data
        return {
            key: `${rowKey} - ${index}`, // Ensure each row has a unique key
            [selectedRowDrop[0]]: rowKey, // Dynamically set the key for this row
            ...sortedData, // Insert the sorted data with correct order
        };
    });
    const generateNestedColumns = (
        selectedColumnDrop: string[],
        level: number = 0,
        parentValue: string | null = null,
        parentPath: string = '',
        filteredData: any[] = filteredDataForTable // Start with the full filtered data
    ): TableColumn[] => {
        if (level >= selectedColumnDrop.length) return []; // Stop recursion when all columns are processed

        const currentColumn = selectedColumnDrop[level];
        // Filter the data based on the parent value (preceding column value)
        const currentFilteredData = parentValue
            ? filteredData.filter((item: any) => item[selectedColumnDrop[level - 1]]?.toString() === parentValue)
            : filteredData;

        // Get unique values for the current column
        let uniqueValues = Array.from(new Set(currentFilteredData.map((item: any) => item[currentColumn]?.toString())));

        // Sort the values if the current column represents a month
        if (currentColumn.toLowerCase()) {
            // uniqueValues = uniqueValues.sort((a, b) => {
            //     return monthOrder.indexOf(a.toUpperCase()) - monthOrder.indexOf(b.toUpperCase());
            // });
            uniqueValues = uniqueValues.sort(customSorter2);
            // uniqueValues = uniqueValues;
        }

        // Return nested columns based on the unique values of the current column
        return uniqueValues.map((value: string) => {
            const newPath = parentPath ? `${parentPath}_${value}` : value;

            return {
                title: value, // Column title is the unique value
                key: `${newPath}_${level}`, // Unique key for this column
                dataIndex: `${newPath}_${level}`, // Data key with the accumulated path

                children: generateNestedColumns(
                    selectedColumnDrop,
                    level + 1,
                    value, // Pass the current value as the new parent
                    newPath,
                    currentFilteredData // Filtered data for this level
                ).length > 0
                    ? generateNestedColumns(
                        selectedColumnDrop,
                        level + 1,
                        value,
                        newPath,
                        currentFilteredData // Filtered data passed to the next level
                    )
                    : selectedValueDrop.map(val => ({
                        title: val,
                        dataIndex: `${newPath}_${val}`, // Data key with the accumulated path
                        key: `${newPath}_${val}`,
                        // sorter: (a: any, b: any) => customSorter2(
                        //     a[`${newPath}_${val}`]?.toUpperCase(),
                        //     b[`${newPath}_${val}`]?.toUpperCase()
                        // ),
                        sorter: (a: any, b: any) => {
                            const valueA = a[`${newPath}_${val}`];
                            const valueB = b[`${newPath}_${val}`];

                            // Check if both values are numbers
                            if (!isNaN(valueA) && !isNaN(valueB)) {
                                return Number(valueA) - Number(valueB); // Sort numerically if both are numbers
                            }

                            // Convert to string if not undefined or null, otherwise use empty string for comparison
                            const stringA = valueA ? valueA.toString().toUpperCase() : '';
                            const stringB = valueB ? valueB.toString().toUpperCase() : '';

                            // Sort lexicographically (string comparison)
                            return stringA.localeCompare(stringB);
                        }
                    })),
            }
        })
    }


    const generateExpandedRowRender = (level = 0, parentHierarchy = '') => (record: any, index: any, indent: any, expanded: any) => {
        if (level >= selectedRowDrop.length - 1) return null; // Base case

        const currentKey = selectedRowDrop[level];
        const nextKey = selectedRowDrop[level + 1];

        // Filter items for the current level

        const fullHierarchy1 = parentHierarchy
            ? `${parentHierarchy}_${record[selectedRowDrop[level]]}`
            : record[selectedRowDrop[level]];

        let hierarchyParts = fullHierarchy1.split('_');

        // Remove the first part if it's a blank string
        if (hierarchyParts[0] === '') {
            hierarchyParts.shift();
        }

        // Dynamically filter items based on multiple levels of hierarchy
        const item1 = filteredDataForTable.filter((item: any) => {
            return selectedRowDrop.every((key, index) => {
                const part = hierarchyParts[index];
                // Check if both key and part exist and compare their values
                return part ? item[key]?.toString() === part.toString() : true;
            });
        });
        //

        // Group data for the next level
        const groupedData = item1.reduce((acc: any, item: any) => {
            const groupKey = item[nextKey]?.toString();
            if (!acc[groupKey]) {
                acc[groupKey] = {
                    [nextKey]: groupKey,
                    ...selectedColumnDrop.reduce((obj: any, col: string) => {
                        const colValue = item[col]?.toString();
                        if (colValue) {
                            selectedValueDrop.forEach(val => {
                                // Initialize string count or number sum or set blank
                                obj[`${colValue}_${val}`] = typeof item[val] === 'string' ? '' : 0;
                            });
                        }
                        return obj;
                    }, {}),
                };
            }

            // Populate grouped data with values or counts
            selectedColumnDrop.forEach((col, idx) => {
                const colValue = item[col]?.toString();
                if (colValue) {
                    const parentPath = selectedColumnDrop.slice(0, idx).map(col => item[col]?.toString()).join('_');
                    const fullPath = parentPath ? `${parentPath}_${colValue}` : colValue;
                    selectedValueDrop.forEach(val => {
                        const itemVal = item[val];
                        if (typeof itemVal === 'string') {
                            // Count occurrences of string values
                            acc[groupKey][`${fullPath}_${val}`] = acc[groupKey][`${fullPath}_${val}`] !== ''
                                ? (acc[groupKey][`${fullPath}_${val}`] || 0) + 1
                                : 1;
                        } else if (typeof itemVal === 'number') {
                            // Sum numeric values
                            acc[groupKey][`${fullPath}_${val}`] = (acc[groupKey][`${fullPath}_${val}`] || 0) + itemVal;
                        }
                    });
                }
            });
            return acc;
        }, {});



        // Build the full parent hierarchy for 'h'
        const expandedData = Object.keys(groupedData).map((groupKey, index) => {

            const fullHierarchy = parentHierarchy ? `${parentHierarchy}_${groupKey}` : groupKey; // Concatenate the full hierarchy
            return {
                key: `${groupKey}-${index}`,  // Key remains simple
                ...groupedData[groupKey],
                h: `${fullHierarchy}_${record[selectedRowDrop[level]]}`,  // Full hierarchy in 'h'
            };
        });


       
        // Filter the groupedData1 based on the hierarchy in 'h'
 

        // Define columns for expanded data
        const expandedColumns = [
            {
                title: nextKey + 's',
                dataIndex: nextKey,
                key: nextKey,
                sorter: (a: any, b: any) => customSorter2(
                    a[nextKey]?.toUpperCase(),
                    b[nextKey]?.toUpperCase()
                ),
                defaultSortOrder: 'ascend' as SortOrder, // Default sort order to ascending
            },
            ...generateNestedColumns(selectedColumnDrop),
        ]

        // Render the expanded row
        return (
            <>
                <Table
                    bordered
                    columns={expandedColumns}
                    dataSource={expandedData}
                    rowKey={(record: any) => record[nextKey]}  // Keep row key simple
                    pagination={false}
                    expandable={{
                        expandedRowRender: generateExpandedRowRender(level + 1, `${parentHierarchy}_${record[currentKey]}`), // Pass full parent hierarchy to the next level
                        rowExpandable: () => level < selectedRowDrop.length - 2,
                    }}
                />
            </>
        );
    };


    const columns = [
        {
            title: selectedRowDrop[0],
            dataIndex: selectedRowDrop[0],
            key: selectedRowDrop[0],
            sorter: (a: any, b: any) => {
                const aValue = a[selectedRowDrop[0]] ?? '';
                const bValue = b[selectedRowDrop[0]] ?? '';
                return customSorter2(aValue.toUpperCase(), bValue.toUpperCase());
                // return (aValue.toUpperCase(), bValue.toUpperCase());
            },
            defaultSortOrder: 'ascend' as SortOrder, // Set default sort order to ascending
        },
        ...generateNestedColumns(selectedColumnDrop).map(col => {
            const dataIndex = col.dataIndex;
            if (dataIndex === undefined) {
                return col; // Skip sorting if dataIndex is not defined
            }
            return {
                ...col,
                // sorter: (a: any, b: any) => {
                //     const aValue = a[dataIndex] ?? '';
                //     const bValue = b[dataIndex] ?? '';
                //     return customSorter2(aValue.toUpperCase(), bValue.toUpperCase());
                //     // return (aValue.toUpperCase(), bValue.toUpperCase());
                // },
                defaultSortOrder: 'ascend' as SortOrder, // Set default sort order to ascending
            };
        }),
    ]   

    console.log('bxx')

    useEffect(() => {
        //THIS IS FOR DISPLAY OF FILTER INSIDE THE FILTER DROP BOX
        // Clear previous items before adding new ones
        setItemToFilter([]);
        selectedFilterDrop.forEach((i: any) => {
            setItemToFilter((prevItemToFilter: any[]) => {
                const uniqueValues = Array.from(
                    new Set(data.map((item) => item[i]))
                );
                // Sort the uniqueValues array based on the months array
                uniqueValues.sort((a: any, b: any) => (b));
                return [
                    ...prevItemToFilter,
                    {
                        title: i,
                        values: uniqueValues,
                    },
                ];
            });
        })
    }, [selectedFilterDrop])

    const handleFilter = (item: { name: string }) => {
        if (!selectedFilterDrop.includes(item.name)) {
            setSelectedFilterDrop([...selectedFilterDrop, item.name])
        }
    }
    const onChange = (pagination : any, filters : any, sorter : any, extra: any) => {
        // 'extra' contains the sorted data
        console.log("Sorted Data: ", extra.currentDataSource);
      };
    return (
        <>
            <DragAndDropComponent
                handleClear={handleClear}
                data={data}
                handleRow={handleRow}
                handleColumn={handleColumn}
                handleValue={handleValue}
                handleFilter={handleFilter}
                selectedRowDrop={selectedRowDrop}
                selectedColumnDrop={selectedColumnDrop}
                selectedValueDrop={selectedValueDrop}
                setSelectedRowDrop={setSelectedRowDrop}
                setSelectedColumnDrop={setSelectedColumnDrop}
                selectedFilterDrop={selectedFilterDrop}
                setSelectedValueDrop={setSelectedValueDrop}
                setSelectedFilterDrop={setSelectedFilterDrop}
            />
            <div>
                {itemToFilter.map((item: any, index: any) => (
                    <PopoverComponent
                        title={(item.title)}
                        key={index}
                        checkedArray={(e) => {
                            const existingItemIndex = legitFilter.findIndex(
                                (existingItem: any) => existingItem.id === item.title
                            );
                            if (existingItemIndex !== -1) {
                                // Update the value property
                                const updatedFilCol = legitFilter.map(
                                    (existingItem: any, index: any) => {
                                        if (index === existingItemIndex) {
                                            // Check if the value is an empty array, and remove the item if it is
                                            if (Array.isArray(e) && e.length === 0) {
                                                return null; // This will remove the item from the array
                                            }
                                            return { ...existingItem, value: e };
                                        }
                                        return existingItem;
                                    }
                                );
                                // Filter out items that are not null (i.e., those with non-empty values)
                                const filteredItemsWithoutNull: any = updatedFilCol.filter(
                                    (item: any) => item !== null
                                );
                                setLegitFilter(filteredItemsWithoutNull);
                            } else {
                                // Add a new item to filteredItem if it doesn't exist
                                if (!(Array.isArray(e) && e.length === 0)) {
                                    setLegitFilter([
                                        ...legitFilter,
                                        { id: item.title, value: e },
                                    ]);
                                } else {
                                }
                            }
                        }}
                        options={item.values}
                    />
                ))}
            </div>

            <VStack>
                <Table
                    bordered
                    columns={columns}
                    dataSource={summaryData}
                    rowKey={(record: any) => record[selectedRowDrop[0]]?.toString()} // Ensure rowKey is properly set
                    pagination={false}
                    expandable={{
                        expandedRowRender: generateExpandedRowRender(),
                        rowExpandable: () => selectedRowDrop.length > 1,
                        // onExpand(expanded, record) {
                        //     console.log(`exx : ${expanded && JSON.stringify(record)}`, expanded)
                        // },
                        // onExpandedRowsChange: (s: any) => console.log('s', s),
                    }}
                    onChange={onChange}
                />
                <MyBarChart
                    summaryData={summaryData}
                    selectedRowDrop={selectedRowDrop}
                    selectedColumnDrop={selectedColumnDrop}
                    selectedValueDrop={selectedValueDrop}
                    data1={filteredDataForTable}
                    
                />
            </VStack>
        </>
    )
}

export default ExpandableTable;
