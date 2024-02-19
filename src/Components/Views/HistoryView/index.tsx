import {
    DeleteOutlined,
    HistoryOutlined,
    SearchOutlined,
} from "@ant-design/icons";

import { Button, Row, Tooltip, Typography } from "antd";
import { SearchHistory } from "../../../interface";
import QContentBox from "../../Common/QContentBox";

export interface HistoryViewProps {
    className?: string;
    historyList: SearchHistory[];
    onHistoryClick: (value: string) => void;
    onClearHistory: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({
    className,
    historyList,
    onHistoryClick,
    onClearHistory,
}) => {
    return (
        <QContentBox
            className={className}
            header={
                <div className="flex justify-between px-4 items-center">
                    <Typography.Title level={3} className="truncate mt-2">
                        History
                    </Typography.Title>
                    <Tooltip title={"clear history"}>
                        <Button
                            icon={<DeleteOutlined />}
                            size="small"
                            disabled={!historyList.length}
                            onClick={onClearHistory}
                        ></Button>
                    </Tooltip>
                </div>
            }
        >
            {historyList.length ? (
                historyList.map((history) => {
                    return (
                        <Row
                            className="flex w-full bg  px-4 py-2 cursor-pointer flex-nowrap border-b hover:bg-secondary-shade"
                            onClick={() => {
                                onHistoryClick(history.search);
                            }}
                        >
                            <HistoryOutlined style={{ fontSize: "1.5rem" }} />

                            <div className="ml-4  overflow-hidden">
                                <Tooltip
                                    mouseEnterDelay={2}
                                    title={history.search}
                                >
                                    <Typography.Text
                                        strong
                                        className="block text-lg truncate"
                                    >
                                        {history.search}
                                    </Typography.Text>
                                </Tooltip>
                                <Tooltip
                                    title={history.date.toDateString()}
                                    mouseEnterDelay={2}
                                >
                                    <Typography.Text className="block text-slate-600 truncate ">
                                        {history.date.toDateString()}
                                    </Typography.Text>
                                </Tooltip>
                            </div>
                        </Row>
                    );
                })
            ) : (
                <Row className="flex flex-col justify-center items-center h-full">
                    <SearchOutlined
                        style={{ fontSize: "6rem", color: "#ebecf2" }}
                    />
                    <Typography.Text className=" mt-2 block font-semibold text-slate-300">
                        Search History
                    </Typography.Text>
                </Row>
            )}
        </QContentBox>
    );
};

export default HistoryView;
