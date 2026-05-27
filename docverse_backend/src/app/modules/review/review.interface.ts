export interface IReview {
  rating: number;
  comment: string;
  bookId: string;
}

export interface IUpdateReview {
  rating?: number;
  comment?: string;
}
