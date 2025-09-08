import { FluxAct } from "./flux_act";

/**
 * flux行為派發
 */
export class FluxDispatch {
    /**
     * store註冊監聽的列表
     */
    private _events: ((act: FluxAct) => void)[] = [];

    /**
     * 關閉系統
     */
    shutdown(): void {
        this._events = [];
    }

    /**
     * 給store註冊監聽
     */
    register(event: (act: FluxAct) => void): void {
        this._events.push(event);
    }

    /**
     * 廣播行為給所有store
     */
    broadcast(act: FluxAct): void {
        this._events.forEach(event => event(act));
    }
}

/**
 * flux行為派發
 */
export const fluxDispatch = new FluxDispatch();
