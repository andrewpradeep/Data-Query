import { SearchHistory } from "../../interface";

const HistoryUtil = (function () {
    const History_Limit = 15;
    const addItem = (item: SearchHistory) => {
        const tempList = localStorage.getItem("searchHistory");
        const historyList =
            tempList !== null ? (JSON.parse(tempList) as SearchHistory[]) : [];
        while (historyList.length >= History_Limit) {
            historyList.pop();
        }

        historyList?.unshift(item);
        localStorage.setItem("searchHistory", JSON.stringify(historyList));
    };

    const getAll = () => {
        const tempList = localStorage.getItem("searchHistory");
        const searchList =
            tempList !== null ? (JSON.parse(tempList) as SearchHistory[]) : [];
        return searchList.map((obj: SearchHistory) => {
            return {
                ...obj,
                date: new Date(obj.date),
            };
        });
    };

    const clear = () => {
        localStorage.setItem("searchHistory", JSON.stringify([]));
    };
    return {
        addItem,
        getAll,
        getLimit: () => {
            return History_Limit;
        },
        clear,
    };
})();

export default HistoryUtil;
