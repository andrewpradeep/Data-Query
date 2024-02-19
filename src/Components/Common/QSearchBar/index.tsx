import React from "react";
import { Button, Input, Tooltip } from "antd";
import { TextAreaProps } from "antd/es/input";
import "./index.css";
import { SaveOutlined, SearchOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export interface SearchBarProps extends TextAreaProps {
    onQuerySave: (value: string) => void;
    onSearch: (value: string) => void;
    loading: boolean;
    actions?: React.ReactNode[];
}

const QSearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Search your data query",
    className,
    onQuerySave,
    onSearch,
    value = "",
    actions,
    ...rest
}) => {
    return (
        <>
            <div
                className={`flex flex-col border px-2 py-4 rounded bg-secondary-shade ${className}`}
            >
                <div className="flex flex-wrap mb-2 gap-3">
                    <Tooltip title={"Search"}>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            size="large"
                            onClick={() => {
                                onSearch(value as string);
                            }}
                            disabled={!(value as string).length}
                        ></Button>
                    </Tooltip>

                    <Tooltip title={"Save"}>
                        <Button
                            type="primary"
                            icon={<SaveOutlined />}
                            size="large"
                            onClick={() => {
                                onQuerySave(value as string);
                            }}
                            disabled={!(value as string).length}
                        ></Button>
                    </Tooltip>

                    {actions}
                </div>

                <TextArea
                    autoSize={{ minRows: 4, maxRows: 4 }}
                    placeholder={placeholder}
                    value={value}
                    {...rest}
                />
            </div>
        </>
    );
};

export default QSearchBar;
