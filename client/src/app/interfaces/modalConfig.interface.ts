import { Telegram } from "./telegram.interface";

export interface ModalConfig {
    [propName: string]: ModalConfingUnitCostructor
}

interface ModalConfingUnitCostructor {
    (): ModalConfigUnit | Telegram
}

interface ModalConfigUnit {
    payload: {
        [propName: string]: any
    }
}

