import { SaveOutlined } from "@ant-design/icons";

import { Row, Tooltip, Typography } from "antd";
import { SavedQuery } from "../../../interface";
import QContentBox from "../../Common/QContentBox";

export interface HistoryViewProps {
    className?: string;
    queryList: SavedQuery[];
    onQueryClick: (value: string) => void;
}

const SavedQueryView: React.FC<HistoryViewProps> = ({
    className,
    queryList,
    onQueryClick,
}) => {
    return (
        <QContentBox
            className={className}
            header={
                <div className="flex justify-center items-center">
                    <Typography.Title level={3} className="text-white">
                        Saved Queries
                    </Typography.Title>
                </div>
            }
        >
            {queryList.length ? (
                queryList.map((savedQuery) => {
                    return (
                        <Row
                            className="flex w-full bg  px-4 py-2 cursor-pointer flex-nowrap border-b hover:bg-secondary-shade"
                            onClick={() => {
                                onQueryClick(savedQuery.query);
                            }}
                        >
                            <SaveOutlined style={{ fontSize: "1.5rem" }} />
                            <div className="ml-4  overflow-hidden">
                                <Tooltip
                                    mouseEnterDelay={2}
                                    title={savedQuery.title}
                                >
                                    <Typography.Text
                                        strong
                                        className="block truncate"
                                    >
                                        {savedQuery.title}
                                    </Typography.Text>
                                </Tooltip>
                                <Typography.Text className="block text-slate-600 ">
                                    {savedQuery.category}
                                </Typography.Text>
                            </div>
                        </Row>
                    );
                })
            ) : (
                <Row className="flex justify-center align center h-full">
                    <SaveOutlined
                        style={{ fontSize: "10rem", color: "#ebecf2" }}
                    />
                </Row>
            )}
        </QContentBox>
    );
};

export default SavedQueryView;
