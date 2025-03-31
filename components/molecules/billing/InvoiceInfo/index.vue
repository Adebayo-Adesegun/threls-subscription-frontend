<template>
  <aside
    class="fixed w-full h-screen md:relative top-0 md:top-auto left-0 md:left-auto z-[100] md:z-1 bg-white"
  >
    <div class="p-6 w-full md:max-w-md">
      <div class="flex items-center justify-between mb-3">
        <UButton
          variant="ghost"
          icon="i-heroicons-x-mark"
          size="sm"
          class="text-black hover:text-gray-700"
          @click="onclose"
        />
        <div class="flex gap-3">
          <UButton
            variant="ghost"
            icon="i-heroicons-eye"
            label="View"
            size="sm"
          />
          <UButton
            variant="ghost"
            icon="i-heroicons-arrow-down-tray"
            label="Download"
            size="sm"
          />
        </div>
      </div>
      <UDivider />

      <div class="my-4">
        <h2 class="text-lg font-semibold mb-2">{{ invoice.invoice_id }}</h2>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Currency:</span>
          <UBadge color="purple" variant="subtle">
            {{ invoice.currency }}</UBadge
          >
        </div>
      </div>

      <UDivider />

      <ul class="mt-4 space-y-3 text-sm">
        <li class="flex justify-between">
          <span class="text-gray-500">Recipient</span>
          <span class="text-purple-600 font-medium">{{ invoice.user_id }}</span>
        </li>
        <li class="flex justify-between">
          <span class="text-gray-500">Currency</span>
          <span class="text-purple-600 font-medium">{{
            invoice.currency
          }}</span>
        </li>
        <li class="flex justify-between">
          <span class="text-gray-500">Amount</span>
          <span class="text-purple-600 font-medium">{{ invoice.amount }}</span>
        </li>
        <li class="flex justify-between">
          <span class="text-gray-500">Status</span>
          <span
            :class="{
              'text-green-600': invoice.status === InvoiceStatus.PAID,
              'text-yellow-600': invoice.status === InvoiceStatus.PENDING,
              'text-red-600': invoice.status === InvoiceStatus.FAILED,
            }"
            class="font-medium"
          >
            {{ invoice.status }}
          </span>
        </li>
        <li class="flex justify-between">
          <span class="text-gray-500">Created At</span>
          <span class="text-gray-700 font-medium">{{
            new Date(invoice.created_at).toLocaleDateString()
          }}</span>
        </li>
        <li class="flex justify-between">
          <span class="text-gray-500">Payment Method</span>
          <span class="text-purple-600 font-medium">
            {{ invoice.payment_method_id.card_type }} ****{{
              invoice.payment_method_id.last_4
            }}
          </span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { InvoiceStatus, type Invoice } from "~/types/billing";

defineProps({
  invoice: {
    type: Object as PropType<Invoice>,
    required: true,
  },
});

const emit = defineEmits(["close"]);
const onclose = () => {
  emit("close");
};
</script>

<style scoped></style>
