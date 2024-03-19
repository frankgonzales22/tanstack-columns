// // // AMultiAndtD.tsx
// // import React, { useEffect, useMemo, useState } from "react";
// // import {
// //     GroupingState,
// //     ExpandedState,
// //     ColumnOrderState,
// //     getCoreRowModel,
// //     getExpandedRowModel,
// //     getGroupedRowModel,
// //     getSortedRowModel,
// //     useReactTable,
// //     SortingState,
// //     ColumnDef,
// //     ColumnFiltersState,
// //     FilterFn,
// // } from "@tanstack/react-table";
// // import TableDisplayComponent from "./TableDisplayComponent";
// // import { generateNestedColumns } from "./GenerateNestedColumns";
// // import DragAndDropComponent from "./DragAndDropComponent";
// // import SelectDataSource from "./SelectDataSource";
// // import { FncChooseTable } from "./FncChooseTable";
// // import useStateHooks from "../../../FRANK/Components/useStateHooks";
// // import { useSortingStore } from "./reportBuilderHooks";
// // import useTable from "./useTable";
// // import {
// //     Box,
// //     Checkbox,
// //     CheckboxGroup,
// //     Grid,
// //     GridItem,
// //     SimpleGrid,
// //     Stack,
// // } from "@chakra-ui/react";

// // import {
// //     RankingInfo,
// //     rankItem,
// //     compareItems,
// // } from "@tanstack/match-sorter-utils";
// // import { Button } from "antd";
// // import { GenerateArrayForFilter } from "./GenerateArrayForFilter";
// // import PopoverComponent from "./PopoverComponent";

// // interface DynamicDataProps {
// //     data?: any[];
// // }

// // const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
// //     // Rank the item
// //     const itemRank = rankItem(row.getValue(columnId), value)

// //     // Store the itemRank info
// //     addMeta({
// //         itemRank,
// //     })

// //     // Return if the item should be filtered in/out
// //     return itemRank.passed
// // }


// // const ReportBuilder: React.FC<DynamicDataProps> = () => {
// //     // const { sorting, setSorting } = useSortingStore()

// //     const [selectedRowDrop, setSelectedRowDrop] = useState<string[]>([]);
// //     const [selectedColumnDrop, setSelectedColumnDrop] = useState<string[]>([]);
// //     const [selectedValueDrop, setSelectedValueDrop] = useState<string[]>([]);
// //     const [selectedFilterDrop, setSelectedFilterDrop] = useState<string[]>([]);
// //     const [selectedValue, setSelectedValue] = useState<any[]>([]);
// //     const [selectedColumn, setSelectedColumn] = useState<any[]>([]);
// //     const [selectedRow, setSelectedRow] = useState<any[]>([]);
// //     const [grouping, setGrouping] = useState<GroupingState>([]);
// //     const [expanded, setExpand] = useState<ExpandedState>({});
// //     const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
// //     const [sorting, setSorting] = useState<SortingState>([]);
// //     // const [filteredItem, setFilteredItem] = useState<ColumnFiltersState>([]);
// //     const [columnData, setColumnData] = useState<any[]>([]);
// //     const [dynamicColumnData, setDynamicColumnData] = useState<any[]>([]);
// //     const [itemToFilter, setItemToFilter] = useState<any[]>([]);
// //     const [legitFilter, setLegitFilter] = useState<any[]>([])
// //     const handleRow = (item: { name: string }) => {
// //         if (!selectedRow.includes(item.name)) {
// //             // If it doesn't exist, add it to selectedRow
// //             setSelectedRowDrop([...selectedRowDrop, item.name]);
// //             setSelectedRow([...selectedRow, item.name]);
// //         }
// //     };
// //     const handleColumn = (item: { name: string }) => {
// //         if (!selectedColumnDrop.includes(item.name)) {
// //             setSelectedColumnDrop([...selectedColumnDrop, item.name]);
// //             setSelectedColumn([...selectedColumn, item.name]);
// //         }
// //     };

// //     const handleValue = (item: { name: string }) => {
// //         setSelectedValueDrop([item.name]);
// //         setSelectedValue([item.name]);
// //     };

// //     const handleFilter = (item: { name: string }) => {
// //         if (!selectedFilterDrop.includes(item.name)) {
// //             setSelectedFilterDrop([...selectedFilterDrop, item.name])
// //         }
// //     };

// //     const handleClear = () => {
// //         setSelectedRowDrop([]);
// //         setSelectedRow([]);
// //         setSelectedColumnDrop([]);
// //         setSelectedColumn([]);
// //         setSelectedValueDrop([]);
// //         setSelectedFilterDrop([]);
// //         setSelectedValue([]);
// //         setSorting([]);
// //         setGrouping([]);
// //         setColumnData([]);
// //     };

// //     useEffect(() => {
// //         setGrouping(selectedRowDrop);
// //         setColumnOrder([...selectedRowDrop, ...columnOrder]);
// //     }, [selectedRow, selectedRowDrop]);

// //     useEffect(() => {
// //         setSelectedColumn(selectedColumnDrop);
// //     }, [selectedColumnDrop]);

