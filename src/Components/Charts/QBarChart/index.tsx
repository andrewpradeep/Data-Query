import { Tooltip } from "antd";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

export interface QBarChartProps {
    dataList: string[];
    width?: number;
    height?: number;
}
const QBarChart: React.FC<QBarChartProps> = ({ dataList }) => {
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
        <BarChart width={600} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
            {/* <Bar dataKey="value" fill="#82ca9d" /> */}
        </BarChart>
    );
};

export default QBarChart;
