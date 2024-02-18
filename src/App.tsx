import { ChangeEventHandler, useEffect, useState } from "react";
import { Layout } from "antd";
import "./App.css";

import PersonalLogo from "./Assets/personalLogo.svg";

import HistoryUtil from "./Utils/History";
import { SearchHistory } from "./interface";
import QRoundedLogo from "./Components/Common/QRoundedLogo";
import HistoryView from "./Components/Views/HistoryView";
import QSearchBar from "./Components/Common/QSearchBar";
import DataView from "./Components/Views/DataView";

const { Content } = Layout;

function App() {
    const [isDataLoading, setDataLoading] = useState(false);
    const [isDataFetchError, setDataFetchError] = useState(false);
    const [dataSet, setDataSet] = useState([]);
    const [historyList, setHistoryList] = useState<SearchHistory[]>([]);
    const [searchValue, setSearchValue] = useState("");

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

    const handleQuerySave = (value: string) => {
        console.log(value);
    };

    const handleHistoryClick = (value: string) => {
        setSearchValue(value);
    };

    useEffect(() => {
        const list = HistoryUtil.getAll();
        setHistoryList(list);
    }, []);

    return (
        <>
            <Layout className="layout--base">
                <Layout className="flex-row">
                    <aside className="w-1/4 border bg-secondary-shade">
                        <div className="flex justify-center align-center p-4">
                            <QRoundedLogo
                                logoUrl={PersonalLogo}
                                alt="Andrew Pradeep Logo"
                                className="w-12 h-12 mt-2 ml-6"
                            />
                        </div>
                        <HistoryView
                            className="mx-6 mt-4 bg-emerald-400"
                            historyList={historyList}
                            onHistoryClick={handleHistoryClick}
                        />
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
                            handleQuerySave={handleQuerySave}
                        />

                        {dataSet.length ? (
                            <DataView dataSet={dataSet} className={"mx-2"} />
                        ) : (
                            <>
                                {isDataFetchError ? (
                                    <div className="h-full">error</div>
                                ) : (
                                    <div className="h-full">No data yet</div>
                                )}
                            </>
                        )}
                    </Content>
                    <aside className="w-1/5 border"></aside>
                </Layout>
            </Layout>
        </>
    );
}

export default App;
