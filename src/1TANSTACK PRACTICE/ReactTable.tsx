import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';

const firstColumnData = [
  { id: 1, name: 'Group 1' },
  { id: 2, name: 'Group 2' },
  { id: 3, name: 'Group 3' },
];

const otherColumnsData = [
  { groupId: 1, value1: 'A1', value2: 'B1' },
  { groupId: 1, value1: 'A2', value2: 'B2' },
  { groupId: 2, value1: 'A3', value2: 'B3' },
  { groupId: 2, value1: 'A4', value2: 'B4' },
  { groupId: 3, value1: 'A5', value2: 'B5' },
];

const ReactTable = () => {
  // Combine the data
  const combinedData = firstColumnData.map(group => ({
    ...group,
    values: otherColumnsData.filter(data => data.groupId === group.id),
  }))

  // Define columns
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: 'Group Name',
        accessorKey: 'name',
      },
      {
        header: 'Values',
        accessorKey: 'values',
        cell: info => (
          <div>
            {info.row.original.values.map((value : any, idx : any) => (
              <div key={idx}>
                Value 1: {value.value1}, Value 2: {value.value2}
              </div>
            ))}
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: combinedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  console.log('tabs',table.getRowModel())
  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default ReactTable;
