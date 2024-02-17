export enum INSIGHT_TYPE {
    MONO = "mono",
    COMPARE = "compare",
}

export enum CHART_TYPE {
    PIE = "Pie",
    BAR = "Bar",
    LINE = "Line",
}

export interface GenericChartProps {
    dataList: string[];
    width?: number;
    height?: number;
}

export interface GraphViewProps {
    dataList: Record<string, string>[];
}

export interface GraphSwitchProps extends GenericChartProps {
    type: CHART_TYPE;
}
