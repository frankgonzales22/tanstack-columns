import { Box, Button, HStack } from "@chakra-ui/react";
import { ColumnOrderState, ExpandedState, GroupingState, flexRender, getCoreRowModel, getExpandedRowModel, getGroupedRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import ADraggableItem from "./ADraggableItem";
import ADroppableArea from "./ADroppableItems";



interface DynamicDataProps {
    data: any[];
}

interface NestedColumn {
    header: string;
    id: string;
    accessorKey: string;
    columns?: NestedColumn[];
}


const AMultiLayeredColumn = ({ data }: DynamicDataProps) => {
    const [selectedRowDrop, setSelectedRowDrop] = useState<string[]>([]);
    const [selectedColumnDrop, setSelectedColumnDrop] = useState<string[]>([]);
    const [selectedValueDrop, setSelectedValueDrop] = useState<string[]>([]);

    const [selectedValue, setSelectedValue] = useState<any[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any[]>([]);
    const [grouping, setGrouping] = useState<GroupingState>([]);
    const [expanded, setExpand] = useState<ExpandedState>({});
    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

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
        }
        // Initialize generation with the first item in arrayOfSelected
        return generateColumnsForItem(0, parentName);
    }
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

 

    const handleRow = (item: { name: string }) => {
        if (!selectedRow.includes(item.name)) {
            // If it doesn't exist, add it to selectedRow
            setSelectedRowDrop([...selectedRowDrop, item.name]);
            setSelectedRow([...selectedRow, item.name]);
        }
    }
    const handleColumn = (item: { name: string }) => {
        setSelectedColumnDrop([...selectedColumnDrop, item.name]);
        setSelectedColumn([...selectedColumn, item.name]);
    }
    console.log('selected col', selectedColumn)
    // const handleColumn = useCallback((item: { name: string }) => {
    //     setSelectedColumnDrop(prevState => [...prevState, item.name]);
    //     setSelectedColumn(prevState => [...prevState, item.name]);
    // }, [selectedColumnDrop, setSelectedColumnDrop, setSelectedColumn]);

    const handleValue = (item: { name: string }) => {
        setSelectedValueDrop([item.name]);
        setSelectedValue([item.name]);
    }

    const handleClear = () => {
        setSelectedRowDrop([])
        setSelectedRow([])
        setSelectedColumnDrop([])
        setSelectedColumn([])
        setSelectedValueDrop([])
        setSelectedValue([])
    }

    useEffect(() => {
        setGrouping(selectedRowDrop)
        setColumnOrder([...selectedRowDrop, ...columnOrder])
    }, [selectedRow, selectedRowDrop])

    useEffect(() => {
        setSelectedColumn(selectedColumnDrop)
    }, [selectedColumnDrop])

    // console.log(table.getPreExpandedRowModel())
    console.log(data)
    return (
        <>
            <HStack>
                <Button _hover={{ cursor: 'pointer' }} onClick={handleClear}>Clear</Button>
                <Box border={'1px solid black'} w={300}>
                    <ul>
                        {data.length > 0 &&
                            Object.keys(data[0]).map((i) => <ADraggableItem key={i} name={i} />)}
                    </ul>
                </Box>
                <Box height={'400px'}>
                    <ADroppableArea onDrop={handleRow} title='ROW' droppedItems={selectedRowDrop} setDroppedItems={setSelectedRowDrop} />
                    <ADroppableArea onDrop={handleColumn} title='COLUMNS' droppedItems={selectedColumnDrop} setDroppedItems={setSelectedColumnDrop} />
                    <ADroppableArea onDrop={handleValue} title='VALUES' droppedItems={selectedValueDrop} />
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
                                                        {cell.column.id !== (grouping[grouping.length - 1]) ?
                                                            <button
                                                                {...{
                                                                    // onClick: row.getToggleExpandedHandler(),
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
                                                            :
                                                            <button
                                                                {...{
                                                                    // onClick: row.getToggleExpandedHandler(),                                                   
                                                                }}
                                                            >
                                                                {flexRender(
                                                                    cell.column.columnDef.cell,
                                                                    cell.getContext()
                                                                )}{' '}
                                                                {/* ({row.subRows.length}) */}
                                                            </button>
                                                        }
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

export default AMultiLayeredColumn