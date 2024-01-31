import { Box, HStack } from "@chakra-ui/react";
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import DroppableArea from "./DragNDrop/DroppableArea";
import DraggableItem from "./DragNDrop/DraggableItem";



type DynamicColumn = {
    header: string;
    accessorKey: string;
}

interface DynamicDataProps {
    data: any[]
}



const CustomizeDynamicTable = ({ data }: DynamicDataProps) => {

    // State to track the selected value
    const [selectedValue, setSelectedValue] = useState<any[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any[]>([]);

    const uniqueProperties = Array.from(
        new Set(data.flatMap((item) => Object.keys(item)))
    );

    const sumProperty = (data: any[], propertyName: string) => {
        return data.reduce((acc, item) => acc + parseFloat(item[propertyName] || 0), 0);
    }

    const tableData = useMemo(() => {
        const rows: Record<string, any>[] = [];
        data.forEach((item) => {
            const parentRowKey = item[selectedRow[0]];
            const childRowKey = item[selectedRow[1]];

            // Find or create the parent row
            let parentRow = rows.find((row) => row[selectedRow[0]] === parentRowKey);
            if (!parentRow) {
                parentRow = { [selectedRow[0]]: parentRowKey, children: [] };
                rows.push(parentRow);
            }

            // Find or create the child row under the parent
            let childRow = parentRow.children.find((row  : any) => row[selectedRow[1]] === childRowKey);
            if (!childRow) {
                childRow = { [selectedRow[1]]: childRowKey };
                parentRow.children.push(childRow);
            }

            // Populate data for the selected columns and values
            const category = item[selectedColumn[0]];
            const sum = sumProperty(
                data.filter((d) => d[selectedColumn[0]] === category && d[selectedRow[0]] === parentRowKey),
                selectedValue[0]
            );
            childRow[`column_${String(category)}`] = !isNaN(sum) ? sum : '';
        });
        console.log(rows)
        return rows;
    }, [data, selectedRow, selectedColumn, selectedValue]);


    const columns = useMemo(() => {
        // Extract unique categories and dates from the data
        const uniqueCategories = Array.from(new Set(data?.map((item) => item[selectedColumn[0] as any])))
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
        getSortedRowModel: getSortedRowModel(),
    })

    const [selectedRowDrop, setSelectedRowDrop] = useState<string[]>([]);
    const [selectedColumnDrop, setSelectedColumnDrop] = useState<string[]>([]);
    const [selectedValueDrop, setSelectedValueDrop] = useState<string[]>([]);

    const handleRow = (item: { name: string }) => {
        setSelectedRowDrop([...selectedRowDrop, item.name]);
        setSelectedRow([...selectedRow, item.name]);
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

    return (
        <>
            <HStack>
                <Box border={'1px solid black'} w={300}>
                    <ul>
                        {uniqueProperties.map(i => (
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
            <div style={{ height: '100%', overflow: 'auto' }}>
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

        </>
    )
}

export default CustomizeDynamicTable