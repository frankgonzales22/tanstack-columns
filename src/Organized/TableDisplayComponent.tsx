// TableDisplayComponent.tsx
import { flexRender } from '@tanstack/react-table';
import React from 'react';

interface TableDisplayComponentProps {
    table: any; // Type it accordingly with the actual table object type
    grouping : any[]
   
}

const TableDisplayComponent: React.FC<TableDisplayComponentProps> = ({ table, grouping }) => {
    return (
        <div style={{ height: '100%', overflow: 'auto' }}>
            <table style={{ border: '1px solid black', margin: '20px' }}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup: any) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header: any) => (
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
                    {table.getRowModel().rows.map((row: any) => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell: any) => {
                                    return (
                                        <td
                                            key={cell.id}
                                            style={{
                                                background: cell.getIsGrouped()
                                                    ? '#0aff0082'
                                                    : cell.getIsAggregated()
                                                        ? '#ffa50078'
                                                        : cell.getIsPlaceholder()
                                                            ? '#ff000042'
                                                            : 'white',
                                            }}
                                        >
                                            {cell.getIsGrouped() ? (
                                                <>
                                                    {cell.column.id !== (grouping[grouping.length - 1]) ?
                                                        <button
                                                            onClick={row.getToggleExpandedHandler()}
                                                            style={{
                                                                cursor: row.getCanExpand()
                                                                    ? 'pointer'
                                                                    : 'normal',
                                                            }}
                                                        >
                                                            {row.getIsExpanded() ? '👇' : '👉'}{' '}
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}{' '}
                                                        </button>
                                                        :
                                                        <button>
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}{' '}
                                                        </button>
                                                    }
                                                </>
                                            ) : cell.getIsAggregated() ? (
                                                flexRender(
                                                    cell.column.columnDef.aggregatedCell ??
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            ) : cell.getIsPlaceholder() ? null : (
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
    );
}

export default TableDisplayComponent;
