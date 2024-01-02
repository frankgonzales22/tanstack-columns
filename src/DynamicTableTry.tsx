import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";



interface TableData {
    category: string;
    value: number;
    date: string;
}

type DynamicColumn = {
    header: string;
    accessorKey: string;
}


// const DynamicTable = (data: TableData[]) => {
const DynamicTable: React.FC<{ data: TableData[] }> = ({ data }) => {
    const [transposed, setTransposed] = useState(false);

    const tableData = useMemo(() => {
        // Extract unique categories and dates from the data
        const uniqueCategories = Array.from(new Set(data.map((item) => item.category)));
        const uniqueDates = Array.from(new Set(data.map((item) => item.date)));

        // Create rows dynamically based on categories and dates
        const rows: Record<string, any>[] = transposed
            ? uniqueDates.map((date) => {
                const row: Record<string, any> = { date };
                uniqueCategories.forEach((category) => {
                    const sum = data
                        .filter((d) => d.category === category && d.date === date)
                        .reduce((acc, item) => acc + item.value, 0);
                    row[category] = sum !== 0 ? sum : '';
                });
                return row;
            })
            : uniqueCategories.map((category) => {
                const row: Record<string, any> = { category };
                uniqueDates.forEach((date) => {
                    const sum = data
                        .filter((d) => d.category === category && d.date === date)
                        .reduce((acc, item) => acc + item.value, 0);
                    row[date] = sum !== 0 ? sum : '';
                });
                return row;
            })

        return rows;
    }, [data, transposed])

    const columns = useMemo(() => {
        // Extract unique categories and dates from the data
        const uniqueCategories = Array.from(new Set(data.map((item) => item.category)));
        const uniqueDates = Array.from(new Set(data.map((item) => item.date)));
        console.log('uniqueCateg', uniqueCategories)
        // Create columns dynamically based on categories and dates
        const dynamicColumns: DynamicColumn[] = transposed
            ? [
                {
                    header: 'Date',
                    accessorKey: 'date',
                },
                ...uniqueCategories.map((category) => ({
                    header: category,
                    accessorKey: category,
                })),
            ]
            : [
                {
                    header: 'Category',
                    accessorKey: 'category',
                },
                ...(uniqueDates.map((date) => ({
                    header: date,
                    accessorKey: date,
                })) as DynamicColumn[]),
            ];

        return dynamicColumns as ColumnDef<any>[]; // Cast to less specific type
    }, [data, transposed])

    const tableInstance = useReactTable({
        columns,
        data: tableData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(), //order doesn't matter anymore!
        // etc.
    });



    return (
        <div>
            <button onClick={() => setTransposed(!transposed)}>
                Toggle View (Current: {transposed ? 'Transposed' : 'Original'})
            </button>
            <table style={{ border: '1px solid black', margin: '20px' }}>
                <thead>
                    {/* {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{ borderBottom: '1px solid black' }}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ padding: '10px' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))} */}
                    {tableInstance.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} style={{ padding: '10px' }}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody >
                    {/* {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: '10px' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })} */}
                    {tableInstance.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} style={{ padding: '10px' }}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const DynamicTableTry: React.FC = () => {
    const yourData: TableData[] = [
        { category: 'A', value: 10, date: '2023-01-01' },
        { category: 'A', value: 10, date: '2023-01-01' },
        { category: 'B', value: 20, date: '2023-01-02' },
        { category: 'C', value: 60, date: '2023-01-01' },
        { category: 'C', value: 50, date: '2023-01-04' },
        { category: 'C', value: 50, date: '2023-01-04' },
        { category: 'D', value: 910, date: '2023-01-01' },
        { category: 'C', value: 330, date: '2023-01-03' },
    ];

    return (
        <div>
            <h1>Dynamic Table Example</h1>
            <DynamicTable data={yourData} />
        </div>
    );
};

export default DynamicTableTry;