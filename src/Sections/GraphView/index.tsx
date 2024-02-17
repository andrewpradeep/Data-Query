import { Select, Typography } from "antd";
import { useState } from "react";
import QPieChart from "../../Charts/QPieChart";
import QChartContainer from "../../Components/QChartContainer";
import QBarChart from "../../Charts/QBarChart";
import {
    CHART_TYPE,
    GraphSwitchProps,
    GraphViewProps,
    INSIGHT_TYPE,
} from "./interface";

const GraphSwitch: React.FC<GraphSwitchProps> = ({ type, ...rest }) => {
    switch (type) {
        case CHART_TYPE.BAR:
            return <QBarChart {...rest}></QBarChart>;
        case CHART_TYPE.PIE:
            return <QPieChart {...rest}></QPieChart>;
        default:
            return <></>;
    }
};

const GraphView: React.FC<GraphViewProps> = ({ dataList }) => {
    const [selectedInsight, setSelectedInsight] = useState(INSIGHT_TYPE.MONO);
    const [entityList, setEntityList] = useState<string[]>([]);
    const [selectedChart, setSelectedChart] = useState<CHART_TYPE>(
        CHART_TYPE.BAR
    );
    const columns = Object.keys(dataList[0]).map((key) => ({
        value: key,
        label: key,
    }));
    const insightTypeList = [
        {
            value: INSIGHT_TYPE.MONO,
            label: "Mono Insight",
        },
        {
            value: INSIGHT_TYPE.COMPARE,
            label: "Comparitive Insight",
        },
    ];

    const canGenerateInsight =
        !!entityList[0] &&
        (selectedInsight === INSIGHT_TYPE.COMPARE ? !!entityList[1] : true);

    const handleInsightChange = (value: INSIGHT_TYPE) => {
        setSelectedInsight(value);
    };

    const chartList = Object.values(CHART_TYPE).map((chart: CHART_TYPE) => {
        return {
            value: chart,
            label: `${chart} chart`,
        };
    });
    return (
        <>
            <section className="m-3 border rounded ">
                <div className="flex gap-x-2 p-3  border-b">
                    <Select
                        value={selectedInsight}
                        onChange={handleInsightChange}
                        options={insightTypeList}
                    ></Select>
                    <Select
                        className="min-w-32"
                        value={entityList[0]}
                        options={columns}
                        onChange={(value) => {
                            const tempList = [...entityList];
                            tempList[0] = value;
                            setEntityList(tempList);
                        }}
                        placeholder="select entity"
                    ></Select>
                    <Select
                        className="min-w-32"
                        options={chartList}
                        value={selectedChart}
                        onChange={(value) => {
                            setSelectedChart(value);
                        }}
                    ></Select>
                    {selectedInsight === INSIGHT_TYPE.COMPARE && (
                        <Select
                            className="min-w-32"
                            onChange={(value) => {
                                const tempList = [...entityList];
                                tempList[1] = value;
                                setEntityList(tempList);
                            }}
                            value={entityList[0]}
                            options={columns}
                            placeholder="select entity2"
                        ></Select>
                    )}
                </div>
                <div>
                    {canGenerateInsight ? (
                        selectedInsight === INSIGHT_TYPE.MONO ? (
                            <>
                                <QChartContainer
                                    title={`${selectedChart} chart`}
                                    className="mt-2 flex flex-col justify-center items-center"
                                >
                                    <GraphSwitch
                                        type={selectedChart}
                                        width={400}
                                        dataList={dataList.map((obj) => {
                                            return obj[entityList[0]];
                                        })}
                                    />
                                </QChartContainer>
                            </>
                        ) : (
                            <div></div>
                        )
                    ) : (
                        <div className="mt-4 h-80 flex justify-center items-center">
                            <Typography.Text className="block">
                                Generate Insights
                            </Typography.Text>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default GraphView;
