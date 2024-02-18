import React from "react";
import { Button, Input, Tooltip } from "antd";
import { SearchProps } from "antd/es/input";
import "./index.css";
import { SaveOutlined } from "@ant-design/icons";

const { Search } = Input;

export interface SearchBarProps extends SearchProps {
    handleQuerySave: (value: string) => void;
}

const QSearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Search your data query",
    className,
    handleQuerySave,
    value = "",
    ...rest
}) => {
    return (
        <>
            <div className={`flex ${className}`}>
                <Tooltip title={"Save"}>
                    <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        size="large"
                        className={"mr-2"}
                        onClick={() => {
                            handleQuerySave(value as string);
                        }}
                        disabled={!(value as string).length}
                    ></Button>
                </Tooltip>
                <Search
                    size="large"
                    placeholder={placeholder}
                    value={value}
                    {...rest}
                />
            </div>
        </>
    );
};

export default QSearchBar;
