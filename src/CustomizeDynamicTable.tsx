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
    selectedItem: string | string[],
    handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    options: any[]
}

const DropDown = ({ selectedItem, handleSelectChange, options }: DropDownProps) => {


    return (
        <div>
            <label htmlFor="dropdown">Select an option:</label>
            <select id="dropdown" value={selectedItem} onChange={handleSelectChange} multiple={true}>
                <option value=''>-- Select --</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {
                selectedItem && (
                    <p><strong>{selectedItem}</strong></p>
                )
            }
        </div>
    )
}


const CustomizeDynamicTable = ({ data }: DynamicDataProps) => {

    // State to track the selected value
    const [selectedValue, setSelectedValue] = useState<any[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any[]>([]);

    const uniqueProperties = Array.from(
        new Set(data.flatMap((item) => Object.keys(item)))
    );

    console.log(uniqueProperties)
    // Options for the dropdown
    const options = uniqueProperties
    const options2 = uniqueProperties

    // console.log(Array.from(new Set(data.map(item) => item)))
    // Event handler for selecting an option
    const handleDropDown = (event: ChangeEvent<HTMLSelectElement>, setItem: (event: any) => void) => {
        setItem([event.target.value])
    }

    // const handleSelectRow = (event: ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedRow([event.target.value]);
    // };
    // const handleSelectColumn = (event: ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedColumn([event.target.value]);
    // };
    // const handleSelecteValue = (event: ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedValue([event.target.value]);
    // };

    const sumProperty = (data: any[], propertyName: string) => {
        return data.reduce((acc, item) => acc + parseFloat(item[propertyName] || 0), 0);
    };

    const tableData = useMemo(() => {
        // Extract unique values for selected column and selected value
        const uniqueSelectedColumn = Array.from(new Set(data.map((item) => item[selectedColumn[0]])));
        const uniqueSelectedRow = Array.from(new Set(data.map((item) => item[selectedRow[0]])));

        // Create rows dynamically based on selected column and selected value
        const rows: Record<string, any>[] = uniqueSelectedRow.map((date) => {
            const row: Record<string, any> = { [selectedRow[0]]: date };

            uniqueSelectedColumn.forEach((category) => {
                const categoryData = data.filter((d) => d[selectedColumn[0]] === category && d[selectedRow[0]] === date);

                console.log('categoryData', categoryData); // Log the data used for summing

                const sum = sumProperty(categoryData, selectedValue[0]); // Change 'value' to the desired property

                console.log('sum', sum); // Log the final sum

                row[category] = !isNaN(sum) ? sum : ''; // Check for NaN before assigning to row
            });

            console.log('row', row); // Log the final row
            return row;
        });

        console.log('rowssss', rows);
        return rows;
    }, [data, selectedRow, selectedColumn, selectedValue]);

    // console.log(tableData)




    const columns = useMemo(() => {

        // Extract unique categories and dates from the data
        const uniqueCategories = Array.from(new Set(data?.map((item) => item[selectedColumn[0]])))
        console.log('unik kateg', uniqueCategories)
        // Create columns dynamically based on categories and dates
        const dynamicColumns: DynamicColumn[] = [

            ...(selectedRow[0] !== '' && selectedRow.length > 0
                ? selectedRow.map((item) => ({
                    header: item?.toString(),
                    accessorKey: item?.toString(),
                }))
                : [])
            ,
            ...(selectedColumn[0] !== '' && selectedColumn.length > 0
                ? uniqueCategories.map((category) => ({
                    header: category?.toString(),
                    accessorKey: category?.toString(),
                }))
                : []),
        ]

        return dynamicColumns as ColumnDef<any>[]

    }, [data, selectedRow, selectedColumn])

    const table = useReactTable({
        columns,
        data: tableData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })


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
            <strong>FOR ROW</strong>
            <DropDown
                selectedItem={selectedRow}
                options={options}
                handleSelectChange={(e) => handleDropDown(e, setSelectedRow)}
            />
            <strong>FOR COLUMN</strong>
            <DropDown
                selectedItem={selectedColumn}
                options={options}
                handleSelectChange={(e) => handleDropDown(e, setSelectedColumn)}
            />
            <strong>FOR VALUE</strong>
            <DropDown
                selectedItem={selectedValue}
                options={options}
                handleSelectChange={(e) => handleDropDown(e, setSelectedValue)}
            />
        </>
    )
}

export default CustomizeDynamicTable