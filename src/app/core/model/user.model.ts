export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  surname?: string;
  phone_number?: string;
  group_id?: number;
  is_blocked: boolean;
  created_at: Date;
  modified_at: Date;
  role: string;
  image_s3_path?: string;
  image?: string;
}
