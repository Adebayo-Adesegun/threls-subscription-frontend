<template>
  <main
    class="grid md:grid-cols-12 gap-6"
    :class="showDetails ? 'overflow-hidden' : ''"
  >
    <div
      class="py-8 px-4 max-w-7xl md:mx-auto"
      :class="showDetails ? 'md:col-span-8' : 'md:col-span-12'"
    >
      <div class="mb-10">
        <h1 class="text-3xl font-semibold">Billing</h1>
        <p class="mt-2 text-gray-500">
          Monitor user plans, billing, and upgrades in one place.
        </p>
      </div>
      <div
        v-if="loadingPlans"
        class="flex justify-center items-center min-h-[200px]"
      >
        <IconifyIcon
          icon="eos-icons:spinner"
          class="w-12 h-12 text-primary animate-spin"
        />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6" v-else>
        <PlanCard
          v-for="plan in plans"
          :key="plan.id"
          @select-plan="subscribeToPlan"
          :loading="loadingSubscribeToPlan"
          :subscription-plan="plan"
        />
      </div>
      <InvoiceTable />
    </div>

    <transition name="slide-right" mode="out-in">
      <div
        class="col-span-4 border-l fixed right-0 top-0 min-w-[450px]"
        v-if="showDetails && currentInvoiceData"
      >
        <InvoiceInfo
          @close="showDetails = false"
          :invoice="currentInvoiceData"
        />
      </div>
    </transition>
  </main>
</template>

<script setup lang="ts">
import InvoiceTable from "~/components/molecules/billing/InvoiceTable/index.vue";
import InvoiceInfo from "~/components/molecules/billing/InvoiceInfo/index.vue";
import PlanCard from "~/components/molecules/billing/PlanCard/index.vue";
import {
  useGetInvoices,
  showDetails,
  currentInvoiceData,
} from "~/services/billing/invoice";
import { useCreateSubscription, useGetPlan } from "~/services/billing/plan";

const { getAllPlans, plans, loading: loadingPlans } = useGetPlan();
const { getAllInvoices } = useGetInvoices();
const { subscribeToPlan, loading: loadingSubscribeToPlan } =
  useCreateSubscription();

onMounted(() => {
  Promise.all([getAllPlans(), getAllInvoices()]);
});
</script>
