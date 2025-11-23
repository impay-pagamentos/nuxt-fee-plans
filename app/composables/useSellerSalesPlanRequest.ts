import type { SalesPlanData, SellerSalesPlanResponse } from '~/types/im-pay.type'

export default function useSellerSalesPlanRequest() {
  async function get(sellerId: string): Promise<SalesPlanData> {
    const response = await $fetch<SellerSalesPlanResponse>(`/sellers/${sellerId}/sales-plan`, {
      method: 'GET',
    })
    return response.data;
  }

  return {
    get,
  }
}
