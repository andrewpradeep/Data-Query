import { Typography } from "antd";

export interface QChartContainerProps {
    children: React.ReactNode;
    title: string;
    className: string;
}

const QChartContainer: React.FC<QChartContainerProps> = ({
    children,
    title,
    className,
}) => {
    return (
        <div className={className}>
            <Typography.Title level={3}>{title}</Typography.Title>
            {children}
        </div>
    );
};

export default QChartContainer;
