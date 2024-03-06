import { ColumnDef } from "@tanstack/react-table";


export const generateNestedColumns = (arrayOfSelected: string[], testMultiLayer: any[], selectedColumn : any, selectedValue :any): any[] => {
    // Collect all unique values for each item in arrayOfSelected
    const uniqueValuesMap: Map<string, Set<any>> = new Map();
    const monthOrder =  [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
        // "NCT1",
        // "NCT2",
        // "NCT3",
        // "MMRPT",
        // "CLBZT",
        // "CLT1",
        // "CLT2",
        // "CVIT", 
        // "BT",
        // "VCT",
        // "VET",
        // "VWT1",
        // "VWT2",
        // "MCET",
        // "MNT",
        // "MWT",
    ];

    arrayOfSelected.forEach((columnName) => {
        const uniqueValues: Set<any> = new Set(testMultiLayer.map((item) => item[columnName]).sort((a, b) => {
            return monthOrder.indexOf(a) - monthOrder.indexOf(b);
        }));
        // const uniqueValues: Set<any> = new Set(testMultiLayer.map((item) => item[columnName]));

        uniqueValuesMap.set(columnName, uniqueValues);
    });
    // Get the name of the first item in arrayOfSelected as the parent name
    const parentName = arrayOfSelected[0];

    // Generate nested columns hierarchy based on unique values
    const generateColumnsForItem = (index: number, parentName: string): any[] => {

    
        const columnName = arrayOfSelected[index];
        const uniqueValues = Array.from(uniqueValuesMap.get(arrayOfSelected[index]) || []);
        const vals = Array.from(uniqueValuesMap.values());
        const dynamicTerritoryCode = vals[0]; // Assuming 'BT' comes from the first value
        const result = Array.from(new Set(testMultiLayer.filter((item: any) => item['territoryCode'] === parentName).map((item: any) => item['regionCode'])));
    
        const columns: any[] = 
        index === 0 ?
        uniqueValues.map((value) => ({
            id: index === 0 ? String(value) : `${parentName}_${value}`,
            // header: String(value),
            header: index === 0 ? String(value) : `${parentName}_${value}`,
            accessorKey: index === 0 ? String(value) : `${parentName}_${value}`,
    
            enableSorting: true,
            aggregatedCell: (props: any) => {
                // return 'no'
                const sum1 = props.row?.leafRows?.reduce((totalSum: number, row: any) => {
                    const dynamicColumnKey = selectedColumn.map((column : any) => row.original[column]).join('_');
                    if (dynamicColumnKey === props.column.columnDef.accessorKey) {
                        return totalSum + (row.original[selectedValue[0]] || 0); // Adding the value if it exists, otherwise adding 0
                    }
                    return totalSum;
                }, 0);
                return sum1 || 0; // Returning the sum or 0 if no sum is calculated
            },
      
   
        }))

        :
        result.map((value) => ({
            id: index === 0 ? String(value) : `${parentName}_${value}`,
            // header: String(value),
            header: index === 0 ? String(value) : `${parentName}_${value}`,
            accessorKey: index === 0 ? String(value) : `${parentName}_${value}`,
    
            enableSorting: true,
            aggregatedCell: (props: any) => {
                // return 'no'
                const sum1 = props.row?.leafRows?.reduce((totalSum: number, row: any) => {
                    const dynamicColumnKey = selectedColumn.map((column : any) => row.original[column]).join('_');
                    if (dynamicColumnKey === props.column.columnDef.accessorKey) {
                        return totalSum + (row.original[selectedValue[0]] || 0); // Adding the value if it exists, otherwise adding 0
                    }
                    return totalSum;
                }, 0);
                return sum1 || 0; // Returning the sum or 0 if no sum is calculated
            },
      
   
        }))
        // If there are more levels to generate, recursively generate columns for the next level
        if (index < arrayOfSelected.length - 1) {
            columns.forEach(column => {
                column.columns = generateColumnsForItem(index + 1, index === 0 ? String(column.header) : `${parentName}_${column.header}`);
            });
        }
        return columns;
    }
    // Initialize generation with the first item in arrayOfSelected
    return generateColumnsForItem(0, parentName);
}