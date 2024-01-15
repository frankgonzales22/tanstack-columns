import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ChangeEvent, useMemo, useState } from "react";

interface TableData {
    category: string;
    value: number;
    date: string;
}

type DynamicColumn = {
    header: string;
    accessorKey: string;
}

interface DynamicDataProps {
    data: any[]
}

interface DropDownProps {
    selectedValue: string,
    handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    options: any[]
}

const DropDown = ({ selectedValue, handleSelectChange, options }: DropDownProps) => {
    return (
        <div>
            <label htmlFor="dropdown">Select an option:</label>
            <select id="dropdown" value={selectedValue} onChange={handleSelectChange}>
                <option value="">-- Select --</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {
                selectedValue && (
                    <p><strong>{selectedValue}</strong></p>
                )
            }
        </div>
    )
}




const CustomizeDynamicTable = ({ data }: DynamicDataProps) => {

    // State to track the selected value
    const [selectedValue, setSelectedValue] = useState<string>('date');

    // Options for the dropdown
    const options = ['date', 'value', 'category'];

    // Event handler for selecting an option
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };


    // const tableData = useMemo(() => {
    //     // Extract unique categories and dates from the data
    //     const uniqueCategories = Array.from(new Set(data?.map((item) => item.category)));
    //     const uniqueDates = Array.from(new Set(data?.map((item) => item.date)));

    //     // Create rows dynamically based on categories and dates
    //     const rows: Record<string, any>[]  =
    //          uniqueDates.map((date) => {
    //             const row: Record<string, any> = { date };
    //             uniqueCategories.forEach((category) => {
    //                 const sum = data
    //                     .filter((d) => d.category === category && d.date === date)
    //                     .reduce((acc, item) => acc + item.value, 0);
    //                 row[category] = sum !== 0 ? sum : ''
    //             })
    //             return row
    //         })

    // }, [data])



    const columns = useMemo(() => {
        // Extract unique categories and dates from the data
        const uniqueCategories = Array.from(new Set(data?.map((item) => item.category)));
        const uniqueDates = Array.from(new Set(data?.map((item) => item.date)));

        // Create columns dynamically based on categories and dates
        const dynamicColumns: DynamicColumn[] = [
            {
                header: selectedValue.toString() as string,
                accessorKey: selectedValue.toString() as string,
            },
            ...uniqueCategories.map((category) => ({
                header: category,
                accessorKey: category,
            })),
        ]


        return dynamicColumns as ColumnDef<any>[]; // Cast to less specific type
    }, [data, selectedValue])

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    console.log(table.getHeaderGroups())

    console.log(table)
    return (
        <>
            <div>
                <table style={{ border: '1px solid black', margin: '20px' }}>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
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
                        {table.getRowModel().rows.map(row => (
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
            <DropDown
                selectedValue={selectedValue}
                options={options}
                handleSelectChange={(e) => handleSelectChange(e)} />
        </>
    )
}

export default CustomizeDynamicTable