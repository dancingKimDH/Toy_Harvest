export interface RowData {
    BIZ_NM: stringArray;
    LC_NM: stringArray;
    PLAN_HSCNT: stringArray;
    TOT_PLOT_AR: stringArray;
    LTTOT_PBLANC_DE: stringArray;
    CHARGER_NM: stringArray;
    CHARGER_TELNO: stringArray;
}

export interface stringArray {
    _text: string;
}

export interface PostProps {
    id: string;
    email: string;
    content: string;
    createdAt: string;
    uid: string;
    profileUrl?: string;
    likes?: string;
    likeCount?: string;
    comments: string[];
    hashTags?: string[];
    imageUrl?: string;
    title?: string;
    name?: string;
    subject?: string;
}