// //     //#region  TRY MULTIPLE LAYERED COLUMNS
// //     const ultraDynamicColumns: ColumnDef<any>[] = useMemo(() => {
// //         return [
// //             ...(selectedRow[0] !== "" && selectedRow.length > 0
// //                 ? selectedRow.map((item) => ({
// //                     id: item?.toString(),
// //                     header: item?.toString(),
// //                     accessorKey: item?.toString(),
// //                     sortingFn: (rowA: any, rowB: any, columnId: any) => {
// //                         // Assuming columnId corresponds to 'yearNMonthSale'
// //                         const valueA = rowA.getValue(columnId) || "";
// //                         const valueB = rowB.getValue(columnId) || "";
// //                         const months: any[] = [
// //                             2021,
// //                             2022,
// //                             2023,
// //                             2024,
// //                             2025,
// //                             2026,
// //                             "JANUARY",
// //                             "FEBRUARY",
// //                             "MARCH",
// //                             "APRIL",
// //                             "MAY",
// //                             "JUNE",
// //                             "JULY",
// //                             "AUGUST",
// //                             "SEPTEMBER",
// //                             "OCTOBER",
// //                             "NOVEMBER",
// //                             "DECEMBER",
// //                             "BT",
// //                             "CLBZT",
// //                             "CLT1",
// //                             "CLT2",
// //                             "CVIT",
// //                             "MCET",
// //                             "MCT",
// //                             "MMRPT",
// //                             "MNT",
// //                             "MWT",
// //                             "NCT1",
// //                             "NCT2",
// //                             "NCT3",
// //                             "VCT",
// //                             "VET",
// //                             "VWT1",
// //                             "VWT2",
// //                             "OS",
// //                         ];
// //                         const monthA: number = months.indexOf(valueA);
// //                         const monthB: number = months.indexOf(valueB);
// //                         return monthA - monthB;
// //                     },
// //                 }))
// //                 : []),
// //             ...(selectedColumn.length > 0
// //                 ? generateNestedColumns(
// //                     selectedColumn,
// //                     columnData,
// //                     selectedColumn,
// //                     selectedValue
// //                 )
// //                 : []),
// //         ];
// //     }, [columnData, selectedRow, selectedColumn, selectedValue]);
// //     //#endregion

// //     // useEffect(() => {
// //     //     GenerateArrayForFilter(selectedFilterDrop, columnData)
// //     // }, [columnData, selectedFilterDrop])

// //     //#region FOR DATA SOURCE DROPDOWN


// //     const options = [
// //         { value: "nsSummaryCompany", label: "NEW SALES OVER QOUTA" },
// //         { value: "nsPassFailed", label: "NEW SALES PASS/FAILED" },
// //         { value: "nsClassification", label: "NEW SALES CLASSIFICATION" },
// //         { value: "nsPersistency", label: "NS PERSISTENCY COLLECTION" },
// //         { value: "colGrossCol", label: "GROSS COLLECTION" },
// //         { value: "colMovementOfAccountsData", label: "MOVEMENT OF ACCOUNTS" },
// //     ];
// //     const handleTableSelect = (value: string) => {
// //         FncChooseTable(value, setColumnData, setDynamicColumnData, tableConfig);

// //     };
// //     // console.log(columnData)
// //     const { nsSummaryCompData, nsPassFailedData } = useStateHooks();
// //     const tableConfig: any = {
// //         nsSummaryCompany: nsSummaryCompData,
// //         nsCompany: nsSummaryCompData,
// //         nsPassFailed: nsPassFailedData,
// //         // Add other table configurations...
// //     };

// //     //#endregion FOR DATA SOURCE DROPDOWN

// //     const table = useTable({
// //         data: columnData,
// //         columns: ultraDynamicColumns,
// //         columnOrder,
// //         grouping,
// //         sorting,
// //         // filteredItem,
// //         expanded,
// //         setColumnOrder,
// //         setSorting,
// //         setGrouping,
// //         setExpand,
// //         // setFilteredItem,
// //         fuzzyFilter,
// //     });

// //     // console.log('eyyy',table.getRowModel().rows[2].getAllCells().map(i => i.getContext().cell.getContext()))
// //     // console.log(table.getAllFlatColumns()[0].getFacetedRowModel())

// //     const [checkedValues, setCheckedValues] = useState([]);

// //     // const handleCheckboxChange = (newCheckedValues: string[]) => {
// //     //     setCheckedValues(newCheckedValues);
// //     //     console.log('Checked values:', newCheckedValues);
// //     // };

// //     const handleCheckboxChange = (newCheckedValues: any) => {
// //         const newValueObject = { id: 'YRSALE', value: newCheckedValues };
// //         // setCheckedValues([newValueObject]); // This line replaces the entire array with a new one containing only newValueObject
// //         // setFilteredItem(newCheckedValues)
// //         // console.log(newCheckedValues, 'newChecked')
// //         // console.log('Checked values:', [newValueObject]);
// //     };


// //     //   console.log(table.getAllColumns())

// //     const filteredColumnData = columnData.filter(item => item.agentType !== 'OLD' && item.territoryCode === 'BT');


// //     useEffect(() => {  //THIS IS FOR DISPLAY OF FILTER INSIDE THE FILTER DROP BOX
// //         // Clear previous items before adding new ones
// //         setItemToFilter([]);

// //         selectedFilterDrop.forEach(i => {

// //             setItemToFilter(prevItemToFilter => {
// //                 const uniqueValues = Array.from(new Set(dynamicColumnData.map(item => item[i])));
// //                 return [...prevItemToFilter, {
// //                     title: i,
// //                     values: uniqueValues
// //                 }];
// //             });
// //         });
// //     }, [selectedFilterDrop]);

// //     // console.log('FILTERSSS', itemToFilter)
// //     // console.log(' LEGIT FILTERSSS', legitFilter)
// //     const [existing, setExisting] = useState<any>()

// //     console.log('legitfilter', legitFilter)

