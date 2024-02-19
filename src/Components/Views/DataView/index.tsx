import { useState } from "react";

import { Button, Tooltip } from "antd";
import {
    DownloadOutlined,
    PieChartOutlined,
    TableOutlined,
} from "@ant-design/icons";
import { DataViewProps, DataViewType } from "./interface";
import GraphView from "../GraphView";
import QTable from "../../Common/QTable";

const DataView: React.FC<DataViewProps> = ({
    dataSet,
    className = "",
    onExportData,
}) => {
    const [view, setView] = useState(DataViewType.Table);
    return (
        <div className={`flex flex-col border rounded p-2 ${className}`}>
            <div className="flex justify-between p-2 w-full">
                <div className="flex">
                    <Button
                        className="mx-2"
                        type={
                            view === DataViewType.Table ? "primary" : "default"
                        }
                        icon={<TableOutlined />}
                        onClick={() => {
                            setView(DataViewType.Table);
                        }}
                    >
                        Table View
                    </Button>
                    <Button
                        type={
                            view === DataViewType.Insight
                                ? "primary"
                                : "default"
                        }
                        onClick={() => {
                            setView(DataViewType.Insight);
                        }}
                        className="mx-2"
                        icon={<PieChartOutlined />}
                    >
                        Insight View
                    </Button>
                </div>

                <Tooltip title="Export">
                    <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        onClick={onExportData}
                        aria-label="export data"
                        className="self-end"
                    />
                </Tooltip>
            </div>

            <div className="mt-2 p-4 grow">
                {view === DataViewType.Table && (
                    <QTable dataSource={dataSet} bordered className="mx-3" />
                )}
                {view === DataViewType.Insight && (
                    <GraphView
                        dataList={dataSet}
                        className="mx-3 mb-3 h-full"
                    />
                )}
            </div>
        </div>
    );
};

export default DataView;
