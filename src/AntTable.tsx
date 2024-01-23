import React from 'react';
import { Table } from 'antd';


const { Column, ColumnGroup } = Table;

interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    tags: string[];
}

const data: DataType[] = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];


const COLUMNGROUP =
    ['COMMISIONABLE', 'NON-COMMISIONABLE']

const COMLUMNS =
    [
        { column: 'CVE', dataKey: 'CVECOM', parent: 'COMMISIONABLE' }, ,
        { column: 'ADE', parent: 'COMMISIONABLE' },
        { column: 'LAPSE LIMIT', parent: 'COMMISIONABLE' },

        { column: 'CVE', parent: 'NON-COMMISIONABLE' },
        { column: 'ADE', parent: 'NON-COMMISIONABLE' },
        { column: 'LAPSE LIMIT', parent: 'NON-COMMISIONABLE' },
    ]


const AntTable: React.FC = () => (
    // <Table dataSource={data} pagination={false} bordered>
    //      <Column title='MONTH' dataIndex="age" key="age" className='' />
    //     <ColumnGroup title="COMMISIONABLE" className='tableHeader' >   
    //         <Column title="CVE" dataIndex="firstName" key="firstName" />
    //         <Column title="ADE" dataIndex="lastName" key="lastName" />
    //         <Column title="LAPSE LIMIT" dataIndex="address" key="address" />
    //     </ColumnGroup>
    //     <ColumnGroup title="NON-COMMISIONABLE" className='tableHeader'>
    //         <Column title="CVE" dataIndex="firstName" key="firstName" />
    //         <Column title="ADE" dataIndex="lastName" key="lastName" />
    //         <Column title="LAPSE LIMIT" dataIndex="address" key="address" />
    //     </ColumnGroup>
    // </Table>
    <Table dataSource={data} pagination={false} bordered>
    <Column title="MONTH" dataIndex="age" key="age" className=""
      sorter={(a: any, b: any) => a.age - b.age}
    />
    {COLUMNGROUP.map((group) => (
      <ColumnGroup key={group} title={group} className="tableHeader">
        {(COMLUMNS.filter((col) => col?.parent === group) as {
          column: string; 
          dataKey?: string;
        }[]).map((col) => (
          <Column
            key={col.dataKey}
            title={col.column}
            dataIndex={col.dataKey || col.column.toLowerCase()}
            sorter={(a: any, b: any) =>
              a[col.dataKey || col.column.toLowerCase()] - b[col.dataKey || col.column.toLowerCase()]
            }
          />
        ))}
      </ColumnGroup>
    ))}
  </Table>

);

export default AntTable;
