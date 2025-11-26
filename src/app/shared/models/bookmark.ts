export interface Bookmark {
    id: string;
    name: string;
    url: string;
    updatedAt: string;
}

export interface GroupedBookmarks {
    today: Bookmark[];
    yesterday: Bookmark[];
    older: Bookmark[];
}