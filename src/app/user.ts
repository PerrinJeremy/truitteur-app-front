export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  tag: string;
  token: string;
  likes: string[];
  following: string[];
  banner: string;
  picture: string;
}