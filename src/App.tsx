import { useState } from "react";
import { Layout } from "antd";
import "./App.css";
import QSearchBar from "./Components/QSearchBar";
import DataView from "./Sections/DataView";

const { Header, Content } = Layout;

function App() {
    const [isDataLoading, setDataLoading] = useState(false);
    const [isDataFetchError, setDataFetchError] = useState(false);
    const [dataSet, setDataSet] = useState([]);

    const handleSearch = async () => {
        try {
            setDataLoading(true);
            const queryData = await fetch("./customers.json").then((data) =>
                data.json()
            );
            setDataSet(queryData);
        } catch (err) {
            setDataFetchError(true);
        } finally {
            setDataLoading(false);
        }
    };

    const handleQuerySave = (value: string) => {
        console.log(value);
    };

    return (
        <>
            <Layout className="layout--base">
                <Header></Header>
                <Layout>
                    {/* <Sider></Sider> */}
                    <Content className="p-6">
                        <QSearchBar
                            className="my-6"
                            enterButton="search"
                            onSearch={handleSearch}
                            loading={isDataLoading}
                            handleQuerySave={handleQuerySave}
                        />

                        {dataSet.length ? (
                            <DataView dataSet={dataSet} />
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
                </Layout>
            </Layout>
        </>
    );
}

export default App;
