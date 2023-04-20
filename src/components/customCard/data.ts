
import { PostCardData } from "@/types/Card";

const posts: PostCardData[] = [];
const now = new Date();
  const createdAt = new Date(now.getTime() - Math.floor(Math.random() * 1000000000)); // generates a random date within the last 10 days
  const updatedAt = new Date(createdAt.getTime() + Math.floor(Math.random() * 10000000)); // generates a random date within 10 minutes after createdAt
for (let i = 0; i <= 5; i++) {
  posts.push({
    createdAt,
    updatedAt,
    postId: Number(i),
    userName: `User ${i}`,
    content: `Lorem ipsum dolor sit amet ${i}, consectetur adipiscing elit, sed do eiusmod tempor incididunt ${i}`,
    img: `/default.png`,
    profileImg: `/default.png`,
    likes: Math.floor(Math.random() * 20) + 1, // generates a random number between 1 and 20
    comments: Math.floor(Math.random() * 50) + 1, // generates a random number between 1 and 50
    isLiked: Math.random() < 0.5 // generates a random boolean value
  });
}

export default posts