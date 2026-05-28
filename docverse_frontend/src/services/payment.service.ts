import type { Payment, PaymentStatus } from "@/types";

// TODO: Replace with actual API calls
const paymentService = {
  async createPaymentIntent(amount: number): Promise<{ clientSecret: string }> {
    return { clientSecret: "pi_mock_secret" };
  },

  async confirmPayment(paymentIntentId: string): Promise<Payment> {
    return {
      id: "payment-1",
      userId: "user-1",
      amount: 29.99,
      status: "COMPLETED" as PaymentStatus,
      method: "card",
      transactionId: paymentIntentId,
      createdAt: new Date().toISOString(),
    };
  },
};

export default paymentService;