// //     return (
// //         <>
// //             {/* {JSON.stringify(filteredItem)} */}
// //             <div style={{}}>
// //                 {/* <CheckboxGroup
// //                     colorScheme='green'
// //                     defaultValue={checkedValues}
// //                     onChange={(values) => handleCheckboxChange(values.toString())}
// //                     >
// //                     <Stack spacing={[1, 5]} direction={['column', 'row']}>
// //                         <Checkbox value='2022'>2022</Checkbox>
// //                         <Checkbox value='2023'>2023</Checkbox>
// //                         <Checkbox value='2024'>2024</Checkbox>
// //                         <Checkbox value='6022'>6022</Checkbox>
// //                         <Checkbox value='10206'>10206</Checkbox>
// //                     </Stack>
// //                 </CheckboxGroup> */}
// //                 <Button onClick={() =>
// //                     // setFilteredItem([{id : 'territoryCode', value : ['BT', 'CLBZT']}])
// //                     setColumnData(filteredColumnData)
// //                 }>
// //                     Click here
// //                 </Button>
// //                 <SimpleGrid
// //                     templateColumns={{
// //                         sm: "1fr",
// //                         md: "1fr",
// //                         lg: "1fr 450px",
// //                     }}
// //                 >
// //                     <Box bg='tomato'
// //                         overflowX={'auto'}
// //                     >
// //                         {/* {JSON.stringify(legitFilter )} */}
// //                         {JSON.stringify(existing)}
// //                         {itemToFilter.map((item: any, index: any) => (
// //                             <PopoverComponent
// //                                 title={item.title}
// //                                 key={index}
// //                                 checkedArray={(e) => {
// //                                     const existingItemIndex = legitFilter.findIndex(
// //                                         (existingItem) => existingItem.id === item.title
// //                                       )
// //                                       console.log('exist', existingItemIndex)
// //                                       setExisting(existingItemIndex)
// //                                     // columnData.filter(item => item.agentType !== 'OLD' && item.territoryCode === 'BT');
// //                                     const filtered = columnData.filter(f => f[item.title] === e[0])
// //                                     setColumnData(filtered)
// //                                     console.log('ngek', filtered)
// //                                     console.log(e)
// //                                     if (existingItemIndex !== -1) {
// //                                         // Update the value property
// //                                         const updatedFilCol = legitFilter.map(
// //                                           (existingItem, index) => {
// //                                             if (index === existingItemIndex) {
// //                                               // Check if the value is an empty array, and remove the item if it is
// //                                               if (Array.isArray(e) && e.length === 0) {
// //                                                 return null // This will remove the item from the array
// //                                               }
// //                                               return { ...existingItem, value: e }
// //                                             }
// //                                             return existingItem
// //                                           }
// //                                         )
// //                                         // Filter out items that are not null (i.e., those with non-empty values)
// //                                         const filteredItemsWithoutNull: any =
// //                                           updatedFilCol.filter((item) => item !== null)
// //                                         setLegitFilter(filteredItemsWithoutNull)

// //                                       } else {
// //                                         // Add a new item to filteredItem if it doesn't exist
// //                                         if (!(Array.isArray(e) && e.length === 0)) {
// //                                             setLegitFilter([
// //                                             ...legitFilter,
// //                                             { id: item.title, value: e },
// //                                           ])


// //                                         }
// //                                       }
// //                                     // console.log(item.title)
// //                                 }}
// //                                 options={item.values}
// //                             />
// //                         ))}

// //                         <Box shadow="xl" borderWidth="1px" h={600} overflowX="auto">
// //                             <TableDisplayComponent
// //                                 table={table}
// //                             />
// //                         </Box>
// //                     </Box>
// //                     <Box bg='lightblue'>
// //                         <SelectDataSource
// //                             options={options}
// //                             onChange={(value) => {
// //                                 handleTableSelect(value);
// //                             }}
// //                         />
// //                         <DragAndDropComponent
// //                             handleClear={handleClear}
// //                             data={dynamicColumnData}
// //                             handleRow={handleRow}
// //                             handleColumn={handleColumn}
// //                             handleValue={handleValue}
// //                             handleFilter={handleFilter}
// //                             selectedRowDrop={selectedRowDrop}
// //                             selectedColumnDrop={selectedColumnDrop}
// //                             selectedValueDrop={selectedValueDrop}
// //                             selectedFilterDrop={selectedFilterDrop}
// //                             setSelectedRowDrop={setSelectedRowDrop}
// //                             setSelectedColumnDrop={setSelectedColumnDrop}
// //                             setSelectedFilterDrop={setSelectedFilterDrop}
// //                             setSorting={setSorting}
// //                         />
// //                     </Box>
// //                 </SimpleGrid>


// //             </div>
// //         </>
// //     );
// // };
// // export default ReportBuilder;

// /////////////////////////////////////////////////////////////////////////////////////

// // {itemToFilter.map((item: any, index: any) => (
// //   <PopoverComponent
// //       title={item.title}
// //       key={index}
// //       checkedArray={(e) => {

// //           // columnData.filter(item => item.agentType !== 'OLD' && item.territoryCode === 'BT');
// //           const filtered = columnData.filter(f => f[item.title] === e[0] || f[item.title] === e[1])
// //           const filteredColumnData = columnData.filter(f => {
// //               // Constructing the condition dynamically
// //               const condition = e.map(value => `f['${item.title}'] === '${value}'`).join(' || ');

// //               // Evaluating the condition
// //               return eval(condition);
// //             });
// //           setColumnData(filteredColumnData)
// //           console.log('ngek', filteredColumnData)

// //           // console.log(item.title)
// //       }}
// //       options={item.values}
// //   />
// // ))}



// // AMultiAndtD.tsx
// import React, { useEffect, useMemo, useState } from "react";
// import {
//     GroupingState,
//     ExpandedState,
//     ColumnOrderState,
//     getCoreRowModel,
//     getExpandedRowModel,
//     getGroupedRowModel,
//     getSortedRowModel,
//     useReactTable,
//     SortingState,
//     ColumnDef,
//     ColumnFiltersState,
//     FilterFn,
// } from "@tanstack/react-table";
// import TableDisplayComponent from "./TableDisplayComponent";
// import { generateNestedColumns } from "./GenerateNestedColumns";
// import DragAndDropComponent from "./DragAndDropComponent";
// import SelectDataSource from "./SelectDataSource";
// import { FncChooseTable } from "./FncChooseTable";
// import useStateHooks from "../../../FRANK/Components/useStateHooks";
// import { useSortingStore } from "./reportBuilderHooks";
// import useTable from "./useTable";
// import {
//     Box,
//     Checkbox,
//     CheckboxGroup,
//     Grid,
//     GridItem,
//     SimpleGrid,
//     Stack,
// } from "@chakra-ui/react";

// import {
//     RankingInfo,
//     rankItem,
//     compareItems,
// } from "@tanstack/match-sorter-utils";
// import { Button } from "antd";
// import { GenerateArrayForFilter } from "./GenerateArrayForFilter";
// import PopoverComponent from "./PopoverComponent";

// interface DynamicDataProps {
//     data?: any[];
// }

// const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
//     // Rank the item
//     const itemRank = rankItem(row.getValue(columnId), value)

//     // Store the itemRank info
//     addMeta({
//         itemRank,
//     })

//     // Return if the item should be filtered in/out
//     return itemRank.passed
// }


// const ReportBuilder: React.FC<DynamicDataProps> = () => {
//     // const { sorting, setSorting } = useSortingStore()

