
import ReactDOM from 'react-dom/client'

import summaryCompData from './datas/new_sales_data.ts'
import summaryCompData1 from './datas/summaryComp.ts'
import AntTable from './AntTable.tsx'
import FinalDrop from './DragNDrop/FinalDrop.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TryExpand from './DragNDrop/TryExpand.tsx'
import CustomizeDynamicTable from './CustomizeDynamicTable.tsx'
import { newsales } from './datas/newsales.ts'
import MultiLayeredColumn from './MultiLayeredColumn.tsx'

const yourData = [
  { category: 'A', value: 10, date: '2023-01-01' },
  { category: 'A', value: 10, date: '2023-01-01' },
  { category: 'B', value: 20, date: '2023-01-02' },
  { category: 'C', value: 60, date: '2023-01-01' },
  { category: 'C', value: 30, date: '2023-01-01' },
  { category: 'C', value: 40, date: '2023-01-01' },
  { category: 'C', value: 50, date: '2023-01-01' },
  { category: 'C', value: 70, date: '2023-01-01' },
  { category: 'C', value: 80, date: '2023-01-04' },
  { category: 'C', value: 50, date: '2023-01-04' },
  { category: 'D', value: 910, date: '2023-01-01' },
  { category: 'D', value: 920, date: '2023-01-01' },
  { category: 'D', value: 110, date: '2023-01-01' },
  { category: 'C', value: 330, date: '2023-01-03' },
];

const data = summaryCompData

const quota = summaryCompData1
// console.log(quota)
const newsale = newsales


const item = [
  {
    header: 'frank', id: 'column_frank', accessorKey: 'column_frank',
    columns: [
      [
        {
          header: 23,
          id: "column_frank_column_23",
          accessorKey: "column_frank_column_23"
        },
        {
          header: 25,
          id: "column_frank_column_25",
          accessorKey: "column_frank_column_25"
        },
        {
          header: 24,
          id: "column_frank_column_24",
          accessorKey: "column_frank_column_24"
        },
        {
          header: 22,
          id: "column_frank_column_22",
          accessorKey: "column_frank_column_22"
        },
        {
          header: 21,
          id: "column_frank_column_21",
          accessorKey: "column_frank_column_21"
        },
      ]
    ]
  },
  {
    header: 'baldwin', id: 'column_baldwin', accessorKey: 'column_baldwin',
    columns: [
      [
        {
          header: 23,
          id: "column_baldwin_column_23",
          accessorKey: "column_baldwin_column_23"
        },
        {
          header: 25,
          id: "column_baldwin_column_25",
          accessorKey: "column_baldwin_column_25"
        },
        {
          header: 24,
          id: "column_baldwin_column_24",
          accessorKey: "column_baldwin_column_24"
        },
        {
          header: 22,
          id: "column_baldwin_column_22",
          accessorKey: "column_baldwin_column_22"
        },
        {
          header: 21,
          id: "column_baldwin_column_21",
          accessorKey: "column_baldwin_column_21"
        },
      ]
    ]
  },
  {
    header: 'cyrel', id: 'column_cyrel', accessorKey: 'column_cyrel',
    columns: [
      [
        {
          header: 23,
          id: "column_cyrel_column_23",
          accessorKey: "column_cyrel_column_23"
        },
        {
          header: 25,
          id: "column_cyrel_column_25",
          accessorKey: "column_cyrel_column_25"
        },
        {
          header: 24,
          id: "column_cyrel_column_24",
          accessorKey: "column_cyrel_column_24"
        },
        {
          header: 22,
          id: "column_cyrel_column_22",
          accessorKey: "column_cyrel_column_22"
        },
        {
          header: 21,
          id: "column_cyrel_column_21",
          accessorKey: "column_cyrel_column_21"
        },
      ]
    ]
  },


]





// console.log(newsale)
const modifiedItems: any[] = newsale.map((item) => ({
  territoryCode: item.territoryCode,
  regionCode: item.regionCode,
  areaCode: item.areaCode,
  ns_Total: item.ns_Total,
}));
// console.log(modifiedItems)
const testMultiLayer = [
  { name: 'frank', age: 23 },
  { name: 'cyrel', age: 23 },
  { name: 'cyrel', age: 25 },
  { name: 'baldwin', age: 24 },
  { name: 'frank', age: 24 },
  { name: 'baldwin', age: 22 },
  { name: 'frank', age: 22 },
  { name: 'baldwin', age: 21 }
]
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    {/* <DynamicTableTry /> */}
    {/* <InputOTPPage /> */}
    <DndProvider backend={HTML5Backend}>
      {/* <CustomizeDynamicTable data={newsale } /> */}
      <MultiLayeredColumn data={newsale} />
      {/* <TryExpand data={yourData}/> */}
      {/* <FinalDrop /> */}

    </DndProvider>

    {/* <AntTable />   */}
  </>,
)
