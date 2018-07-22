export interface Telegram {
    [propName: string]: {
        payload: {
            [propName: string] : any
        }
    }
}