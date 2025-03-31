<template>
  <section class="mt-12">
    <div
      class="flex flex-col md:flex-row md:justify-between gap-2 md:items-center mb-4"
    >
      <h2 class="text-2xl font-semibold">Invoice & Payment History</h2>
      <div class="flex gap-2">
        <div class="flex items-center border rounded-lg pr-4 pl-2 py-2 text-sm">
          <IconifyIcon
            icon="cuida:search-outline"
            class="w-4 h-4 text-gray-500 mr-2"
          />
          <input type="text" placeholder="Search" class="flex-1 outline-none" />
        </div>
        <button
          class="border px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 flex items-center gap-1 rounded-lg"
        >
          <IconifyIcon icon="ic:baseline-filter-list" class="w-4 h-4" />
          Filter
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <UTable
        :columns="sortableColumns"
        :rows="sortedInvoices"
        :loading="loadingInvoices"
        :sticky="true"
        class="max-w-[93vw] overflow-x-auto"
        loading-color="primary"
        v-model:row-selection="selectedRows"
        :ui="{
          table: { class: '' },
          tr: {
            base: '',
            odd: 'bg-white',
            even: 'bg-gray-50',
            selected: 'bg-orange-100',
          },
          wrapper: {
            base: 'overflow-hidden',
          },
        }"
      >
        <template #head="{ columns }">
          <thead class="bg-gray-200 text-sm text-gray-700">
            <tr>
              <th class="px-4 py-3 w-4">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                />
              </th>
              <th
                v-for="col in columns"
                :key="col.key"
                class="px-4 py-3 cursor-pointer select-none"
                @click="sortBy(col)"
              >
                <div class="flex items-center gap-1">
                  {{ col.label }}
                  <span v-if="sortKey === col.key">
                    <IconifyIcon
                      v-if="sortDirection === 'asc'"
                      icon="akar-icons:arrow-up"
                      class="w-3 h-3 text-gray-600"
                    />
                    <IconifyIcon
                      v-else
                      icon="akar-icons:arrow-down"
                      class="w-3 h-3 text-gray-600"
                    />
                  </span>
                </div>
              </th>
            </tr>
          </thead>
        </template>
        <template #data="{ row }">
          <td class="px-4 py-2">
            <input
              type="checkbox"
              :checked="selectedRows.includes(row)"
              @change="toggleRowSelection(row)"
            />
            {{ row.invoice_id }}
          </td>
        </template>
        <template #status-data="{ row }">
          <div
            class="items-center gap-2 flex-wrap inline-flex px-2 py-1 rounded-lg text-sm"
            :class="{
              'bg-green-200': row.status === InvoiceStatus.PAID,
              'bg-yellow-200 ': row.status == InvoiceStatus.PENDING,
              'bg-red-200': row.status === InvoiceStatus.FAILED,
            }"
          >
            <span
              v-if="row.status === InvoiceStatus.PAID"
              class="text-green-600 font-medium text-sm"
            >
              ● Paid
            </span>
            <span
              v-else-if="row.status === InvoiceStatus.PENDING"
              class="text-yellow-600 font-medium text-sm"
            >
              ● {{ row.status }}
            </span>
            <span v-else class="text-red-600 font-medium text-sm">
              ● {{ row.status }}
            </span>
          </div>
        </template>

        <template #payment_method-data="{ row }">
          <span>**** **** **** {{ row.payment_method_id.last_4 }}</span>
        </template>
        <template #created_at-data="{ row }">
          <span>{{ formatDate(row.created_at) }}</span>
        </template>
        <template #amount-data="{ row }">
          <span>{{ formatCurrency(row.amount) }}</span>
        </template>
        <template #actions-data="{ row }">
          <UDropdown
            :items="actionItems(row)"
            :popper="{ placement: 'bottom-end' }"
            :ui="{ content: 'w-8' }"
          >
            <UButton
              icon="pepicons-pop:dots-y"
              color="neutral"
              variant="plain"
            />
          </UDropdown>
        </template>
      </UTable>
    </div>
  </section>
</template>

<script setup lang="ts">
import { InvoiceStatus, type ColumnTypes, type Invoice } from "~/types/billing";
import { sortableColumns } from "./consts";
import {
  currentInvoiceData,
  showDetails,
  useGetInvoices,
} from "~/services/billing/invoice";

const { loading: loadingInvoices, invoices } = useGetInvoices();
const selectedRows = ref<Invoice[]>([]);
const sortKey = ref<ColumnTypes>("invoice_id");
sortKey.value = "created_at";
const sortDirection = ref<"asc" | "desc">("asc");

const isAllSelected = computed(
  () => selectedRows.value.length === invoices.value.length
);

function toggleSelectAll() {
  return isAllSelected.value
    ? (selectedRows.value = [])
    : (selectedRows.value = [...invoices.value]);
}

function toggleRowSelection(row: Invoice) {
  const exists = selectedRows.value.find((r: Invoice) => r.id === row.id);
  if (exists) {
    selectedRows.value = selectedRows.value.filter(
      (r: Invoice) => r.id !== row.id
    );
  } else {
    selectedRows.value.push(row);
  }
}

function sortBy(col: (typeof sortableColumns)[number]) {
  if (!col.sortable) return;
  sortDirection.value =
    sortKey.value === col.key && sortDirection.value === "asc" ? "desc" : "asc";
  sortKey.value = col.key;
}

const sortedInvoices = computed(() => {
  const key = sortKey.value;
  const direction = sortDirection.value;
  return [...invoices.value].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
});
function actionItems(invoice: Invoice) {
  return [
    [
      {
        id: 1,
        label: "View",
        icon: "i-heroicons-eye",
        click: () => {
          currentInvoiceData.value = invoice;
          showDetails.value = true;
        },
      },
      {
        id: 2,
        label: "Edit",
        icon: "i-heroicons-pencil-square",
        click: () => alert(`Editing invoice ${invoice.invoice_id}`),
      },
      {
        id: 3,
        label: "Delete",
        icon: "i-heroicons-trash",
        click: () => alert(`Deleting invoice ${invoice.invoice_id}`),
      },
    ],
  ];
}
</script>
