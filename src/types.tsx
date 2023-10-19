interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface CommunityMembership {
  created_at: string;
  updated_at: string;
  user: User;
  community: Community;
  joined_at: string;
}

export interface Community {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  members: CommunityMembership[];
  moderators: User[];
  posts: Post[];
  owner: string;
  member_count: number;
}

export interface Post {
  id: number;
  created_at: string;
  updated_at: string;
  comment_count: number;
  voted_count: number;
  like_count: number;
  love_count: number;
  title: string;
  content: string;
  community: Community;
  author: User;
  upvoted_by: User[];
  downvoted_by: User[];
  bookmarks: User[];
  liked_by: User[];
  loved_by: User[];
  comments: Comment[];
}

export interface Comment {
  id: number;
  created_at: string;
  updated_at: string;
  content: string;
  post: Post;
  author: User;
  parent_comment: string | null;
  upvoted_by: User[];
  downvoted_by: User[];
  likes: User[];
  loves: User[];
}

export interface Notification {
  id: number;
  created_at: string;
  updated_at: string;
  recipient: User;
  sender: User;
  notification_type: string;
  content: string;
  timestamp: string;
  is_read: boolean;
}

export interface Profile {
  id: number;
  created_at: string;
  updated_at: string;
  user: User;
  profile_picture: string | null; // File path or null
  bio: string | null;
  website: string | null;
  location: string | null;
  birthdate: string | null;
  phone_number: string | null;
  unread_messages_count: number;
  unread_notifications_count: number;
}
