import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import DynamicTableTry from './DynamicTableTry.tsx'
import InputOTPPage from './OTP.tsx'
import CustomizeDynamicTable from './CustomizeDynamicTable.tsx'
import summaryCompData from './datas/new_sales_data.ts'
import summaryCompData1 from './datas/summaryComp.ts'
import AntTable from './AntTable.tsx'

const yourData = [
  { category: 'A', value: 10, date: '2023-01-01' },
  { category: 'A', value: 10, date: '2023-01-01' },
  { category: 'B', value: 20, date: '2023-01-02' },
  { category: 'C', value: 60, date: '2023-01-01' },
  { category: 'C', value: 50, date: '2023-01-04' },
  { category: 'C', value: 50, date: '2023-01-04' },
  { category: 'D', value: 910, date: '2023-01-01' },
  { category: 'C', value: 330, date: '2023-01-03' },
];

const data = summaryCompData

const quota = summaryCompData1
// console.log(quota)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    {/* <DynamicTableTry /> */}
    {/* <InputOTPPage /> */}
    <CustomizeDynamicTable data={quota} />
  {/* <AntTable />   */}
  </>,
)
