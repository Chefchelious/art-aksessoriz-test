import type { IPagination, IPost } from '~/types';
import axiosApi from '~/axios/axiosApi';
import { generateQueryString } from '~/composable/utils';

interface IState {
  posts: IPost[];
  loading: boolean;
  _page: number;
  _limit: number;
  totalPages: number;
}

export const usePostStore = defineStore('use-post-store', {
  state: (): IState => ({
    posts: [],
    loading: false,
    _page: 1,
    _limit: 10,
    totalPages: 0,
  }),

  actions: {
    async fetchPosts() {
      const queryParams: IPagination = {
        _page: this._page,
        _limit: this._limit,
      };

      try {
        this.loading = true;
        const response = await axiosApi<IPost[]>('/posts', {
          params: queryParams
        });

        this.posts = response?.data;

        const totalCountHeader = response.headers['x-total-count'];

        this.totalPages = Math.ceil(totalCountHeader / this._limit);

      } catch (e: unknown) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
});
