export const generateNestedColumns = (arrayOfSelected: string[], testMultiLayer: any[], selectedColumn: any, selectedValue: any): any[] => {
    // Collect all unique values for each item in arrayOfSelected
    const uniqueValuesMap: Map<string, Set<any>> = new Map();
    arrayOfSelected.forEach((columnName) => {
        const uniqueValues: Set<any> = new Set(testMultiLayer.map((item) => item[columnName]));
        uniqueValuesMap.set(columnName, uniqueValues);
    });
    // Get the name of the first item in arrayOfSelected as the parent name
    const parent = arrayOfSelected[0];
    const child = arrayOfSelected[1];

    // Generate nested columns hierarchy based on unique values
    const generateColumnsForItem = (index: number, parentName: string): any[] => {
        const columnName = arrayOfSelected[index];
        // Filter out valueHeaders if their parents exist in the same object
        const filterValue = testMultiLayer.filter(i =>
            (index === 0 && i[selectedColumn[0]] === 'BT' && (i[selectedColumn[1]] === 'BT1' || i[selectedColumn[1]] === 'BT2')) ||
            (index === 0 && i[selectedColumn[0]] === 'CLBZT' && (i[selectedColumn[1]] === 'CLBZ1' || i[selectedColumn[1]] === 'CLBZ2' || i[selectedColumn[1]] === 'CLBZ3')) ||
            (index > 0 && i[arrayOfSelected[index - 1]] === parentName)
        )

        const uniqueValues = Array.from(new Set(filterValue.map(item => item[columnName])))
        console.log('tttttttt',uniqueValues)
        const columns: any[] = uniqueValues.map((valueHeader) => ({
            header: String(valueHeader),
            id: index === 0 ? String(valueHeader) : `${parentName}_${valueHeader}`,
            aggregatedCell: (props: any) => {
                const sum1 = props.row?.leafRows?.reduce((totalSum: number, row: any) => {
                    const dynamicColumnKey = selectedColumn.map((column: any) => row.original[column]).join('_')
                    if (dynamicColumnKey === props.column.columnDef.accessorKey) {
                        return totalSum + (row.original[selectedValue[0]] || 0); // Adding the value if it exists, otherwise adding 0
                    }
                    return totalSum;
                }, 0);
                return sum1 || 0; // Returning the sum or 0 if no sum is calculated
            },
            accessorKey: index === 0 ? String(valueHeader) : `${parentName}_${valueHeader}`,
        }))
        // If there are more levels to generate, recursively generate columns for the next level
        if (index < arrayOfSelected.length - 1) {
            columns.forEach(column => {
                column.columns = generateColumnsForItem(index + 1, index === 0 ? String(column.header) : `${parentName}_${column.header}`)
            });
        }
        return columns
    }
    // Initialize generation with the first item in arrayOfSelected
    return generateColumnsForItem(0, parent)
}

// Example usage:
// const arrayOfSelected = ['BT', 'BT1', 'BT2']; // Assuming this is the structure
// const testMultiLayer = [/* Your test data here */];
// const selectedColumn = ['column1', 'column2']; // Replace with your actual column names
// const selectedValue = ['value1']; // Replace with your actual value names
// const nestedColumns = generateNestedColumns(arrayOfSelected, testMultiLayer, selectedColumn, selectedValue);
// console.log(nestedColumns); // This will give you the generated nested columns