//     const [selectedRowDrop, setSelectedRowDrop] = useState<string[]>([]);
//     const [selectedColumnDrop, setSelectedColumnDrop] = useState<string[]>([]);
//     const [selectedValueDrop, setSelectedValueDrop] = useState<string[]>([]);
//     const [selectedFilterDrop, setSelectedFilterDrop] = useState<string[]>([]);
//     const [selectedValue, setSelectedValue] = useState<any[]>([]);
//     const [selectedColumn, setSelectedColumn] = useState<any[]>([]);
//     const [selectedRow, setSelectedRow] = useState<any[]>([]);
//     const [grouping, setGrouping] = useState<GroupingState>([]);
//     const [expanded, setExpand] = useState<ExpandedState>({});
//     const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
//     const [sorting, setSorting] = useState<SortingState>([]);
//     // const [filteredItem, setFilteredItem] = useState<ColumnFiltersState>([]);
//     const [columnData, setColumnData] = useState<any[]>([]);
//     const [dataForDragDrop, setDataForDragDrop] = useState<any[]>([]);
//     const [itemToFilter, setItemToFilter] = useState<any[]>([]);
//     const [legitFilter, setLegitFilter] = useState<any[]>([])
//     const handleRow = (item: { name: string }) => {
//         if (!selectedRow.includes(item.name)) {
//             // If it doesn't exist, add it to selectedRow
//             setSelectedRowDrop([...selectedRowDrop, item.name]);
//             setSelectedRow([...selectedRow, item.name]);
//         }
//     };
//     const handleColumn = (item: { name: string }) => {
//         if (!selectedColumnDrop.includes(item.name)) {
//             setSelectedColumnDrop([...selectedColumnDrop, item.name]);
//             setSelectedColumn([...selectedColumn, item.name]);
//         }
//     };

//     const handleValue = (item: { name: string }) => {
//         setSelectedValueDrop([item.name]);
//         setSelectedValue([item.name]);
//     };

//     const handleFilter = (item: { name: string }) => {
//         if (!selectedFilterDrop.includes(item.name)) {
//             setSelectedFilterDrop([...selectedFilterDrop, item.name])
//         }
//     };

//     const handleClear = () => {
//         setSelectedRowDrop([]);
//         setSelectedRow([]);
//         setSelectedColumnDrop([]);
//         setSelectedColumn([]);
//         setSelectedValueDrop([]);
//         setSelectedFilterDrop([]);
//         setSelectedValue([]);
//         setSorting([]);
//         setGrouping([]);
//         setColumnData([]);
//     };

//     useEffect(() => {
//         setGrouping(selectedRowDrop);
//         setColumnOrder([...selectedRowDrop, ...columnOrder]);
//     }, [selectedRow, selectedRowDrop]);

//     useEffect(() => {
//         setSelectedColumn(selectedColumnDrop);
//     }, [selectedColumnDrop]);

//     //#region  TRY MULTIPLE LAYERED COLUMNS
//     const ultraDynamicColumns: ColumnDef<any>[] = useMemo(() => {
//         return [
//             ...(selectedRow[0] !== "" && selectedRow.length > 0
//                 ? selectedRow.map((item) => ({
//                     id: item?.toString(),
//                     header: item?.toString(),
//                     accessorKey: item?.toString(),
//                     sortingFn: (rowA: any, rowB: any, columnId: any) => {
//                         // Assuming columnId corresponds to 'yearNMonthSale'
//                         const valueA = rowA.getValue(columnId) || "";
//                         const valueB = rowB.getValue(columnId) || "";
//                         const months: any[] = [
//                             2021,
//                             2022,
//                             2023,
//                             2024,
//                             2025,
//                             2026,
//                             "JANUARY",
//                             "FEBRUARY",
//                             "MARCH",
//                             "APRIL",
//                             "MAY",
//                             "JUNE",
//                             "JULY",
//                             "AUGUST",
//                             "SEPTEMBER",
//                             "OCTOBER",
//                             "NOVEMBER",
//                             "DECEMBER",
//                             "BT",
//                             "CLBZT",
//                             "CLT1",
//                             "CLT2",
//                             "CVIT",
//                             "MCET",
//                             "MCT",
//                             "MMRPT",
//                             "MNT",
//                             "MWT",
//                             "NCT1",
//                             "NCT2",
//                             "NCT3",
//                             "VCT",
//                             "VET",
//                             "VWT1",
//                             "VWT2",
//                             "OS",
//                         ];
//                         const monthA: number = months.indexOf(valueA);
//                         const monthB: number = months.indexOf(valueB);
//                         return monthA - monthB;
//                     },
//                 }))
//                 : []),
//             ...(selectedColumn.length > 0
//                 ? generateNestedColumns(
//                     selectedColumn,
//                     columnData,
//                     selectedColumn,
//                     selectedValue
//                 )
//                 : []),
//         ];
//     }, [columnData, selectedRow, selectedColumn, selectedValue]);
//     //#endregion

//     // useEffect(() => {
//     //     GenerateArrayForFilter(selectedFilterDrop, columnData)
//     // }, [columnData, selectedFilterDrop])

//     //#region FOR DATA SOURCE DROPDOWN


//     const options = [
//         { value: "nsSummaryCompany", label: "NEW SALES OVER QOUTA" },
//         { value: "nsPassFailed", label: "NEW SALES PASS/FAILED" },
//         { value: "nsClassification", label: "NEW SALES CLASSIFICATION" },
//         { value: "nsPersistency", label: "NS PERSISTENCY COLLECTION" },
//         { value: "colGrossCol", label: "GROSS COLLECTION" },
//         { value: "colMovementOfAccountsData", label: "MOVEMENT OF ACCOUNTS" },
//     ];
//     const handleTableSelect = (value: string) => {
//         FncChooseTable(value, setColumnData, setDataForDragDrop, tableConfig);

//     };
//     // console.log(columnData)
//     const { nsSummaryCompData, nsPassFailedData } = useStateHooks();
//     const tableConfig: any = {
//         nsSummaryCompany: nsSummaryCompData,
//         nsCompany: nsSummaryCompData,
//         nsPassFailed: nsPassFailedData,
//         // Add other table configurations...
//     };

