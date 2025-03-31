<template>
  <div
    class="shadow-sm rounded-lg border border-gray-200 bg-white p-6"
    v-if="subscriptionPlan"
  >
    <h2 class="text-sm text-primary font-semibold">
      {{ subscriptionPlan.name }}
    </h2>
    <div class="text-lg text-black font-semibold mt-1">
      <p v-if="subscriptionPlan.name !== 'Custom'">
        <span class="text-2xl font-bold">{{ formattedPrice.whole }}</span>
        <span class="text-sm">.{{ formattedPrice.decimal }}</span>
        /{{ subscriptionPlan.billing_cycle }}
      </p>
      <p class="text-2xl font-bold" v-else>Custom</p>
    </div>
    <p class="text-gray-600 mt-3">{{ subscriptionPlan.description }}</p>

    <UButton
      v-if="!subscriptionPlan.subscription.is_subscribed"
      variant="solid"
      color="primary"
      class="mt-6 w-full py-2 px-4 rounded-lg text-base flex items-center justify-center"
      :disabled="subscriptionPlan.subscription.is_subscribed || loading"
      size="sm"
      loading-auto
      loading-icon="i-custom-spinner-icon"
      @click="selectPlan"
    >
      {{
        subscriptionPlan.subscription.is_subscribed
          ? "Current Plan"
          : "Choose Plan"
      }}
    </UButton>

    <UButton
      v-else
      variant="solid"
      color="transparent"
      :disabled="loading"
      loading-icon="i-custom-spinner-icon"
      class="mt-6 w-full py-2 px-4 rounded-lg text-base border border-gray-300 text-gray-600 bg-transparent flex justify-center"
      loading-auto
      @click="cancelSubscription(subscriptionPlan.subscription.id)"
    >
      Cancel Subscription
    </UButton>
    <ul class="mt-6 text-sm text-gray-500 space-y-4">
      <li
        v-for="(feature, featureIndex) in subscriptionPlan.features"
        :key="featureIndex"
        class="flex items-center"
      >
        <div
          class="w-5 h-5 rounded-full bg-grey flex items-center justify-center mr-2"
        >
          <IconifyIcon
            icon="ic:baseline-check"
            class="w-4 h-4 inline-block text-black"
          />
        </div>
        {{ feature }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatCurrency } from "~/utils/currency"
import { useCancelSubscription } from "~/services/billing/invoice";
import type { SubscriptionPlan } from "~/types/billing";

const props = defineProps({
  subscriptionPlan: {
    type: Object as PropType<SubscriptionPlan>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["selectPlan"]);
const { cancelSubscription } = useCancelSubscription();

const formattedPrice = computed(() => {
  const price = formatCurrency(props.subscriptionPlan.price);
  const [whole, decimal] = price.split(".");
  return {
    whole,
    decimal: decimal ? decimal.slice(0, 2) : "00",
  };
});

const selectPlan = () => {
  if (!props.subscriptionPlan.subscription.is_subscribed) {
    emit("selectPlan", props.subscriptionPlan);
  }
};
</script>

<style scoped></style>
