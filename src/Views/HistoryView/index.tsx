import { HistoryOutlined } from "@ant-design/icons";
import QContentBox from "../../Components/QContentBox";
import { Row, Tooltip, Typography } from "antd";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

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
                <>
                    <HistoryOutlined
                        style={{ color: "#ffffff" }}
                        className="mr-2"
                    />
                    <Typography.Text className="text-white">
                        History
                    </Typography.Text>
                </>
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
                        <HistoryOutlined
                            style={{
                                color: fullConfig.theme.colors["primary-green"],
                            }}
                        />
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
