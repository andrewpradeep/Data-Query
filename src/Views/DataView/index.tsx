import { useState } from "react";

import QTable from "../../Components/QTable";
import { Button } from "antd";
import { PieChartOutlined, TableOutlined } from "@ant-design/icons";
import { DataViewProps, DataViewType } from "./interface";
import GraphView from "../GraphView";

const DataView: React.FC<DataViewProps> = ({ dataSet }) => {
    const [view, setView] = useState(DataViewType.Table);
    return (
        <div className="flex flex-col border rounded p-2">
            <div className="flex p-2">
                <Button
                    className="mx-2"
                    type={view === DataViewType.Table ? "primary" : "default"}
                    icon={<TableOutlined />}
                    onClick={() => {
                        setView(DataViewType.Table);
                    }}
                >
                    Table View
                </Button>
                <Button
                    type={view === DataViewType.Insight ? "primary" : "default"}
                    onClick={() => {
                        setView(DataViewType.Insight);
                    }}
                    className="mx-2"
                    icon={<PieChartOutlined />}
                >
                    Insight View
                </Button>
            </div>

            <div className="mt-4 p-3">
                {view === DataViewType.Table && (
                    <QTable dataSource={dataSet} bordered className="mx-3" />
                )}
                {view === DataViewType.Insight && (
                    <GraphView dataList={dataSet} />
                )}
            </div>
        </div>
    );
};

export default DataView;
