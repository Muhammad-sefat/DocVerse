export interface IBook {
  title: string;

  description: string;

  coverImage: string;

  pdfUrl: string;

  price: number;

  borrowPrice: number;

  borrowDuration: number;

  totalPages: number;

  previewPages?: number;

  categoryId: string;
}