//     //#endregion FOR DATA SOURCE DROPDOWN

//     const table = useTable({
//         data: columnData,
//         columns: ultraDynamicColumns,
//         columnOrder,
//         grouping,
//         sorting,
//         // filteredItem,
//         expanded,
//         setColumnOrder,
//         setSorting,
//         setGrouping,
//         setExpand,
//         // setFilteredItem,
//         fuzzyFilter,
//     });

//     // console.log('eyyy',table.getRowModel().rows[2].getAllCells().map(i => i.getContext().cell.getContext()))
//     // console.log(table.getAllFlatColumns()[0].getFacetedRowModel())

//     const [checkedValues, setCheckedValues] = useState([]);

//     // const handleCheckboxChange = (newCheckedValues: string[]) => {
//     //     setCheckedValues(newCheckedValues);
//     //     console.log('Checked values:', newCheckedValues);
//     // };

//     const handleCheckboxChange = (newCheckedValues: any) => {
//         const newValueObject = { id: 'YRSALE', value: newCheckedValues };
//         // setCheckedValues([newValueObject]); // This line replaces the entire array with a new one containing only newValueObject
//         // setFilteredItem(newCheckedValues)
//         // console.log(newCheckedValues, 'newChecked')
//         // console.log('Checked values:', [newValueObject]);
//     };


//     //   console.log(table.getAllColumns())

//     // const filteredColumnData = columnData.filter(item => item.agentType !== 'OLD' && item.territoryCode === 'BT');
//     // const filteredColumnData = columnData.filter(f => {
//     //     // Create an array to hold individual conditions
//     //     const conditions = legitFilter.map(filterItem => {
//     //       // Construct condition for each filter item
//     //       return `f['${filterItem.id}'] === '${filterItem.value}'`;
//     //     });

//     //     // Join individual conditions with '||' operator
//     //     const filterCondition = conditions.join(' || ');

//     //     // Use eval() to evaluate the constructed filter condition
//     //     return eval(filterCondition);
//     //   });
//     useEffect(() => {
//         // Clear previous items before adding new ones
//         setItemToFilter([]);

//         selectedFilterDrop.forEach(i => {

//             setItemToFilter(prevItemToFilter => {
//                 const uniqueValues = Array.from(new Set(dataForDragDrop.map(item => item[i])));
//                 return [...itemToFilter, {
//                     title: i,
//                     values: uniqueValues
//                 }];
//             });
//         });
//     }, [selectedFilterDrop, columnData]);

//     // console.log('FILTERSSS', itemToFilter)
//     // console.log(' LEGIT FILTERSSS', legitFilter)
//     console.log('trig')
//     return (
//         <>
//             {/* {JSON.stringify(filteredItem)} */}
//             <div style={{}}>
//                 {/* <CheckboxGroup
//                     colorScheme='green'
//                     defaultValue={checkedValues}
//                     onChange={(values) => handleCheckboxChange(values.toString())}
//                     >
//                     <Stack spacing={[1, 5]} direction={['column', 'row']}>
//                         <Checkbox value='2022'>2022</Checkbox>
//                         <Checkbox value='2023'>2023</Checkbox>
//                         <Checkbox value='2024'>2024</Checkbox>
//                         <Checkbox value='6022'>6022</Checkbox>
//                         <Checkbox value='10206'>10206</Checkbox>
//                     </Stack>
//                 </CheckboxGroup> */}
//                 <Button onClick={() =>
//                     // setFilteredItem([{id : 'territoryCode', value : ['BT', 'CLBZT']}])
//                     // setColumnData(filteredColumnData)
//                     console.log('h')
//                 }>
//                     Click here
//                 </Button>
//                 <SimpleGrid
//                     templateColumns={{
//                         sm: "1fr",
//                         md: "1fr",
//                         lg: "1fr 450px",
//                     }}
//                 >
//                     <Box bg='tomato'
//                         overflowX={'auto'}
//                     >
//                         {/* {JSON.stringify(legitFilter )} */}
//                         {itemToFilter.map((item: any, index: any) => (
//                             <PopoverComponent
//                                 title={item.title}
//                                 key={index}
//                                 checkedArray={(e) => {

//                                     // columnData.filter(item => item.agentType !== 'OLD' && item.territoryCode === 'BT');
//                                     const filtered = columnData.filter(f => f[item.title] === e[0] || f[item.title] === e[1])
//                                         const filteredColumnData = dataForDragDrop.filter(f => {
//                                             // Constructing the condition dynamically
//                                             const condition = e.map(value => `f['${item.title}'] === '${value}'`).join(' || ');

//                                             // Evaluating the condition
//                                             return eval(condition);
//                                         });
//                                     if (Array.isArray(e) && e.length === 0) {
//                                         return setColumnData(dataForDragDrop) // This will remove the item from the array
//                                     } else {
//                                         setColumnData(filteredColumnData)
//                                     }

//                                     console.log('ngek', filteredColumnData)

//                                     // console.log(item.title)
//                                 }}
//                                 options={item.values}
//                             />
//                         ))}

//                         <Box shadow="xl" borderWidth="1px" h={600} overflowX="auto">
//                             <TableDisplayComponent
//                                 table={table}
//                             />
//                         </Box>
//                     </Box>
//                     <Box bg='lightblue'>
//                         <SelectDataSource
//                             options={options}
//                             onChange={(value) => {
//                                 handleTableSelect(value);
//                             }}
//                         />
//                         <DragAndDropComponent
//                             handleClear={handleClear}
//                             data={dataForDragDrop}
//                             handleRow={handleRow}
//                             handleColumn={handleColumn}
//                             handleValue={handleValue}
//                             handleFilter={handleFilter}
//                             selectedRowDrop={selectedRowDrop}
//                             selectedColumnDrop={selectedColumnDrop}
//                             selectedValueDrop={selectedValueDrop}
//                             selectedFilterDrop={selectedFilterDrop}
//                             setSelectedRowDrop={setSelectedRowDrop}
//                             setSelectedColumnDrop={setSelectedColumnDrop}
//                             setSelectedFilterDrop={setSelectedFilterDrop}
//                             setSorting={setSorting}
//                         />
//                     </Box>
//                 </SimpleGrid>


