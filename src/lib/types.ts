export interface PostMetadata {
  title: string;
  date: string;
  tags?: string[];
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
}