import { Box, HStack } from "@chakra-ui/react";
import { ColumnDef, ColumnOrderState, ExpandedState, GroupingState, flexRender, getCoreRowModel, getExpandedRowModel, getGroupedRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import DroppableArea from "./DragNDrop/DroppableArea";
import DraggableItem from "./DragNDrop/DraggableItem";

interface DynamicDataProps {
    data: any[];
}

const CustomizeDynamicTable = ({ data }: DynamicDataProps) => {
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


    const dynamicColumns: any[] = useMemo(() => {
        return [
            ...(selectedRow[0] !== '' && selectedRow.length > 0
                ? selectedRow.map((item) => ({
                    header: item?.toString(),
                    accessorKey: item?.toString(),
                }))
                : []),
            ...(selectedColumn[0] !== '' && selectedColumn.length > 0
                ? Array.from(new Set(data.map((item) => item[selectedColumn[0]]))).map((columnName) =>
                ({
                    header: `${String(columnName)}`,
                    id: `column_${String(columnName)}`,
                    accessorKey: `column_${String(columnName)}`,
                    aggregatedCell: (props: any) => {
                          const sumOfVariance = props.row?.leafRows?.reduce((sum: any, leafRow: any) => {
                            const columnId = leafRow.original[selectedColumn[0]];
                            const variance = leafRow.original[selectedValue[0]];
                            const checkValue = isNaN(props.row.leafRows[0].original[selectedValue[0]])

                            if(checkValue){
                                const count = variance ? 1 : 0
                                return `column_${columnId}` === props.column.id ? sum + (count ?? 0) : sum;
                            }else{
                                return `column_${columnId}` === props.column.id ? sum + (variance ?? 0) : sum;
                            }

                            
                          }, 0) ?? 0;
                      
                         const item =  props.row.leafRows.map((item : any) => item.original[selectedValue[0]])
                        return <div>{sumOfVariance}</div>

                    },
                    cell:
                        (props: any) => {
                            const varianceValues = props.row.original[selectedColumn[0]];
                            const value =  parseFloat(props.row.original[selectedValue[0]]);

                            return <div>{`column_${varianceValues}` === props.column.id ? value.toFixed(2) : ''}</div>
                        },
                }))
                : []),
        ];
    }, [data, selectedRow, selectedColumn, selectedValue]);

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
                                                            ({row.subRows.length})
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
};

export default CustomizeDynamicTable;