//             </div>
//         </>
//     );
// };
// export default ReportBuilder;


// // AMultiAndtD.tsx
// import React, { useEffect, useMemo, useState } from "react";
// import {
//     GroupingState,
//     ExpandedState,
//     ColumnOrderState,
//     getCoreRowModel,
//     getExpandedRowModel,
//     getGroupedRowModel,
//     getSortedRowModel,
//     useReactTable,
//     SortingState,
//     ColumnDef,
//     ColumnFiltersState,
//     FilterFn,
// } from "@tanstack/react-table";
// import TableDisplayComponent from "./TableDisplayComponent";
// import { generateNestedColumns } from "./GenerateNestedColumns";
// import DragAndDropComponent from "./DragAndDropComponent";
// import SelectDataSource from "./SelectDataSource";
// import { FncChooseTable } from "./FncChooseTable";
// import useStateHooks from "../../../FRANK/Components/useStateHooks";
// import { useSortingStore } from "./reportBuilderHooks";
// import useTable from "./useTable";
// import {
//     Box,
//     Checkbox,
//     CheckboxGroup,
//     Grid,
//     GridItem,
//     SimpleGrid,
//     Stack,
// } from "@chakra-ui/react";

// import {
//     RankingInfo,
//     rankItem,
//     compareItems,
// } from "@tanstack/match-sorter-utils";
// import { Button } from "antd";
// import { GenerateArrayForFilter } from "./GenerateArrayForFilter";
// import PopoverComponent from "./PopoverComponent";

// interface DynamicDataProps {
//     data?: any[];
// }

// const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
//     // Rank the item
//     const itemRank = rankItem(row.getValue(columnId), value)

//     // Store the itemRank info
//     addMeta({
//         itemRank,
//     })

//     // Return if the item should be filtered in/out
//     return itemRank.passed
// }


// //WORKING

// // const ReportBuilder: React.FC<DynamicDataProps> = () => {
// //     // const { sorting, setSorting } = useSortingStore()

// //     const [selectedRowDrop, setSelectedRowDrop] = useState<string[]>([]);
// //     const [selectedColumnDrop, setSelectedColumnDrop] = useState<string[]>([]);
// //     const [selectedValueDrop, setSelectedValueDrop] = useState<string[]>([]);
// //     const [selectedFilterDrop, setSelectedFilterDrop] = useState<string[]>([]);
// //     const [selectedValue, setSelectedValue] = useState<any[]>([]);
// //     const [selectedColumn, setSelectedColumn] = useState<any[]>([]);
// //     const [selectedRow, setSelectedRow] = useState<any[]>([]);
// //     const [grouping, setGrouping] = useState<GroupingState>([]);
// //     const [expanded, setExpand] = useState<ExpandedState>({});
// //     const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
// //     const [sorting, setSorting] = useState<SortingState>([]);
// //     // const [filteredItem, setFilteredItem] = useState<ColumnFiltersState>([]);
// //     const [columnData, setColumnData] = useState<any[]>([]);
// //     const [dataForDragDrop, setDataForDragDrop] = useState<any[]>([]);
// //     const [itemToFilter, setItemToFilter] = useState<any[]>([]);
// //     const [legitFilter, setLegitFilter] = useState<any[]>([])
// //     const handleRow = (item: { name: string }) => {
// //         if (!selectedRow.includes(item.name)) {
// //             // If it doesn't exist, add it to selectedRow
// //             setSelectedRowDrop([...selectedRowDrop, item.name]);
// //             setSelectedRow([...selectedRow, item.name]);
// //         }
// //     };
// //     const handleColumn = (item: { name: string }) => {
// //         if (!selectedColumnDrop.includes(item.name)) {
// //             setSelectedColumnDrop([...selectedColumnDrop, item.name]);
// //             setSelectedColumn([...selectedColumn, item.name]);
// //         }
// //     };

// //     const handleValue = (item: { name: string }) => {
// //         setSelectedValueDrop([item.name]);
// //         setSelectedValue([item.name]);
// //     };

// //     const handleFilter = (item: { name: string }) => {
// //         if (!selectedFilterDrop.includes(item.name)) {
// //             setSelectedFilterDrop([...selectedFilterDrop, item.name])
// //         }
// //     };

// //     const handleClear = () => {
// //         setSelectedRowDrop([]);
// //         setSelectedRow([]);
// //         setSelectedColumnDrop([]);
// //         setSelectedColumn([]);
// //         setSelectedValueDrop([]);
// //         setSelectedFilterDrop([]);
// //         setSelectedValue([]);
// //         setSorting([]);
// //         setGrouping([]);
// //         setColumnData([]);
// //     };

// //     useEffect(() => {
// //         setGrouping(selectedRowDrop);
// //         setColumnOrder([...selectedRowDrop, ...columnOrder]);
// //     }, [selectedRow, selectedRowDrop]);

// //     useEffect(() => {
// //         setSelectedColumn(selectedColumnDrop);
// //     }, [selectedColumnDrop]);

// //     //#region  TRY MULTIPLE LAYERED COLUMNS
// //     const ultraDynamicColumns: ColumnDef<any>[] = useMemo(() => {
// //         return [
// //             ...(selectedRow[0] !== "" && selectedRow.length > 0
// //                 ? selectedRow.map((item) => ({
// //                     id: item?.toString(),
// //                     header: item?.toString(),
// //                     accessorKey: item?.toString(),
// //                     sortingFn: (rowA: any, rowB: any, columnId: any) => {
// //                         // Assuming columnId corresponds to 'yearNMonthSale'
// //                         const valueA = rowA.getValue(columnId) || "";
// //                         const valueB = rowB.getValue(columnId) || "";
// //                         const months: any[] = [
// //                             2021,
// //                             2022,
// //                             2023,
// //                             2024,
// //                             2025,
// //                             2026,
// //                             "JANUARY",
// //                             "FEBRUARY",
// //                             "MARCH",
// //                             "APRIL",
// //                             "MAY",
// //                             "JUNE",
// //                             "JULY",
// //                             "AUGUST",
// //                             "SEPTEMBER",
// //                             "OCTOBER",
// //                             "NOVEMBER",
// //                             "DECEMBER",
// //                             "BT",
// //                             "CLBZT",
// //                             "CLT1",
// //                             "CLT2",
// //                             "CVIT",
// //                             "MCET",
// //                             "MCT",
// //                             "MMRPT",
// //                             "MNT",
// //                             "MWT",
// //                             "NCT1",
// //                             "NCT2",
// //                             "NCT3",
// //                             "VCT",
// //                             "VET",
// //                             "VWT1",
// //                             "VWT2",
// //                             "OS",
// //                         ];
// //                         const monthA: number = months.indexOf(valueA);
// //                         const monthB: number = months.indexOf(valueB);
// //                         return monthA - monthB;
// //                     },
// //                 }))
// //                 : []),
// //             ...(selectedColumn.length > 0
// //                 ? generateNestedColumns(
// //                     selectedColumn,
// //                     columnData,
// //                     selectedColumn,
// //                     selectedValue
// //                 )
// //                 : []),
// //         ];
// //     }, [columnData, selectedRow, selectedColumn, selectedValue]);
// //     //#endregion

