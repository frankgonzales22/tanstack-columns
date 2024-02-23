import React from 'react';
import { Table } from 'antd';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const { Column } = Table;

const dataSource = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        children: ['adf']
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
];

const summaryCompColumns: ColumnDef<any>[] = [
    {
        id: 'name',
        accessorKey: 'name',
        header: 'Name',
        cell: ({ getValue }) => getValue(),
    },
    {
        id: 'age',
        accessorKey: 'age',
        header: 'Age',
        cell: ({ getValue }) => getValue(),
    }
];

const Awit = () => {
    const table = useReactTable({
        data: dataSource,
        columns: summaryCompColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Table dataSource={dataSource} pagination={false}>
            {table.getHeaderGroups().map(headerGroup => (
                <Table.ColumnGroup key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <Column
                            key={header.id}
                            title={header.column.columnDef.header?.toString()}
                            dataIndex={header.column.columnDef.id}
                            render={(text, record) => (
                                <span>{text}</span> // Render the cell content directly
                            )}
                        />
                    ))}
                </Table.ColumnGroup>
            ))}
        </Table>
    );
};

export default Awit;
