export interface ICreateCheckout {
  bookId: string;

  paymentType: "PURCHASE" | "BORROW";

  borrowDays?: number;
}
