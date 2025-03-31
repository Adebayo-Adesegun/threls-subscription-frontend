
import useAxios from "~/libs/useAxios"
import type { SubscriptionPlan } from "~/types/billing"
import { useGetInvoices } from "./invoice"
export const plans = ref<SubscriptionPlan[]>([])
export const useGetPlan = () => {
    const toast = useToast()
    const loading  = ref(false)
    const getAllPlans = async () => {
        try {
            loading.value = true
            const response = await useAxios(true).get("/plan")
            plans.value = response.data.data
        } catch (error: any) {
            toast.add({
                color: 'red',
                title: `${error.response.data.message}`,
            })
        }finally {
            loading.value = false
        }
    }
    return {
        plans,
        loading,
        getAllPlans
    }
}

export const useCreateSubscription = () => {
    const subscription = ref<SubscriptionPlan | null>(null)
    const loading = ref(false)
    const toast = useToast()
    const {getAllPlans} = useGetPlan()
    const {getAllInvoices} = useGetInvoices()
    const subscribeToPlan = async (plan:SubscriptionPlan ) => {
        loading.value = true
        const mockCardDetails = {
            last4: '1234',
            expiry_date: '10/12',
            card_type: 'visa'
        }

        try {
            const response = await useAxios(true).post("/user/subscription", { plan_id: plan.id, card: mockCardDetails })
            subscription.value = response.data.data
            await getAllPlans()
            await getAllInvoices()
            toast.add({
                color: 'green',
                title: `Subscribed to ${plan.name} successfully`,
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
        subscription,
        loading,
        subscribeToPlan
    }

    

}

