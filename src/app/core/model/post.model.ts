export interface Post {
    page: any;
    content: string;
    reply_to: any;
    created_at: Date;
    updated_at: Date;
    liked_by: string[];
}
