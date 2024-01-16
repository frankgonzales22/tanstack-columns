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
    selectedValue: string | string[],
    handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    options: any[]
}

const DropDown = ({ selectedValue, handleSelectChange, options }: DropDownProps) => {
    return (
        <div>
            <label htmlFor="dropdown">Select an option:</label>
            <select id="dropdown" value={selectedValue} onChange={handleSelectChange} multiple={true}>
                <option value=''>-- Select --</option>
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
    const [selectedValue, setSelectedValue] = useState<any[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<any[]>([]);

    // Options for the dropdown
    const options = ['date', 'value', 'category'];
    const options2 = ['date', 'value', 'category'];

    // Event handler for selecting an option
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue([event.target.value]);
    };
    const handleSelectChange2 = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedColumn([event.target.value]);
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
        const uniqueCategories = Array.from(new Set(data?.map((item) => item[selectedColumn[0]])))
        const uniqueDates = Array.from(new Set(data?.map((item) => item.date)))

        // Create columns dynamically based on categories and dates
        const dynamicColumns: DynamicColumn[] =  [
            // ...selectedValue.map((item, index) => ({
            //     header: item?.toString(),
            //     accessorKey: item?.toString(),
            // }))
            ...(selectedValue.length > 0 
                ? selectedValue.map((item) => ({
                    header: item?.toString(),
                    accessorKey: item?.toString(),
                }))
                : [])
            
            ,
            ...(selectedColumn.length > 0
                ? uniqueCategories.map((category) => ({
                    header: category?.toString(),
                    accessorKey: category?.toString(),
                  }))
                : []),
        ]




        return dynamicColumns as ColumnDef<any>[]
        
    }, [data, selectedValue, selectedColumn])

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    console.log(table.getHeaderGroups())

    console.log(selectedColumn)
    return (
        <>
            <div>
                <table style={{ border: '1px solid black', margin: '20px' }}>
                    <thead>
                        { table.getHeaderGroups().map(headerGroup => (
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
                        ))
                     
                    }
                    </thead>
                    <tbody >
                        { table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} style={{ padding: '10px' }}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                  
                    }
                    </tbody>
                </table>
            </div>
            <DropDown
                selectedValue={selectedValue ? selectedValue : ''}
                options={options}
                handleSelectChange={(e) => handleSelectChange(e)} />
            <DropDown
                selectedValue={selectedColumn}
                options={options2}
                handleSelectChange={(e) => handleSelectChange2(e)} />
        </>
    )
}

export default CustomizeDynamicTable