import React, { ChangeEventHandler, useState } from "react";
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
    onChange = () => {},
    ...rest
}) => {
    const [inputValue, setInputValue] = useState("");

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setInputValue(event.target.value);
        onChange(event);
    };

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
                            handleQuerySave(inputValue);
                        }}
                        disabled={!inputValue.length}
                    ></Button>
                </Tooltip>
                <Search
                    size="large"
                    placeholder={placeholder}
                    {...rest}
                    onChange={handleSearchChange}
                />
            </div>
        </>
    );
};

export default QSearchBar;
