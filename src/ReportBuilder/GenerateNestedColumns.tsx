import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

export const generateNestedColumns = (arrayOfSelected: string[], testMultiLayer: any[], selectedColumn: any, selectedValue : any[]): any[] => {
export const generateNestedColumns = (arrayOfSelected: string[], testMultiLayer: any[], selectedColumn: any, selectedValue : any[]): any[] => {
    // Collect all unique values for each item in arrayOfSelected
    const uniqueValuesMap: Map<string, Set<any>> = new Map();
    const monthOrder =  [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
    ];

    arrayOfSelected.forEach((columnName) => {
        const uniqueValues: Set<any> = new Set(testMultiLayer.map((item) => item[columnName]).sort((a, b) => {
            return monthOrder.indexOf(a) - monthOrder.indexOf(b);
        }));
        uniqueValuesMap.set(columnName, uniqueValues);
    });
    // Get the name of the first item in arrayOfSelected as the parent name
    const parentName = arrayOfSelected[0];
    const val = selectedValue[0]
    const val = selectedValue[0]
    // Generate nested columns hierarchy based on unique values
    const generateColumnsForItem = (index: number, parentName: string, selectedValue : any): any[] => {
        // console.log(`index : ${index}  ==== parent name : ${parentName}`)
    const generateColumnsForItem = (index: number, parentName: string, selectedValue : any): any[] => {
        // console.log(`index : ${index}  ==== parent name : ${parentName}`)
        const columnName = arrayOfSelected[index];
        const uniqueValues = Array.from(uniqueValuesMap.get(columnName) || []);
 
        const columns: any[] =
         uniqueValues.map((value, i) => ({
        const uniqueValues = Array.from(uniqueValuesMap.get(columnName) || []);
 
        const columns: any[] =
         uniqueValues.map((value, i) => ({
            id: index === 0 ? String(value) : `${parentName}_${value}`,
            // header: index === 0 ? String(value) : `${parentName}_${value}_${i}x`,
            header: index === 0 ? String(value) : `${value}`,
            accessorKey: index === 0 ? String(value) : `${parentName}_${value}`,
            enableSorting: true,
            aggregatedCell: (props: any) => {
                const sum1 = props.row?.leafRows?.reduce((totalSum: number, row: any) => {
                    const dynamicColumnKey = selectedColumn.map((column: any) => row.original[column]).join('_')
                    if (dynamicColumnKey === props.column.columnDef.accessorKey) {
                        return totalSum + (row.original[selectedValue] || 0)
                        return totalSum + (row.original[selectedValue] || 0)
                    }
                    return totalSum
                }, 0)
                return sum1 || 0
                    return totalSum
                }, 0)
                return sum1 || 0
            },
        }))
        }))

        // If there are more levels to generate, recursively generate columns for the next level
        if (index < arrayOfSelected.length - 1) {
            columns.forEach(column => {
                //this for the values
               
                column.columns = generateColumnsForItem(index + 1, index === 0 ? String(column.id) : `${column.id}`, val)
            });
        }

        return columns

        return columns
    }
    // Initialize generation with the first item in arrayOfSelected
    return generateColumnsForItem(0, parentName, val)
    return generateColumnsForItem(0, parentName, val)
}