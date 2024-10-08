export interface Workspaces {
    id: string;
    title: string;
    slug: string;
};

export interface Boards {
    id: string;
    title: string;
    slug: string;
    image_id: string;
    image_thumb_url: string;
    image_full_url: string;
    image_user_name: string;
    image_link_html: string;
};

export interface List {
    id: string;
    title: string;
    order: number;
    board: Boards;
};

export interface Card {
    id: string;
    title: string;
    slug: string;
};

export interface ListWithCards {
    id: string;
    title: string;
    order: number;
    cards: Card[];
};

export interface CardWithList {
    id: string;
    title: string;
    slug: string;
    description: string;
    list: List;
};



export enum Actions {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

export enum EntityType {
    BOARD = 'BOARD',
    LIST = 'LIST',
    CARD = 'CARD',
}

export interface ActivityLog {
    id: string;
    action: Actions;
    entity_type: EntityType;
    entity_title: string; 
    user_name: string;
    created_at: string;
}

export interface WorkspaceLimit {
    available_count: number;
}
