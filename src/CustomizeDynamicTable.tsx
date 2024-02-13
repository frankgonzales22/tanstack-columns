import { Box, HStack, Button } from "@chakra-ui/react";
import { ColumnDef, ColumnOrderState, ExpandedState, GroupingState, flexRender, getCoreRowModel, getExpandedRowModel, getGroupedRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import DroppableArea from "./DragNDrop/DroppableArea";
import DraggableItem from "./DragNDrop/DraggableItem";


interface DynamicDataProps {
    data: any[];
}

const CustomizeDynamicTable = ({ data }: DynamicDataProps) => {
    const [selectedValue, setSelectedValue] = useState<any[]>([])
    const [selectedColumn, setSelectedColumn] = useState<any[]>([])
    const [selectedRow, setSelectedRow] = useState<any[]>([])
    const [grouping, setGrouping] = useState<GroupingState>([])
    const [expanded, setExpand] = useState<ExpandedState>({})
    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])

    // data.map((item) => item[selectedColumn[0]]).map((columnName, itemIndex) => console.log(``))
    useEffect(() => {
        // setGrouping([...selectedRow])
        setGrouping(selectedRow)
    }, [selectedRow])

    const generateNestedArrays = (arr: any[], index: number): any[] => {
        const reversedArray = arr.slice().reverse(); // Create a copy of the array and reverse it
        if (index >= reversedArray.length) return []; // Base case: stop recursion if index exceeds array length
        return [
            {
                value: reversedArray[index],
                children: generateNestedArrays(reversedArray, index + 1), // Recursively generate children
            },
        ];
    };


  
    const dynamicColumns: any[] = useMemo(() => {
        return [
            ...(selectedRow[0] !== '' && selectedRow.length > 0
                ? selectedRow.map((item) => ({
                    header: item?.toString(),
                    accessorKey: item?.toString(),
                }))
                : []),
            ...(selectedColumn.length > 0
                ? Array.from(new Set(data.map((item) => item[selectedColumn[0]]))).map((columnName, itemIndex) =>
                (
                    {
                        header: `${String(columnName)}`,
                        id: `column_${String(columnName)}`,
                        accessorKey: `column_${String(columnName)}`,
                        aggregatedCell: (props: any) => {
                            const sumOfVariance = props.row?.leafRows?.reduce((sum: any, leafRow: any) => {
                                const columnId = leafRow.original[selectedColumn[0]];
                                const variance = leafRow.original[selectedValue[0]];
                                const checkValue = isNaN(props.row.leafRows[0].original[selectedValue[0]])
                                console.log('col', columnId)
                                if (checkValue) {
                                    const count = variance ? 1 : 0
                                    return `column_${columnId}` === props.column.id ? sum + (count ?? 0) : sum;
                                } else {
                                    return `column_${columnId}` === props.column.id ? sum + (variance ?? 0) : sum;
                                }
                            }, 0) ?? 0;
                            // return
                            return <div>{sumOfVariance}</div>
                        },
                        cell: (props: any) => {
                            const varianceValues = props.row.original[selectedColumn[0]];
                            const value = parseFloat(props.row.original[selectedValue[0]]).toFixed(2)
                            return <div>{`column_${varianceValues}` === props.column.id ? value : ''}</div>
                        },
                    }))
                : [])
        ];
    }, [data, selectedRow, selectedColumn, selectedValue])




    //#region  TRY MULTIPLE LAYERED COLUMNS
    const generateNestedColumns = (arr: any[], index: number): any[] => {
        const reversedArray = arr.slice().reverse(); // Create a copy of the array and reverse it
        if (index >= reversedArray.length) return []; // Base case: stop recursion if index exceeds array length
        return [
            {
                header: reversedArray[index]?.toString(),
                accessorKey: `column_${String(reversedArray[index])}`,
                columns: generateNestedColumns(reversedArray, index + 1), // Recursively generate children
            },
        ];
    };



    const multiLayeredColumns: any[] = useMemo(() => {
        // dynamicArray.reverse().map(i => console.log('item reverse :', i))
        // data.map((item) => item[selectedColumn[0]])
        //     .map(columnName => console.log('colname', columnName))
        // Array.from(new Set(data.map((item) => item[selectedColumn[0]]))).map(columnName => console.log('nsd', columnName))

        selectedColumn.length > 0 ?
            selectedColumn.map((i, index) =>
                data.map(item => item[i])
                    .map(uniqueColumn =>
                        //  console.log('uniqueColumn', uniqueColumn)
                        uniqueColumn
                    )

            ) : null
        return [
            ...(selectedRow[0] !== '' && selectedRow.length > 0
                ? selectedRow.map((item) => ({
                    header: item?.toString(),
                    accessorKey: item?.toString(),
                }))
                : []),
            ...(selectedColumn.length > 0
                // ? Array.from(new Set(data.map((item) => item[selectedColumn[0]]))).map((columnName, itemIndex) =>

                // (
                //     {
                //         header: `${String(columnName)}`,
                //         id: `column_${String(columnName)}`,
                //         accessorKey: `column_${String(columnName)}`,

                //         aggregatedCell: (props: any) => {
                //             const sumOfVariance = props.row?.leafRows?.reduce((sum: any, leafRow: any) => {
                //                 const columnId = leafRow.original[selectedColumn[0]];
                //                 const variance = leafRow.original[selectedValue[0]];
                //                 const checkValue = isNaN(props.row.leafRows[0].original[selectedValue[0]])
                //                 if (checkValue) {
                //                     const count = variance ? 1 : 0
                //                     return `column_${columnId}` === props.column.id ? sum + (count ?? 0) : sum;
                //                 } else {
                //                     return `column_${columnId}` === props.column.id ? sum + (variance ?? 0) : sum;
                //                 }
                //             }, 0) ?? 0;
                //             return
                //             // return <div>{sumOfVariance}</div>
                //         },
                //         cell: (props: any) => {
                //             const varianceValues = props.row.original[selectedColumn[0]];
                //             const value = parseFloat(props.row.original[selectedValue[0]]).toFixed(2)
                //             return <div>{`column_${varianceValues}` === props.column.id ? value : ''}</div>
                //         },
                //     }))
                // : [])
                ? selectedColumn.map(i =>
                    data.map(item => item[i])
                        .map(columnName => (
                            {
                                header: `${String(columnName)}`,
                                id: `column_${String(columnName)}`,
                                accessorKey: `column_${String(columnName)}`,

                            }
                        ))

                )
                : [])

        ];
    }, [data, selectedRow, selectedColumn, selectedValue])

    //#endregion
    const table = useReactTable({
        columns: dynamicColumns,
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
        setSelectedColumnDrop([item.name]);
        setSelectedColumn([item.name]);
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
                    <DroppableArea onDrop={handleRow} title='ROW' droppedItems={selectedRowDrop} />
                    <DroppableArea onDrop={handleColumn} title='COLUMNS' droppedItems={selectedColumnDrop} />
                    <DroppableArea onDrop={handleValue} title='VALUES' droppedItems={selectedValueDrop} />
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

export default CustomizeDynamicTable;

