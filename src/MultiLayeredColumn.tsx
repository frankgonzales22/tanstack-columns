import { Box, Button, HStack } from "@chakra-ui/react";
import { ColumnOrderState, ExpandedState, GroupingState, flexRender, getCoreRowModel, getExpandedRowModel, getGroupedRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import DraggableItem from "./DragNDrop/DraggableItem";
import DroppableArea from "./DragNDrop/DroppableArea";



interface DynamicDataProps {
    data: any[];
}
interface NestedColumn {
    header: string;
    id: string;
    accessorKey: string;
    columns?: NestedColumn[];
}


const MultiLayeredColumn = ({ data }: DynamicDataProps) => {
    const [selectedValue, setSelectedValue] = useState<any[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any[]>([]);
    const [grouping, setGrouping] = useState<GroupingState>([]);
    const [expanded, setExpand] = useState<ExpandedState>({});
    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

    useEffect(() => {
        // setGrouping([...selectedRow])
        setGrouping(selectedRow)
    }, [selectedRow])




    const arrayOfSelected = ['yrSale', 'category'];
    const testMultiLayer = [
        { name: 'frank', age: 23, status: 'blank' },
        { name: 'cyrel', age: 23, status: 'blank' },
        { name: 'cyrel', age: 25, status: 'blank' },
        { name: 'baldwin', age: 24, status: 'not blank' },
        { name: 'frank', age: 24, status: 'not blank' },
        { name: 'baldwin', age: 22, status: 'not blank' },
        { name: 'frank', age: 22, status: 'not blank' },
        { name: 'baldwin', age: 21, status: 'not blank' }
    ];


    //#region  TRY MULTIPLE LAYERED COLUMNS
    const generateNestedColumns = (arrayOfSelected: string[], testMultiLayer: any[]): any[] => {
        // Collect all unique values for each item in arrayOfSelected
        const uniqueValuesMap: Map<string, Set<any>> = new Map();
        arrayOfSelected.forEach((columnName) => {
            const uniqueValues: Set<any> = new Set(testMultiLayer.map((item) => item[columnName]));
            uniqueValuesMap.set(columnName, uniqueValues);
        });

        // Get the name of the first item in arrayOfSelected as the parent name
        const parentName = arrayOfSelected[0];

        // Generate nested columns hierarchy based on unique values
        const generateColumnsForItem = (index: number, parentName: string): NestedColumn[] => {
            const columnName = arrayOfSelected[index];
            const uniqueValues = Array.from(uniqueValuesMap.get(columnName) || []);

            const columns: any[] = uniqueValues.map((value) => ({
                header: String(value),
                id: index === 0 ? String(value) : `${parentName}_${value}`,
                aggregatedCell: (props: any) => {

                    const sum1 = props.row?.leafRows?.reduce((totalSum: number, row: any) => {
                        const dynamicColumnKey = selectedColumn.map(column => row.original[column]).join('_');
                        if (dynamicColumnKey === props.column.columnDef.accessorKey) {
                            return totalSum + (row.original[selectedValue[0]] || 0); // Adding the value if it exists, otherwise adding 0
                        }
                        return totalSum;
                    }, 0);
                    return sum1 || 0; // Returning the sum or 0 if no sum is calculated
                },
                accessorKey: index === 0 ? String(value) : `${parentName}_${value}`,
            }))

            // If there are more levels to generate, recursively generate columns for the next level
            if (index < arrayOfSelected.length - 1) {
                columns.forEach(column => {
                    column.columns = generateColumnsForItem(index + 1, index === 0 ? String(column.header) : `${parentName}_${column.header}`);
                });
            }

            return columns;

        };
        // Initialize generation with the first item in arrayOfSelected
        return generateColumnsForItem(0, parentName);
    };

    const ultraDynamicColumns: any[] = useMemo(() => {
        return [
            ...(selectedRow[0] !== '' && selectedRow.length > 0
                ? selectedRow.map((item) => ({
                    header: item?.toString(),
                    accessorKey: item?.toString(),

                }))
                : []),
            ...(selectedColumn.length > 0
                ? generateNestedColumns(selectedColumn, data)
                : [])
        ];
    }, [data, selectedRow, selectedColumn, selectedValue])


    //#endregion
    const table = useReactTable({
        columns: ultraDynamicColumns,
        data,
        state: {
            columnOrder,
            grouping,
            expanded,
        },
        onColumnOrderChange: setColumnOrder,
        onGroupingChange: setGrouping,
        onExpandedChange: setExpand,
        getExpandedRowModel: getExpandedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })


    const [selectedRowDrop, setSelectedRowDrop] = useState<string[]>([]);
    const [selectedColumnDrop, setSelectedColumnDrop] = useState<string[]>([]);
    const [selectedValueDrop, setSelectedValueDrop] = useState<string[]>([]);

    const handleRow = (item: { name: string }) => {
        setSelectedRowDrop([...selectedRowDrop, item.name]);
        setSelectedRow([...selectedRow, item.name])

    };

    const handleColumn = (item: { name: string }) => {
        setSelectedColumnDrop([...selectedColumnDrop, item.name]);
        setSelectedColumn([...selectedColumn, item.name]);
    };

    const handleValue = (item: { name: string }) => {
        setSelectedValueDrop([item.name]);
        setSelectedValue([item.name]);
    };


    const handleClear = () => {
        setSelectedRowDrop([])
        setSelectedRow([])
        setSelectedColumnDrop([])
        setSelectedColumn([])
        setSelectedValueDrop([])
        setSelectedValue([])
    }



    useEffect(() => {
        setColumnOrder([...selectedRowDrop, ...columnOrder])
    }, [selectedRow])

    return (
        <>


            <HStack>
                <Button _hover={{ cursor: 'pointer' }} onClick={handleClear}>Clear</Button>
                <Box border={'1px solid black'} w={300}>
                    <ul>
                        {data.length > 0 &&
                            Object.keys(data[0]).map((i) => <DraggableItem key={i} name={i} />)}
                    </ul>
                </Box>
                <Box height={'400px'}>
                    <DroppableArea onDrop={handleRow} title='ROW' droppedItem={selectedRowDrop} />
                    <DroppableArea onDrop={handleColumn} title='COLUMNS' droppedItem={selectedColumnDrop} />
                    <DroppableArea onDrop={handleValue} title='VALUES' droppedItem={selectedValueDrop} />
                </Box>
            </HStack>
            <div style={{ height: '100%', overflow: 'auto' }}>
                <table style={{ border: '1px solid black', margin: '20px' }}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} style={{ padding: '10px' }}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <td
                                                {...{
                                                    key: cell.id,
                                                    style: {
                                                        background: cell.getIsGrouped()
                                                            ? '#0aff0082'
                                                            : cell.getIsAggregated()
                                                                ? '#ffa50078'
                                                                : cell.getIsPlaceholder()
                                                                    ? '#ff000042'
                                                                    : 'white',
                                                    },
                                                }}
                                            >
                                                {cell.getIsGrouped() ? (
                                                    // If it's a grouped cell, add an expander and row count
                                                    <>
                                                        <button
                                                            {...{
                                                                onClick: row.getToggleExpandedHandler(),
                                                                style: {
                                                                    cursor: row.getCanExpand()
                                                                        ? 'pointer'
                                                                        : 'normal',
                                                                },
                                                            }}
                                                        >
                                                            {row.getIsExpanded() ? '👇' : '👉'}{' '}
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}{' '}
                                                            {/* ({row.subRows.length}) */}
                                                        </button>
                                                    </>
                                                ) : cell.getIsAggregated() ? (
                                                    // If the cell is aggregated, use the Aggregated
                                                    // renderer for cell
                                                    flexRender(
                                                        cell.column.columnDef.aggregatedCell ??
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )
                                                ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                                                    // Otherwise, just render the regular cell
                                                    flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default MultiLayeredColumn