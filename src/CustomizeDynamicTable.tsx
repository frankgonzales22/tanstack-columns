import { Box, HStack } from "@chakra-ui/react";
import { ColumnDef, ExpandedState, GroupingState, flexRender, getCoreRowModel, getExpandedRowModel, getGroupedRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import DroppableArea from "./DragNDrop/DroppableArea";
import DraggableItem from "./DragNDrop/DraggableItem";

type DynamicColumn = {
    header: string;
    accessorKey: string;
};

interface DynamicDataProps {
    data: any[];
}

const CustomizeDynamicTable = ({ data }: DynamicDataProps) => {
    const [selectedValue, setSelectedValue] = useState<any[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any[]>([]);
    const [grouping, setGrouping] = useState<GroupingState>([]);
    const [expanded, setExpand] = useState<ExpandedState>({});

    useEffect(() => {
        setGrouping(selectedRow)
    }, [selectedRow])

    const sumProperty = (data: any[], propertyName: string) => {
        return data.reduce((acc, item) => acc + parseFloat(item[propertyName] || 0), 0);
    };

    const tableData = useMemo(() => {
        // Extract unique values for selected column and selected value
        const uniqueSelectedColumn = Array.from(new Set(data.map((item) => item[selectedColumn[0]])));

        // Create rows dynamically based on selected column and selected value
        const rows: Record<string, any>[] = [];

        data.forEach((item) => {
            const rowKey = item[selectedRow[0]];
            const existingRow = rows.find((row) => row[selectedRow[0]] === rowKey) ?? { [selectedRow[0]]: rowKey };

            if (!rows.some((row) => row[selectedRow[0]] === rowKey)) {
                uniqueSelectedColumn.forEach((category) => {
                    existingRow[category] = '';
                });
                rows.push(existingRow);
            }

            const category = item[selectedColumn[0]];
            const sum = sumProperty(data.filter((d) => d[selectedColumn[0]] === category && d[selectedRow[0]] === rowKey), selectedValue[0]);
            existingRow[`column_${String(category)}`] = !isNaN(sum) ? sum : ''; // Use the same naming convention
        });

        return rows;
    }, [data, selectedRow, selectedColumn, selectedValue]);
    const dynamicColumns: ColumnDef<any>[] = useMemo(() => {
        return [
            ...(selectedRow[0] !== '' && selectedRow.length > 0
                ? selectedRow.map((item) => ({
                    header: item?.toString(),
                    accessorKey: item?.toString(),
                }))
                : []),
            ...(selectedColumn[0] !== '' && selectedColumn.length > 0
                ? Array.from(new Set(data.map((item) => item[selectedColumn[0]]))).map((value) => ({
                    header: String(value),
                    accessorKey: `column_${String(value)}`,
                }))
                : []),
        ];
    }, [data, selectedRow, selectedColumn]);

    const table = useReactTable({
        columns: dynamicColumns,
        data: tableData,
        state: {
            grouping,
            expanded
        },
        onGroupingChange: setGrouping,
        onExpandedChange: setExpand,
        getExpandedRowModel: getExpandedRowModel(),

        getCoreRowModel: getCoreRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const [selectedRowDrop, setSelectedRowDrop] = useState<string[]>([]);
    const [selectedColumnDrop, setSelectedColumnDrop] = useState<string[]>([]);
    const [selectedValueDrop, setSelectedValueDrop] = useState<string[]>([]);

    const handleRow = (item: { name: string }) => {
        setSelectedRowDrop([...selectedRowDrop, item.name]);
        setSelectedRow([...selectedRow, item.name]);
        // setSelectedRowDrop([ item.name]);
        // setSelectedRow([ item.name]);
    };

    const handleColumn = (item: { name: string }) => {
        setSelectedColumnDrop([item.name]);
        setSelectedColumn([item.name]);
    };

    const handleValue = (item: { name: string }) => {
        setSelectedValueDrop([item.name]);
        setSelectedValue([item.name]);
    };

    console.log('grouping', table.getState().grouping)
    console.log('expanded', table.getState().expanded)
    console.log('flat columns', table.getAllFlatColumns())
    // console.log('data', table.getRowModel().rows)
    return (
        <>
            <HStack>
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
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {/* {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} style={{ padding: '10px' }}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            */}
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td
                                            {...{
                                                key: cell.id,
                                            }}
                                        >
                                            {cell.getIsGrouped() ? (
                                                <>
                                                    <>
                                                        <button
                                                            onClick={row.getToggleExpandedHandler()}
                                                            style={{
                                                                fontWeight: "bold",
                                                                cursor: row.getCanExpand()
                                                                    ? "pointer"
                                                                    : "normal",
                                                            }}
                                                        >
                                                            (
                                                            <>
                                                                {row.getIsExpanded()
                                                                    ? "🡫"
                                                                    : "🡪"}{" "}
                                                            </>
                                                            )
                                                            {/* {row.getIsExpanded() ? '🡫' : '🡪'}{' '} */}
                                                        </button>
                                                        {/* Always render the flexRender part outside the conditional block */}
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}{" "}
                                                    </>
                                                </>
                                            ) : cell.getIsAggregated() ? (
                                                // If the cell is aggregated, use the Aggregated
                                                // renderer for cell
                                                flexRender(
                                                    cell.column.columnDef
                                                        .aggregatedCell ??
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
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CustomizeDynamicTable;

// {row.getVisibleCells().map((cell) => {
//     return (
//         <td
//             {...{
//                 key: cell.id,
//             }}
//         >
//             {cell.getIsGrouped() ? (
//                 <>
//                     <>
//                         <button
//                             onClick={row.getToggleExpandedHandler()}
//                             style={{
//                                 fontWeight: "bold",
//                                 cursor: row.getCanExpand()
//                                     ? "pointer"
//                                     : "normal",
//                             }}
//                         >
//                             (
//                             <>
//                                 {row.getIsExpanded()
//                                     ? "🡫"
//                                     : "🡪"}{" "}
//                             </>
//                             )
//                             {/* {row.getIsExpanded() ? '🡫' : '🡪'}{' '} */}
//                         </button>
//                         {/* Always render the flexRender part outside the conditional block */}
//                         {flexRender(
//                             cell.column.columnDef.cell,
//                             cell.getContext()
//                         )}{" "}
//                     </>
//                 </>
//             ) : cell.getIsAggregated() ? (
//                 // If the cell is aggregated, use the Aggregated
//                 // renderer for cell
//                 flexRender(
//                     cell.column.columnDef
//                         .aggregatedCell ??
//                     cell.column.columnDef.cell,
//                     cell.getContext()
//                 )
//             ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
//                 // Otherwise, just render the regular cell
//                 flexRender(
//                     cell.column.columnDef.cell,
//                     cell.getContext()
//                 )
//             )}
//         </td>
//     );
// })}