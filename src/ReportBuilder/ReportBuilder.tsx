// AMultiAndtD.tsx
import React, { useEffect, useMemo, useState } from "react";
import { GroupingState, ExpandedState, ColumnOrderState,  getCoreRowModel, getExpandedRowModel, getGroupedRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import DataManipulationControls from "./DragAndDropComponent";
import TableDisplayComponent from "./TableDisplayComponent";
import { generateNestedColumns } from "./GenerateNestedColumns";


interface DynamicDataProps {
    data: any[];
}

const ReportBuilder: React.FC<DynamicDataProps> = ({ data }) => {

    
    
    const [selectedRowDrop, setSelectedRowDrop] = useState<string[]>([]);
    const [selectedColumnDrop, setSelectedColumnDrop] = useState<string[]>([]);
    const [selectedValueDrop, setSelectedValueDrop] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState<any[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any[]>([]);
    const [grouping, setGrouping] = useState<GroupingState>([]);
    const [expanded, setExpand] = useState<ExpandedState>({});
    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

    const handleRow = (item: { name: string }) => {
        if (!selectedRow.includes(item.name)) {
            // If it doesn't exist, add it to selectedRow
            setSelectedRowDrop([...selectedRowDrop, item.name]);
            setSelectedRow([...selectedRow, item.name]);
        }
    }
    const handleColumn = (item: { name: string }) => {
        setSelectedColumnDrop([...selectedColumnDrop, item.name]);
        setSelectedColumn([...selectedColumn, item.name]);
    }

    const handleValue = (item: { name: string }) => {
        setSelectedValueDrop([item.name]);
        setSelectedValue([item.name]);
    }

    const handleClear = () => {
        setSelectedRowDrop([])
        setSelectedRow([])
        setSelectedColumnDrop([])
        setSelectedColumn([])
        setSelectedValueDrop([])
        setSelectedValue([])
    }

    useEffect(() => {
        setGrouping(selectedRowDrop)
        setColumnOrder([...selectedRowDrop, ...columnOrder])
    }, [selectedRow, selectedRowDrop])

    useEffect(() => {
        setSelectedColumn(selectedColumnDrop)
    }, [selectedColumnDrop])

    //#region  TRY MULTIPLE LAYERED COLUMNS
    const ultraDynamicColumns: any[] = useMemo(() => {
        return [
            ...(selectedRow[0] !== '' && selectedRow.length > 0
                ? selectedRow.map((item) => ({
                    header: item?.toString(),
                    accessorKey: item?.toString(),
                }))
                : []),
            ...(selectedColumn.length > 0
                ? generateNestedColumns(selectedColumn, data, selectedColumn, selectedValue)
                : [])
        ];
    }, [data, selectedRow, selectedColumn, selectedValue])
    //#endregion
    return (
        <>
            <DataManipulationControls
                handleClear={handleClear}
                data={data}
                handleRow={handleRow}
                handleColumn={handleColumn}
                handleValue={handleValue}
                selectedRowDrop={selectedRowDrop}
                selectedColumnDrop={selectedColumnDrop}
                selectedValueDrop={selectedValueDrop}
                setSelectedRowDrop={setSelectedRowDrop}
                setSelectedColumnDrop={setSelectedColumnDrop}
            />
            <TableDisplayComponent
                table={useReactTable({
                    columns: ultraDynamicColumns,
                    data,
                    state: {
                        columnOrder,
                        grouping,
                        expanded,
                    },
                    onColumnOrderChange: setColumnOrder,
                    onGroupingChange: setGrouping,
                    onExpandedChange: setExpand,
                    getExpandedRowModel: getExpandedRowModel(),
                    getCoreRowModel: getCoreRowModel(),
                    getGroupedRowModel: getGroupedRowModel(),
                    getSortedRowModel: getSortedRowModel(),
                })}
                grouping={grouping} // Pass grouping as prop
            />
        </>
    );
};
export default ReportBuilder;