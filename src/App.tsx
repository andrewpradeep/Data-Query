import { ChangeEventHandler, Suspense, lazy, useEffect, useState } from "react";
import { Button, Layout, Spin, Tooltip, Typography, message } from "antd";
import "./App.css";

import PersonalLogo from "./Assets/personalLogo.svg";

import HistoryUtil from "./Utils/History";
import { SavedQuery, SearchHistory } from "./interface";
import QRoundedLogo from "./Components/Common/QRoundedLogo";
import HistoryView from "./Components/Views/HistoryView";
import QSearchBar from "./Components/Common/QSearchBar";
// import DataView from "./Components/Views/DataView";
import QuerySaveModal from "./Components/Modals/QuerySaveModal";
import { useForm } from "antd/es/form/Form";
import SavedQueryView from "./Components/Views/SavedQueryView";
import {
    CopyOutlined,
    DatabaseOutlined,
    LoadingOutlined,
    WarningOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const DataView = lazy(() => import("./Components/Views/DataView"));

function App() {
    const [isDataLoading, setDataLoading] = useState(false);
    const [isDataFetchError, setDataFetchError] = useState(false);
    const [dataSet, setDataSet] = useState([]);
    const [historyList, setHistoryList] = useState<SearchHistory[]>([]);
    const [savedQueryList, setSavedQueryList] = useState<SavedQuery[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [form] = useForm();

    const handleSearch = async (value: string) => {
        if (!value.length && !isDataLoading) {
            return;
        }
        let rowsFetched = 0;
        try {
            setDataLoading(true);
            const queryData = await fetch("./customers.json").then((data) =>
                data.json()
            );
            rowsFetched = queryData.length;
            setDataSet(queryData);
        } catch (err) {
            rowsFetched = 0;
            setDataFetchError(true);
        } finally {
            const tempList = [...historyList];
            const history = {
                search: value,
                rowCount: rowsFetched,
                date: new Date(Date.now()),
            };
            tempList.unshift(history);
            while (tempList.length >= HistoryUtil.getLimit()) {
                tempList.pop();
            }
            HistoryUtil.addItem(history);
            setHistoryList(tempList);
            setDataLoading(false);
        }
    };
    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setSearchValue(event.target.value);
    };

    const openSaveQueryModal = () => {
        setShowModal(true);
        form.resetFields();
    };

    const handleQuerySave = (values: SavedQuery) => {
        const tempList = [...savedQueryList];
        tempList.push(values);
        setSavedQueryList(tempList);
        setShowModal(false);
        form.resetFields();
    };

    const handleHistoryClick = (value: string) => {
        setSearchValue(value);
    };

    const handleQueryClick = (query: string) => {
        setSearchValue(query);
    };

    const handleClearHistory = () => {
        HistoryUtil.clear();
        setHistoryList([]);
    };

    useEffect(() => {
        const list = HistoryUtil.getAll();
        setHistoryList(list);
    }, []);

    return (
        <>
            <Layout className="layout--base">
                <Layout className="flex-row">
                    <aside className="flex flex-col w-1/4 border bg-secondary-shade h-full">
                        <div className="flex justify-center align-center border-b border-gray-300 p-4">
                            <QRoundedLogo
                                logoUrl={PersonalLogo}
                                alt="Andrew Pradeep Logo"
                                className="w-12 h-12 mt-2 ml-6"
                            />
                        </div>
                        <div className="pb-6 overflow-scroll">
                            <SavedQueryView
                                className="mx-6 mt-4 bg-emerald-400"
                                queryList={savedQueryList}
                                onQueryClick={handleQueryClick}
                            />
                            <HistoryView
                                className="mx-6 mt-4 bg-emerald-400"
                                historyList={historyList}
                                onHistoryClick={handleHistoryClick}
                                onClearHistory={handleClearHistory}
                            />
                        </div>
                    </aside>
                    <Content className="flex flex-col py-3 px-4  w-0">
                        <QSearchBar
                            value={searchValue}
                            className="mb-4"
                            onChange={handleChange}
                            onSearch={handleSearch}
                            loading={isDataLoading}
                            allowClear
                            onQuerySave={openSaveQueryModal}
                            actions={[
                                <Tooltip title={"Copy"}>
                                    <Button
                                        type="primary"
                                        size="large"
                                        icon={<CopyOutlined />}
                                        onClick={async () => {
                                            try {
                                                await navigator.clipboard.writeText(
                                                    searchValue
                                                );
                                                message.info(
                                                    "copied to clipboard"
                                                );
                                            } catch (err) {
                                                console.error(
                                                    "Failed to copy: ",
                                                    err
                                                );
                                            }
                                        }}
                                    />
                                </Tooltip>,
                            ]}
                        />

                        {dataSet.length ? (
                            <Suspense
                                fallback={
                                    <div className=" flex justify-center items-center h-full">
                                        <Spin
                                            indicator={
                                                <LoadingOutlined
                                                    style={{ fontSize: "7rem" }}
                                                />
                                            }
                                        />
                                    </div>
                                }
                            >
                                <DataView
                                    dataSet={dataSet}
                                    className={" h-full"}
                                />
                            </Suspense>
                        ) : (
                            <>
                                {isDataFetchError ? (
                                    <div className="flex flex-col justify-center items-center h-full">
                                        <WarningOutlined
                                            className="text-red-700"
                                            style={{ fontSize: "10rem" }}
                                        />
                                        <Typography.Text className=" text-red-700 mt-12 text-3xl text-slate-300 font-semibold">
                                            Error Loading Data
                                        </Typography.Text>
                                    </div>
                                ) : isDataLoading ? (
                                    <div className=" flex justify-center items-center h-full">
                                        <Spin
                                            indicator={
                                                <LoadingOutlined
                                                    style={{ fontSize: "7rem" }}
                                                />
                                            }
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col p-4 items-center h-full">
                                        <DatabaseOutlined
                                            style={{
                                                fontSize: "20rem",
                                                color: "#ebecf2",
                                            }}
                                            className="mt-12"
                                        />
                                        <Typography.Text className="mt-12 text-3xl text-neutral-500 font-semibold">
                                            No data
                                        </Typography.Text>
                                    </div>
                                )}
                            </>
                        )}
                    </Content>
                    {/* <aside className="w-1/5 border bg-secondary-shade h-full"></aside> */}
                </Layout>
            </Layout>

            {showModal && (
                <QuerySaveModal
                    form={form}
                    query={searchValue}
                    show={showModal}
                    onCancel={() => {
                        form.resetFields();
                        setShowModal(false);
                    }}
                    onFailure={() => {}}
                    onSubmit={handleQuerySave}
                />
            )}
        </>
    );
}

export default App;
