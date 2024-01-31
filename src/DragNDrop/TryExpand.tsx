import React from 'react'


import {
    GroupingState,
    useReactTable,
    getFilteredRowModel,
    getCoreRowModel,
    getGroupedRowModel,
    getExpandedRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table'

const TryExpand = ({ data }: any) => {


    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [


            {
                accessorKey: 'category',
                header: 'CATEGORY',
                aggregationFn: 'count',
                aggregatedCell: ({ getValue }) =>
                    <div>{getValue<number>().toLocaleString()}</div>,
                cell: ({ getValue }) =>
                    <div>{getValue<number>().toLocaleString()}</div>,
            },
            {
                accessorKey: 'value',
                id: 'value',
                header: () => <span>VALUE</span>,
                cell: ({ getValue }) =>
                    <div>{getValue<number>().toLocaleString()}</div>,
            },

            {
                accessorKey: 'date',
                header: () => 'DATE',
                aggregationFn: 'sum',
                cell: ({ getValue }) =>
                    <div>{getValue<number>().toLocaleString()}</div>,
            },
        ],
        []
    )

    //   const [data, setData] = React.useState(() => makeData(100000))
    //   const refreshData = () => setData(() => makeData(100000))

    const [grouping, setGrouping] = React.useState<GroupingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            grouping,
        },
        onGroupingChange: setGrouping,
        getExpandedRowModel: getExpandedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        // debugTable: true,
    })

    console.log(table.getAllFlatColumns())
    return (
        <div className="p-2">
            <div className="h-2" />
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {header.column.getCanGroup() ? (
                                                    // If the header can be grouped, let's add a toggle
                                                    <button
                                                        {...{
                                                            onClick: header.column.getToggleGroupingHandler(),
                                                            style: {
                                                                cursor: 'pointer',
                                                            },
                                                        }}
                                                    >
                                                        {header.column.getIsGrouped()
                                                            ? `🛑(${header.column.getGroupedIndex()}) `
                                                            : `👊 `}
                                                    </button>
                                                ) : null}{' '}
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </div>
                                        )}
                                    </th>
                                )
                            })}
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
    )
}

export default TryExpand