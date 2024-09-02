export interface ICreatePost {
  title: string;
  body: string;
  userId: number;
}

export interface IPost extends ICreatePost {
  id: number;
}

export interface IPagination {
  _page: number;
  _limit: number
}
