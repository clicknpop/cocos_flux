import { FluxAct } from "./flux_act";
import { fluxDispatch } from "./flux_dispatch";

/**
 * 監聽store用的回調
 */
type FluxStoreEvent = (act: FluxAct) => void;

/**
 * flux數據存儲
 */
export abstract class FluxStore {
    /**
     * 存儲列表
     */
    private static _stores: FluxStore[] = [];

    /**
     * 監聽store變化的views
     */
    private _events = new Map<FluxStoreEvent, { target: Object, once: boolean }>();

    /**
     * 關閉系統
     */
    static shutdown(): void {
        this._stores.forEach(store => {
            store._events.clear();
            store.shutdown();
        });

        this._stores = [];
    }

    /**
     * 
     */
    constructor() {
        FluxStore._stores.push(this);
        fluxDispatch.register(act => this.subscribe(act));
    }

    /**
     * 關閉系統
     */
    protected abstract shutdown(): void;

    /**
     * 訂閱需要關注的行為
     */
    protected abstract subscribe(act: FluxAct): void;

    /**
     * 監聽store
     * @param event 回調
     * @param target 回調對象
     * @param once 是否只觸發單次
     */
    on(event: FluxStoreEvent, target: Object, once: boolean = false): void {
        if (!event || this._events.has(event)) {
            return;
        }

        this._events.set(event, { target, once });
    }

    /**
     * 取消監聽store
     */
    off(event: FluxStoreEvent): void {
        if (!this._events.has(event)) {
            return;
        }

        this._events.delete(event);
    }
    
    /**
     * 給監聽的views派發事件
     * @param act flux行為
     */
    protected emit(act: FluxAct): void {
        let once = [];

        this._events.forEach((data, event) => {
            event.call(data.target, act);
            data.once && (once.push(event));
        });

        once.forEach(item => this.off(item), this);
    }
}
