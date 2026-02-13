export interface CreatePaymentInput {
    orderId: number;
    storeId: number;
    amount: number;
    method: "qris" | "bank_transfer" | "credit_card" | "e_wallet" | "cash";
    customerEmail: string;
    customerPhone: string;
    customerName: string;
    orderNumber: string;
}
export interface PaymentResponse {
    id: number;
    orderId: number;
    amount: number;
    status: string;
    method: string;
    snapToken?: string;
    redirectUrl?: string;
}
export declare class PaymentService {
    /**
     * Create payment with Midtrans
     */
    createPayment(input: CreatePaymentInput): Promise<PaymentResponse>;
    /**
     * Get payment by order ID
     */
    getPaymentByOrderId(orderId: number): Promise<{
        status: "pending" | "processing" | "cancelled" | "refunded" | "paid" | "failed";
        id: number;
        store_id: number;
        created_at: Date;
        updated_at: Date;
        order_id: number;
        amount: string;
        method: "qris" | "bank_transfer" | "credit_card" | "e_wallet" | "cash";
        reference_id: string | null;
        gateway_response: unknown;
    }>;
    /**
     * Get payment by reference ID (order number)
     */
    getPaymentByReferenceId(referenceId: string): Promise<{
        status: "pending" | "processing" | "cancelled" | "refunded" | "paid" | "failed";
        id: number;
        store_id: number;
        created_at: Date;
        updated_at: Date;
        order_id: number;
        amount: string;
        method: "qris" | "bank_transfer" | "credit_card" | "e_wallet" | "cash";
        reference_id: string | null;
        gateway_response: unknown;
    }>;
    /**
     * Update payment status
     */
    updatePaymentStatus(paymentId: number, status: string, gatewayResponse?: any): Promise<{
        status: "pending" | "processing" | "cancelled" | "refunded" | "paid" | "failed";
        id: number;
        store_id: number;
        created_at: Date;
        updated_at: Date;
        order_id: number;
        amount: string;
        method: "qris" | "bank_transfer" | "credit_card" | "e_wallet" | "cash";
        reference_id: string | null;
        gateway_response: unknown;
    }>;
    /**
     * Handle Midtrans webhook
     */
    handleMidtransWebhook(webhookBody: any): Promise<{
        success: boolean;
        paymentId: number;
        orderId: number;
        status: string;
    }>;
    /**
     * Check payment status from Midtrans
     */
    checkPaymentStatus(referenceId: string): Promise<any>;
}
export declare const paymentService: PaymentService;
//# sourceMappingURL=payment.service.d.ts.map