import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import InvoiceSidebar from "../index.vue";
import { InvoiceStatus, type Invoice } from "~/types/billing";


describe('InvoiceSidebar', () => {
  let wrapper: VueWrapper;
  let mockInvoice: Invoice;

  beforeEach(() => {
    mockInvoice = {
      id: 'inv_987654321',
      invoice_id: 'INV-12345',
      user_id: 'USR-9876',
      subscription_id: 'sub_456789',
      currency: 'USD',
      amount: 99.99,
      status: InvoiceStatus.PAID,
      created_at: '2025-03-15T12:00:00Z',
      updated_at: '2025-03-15T12:30:00Z',
      payment_method_id: {
        id: 'pm_123456789',
        card_type: 'Visa',
        last_4: '4242',
      }
    };

    wrapper = mount(InvoiceSidebar, {
      props: {
        invoice: mockInvoice,
      },
      global: {
        stubs: {
          UButton: true,
          UDivider: true,
          UBadge: true,
        },
      },
    });
  });

  it("should load component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should display the invoice ID correctly', () => {
    expect(wrapper.find('h2').text()).toBe('INV-12345');
  });

  it('should emit event when close button is clicked', async () => {
    const closeButton = wrapper.findAllComponents({ name: 'UButton' })[0];
    await closeButton.trigger('click');
    
    expect(wrapper.emitted()).toHaveProperty('close');
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  it('should format the date correctly', () => {
    const dateElement = wrapper.find('li:nth-child(5) .text-gray-700');
    
    const expectedDate = new Date(mockInvoice.created_at).toLocaleDateString();
    expect(dateElement.text()).toBe(expectedDate);
  });
});
