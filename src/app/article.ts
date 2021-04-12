export interface Article {
  _id: string;
  author: {
    id: string;
    name: string;
    tag: string;
  };
  content: string;
  image: string;
  createdAt: string;
  likes: number;
  comments: number;
  url: {
    url: string,
    img: string,
    description: string,
    domain: string
  }
}