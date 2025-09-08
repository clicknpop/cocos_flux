/**
 * flux行為
 * @summary 規範所有改變資料的動作, 必須通過此類別傳遞
 */
export interface FluxAct {
    /**
     * 行為種類
     * @summary any是方便後續使用者用enum複寫
     */
    type: string | any;

    /**
     * 行為內容
     * @summary 只有實作者知道內容因此型態為any
     */
    data?: any;
}
