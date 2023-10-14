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
