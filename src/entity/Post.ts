import { EntitySchema } from 'typeorm';

// Define the interface for the Post entity
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Create the entity schema for TypeORM
export const PostEntity = new EntitySchema<Post>({
  name: 'Post',
  tableName: 'posts',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    userId: {
      type: Number,
    },
  },
});