import { Box, HStack } from "@chakra-ui/react";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ChangeEvent, useMemo, useState } from "react";
import DroppableArea from "./DragNDrop/DroppableArea";
import DraggableItem from "./DragNDrop/DraggableItem";

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
            {selectedItem && (<p><strong>{selectedItem}</strong></p>)}
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
    const sumProperty = (data: any[], propertyName: string) => {
        return data.reduce((acc, item) => acc + parseFloat(item[propertyName] || 0), 0);
    };

    const tableData = useMemo(() => {
        // Extract unique values for selected column and selected value
        const uniqueSelectedColumn = Array.from(new Set(data.map((item) => item[selectedColumn[0]])));

        // Create rows dynamically based on selected column and selected value
        const rows: Record<string, any>[] = [];

        data.forEach((item) => {
            const rowKey = item[selectedRow[0]];
            const existingRow = rows.find((row) => row[selectedRow[0]] === rowKey) ?? { [selectedRow[0]]: rowKey };

            if (!rows.some((row) => row[selectedRow[0]] === rowKey)) {
                uniqueSelectedColumn.forEach((category) => {
                    existingRow[category] = '';
                });
                rows.push(existingRow);
            }

            const category = item[selectedColumn[0]];
            const sum = sumProperty(data.filter((d) => d[selectedColumn[0]] === category && d[selectedRow[0]] === rowKey), selectedValue[0]);
            existingRow[`column_${String(category)}`] = !isNaN(sum) ? sum : ''; // Use the same naming convention
        });

        return rows;
    }, [data, selectedRow, selectedColumn, selectedValue])

    const columns = useMemo(() => {
        // Extract unique categories and dates from the data
        const uniqueCategories = Array.from(new Set(data?.map((item) => item[selectedColumn[0] as any])))
        console.log('unik kateg', uniqueCategories)
        // Create columns dynamically based on categories and dates

        const dynamicColumns: DynamicColumn[] = [
            ...(selectedRow[0] !== '' && selectedRow.length > 0
                ? selectedRow.map((item) => ({
                    header: item?.toString(),
                    accessorKey: item?.toString(), // Use a string identifier for rows
                }))
                : []),
            ...(selectedColumn[0] !== '' && selectedColumn.length > 0
                ? uniqueCategories.map((category) => ({
                    header: String(category), // Ensure header is a string
                    accessorKey: `column_${String(category)}`, // Use a string identifier for columns
                }))
                : []),
        ];
        return dynamicColumns as ColumnDef<any>[]
    }, [data, selectedRow, selectedColumn])


    const table = useReactTable({
        columns,
        data: tableData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const [selectedRowDrop, setSelectedRowDrop] = useState<string[]>([]);
    const [selectedColumnDrop, setSelectedColumnDrop] = useState<string[]>([]);
    const [selectedValueDrop, setSelectedValueDrop] = useState<string[]>([]);

    const handleRow = (item: { name: string }) => {
        setSelectedRowDrop([item.name]);
        setSelectedRow([item.name]);
        console.log(item)
    };


    const handleColumn = (item: { name: string }) => {
        setSelectedColumnDrop([item.name])
        setSelectedColumn([item.name])
    };


    const handleValue = (item: { name: string }) => {
        setSelectedValueDrop([item.name])
        setSelectedValue([item.name])
    };

    console.log('table data', tableData)
    return (
        <>
            <div style={{ maxWidth: '800px', overflow: 'auto' }}>
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
            <HStack>

                <Box border={'1px solid black'} w={300}>
                    <ul>
                        {uniqueProperties.map(i => (
                            // <li key={i} style={{listStyle : 'none'}}>{i}</li>
                            <DraggableItem key={i} name={i} />
                        ))}
                    </ul>
                </Box>
                <Box height={'400px'}>
                    <DroppableArea onDrop={handleRow} title='ROW' droppedItem={selectedRowDrop} />
                    <DroppableArea onDrop={handleColumn} title='COLUMNS' droppedItem={selectedColumnDrop} />
                    <DroppableArea onDrop={handleValue} title='VALUES' droppedItem={selectedValueDrop} />

                </Box>
            </HStack>
            {/* <strong>FOR ROW</strong>
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
            /> */}
        </>
    )
}

export default CustomizeDynamicTable