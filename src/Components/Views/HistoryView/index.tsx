import { HistoryOutlined } from "@ant-design/icons";

import { Row, Tooltip, Typography } from "antd";
import { SearchHistory } from "../../../interface";
import QContentBox from "../../Common/QContentBox";

export interface HistoryViewProps {
    className?: string;
    historyList: SearchHistory[];
    onHistoryClick: (value: string) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({
    className,
    historyList,
    onHistoryClick,
}) => {
    return (
        <QContentBox
            className={className}
            header={
                <div className="flex justify-center items-center">
                    <Typography.Title level={3} className="text-white">
                        History
                    </Typography.Title>
                </div>
            }
        >
            {historyList.map((history) => {
                return (
                    <Row
                        className="flex w-full bg  px-4 py-2 cursor-pointer flex-nowrap border-b hover:bg-secondary-shade"
                        onClick={() => {
                            onHistoryClick(history.search);
                        }}
                    >
                        <HistoryOutlined style={{ fontSize: "1.5rem" }} />
                        <div className="ml-4  overflow-hidden">
                            <Tooltip mouseEnterDelay={2} title={history.search}>
                                <Typography.Text
                                    strong
                                    className="block truncate"
                                >
                                    {history.search}
                                </Typography.Text>
                            </Tooltip>
                            <Typography.Text className="block text-slate-600 ">
                                {history.date.toDateString()}
                            </Typography.Text>
                        </div>
                    </Row>
                );
            })}
        </QContentBox>
    );
};

export default HistoryView;
