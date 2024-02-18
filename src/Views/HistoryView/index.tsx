import { HistoryOutlined } from "@ant-design/icons";
import QContentBox from "../../Components/QContentBox";
import { Row, Tooltip, Typography } from "antd";

export interface HistoryViewProps {
    className?: string;
    historyList: string[];
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
                        className="flex bg my-2 cursor-pointer flex-nowrap"
                        onClick={() => {
                            onHistoryClick(history);
                        }}
                    >
                        <HistoryOutlined />
                        <Tooltip>
                            <Typography.Text className="ml-2 hover:text-primary-green   truncate">
                                {history}
                            </Typography.Text>
                        </Tooltip>
                    </Row>
                );
            })}
        </QContentBox>
    );
};

export default HistoryView;
