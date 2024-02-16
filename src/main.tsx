
import ReactDOM from 'react-dom/client'

// import FinalDrop from './DragNDrop/FinalDrop.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import CustomizeDynamicTable from './CustomizeDynamicTable.tsx'
import { newsales } from './datas/newsales.ts'
import AReact from './AReactDnd/AReact.tsx'
import MultiLayeredColumn from './MultiLayeredColumn.tsx'
import AMultiLayeredColumn from './AReactDnd/AMultLayeredWithRearrange.tsx'

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

// const data = summaryCompData

// const quota = summaryCompData1
// console.log(quota)
const newsale = newsales

// console.log(newsale)
const modifiedItems: any[] = newsale.map((item) => ({
  territoryCode: item.territoryCode,
  regionCode: item.regionCode,
  areaCode: item.areaCode,
  ns_Total: item.ns_Total,
}));
// console.log(modifiedItems)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>

    <DndProvider backend={HTML5Backend}>

      {/* <MultiLayeredColumn data={newsale} /> */}
      <AMultiLayeredColumn data={newsale} />
      <AReact />

    </DndProvider>

  </>,
)
