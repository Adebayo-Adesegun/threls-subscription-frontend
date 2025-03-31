import useAxios from "~/libs/useAxios"
import type { Invoice } from "~/types/billing"
import { useGetPlan } from "./plan"
export const showDetails = ref(false)
export const invoices = ref<Invoice[]>([])
export const currentInvoiceData = ref<Invoice | null>(null)

export const useGetInvoices = () => {
    const loading  = ref(false)
    const getAllInvoices = async () => {
        try {
            const response = await useAxios(true).get("/user/invoice")
            invoices.value = response.data.data
        } catch (error) {
            console.error('Error fetching plans:', error)
        }
    }
    return {
        invoices,
        loading,
        getAllInvoices
    }
}

export const useCancelSubscription = () => {
    const toast = useToast()
    const {getAllInvoices} = useGetInvoices()
    const {getAllPlans} = useGetPlan()
    const loading = ref(false)
    const cancelSubscription = async (subscriptionId: string) => {
        loading.value = true
        try {
            await useAxios(true).delete(`/user/subscription/${subscriptionId}/cancel`)
            await getAllPlans()
            await getAllInvoices()
            showDetails.value = false
            toast.add({
                color: 'green',
                title: `Subscription cancelled successfully`,
            })
        } catch (error: any) {
            toast.add({
                color: 'red',
                title: `${error.response.data.message}`,
            })
        } finally {
            loading.value = false
        }
    }
    return {
        loading,
        cancelSubscription
    }
}