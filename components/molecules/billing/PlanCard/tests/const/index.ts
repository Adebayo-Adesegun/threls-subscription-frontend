import type { SubscriptionPlan } from "~/types/billing";

export const mockStandardPlan = {
  id: "plan-1",
  name: "Standard",
  description: "Perfect for small teams",
  price: 29.99,
  billing_cycle: "month",
  features: ["Feature 1", "Feature 2", "Feature 3"],
  subscription: {
    id: "sub-1",
    is_subscribed: false,
  },
};

export const mockCurrentPlan = {
  id: "plan-2",
  name: "Pro",
  description: "For growing businesses",
  price: 99.99,
  billing_cycle: "month",
  features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  subscription: {
    id: "sub-2",
    is_subscribed: true,
  },
};

export const mockCustomPlan = {
  id: "plan-3",
  name: "Custom",
  description: "Enterprise-grade solution",
  price: null,
  billing_cycle: "year",
  features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  subscription: {
    id: "sub-3",
    is_subscribed: false,
  },
};
