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
                <div className="flex justify-between px-4 items-center">
                    <Typography.Title level={3} className="mt-2 truncate">
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
                                        className=" text-lg block truncate"
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
                <Row className="flex flex-col justify-center items-center h-full">
                    <SaveOutlined
                        style={{ fontSize: "6rem", color: "#ebecf2" }}
                    />
                    <Typography.Text className="mt-2 block font-semibold text-slate-300">
                        Saved Queries
                    </Typography.Text>
                </Row>
            )}
        </QContentBox>
    );
};

export default SavedQueryView;
