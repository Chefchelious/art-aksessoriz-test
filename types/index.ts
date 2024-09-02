export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IPagination {
  _page: number;
  _limit: number
}
