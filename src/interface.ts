export interface SearchHistory {
    search: string;
    date: Date;
    rowCount: number;
}

export interface SavedQuery {
    category: QUERY_CATEGORIES;
    title: string;
    query: string;
}

export enum QUERY_CATEGORIES {
    ORDER = "order",
    SERVICE = "service",
    CUSTOMER = "customer",
}
