
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

const yourData = [
  { category: 'A', value: 10, date: '2023-01-01' },
  { category: 'A', value: 10, date: '2023-01-01' },
  { category: 'B', value: 20, date: '2023-01-02' },
  { category: 'C', value: 60, date: '2023-01-01' },
  { category: 'C', value: 60, date: '2023-01-01' },
  { category: 'C', value: 60, date: '2023-01-01' },
  { category: 'C', value: 60, date: '2023-01-01' },
  { category: 'C', value: 60, date: '2023-01-01' },
  { category: 'C', value: 50, date: '2023-01-04' },
  { category: 'C', value: 50, date: '2023-01-04' },
  { category: 'D', value: 910, date: '2023-01-01' },
  { category: 'D', value: 910, date: '2023-01-01' },
  { category: 'D', value: 910, date: '2023-01-01' },
  { category: 'C', value: 330, date: '2023-01-03' },
];

const data = summaryCompData

const quota = summaryCompData1
// console.log(quota)
const newsale = newsales



const modifiedItems: any[] = newsale.map((item) => ({
  territoryCode: item.territoryCode,
  regionCode: item.regionCode,
  areaCode: item.areaCode,
  ns_Total: item.ns_Total,
}));
console.log(modifiedItems)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    {/* <DynamicTableTry /> */}
    {/* <InputOTPPage /> */}
    <DndProvider backend={HTML5Backend}>
      <CustomizeDynamicTable data={newsale} />
      {/* <TryExpand data={yourData}/> */}
      {/* <FinalDrop /> */}

    </DndProvider>

    {/* <AntTable />   */}
  </>,
)
