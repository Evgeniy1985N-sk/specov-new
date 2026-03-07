
export const cartEndpoints = {
  add: () => "/cart/add",
  remove: () => "/cart/remove",
  clear: () => "/cart/clear",
  fetchAll: () => "/cart/fetch",
  share: () => "/cart/share",
  restoreShared: (token: string) => `/cart/shared/${token}`,
  importShared: (token: string) => `/cart/import/${token}`,
  printPdf: (cartName: string) => `/cart/pdf?name=${encodeURIComponent(cartName)}`,
}
