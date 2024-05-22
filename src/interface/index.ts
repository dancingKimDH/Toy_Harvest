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

export const Region = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원특별자치도',
    '충청북도',
    '충청남도',
    '전북특별자치도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주특별자치도'
]

export interface UserProps {
    displayName?: string,
    phoneNumber?: string,
    imageUrl?: string,
    createdAt?: string,
    region?: string,
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
    likeCount?: number;
    comments: CommentProps[];
    hashTags?: string[];
    imageUrl?: string;
    title?: string;
    name?: string;
    subject?: string;
}