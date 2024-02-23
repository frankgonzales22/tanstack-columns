import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';

interface DataType {
    key: React.Key;
    name: string;
    platform: string;
    version: string;
    upgradeNum: number;
    creator: string;
    createdAt: string;
}

interface ExpandedDataType {
    key: React.Key;
    date: string;
    name: string;
    upgradeNum: string;
}

const items = [
    { key: '1', label: 'Action 1' },
    { key: '2', label: 'Action 2' },
];

const Expand: React.FC = () => {
    const expandedRowRender = () => {
        // const columns: TableColumnsType<ExpandedDataType> = [
        //     { title: 'Date', dataIndex: 'date', key: 'date' },
        //     { title: 'Name', dataIndex: 'name', key: 'name' },
        //     { title: 'Status', key: 'dates', },

        // ];
        const columns: TableColumnsType<DataType> = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Platform', dataIndex: 'platform', key: 'platform' },
            { title: 'Version', dataIndex: 'version', key: 'version' },

        ];

        const data: DataType[] = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                name: 'Screen',
                platform: 'iOS',
                version: '10.3.4.5654',
                upgradeNum: 500,
                creator: 'Jack',
                createdAt: '2014-12-24 23:12:00',
            });
        }
        // const data = [];
        // for (let i = 0; i < 3; ++i) {
        //     data.push({
        //         key: i.toString(),
        //         date: '2014-12-24 23:12:00',

        //         name: `${i} gag`,
        //         upgradeNum: 'Upgraded: 56',
        //     });
        // }

        const COLUMNS = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Platform', dataIndex: 'platform', key: 'platform' },
            { title: 'Version', dataIndex: 'version', key: 'version' },
        ];
        const columnWidth = 100 / (COLUMNS!.length);

        // return <Table columns={columns} dataSource={data} pagination={false} />;
        return (
            <Table dataSource={data} pagination={false} bordered showHeader={false}>
                {
                    COLUMNS!.map((col) => (
                        <Column
                            // align="right"
                            key={col.dataIndex}
                            title={col.title}
                            dataIndex={col.dataIndex}
                            sorter={(a: any, b: any) => a[col.dataIndex] - b[col.dataIndex]}
                            width={columnWidth + "%"}
                            render={(text, record) => (
                                <span >
                                    {text}
                                </span>
                            )}
                        />
                    ))
                }
            </Table>

        )

    };

    const columns: TableColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Platform', dataIndex: 'platform', key: 'platform' },
        { title: 'Version', dataIndex: 'version', key: 'version' },

    ];


    const COLUMNS = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Platform', dataIndex: 'platform', key: 'platform' },
        { title: 'Version', dataIndex: 'version', key: 'version' },
    ];

    const data: DataType[] = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i.toString(),
            name: 'Screen',
            platform: 'iOS',
            version: '10.3.4.5654',
            upgradeNum: 500,
            creator: 'Jack',
            createdAt: '2014-12-24 23:12:00',
        });
    }
    console.log(expandedRowRender())
    const columnWidth = 100 / (COLUMNS!.length);
    console.log(COLUMNS.length)

    return (
        <>
            {/* <Table
                columns={columns}
                expandable={{ expandedRowRender }}
                dataSource={data}
            /> */}


            <Table
                // columns={columns}
                expandable={{ expandedRowRender }}
                dataSource={data}
            >
                {COLUMNS!.map((col) => (
                    <Column
                        // align="right"
                        key={col.dataIndex}
                        title={col.title}
                        dataIndex={col.dataIndex}
                        sorter={(a: any, b: any) => a[col.dataIndex] - b[col.dataIndex]}
                        width={columnWidth + "%"}
                        render={(text, record) => (
                            <span >
                                {text}
                            </span>
                        )}
                    />
                ))}

            </Table>



            {/* <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
        size="middle"
      />
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
        size="small"
      /> */}
        </>
    );
};

export default Expand;