export enum DataViewType {
    Table = "table",
    Insight = "insight",
}

export interface DataViewProps {
    dataSet: Record<string, string>[];
    className?: string;
}
