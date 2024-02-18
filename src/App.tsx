import { ChangeEventHandler, useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import "./App.css";

import PersonalLogo from "./Assets/personalLogo.svg";

import HistoryUtil from "./Utils/History";
import { SavedQuery, SearchHistory } from "./interface";
import QRoundedLogo from "./Components/Common/QRoundedLogo";
import HistoryView from "./Components/Views/HistoryView";
import QSearchBar from "./Components/Common/QSearchBar";
import DataView from "./Components/Views/DataView";
import QuerySaveModal from "./Components/Modals/QuerySaveModal";
import { useForm } from "antd/es/form/Form";
import SavedQueryView from "./Components/Views/SavedQueryView";
import { DatabaseOutlined } from "@ant-design/icons";

const { Content } = Layout;

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
        if (!value.length) {
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
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchValue(event.target.value);
    };

    const openSaveQueryModal = () => {
        setShowModal(true);
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
                            />
                        </div>
                    </aside>
                    <Content className="p-2  w-0">
                        <QSearchBar
                            value={searchValue}
                            className="my-6"
                            enterButton="search"
                            onChange={handleChange}
                            onSearch={handleSearch}
                            loading={isDataLoading}
                            allowClear
                            handleQuerySave={openSaveQueryModal}
                        />

                        {dataSet.length ? (
                            <DataView dataSet={dataSet} className={"mx-2"} />
                        ) : (
                            <>
                                {isDataFetchError ? (
                                    <div className="h-full">error</div>
                                ) : (
                                    <div className="flex flex-col justify-center items-center h-full">
                                        <DatabaseOutlined
                                            style={{
                                                fontSize: "20rem",
                                                color: "#ebecf2",
                                            }}
                                        />
                                        <Typography.Text className="mt-12 text-3xl text-slate-300">
                                            No data
                                        </Typography.Text>
                                    </div>
                                )}
                            </>
                        )}
                    </Content>
                    <aside className="w-1/5 border bg-secondary-shade h-full"></aside>
                </Layout>
            </Layout>
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
        </>
    );
}

export default App;
