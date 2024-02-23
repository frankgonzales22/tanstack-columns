

export const generateNestedColumns = (arrayOfSelected: string[], testMultiLayer: any[], selectedColumn : any, selectedValue :any): any[] => {
    // Collect all unique values for each item in arrayOfSelected
    const uniqueValuesMap: Map<string, Set<any>> = new Map();
    arrayOfSelected.forEach((columnName) => {
        const uniqueValues: Set<any> = new Set(testMultiLayer.map((item) => item[columnName]));
        uniqueValuesMap.set(columnName, uniqueValues);
    });
    // Get the name of the first item in arrayOfSelected as the parent name
    const parentName = arrayOfSelected[0];

    // Generate nested columns hierarchy based on unique values
    const generateColumnsForItem = (index: number, parentName: string): any[] => {
        const columnName = arrayOfSelected[index];
        const uniqueValues = Array.from(uniqueValuesMap.get(columnName) || []);
        const columns: any[] = uniqueValues.map((value) => ({
            header: String(value),
            id: index === 0 ? String(value) : `${parentName}_${value}`,
            aggregatedCell: (props: any) => {

                const sum1 = props.row?.leafRows?.reduce((totalSum: number, row: any) => {
                    const dynamicColumnKey = selectedColumn.map((column : any) => row.original[column]).join('_');
                    if (dynamicColumnKey === props.column.columnDef.accessorKey) {
                        return totalSum + (row.original[selectedValue[0]] || 0); // Adding the value if it exists, otherwise adding 0
                    }
                    return totalSum;
                }, 0);
                return sum1 || 0; // Returning the sum or 0 if no sum is calculated
            },
            accessorKey: index === 0 ? String(value) : `${parentName}_${value}`,
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