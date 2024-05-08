export interface RowData {
    BIZ_NM: stringArray;
    LC_NM: stringArray;
    PLAN_HSCNT: stringArray;
    TOT_PLOT_AR: stringArray;
    LTTOT_PBLANC_DE: stringArray;
    CHARGER_NM: stringArray;
    CHARGER_TELNO: stringArray;
}

export interface UserProps {
    displayName: string,

}

export interface stringArray {
    _text: string;
}

export interface CommentProps {
    comment?: string,
    createdAt?: string,
    uid?: string,
    userName?: string,
    email?: string,
    postId?: string,
}

export interface PostProps {
    id: string;
    email: string;
    content: string;
    createdAt: string;
    summary?: string;
    uid: string;
    profileUrl?: string;
    likes?: string;
    likeCount?: string;
    comments: CommentProps[];
    hashTags?: string[];
    imageUrl?: string;
    title?: string;
    name?: string;
    subject?: string;
}