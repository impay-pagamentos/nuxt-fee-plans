import type { SellerSalesPlanResponse } from '~/types/im-pay.type'

export default defineEventHandler(async (event) => {
  const sellerId = getRouterParam(event, 'id')
  const config = useRuntimeConfig()

  if (!sellerId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Seller ID is required',
    })
  }

  try {
    const response = await $fetch<SellerSalesPlanResponse>(
      `${config.public.impayBaseUrl}/sellers/${sellerId}/sales-plan`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response
  } catch (error: any) {
    const statusCode = error.response?.status || 500
    const statusMessage = error.response?.statusText || 'Failed to fetch sales plan'

    throw createError({
      statusCode,
      statusMessage,
      data: error.response?.data || error.message,
    })
  }
})
