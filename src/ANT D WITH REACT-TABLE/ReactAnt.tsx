import * as React from 'react'


import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const defaultData: any[] = [
    {

        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,

    },
    {
  
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,

    },
    {

        firstName: 'joe',
        lastName: 'dirte',
        age: 45,

    },
] 




const summaryCompColumns: ColumnDef<any>[] = [
    {
        accessorKey : 'firstName',
        id : 'firstName',
        header : 'FIRST NAME',
        cell: info => info.getValue(),
    },
    {
        accessorKey : 'lastName',
        id : 'lastName',
        header : 'LAST NAME',
        cell: info => info.getValue(),
    },
    {
        accessorKey : 'age',
        id : 'age',
        header : 'AGE',
        cell: info => info.getValue(),
    },
];
const dataWithKeys = defaultData.map((item, index) => ({
    ...item,
    key: index.toString(), // Assuming index can serve as a unique key
}));
function ReactAnt() {



    const table = useReactTable({
        data : defaultData,
        columns : summaryCompColumns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Table dataSource={defaultData} pagination={false} rowKey={'firstName'}>
        {table.getHeaderGroups().map((headerGroup) => (
            <Table.ColumnGroup key={headerGroup.id}>
                {headerGroup.headers.map((header , index) => (
                    <Column
                        key={index}
                        title={header.column.columnDef.header?.toString()}
                        dataIndex={header.column.columnDef.id}
                            // render={(text, record, index) => (
                            //     <span key={index}>{JSON.stringify(text)}</span> // Render the cell content directly
                            // )}
                    />
                ))}
            </Table.ColumnGroup>
        ))}
    </Table>
        // <div className="p-2">
        //     <table>
        //         <thead>
        //             {table.getHeaderGroups().map(headerGroup => (
        //                 <tr key={headerGroup.id}>
        //                     {headerGroup.headers.map(header => (
        //                         <th key={header.id}>
        //                             {header.isPlaceholder
        //                                 ? null
        //                                 : flexRender(
        //                                     header.column.columnDef.header,
        //                                     header.getContext()
        //                                 )}
        //                         </th>
        //                     ))}
        //                 </tr>
        //             ))}
        //         </thead>
        //         <tbody>
        //             {table.getRowModel().rows.map(row => (
        //                 <tr key={row.id}>
        //                     {row.getVisibleCells().map(cell => (
        //                         <td key={cell.id}>
        //                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
        //                         </td>
        //                     ))}
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        //     <div className="h-4" />

        // </div>
    )
}

export default ReactAnt