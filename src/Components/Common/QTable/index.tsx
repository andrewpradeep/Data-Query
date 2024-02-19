import { Table, TableProps, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { Key } from "react";

const QTable: React.FC<TableProps> = ({ dataSource = [], ...rest }) => {
    const columns: ColumnsType = Object.keys(dataSource?.[0]).map((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const distinct: any[] = [];

        for (let i = 0; i < dataSource.length; i++) {
            if (!distinct.includes(dataSource[i][key])) {
                distinct.push(dataSource[i][key]);
            }
        }

        const filters = distinct.map((value) => {
            return { text: value, value };
        });

        return {
            title: () => {
                return (
                    <>
                        <Typography.Text>{key}</Typography.Text>
                    </>
                );
            },
            dataIndex: key,
            key: key,
            sorter: (a: unknown, b: unknown) => {
                const obj1 = a as Record<string, string | number>;
                const obj2 = b as Record<string, string | number>;
                if (obj1[key] < obj2[key]) return -1;
                if (obj2[key] < obj1[key]) return 1;
                return 0;
            },
            filters,

            onFilter: (value: boolean | Key, record: unknown) => {
                return (
                    (record as Record<string, string>)[key].indexOf(
                        value as string
                    ) === 0
                );
            },
        };
    });
    return (
        <div className="w-62">
            <Table
                virtual
                pagination={false}
                scroll={{ x: 2000, y: 400 }}
                dataSource={dataSource}
                rowKey={"customerID"}
                columns={columns}
                {...rest}
            />
        </div>
    );
};

export default QTable;
