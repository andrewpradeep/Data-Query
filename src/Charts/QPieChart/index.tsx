import React from "react";
import { Pie, PieChart, Tooltip } from "recharts";

export interface QPieChartProps {
    dataList: string[];
    width?: number;
    height?: number;
}

const QPieChart: React.FC<QPieChartProps> = ({
    dataList,
    width = 600,
    height = 250,
}) => {
    const memoMap: Record<string, number> = {};
    dataList.forEach((element: string) => {
        if (!memoMap[element]) {
            memoMap[element] = 0;
        }

        memoMap[element] += 1;
    });

    const data = Object.keys(memoMap).map((key) => {
        return {
            name: key,
            value: memoMap[key],
        };
    });

    return (
        <PieChart width={width} height={height}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
            ></Pie>
            <Tooltip />
        </PieChart>
    );
};

export default QPieChart;
