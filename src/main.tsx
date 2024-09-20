
import ReactDOM from 'react-dom/client'

// import FinalDrop from './DragNDrop/FinalDrop.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import CustomizeDynamicTable from './CustomizeDynamicTable.tsx'
import { newsales } from './datas/newsales.ts'
import AReact from './AReactDnd/AReact.tsx'
import MultiLayeredColumn from './MultiLayeredColumn.tsx'
import AMultiLayeredColumn from './AReactDnd/AMultLayeredWithRearrange.tsx'
import AAntDesign from './AReactDnd/AAntDesign.tsx'
import AMultiAndtD from './AReactDnd/AMultiAntD.tsx'
import Awit from './Practice/Awit.tsx'
import Expand from './ExpandableRow/Expand.tsx'
import ReactAnt from './ANT D WITH REACT-TABLE/ReactAnt.tsx'
import App from './App.tsx'
import AntTable from './AntTable.tsx'

import ReportBuilder from './ReportBuilder/ReportBuilder.tsx'
import CustomTable from './CustomTable.tsx'
import { Transaction } from './PAYNAMICS/Transaction.tsx'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { fetchSummary } from './API/api.ts'
import NewReportBuilder from './ReportBuilder/NewReportBuilder.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import MyTable from './ANT D WITH REACT-TABLE/MyTable.tsx'
import CombinedData from './ANT D WITH REACT-TABLE/CombinedData.tsx'

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
  // ns_Total: item.ns_Total,
}));
// console.log(modifiedItems)
const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ChakraProvider>

      <QueryClientProvider client={queryClient}>


        <DndProvider backend={HTML5Backend}>

          {/* <MultiLayeredColumn data={yourData} /> */}
          {/* <AMultiLayeredColumn data={data} /> */}
          {/* <AReact /> */}

          {/* <AAntDesign /> */}

          {/* <AMultiAndtD data={newsales}/> */}

          {/* <Awit /> */}
          {/* <Expand /> */}
          {/* <ReactAnt /> */}
          {/* <App /> */}
          {/* <Orgynized data={newsales}/> */}
          {/* <CustomTable /> */}
          {/* <ReportBuilder data={newsales} /> */}
          {/* <Transaction /> */}
          <NewReportBuilder />
          {/* <CombinedData /> */}
          {/* <MyTable /> */}
        </DndProvider>
      </QueryClientProvider>
    </ChakraProvider>


  </>,
)
