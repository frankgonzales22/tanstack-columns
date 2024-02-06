import { Box, HStack } from "@chakra-ui/react";
import { ColumnDef, ColumnOrderState, ExpandedState, GroupingState, flexRender, getCoreRowModel, getExpandedRowModel, getGroupedRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
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
    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

    useEffect(() => {
        // setGrouping([...selectedRow])
        setGrouping(['territoryCode', 'regionCode'])
    }, [selectedRow])

    const sumProperty = (data: any[], propertyName: string) => {
        return data.reduce((acc, item) => acc + parseFloat(item[propertyName] || 0), 0);
    };

    const tableData = useMemo(() => {
        // Extract unique values for selected column and selected value
        const uniqueSelectedColumn = Array.from(new Set(data.map((item) => item[selectedColumn[0]])))

        // Create rows dynamically based on selected column and selected value
        const rows: Record<string, any>[] = [];

        data.forEach((item) => {

            const rowKey = item[selectedRow[0]];
            const existingRow = rows.find((row) => row[selectedRow[0]] === rowKey) ?? { [selectedRow[0]]: rowKey };
            // console.log('each' ,existingRow)
            if (!rows.some((row) => row[selectedRow[0]] === rowKey)) {
                uniqueSelectedColumn.forEach((category) => {
                    existingRow[category] = '';
                });
                rows.push(existingRow);
            }

            const category = item[selectedColumn[0]];
            const sum = sumProperty(data.filter((d) => d[selectedColumn[0]] === category && d[selectedRow[0]] === rowKey), selectedValue[0]);
            existingRow[`column_${String(category)}`] = !isNaN(sum) ? sum : ''; // Use the same naming convention
        })

        return rows;
    }, [data, selectedRow, selectedColumn, selectedValue])

    // const dynamicColumns = useMemo(() => {

    //     return [
    //         ...(selectedRow[0] !== '' && selectedRow.length > 0
    //             ? selectedRow.map((item) => ({
    //                 header: item?.toString(),
    //                 accessorKey: item?.toString(),
    //                 // aggregationFn: '',
    //             }))
    //             : []),
    //         ...(selectedColumn[0] !== '' && selectedColumn.length > 0
    //             ? Array.from(new Set(data.map((item) => item[selectedColumn[0]]))).map((value) => ({

    //                 header: `${String(value)}`,
    //                 id: `column_${String(value)}`,
    //                 // accessorKey: `column_${String(value)}`,
    //                 accessorKey: `column_${String(value)}`,
    //                 // cell: ({ cell, row, value }: any) => {
    //                 //     // Customize the rendering of regular cells
    //                 //     return value
    //                 // },
    //                 aggregationFn: 'myCustomAggregation',
    //                 // aggregationFn: 'sum',
    //                 aggregatedCell: ({ getValue } : any) =>
    //                     <div
    //                         style={{    
    //                             textAlign: "right"
    //                         }}
    //                     > {getValue()} </div>,
    //             }))
    //             : []),
    //     ] as ColumnDef<any>[]
    // }, [data, selectedRow, selectedColumn])
    // const dynamicColumns: any[] = useMemo(() => {
    //     return [
    //         ...(selectedRow[0] !== '' && selectedRow.length > 0
    //             ? selectedRow.map((item) => ({
    //                 header: item?.toString(),
    //                 accessorKey: item?.toString(),
    //                 // aggregationFn : 'sum'
    //                 aggregationFn: 'sum',
    //                 // aggregatedCell: ({ getValue }: any) =>
    //                 //     <div
    //                 //         style={{
    //                 //             textAlign: "right"
    //                 //         }}
    //                 //     > {getValue()} </div>,
    //             }))
    //             : []),
    //         ...(selectedColumn[0] !== '' && selectedColumn.length > 0
    //             ? Array.from(new Set(data.map((item) => item[selectedColumn[0]]))).map((value) => ({
    //                 // header: `${String(value)}`,
    //                 // id: `column_${String(value)}`,
    //                 // accessorKey: `column_${String(value)}`,
    //                 // aggregationFn: 'sum'
    //                 header: value?.toString(),
    //                 accessorKey: value?.toString(),
    //                 aggregationFn: 'sum'
    //             }))
    //             : []),
    //     ];
    // }, [data, selectedRow, selectedColumn]);

    const dynamicColumns: any[] = useMemo(() => {
        // const rowKey = item[selectedRow[0]];
        // const category = item[selectedColumn[0]];
        // const sum = data.filter((d) => d[selectedColumn[0]] === category && d[selectedRow[0]] === rowKey)

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
                    // aggregatedCell : (props : any) => {
                    //     const sumOfVariance = props.row?.leafRows?.reduce((sum : any, leafRow : any)  => {
                    //         const variance = leafRow?.original?.[selectedValue[0]];
                    //         return sum + (variance ?? 0); // If variance is null or undefined, treat it as 0
                    //       }, 0) ?? 0; 
                    //     return  <div>{sumOfVariance}</div>
                    // },
                    // cell : 
                    // (props : any) => {
                    //     const varianceValues = props.row.original[selectedValue[0]] ;

                    //     return  <div>{varianceValues}</div>
                    // },
                    aggregatedCell: (props: any) => {
                        // const sumOfVariance = props.row?.leafRows?.reduce((sum : any, leafRow : any)  => {
                        //     const variance = leafRow?.original?.[selectedValue[0]];
                        //     return sum + (variance ?? 0); // If variance is null or undefined, treat it as 0
                        //   }, 0) ?? 0; 
                          const sumOfVariance = props.row?.leafRows?.reduce((sum: any, leafRow: any) => {
                            const columnValue = leafRow.original[selectedColumn[0]];
                            const variance = leafRow.original[selectedValue[0]];
                            
                            return `column_${columnValue}` === props.column.id ? sum + (variance ?? 0) : sum;
                          }, 0) ?? 0;

                          const getId = props.row?.leafRows.map(( i : any) => i.original[selectedColumn[0]])
                        return <div>{sumOfVariance}</div>
                        //  
                        return console.log(props.row.leafRows[0].original[selectedColumn[0]])
                        // return <div>

                        //     {/* {props.column.id === `column_${props.row.original[selectedColumn[0]]}` ? sumOfVariance : '0'} */}
                        //     {/* <br />
                        //     row id : {props.row.id} */}
                        //     <br />
                        //     col id : {props.column.id }
                        // </div>
                        return console.log(props.row?.leafRows[0].original[selectedColumn[0]])
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

    // console.log('value', data.map(item => item[selectedColumn[0]]).map(value => `column_${String(value)}`))

    const table = useReactTable({
        columns: dynamicColumns,
        // data : tableData ,
        data,
        // aggregationFns: {
        //     myCustomAggregation: (columnId, leafRows, childRows) => {
        //         // console.log(`column id : ${columnId} ====  leafrows : ${leafRows} ===== childrows : ${childRows}`)
        //         // console.log(leafRows.map(i => i))
        //         // return leafRows
        //         // .map(i => i.original[selectedValue.toString()])
        //         // .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        //         return console.log('custom ag',childRows)

        //     },
        // },

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
        setSelectedRow([...selectedRow, item.name]);
        // setColumnOrder([item.name, ...selectedRow]);
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

    // console.log('expanded', table.getState().expanded)
    // console.log('flat columns', table.getAllFlatColumns())
    // console.log('rowss', table.getRowModel())

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