// //     // useEffect(() => {
// //     //     GenerateArrayForFilter(selectedFilterDrop, columnData)
// //     // }, [columnData, selectedFilterDrop])

// //     //#region FOR DATA SOURCE DROPDOWN


// //     const options = [
// //         { value: "nsSummaryCompany", label: "NEW SALES OVER QOUTA" },
// //         { value: "nsPassFailed", label: "NEW SALES PASS/FAILED" },
// //         { value: "nsClassification", label: "NEW SALES CLASSIFICATION" },
// //         { value: "nsPersistency", label: "NS PERSISTENCY COLLECTION" },
// //         { value: "colGrossCol", label: "GROSS COLLECTION" },
// //         { value: "colMovementOfAccountsData", label: "MOVEMENT OF ACCOUNTS" },
// //     ];
// //     const handleTableSelect = (value: string) => {
// //         FncChooseTable(value, setColumnData, setDataForDragDrop, tableConfig);

// //     };
// //     // console.log(columnData)
// //     const { nsSummaryCompData, nsPassFailedData, nsClassificationData,  } = useStateHooks();
// //     const tableConfig: any = {
// //         nsSummaryCompany: nsSummaryCompData,
// //         nsCompany: nsSummaryCompData,
// //         nsPassFailed: nsPassFailedData,
// //         // Add other table configurations...
// //     };

// //     //#endregion FOR DATA SOURCE DROPDOWN

// //     const table = useTable({
// //         data: columnData,
// //         columns: ultraDynamicColumns,
// //         columnOrder,
// //         grouping,
// //         sorting,
// //         // filteredItem,
// //         expanded,
// //         setColumnOrder,
// //         setSorting,
// //         setGrouping,
// //         setExpand,
// //         // setFilteredItem,
// //         fuzzyFilter,
// //     });

// //     // console.log('eyyy',table.getRowModel().rows[2].getAllCells().map(i => i.getContext().cell.getContext()))
// //     // console.log(table.getAllFlatColumns()[0].getFacetedRowModel())

// //     const [checkedValues, setCheckedValues] = useState([]);

// //     // const handleCheckboxChange = (newCheckedValues: string[]) => {
// //     //     setCheckedValues(newCheckedValues);
// //     //     console.log('Checked values:', newCheckedValues);
// //     // };

// //     const handleCheckboxChange = (newCheckedValues: any) => {
// //         const newValueObject = { id: 'YRSALE', value: newCheckedValues };
// //         // setCheckedValues([newValueObject]); // This line replaces the entire array with a new one containing only newValueObject
// //         // setFilteredItem(newCheckedValues)
// //         // console.log(newCheckedValues, 'newChecked')
// //         // console.log('Checked values:', [newValueObject]);
// //     };


// //     //   console.log(table.getAllColumns())

// //     const filteredColumnData = columnData.filter(item => item.agentType !== 'OLD' && item.territoryCode === 'BT');


// //     useEffect(() => {  //THIS IS FOR DISPLAY OF FILTER INSIDE THE FILTER DROP BOX
// //         // Clear previous items before adding new ones
// //         setItemToFilter([]);

// //         selectedFilterDrop.forEach(i => {

// //             setItemToFilter(prevItemToFilter => {
// //                 const uniqueValues = Array.from(new Set(dataForDragDrop.map(item => item[i])));
// //                 return [...prevItemToFilter, {
// //                     title: i,
// //                     values: uniqueValues
// //                 }];
// //             });
// //         });
// //     }, [selectedFilterDrop]);

// //     useEffect(() => {
// //         // const filteredColumnData = dataForDragDrop.filter(f => {
// //         //     // Constructing the condition dynamically
// //         //     const condition = legitFilter.map(filterItem => {
// //         //       // For each filter item, check if the property value matches any of the values in the array
// //         //       return filterItem.value.map((value : any) => `f['${filterItem.id}'] === '${value}'`).join(' || ');
// //         //     }).join(' && '); // Join conditions with '&&' to ensure all conditions are met

// //         //     // Evaluating the condition
// //         //     return eval(condition);
// //         //   });

// //         //   setColumnData(filteredColumnData)
// //         if (legitFilter.length === 0) {
// //             // If any filterItem has an empty value array, set columnData to dataForDragDrop
// //             setColumnData(dataForDragDrop);
// //         } else {
// //             const filteredColumnData = dataForDragDrop.filter(f => {
// //                 // Constructing the condition dynamically
// //                 const condition = legitFilter.map(filterItem => {
// //                     // For each filter item, check if the property value matches any of the values in the array
// //                     return filterItem.value.map((value: any) => `f['${filterItem.id}'] === '${value}'`).join(' || ');
// //                 }).join(' && '); // Join conditions with '&&' to ensure all conditions are met

// //                 // Evaluating the condition
// //                 return eval(condition);
// //             });

// //             setColumnData(filteredColumnData);
// //         }

// //         // setColumnData(dataForDragDrop.filter(item => item.regionCode ==='CLT1-1' && item.territoryCode === 'BT'))
// //     }, [legitFilter])

