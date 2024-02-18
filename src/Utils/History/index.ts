const HistoryUtil = (function () {
    const History_Limit = 15;
    const addItem = (item: string) => {
        const tempList = localStorage.getItem("searchHistory");
        const historyList =
            tempList !== null ? (JSON.parse(tempList) as string[]) : [];
        while (historyList.length >= History_Limit) {
            historyList.pop();
        }

        historyList?.unshift(item);
        localStorage.setItem("searchHistory", JSON.stringify(historyList));
    };

    const getAll = () => {
        const tempList = localStorage.getItem("searchHistory");
        return tempList !== null ? (JSON.parse(tempList) as string[]) : [];
    };
    return {
        addItem,
        getAll,
        getLimit: () => {
            return History_Limit;
        },
    };
})();

export default HistoryUtil;
