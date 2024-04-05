import { atom } from "recoil";

export const searchPageVisibilityState = atom({
    key: "searchPageVisibilityState",
    default: false,
})

export const headerExpandState = atom({
    key: "headerExpandState",
    default: false,
})