// //     // console.log('FILTERSSS', itemToFilter)
// //     // console.log(' LEGIT FILTERSSS', legitFilter)
// //     const [existing, setExisting] = useState<any>()

// //     // console.log('legitfilter', legitFilter)
// //     // console.log('asd',dataForDragDrop.filter(i => i.territoryCode === 'BT' || i.regionCode === 'CL1-1'))

// //     const array = [
// //         { territoryCode: 'BT', regionCode: 'BT1' },
// //         { territoryCode: 'BT', regionCode: 'BT2' },
// //         { territoryCode: 'CLT', regionCode: 'CLT1' },
// //         { territoryCode: 'CLT', regionCode: 'CLT2' },
// //     ]

// //     console.log('rows', table.getRowModel())
// //     console.log('columns', table.getAllColumns())
// //     return (
// //         <>
// //             {/* {JSON.stringify(filteredItem)} */}
// //             {/* <div style={{}}> */}
// //             {/* <CheckboxGroup
// //                     colorScheme='green'
// //                     defaultValue={checkedValues}
// //                     onChange={(values) => handleCheckboxChange(values.toString())}
// //                     >
// //                     <Stack spacing={[1, 5]} direction={['column', 'row']}>
// //                         <Checkbox value='2022'>2022</Checkbox>
// //                         <Checkbox value='2023'>2023</Checkbox>
// //                         <Checkbox value='2024'>2024</Checkbox>
// //                         <Checkbox value='6022'>6022</Checkbox>
// //                         <Checkbox value='10206'>10206</Checkbox>
// //                     </Stack>
// //                 </CheckboxGroup> */}
// //             {/* <Button onClick={() =>
// //                     // setFilteredItem([{id : 'territoryCode', value : ['BT', 'CLBZT']}])
// //                     setColumnData(dataForDragDrop.filter(item => item.regionCode ==='CL1-1' || item.territoryCode === 'BT'))

// //                 }>
// //                     Click here
// //                 </Button>  */}

// //             {/* <SimpleGrid
// //                     templateColumns={{
// //                         sm: "1fr",
// //                         md: "1fr",
// //                         lg: "1fr 450px",
// //                     }}
// //                 > */}
// //             <Grid templateColumns="repeat(12, 1fr)" maxWidth="99%" m={"0.5em"}>
                
// //                 <GridItem colSpan={{ base: 12, sm: 12, md: 12, lg: 8 }}>
// //                 {itemToFilter.map((item: any, index: any) => (
// //                     <PopoverComponent
// //                         title={item.title}
// //                         key={index}
// //                         checkedArray={(e) => {
// //                             const existingItemIndex = legitFilter.findIndex(
// //                                 (existingItem) => existingItem.id === item.title
// //                             )
// //                             console.log('exist', existingItemIndex)
// //                             setExisting(existingItemIndex)
// //                             // columnData.filter(item => item.agentType !== 'OLD' && item.territoryCode === 'BT');
// //                             const filtered = columnData.filter(f => f[item.title] === e[0])
// //                             const filteredColumnData = dataForDragDrop.filter(f => {
// //                                 // Constructing the condition dynamically
// //                                 const condition = e.map(value => `f['${item.title}'] === '${value}'`).join(' || ');

// //                                 // Evaluating the condition
// //                                 return eval(condition);
// //                             });
// //                             // setColumnData(filtered)
// //                             console.log('ngek', filtered)
// //                             console.log(e)
// //                             if (existingItemIndex !== -1) {
// //                                 // Update the value property
// //                                 const updatedFilCol = legitFilter.map(
// //                                     (existingItem, index) => {
// //                                         if (index === existingItemIndex) {
// //                                             // Check if the value is an empty array, and remove the item if it is
// //                                             if (Array.isArray(e) && e.length === 0) {
// //                                                 return null // This will remove the item from the array
// //                                             }
// //                                             return { ...existingItem, value: e }
// //                                         }
// //                                         return existingItem
// //                                     }
// //                                 )
// //                                 // Filter out items that are not null (i.e., those with non-empty values)
// //                                 const filteredItemsWithoutNull: any =
// //                                     updatedFilCol.filter((item) => item !== null)
// //                                 setLegitFilter(filteredItemsWithoutNull)

// //                             } else {
// //                                 // Add a new item to filteredItem if it doesn't exist
// //                                 if (!(Array.isArray(e) && e.length === 0)) {
// //                                     setLegitFilter([
// //                                         ...legitFilter,
// //                                         { id: item.title, value: e },
// //                                     ])


// //                                 }
// //                             }
// //                             // console.log(item.title)
// //                         }}
// //                         options={item.values}
// //                     />
// //                 ))}
// //                     <Box overflowX={"auto"}>
// //                         <Box h={"50vh"} overflowX="auto">
// //                             <TableDisplayComponent table={table} />
// //                         </Box>
// //                     </Box>
// //                 </GridItem>
// //                 <GridItem
// //                     colSpan={{ base: 12, sm: 12, md: 12, lg: 4 }}
// //                     bg={"white"}
// //                     margin={"0.5rem"}
// //                     borderRadius={10}
// //                 >
// //                     <Box margin={"1em"}>
// //                         <SelectDataSource
// //                             options={options}
// //                             onChange={(value) => {
// //                                 handleTableSelect(value);
// //                             }}
// //                         />
// //                         <DragAndDropComponent
// //                             handleClear={handleClear}
// //                             data={dataForDragDrop}
// //                             handleRow={handleRow}
// //                             handleColumn={handleColumn}
// //                             handleValue={handleValue}
// //                             handleFilter={handleFilter}
// //                             selectedRowDrop={selectedRowDrop}
// //                             selectedColumnDrop={selectedColumnDrop}
// //                             selectedValueDrop={selectedValueDrop}
// //                             selectedFilterDrop={selectedFilterDrop}
// //                             setSelectedRowDrop={setSelectedRowDrop}
// //                             setSelectedColumnDrop={setSelectedColumnDrop}
// //                             setSelectedFilterDrop={setSelectedFilterDrop}
// //                             setSorting={setSorting}
// //                         />
// //                     </Box>
// //                 </GridItem>
// //             </Grid>

// //         </>
// //     );
// // };
// // export default ReportBuilder;