import {Post} from "./post.model";
import {Tag} from "./tag.model";

export interface Page {
    id: string;
    name: string;
    uuid: string;
    description: string;
    tags: Tag[];
    owner_uuid: string;
    image_s3_path?: string;
    image?: string;
    is_private: boolean;
    unblock_date?: Date;
    follow_requests: string[];
    followers: string[];
    posts: Post[];
}
