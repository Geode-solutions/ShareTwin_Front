import { use_cloud_store } from '@/stores/cloud'
const cloud_store = use_cloud_store()

export async function api_fetch (request, options) {
  console.log('geode_url', cloud_store.geode_url)
  return useFetch(request, { baseURL: cloud_store.geode_url, ...options })
}

export default api_fetch