import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import PlanCard from "../index.vue";
import { mockStandardPlan, mockCurrentPlan, mockCustomPlan } from "./const";

vi.mock("~/services/billing/invoice", () => ({
  useCancelSubscription: () => ({
    cancelSubscription: vi.fn().mockResolvedValue({}),
  }),
}));

vi.mock("~/utils/formatters", () => ({
  formatCurrency: vi.fn((price) => `${price}.00`),
}));

describe("PlanCard", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show custom plan", async () => {
    wrapper = mount(PlanCard, {
      props: {
        subscriptionPlan: mockCustomPlan,
        loading: false,
      },
      global: {
        stubs: {
          UButton: true,
          IconifyIcon: true,
        },
      },
    });

    expect(wrapper.find(".text-2xl.font-bold").text()).toBe("Custom");
    expect(wrapper.text()).not.toContain("/year");
  });

  it("should show a standard plan", async () => {
    wrapper = mount(PlanCard, {
      props: {
        subscriptionPlan: mockStandardPlan,
        loading: false,
      },
      global: {
        stubs: {
          UButton: true,
          IconifyIcon: true,
        },
      },
    });

    expect(wrapper.find("h2").text()).toBe(mockStandardPlan.name);
    expect(wrapper.find(".text-gray-600").text()).toBe(
      mockStandardPlan.description
    );

    expect(wrapper.find(".text-sm").text()).toContain("Standard");
    expect(wrapper.text()).toContain("/month");

    const button = wrapper.findComponent({ name: "UButton" });
    expect(button.exists()).toBe(true);
  });

  it("should show correct status when user is subscribed to the plan", async () => {
    wrapper = mount(PlanCard, {
      props: {
        subscriptionPlan: mockCurrentPlan,
        loading: false,
      },
      global: {
        // we can use global stubs, it
        stubs: {
          UButton: true,
          IconifyIcon: true,
        },
      },
    });

    const button = wrapper.findComponent({ name: "UButton" });
    expect(button.exists()).toBe(true);
    // expect(button.text()).toContain('Cancel Subscription');
  });
});
