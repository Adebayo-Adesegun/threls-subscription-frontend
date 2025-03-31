export interface SubscriptionPlan {
    id: string;
    name: string;
    description: string;
    features: string[];
    price: number;
    currency: string;
    billing_cycle: "MONTHLY" | "YEARLY";
    is_active: boolean;
    subscription: {
        is_subscribed: boolean;
        id: string;
    }
    created_at: string;
    updated_at: string;

}

export interface Invoice {
    id: string;
    user_id: string;
    invoice_id: string;
    payment_method_id: {
        id: string;
        card_type: string;
        last_4: string;
    };
    subscription_id: string;
    amount: number;
    currency: string;
    status: "PAID" | "PENDING" | "FAILED";
    created_at: string;
    updated_at: string;
  }
export type ColumnTypes = 'invoice_id' | 'created_at' | 'amount' | 'payment_method' | 'status' | 'actions'

export enum InvoiceStatus {
    PAID = "PAID",
    PENDING = "PENDING",
    FAILED = "FAILED",
}