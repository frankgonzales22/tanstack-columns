export const combineObjects = (data: any[], selectedColumn: any[]) => {
    // Create an object to store combined data
    const combinedData: any = {};
    // Iterate through the data array
    data.forEach(item => {
        // Extract properties
        let { chartId, column, row, cellId, id, ...rest } = item;
        
        // Check if selectedColumn length is greater than 1 and if column has a "+" symbol, replace it with a blank space
        if (selectedColumn.length > 1 && column.includes('+')) {
            column = column.replace(/\+/g, ' ');
        }
        
        // Create a unique key based on chartId, column, and row
        const key = `${column}-${row}`;
        
        // If the key doesn't exist in combinedData, initialize it with an object
        if (!combinedData[key]) {
            combinedData[key] = { chartId, column, row, ...rest };
        } else {
            // Merge the remaining properties (except id and cellId) with existing properties
            combinedData[key] = { ...combinedData[key], ...rest };
        }
    });
    // Convert the combinedData object into an array and return
    return Object.values(combinedData);
};
