// export async function getProductData(sku: string) {
//   return napi.catalog().getProduct(sku);
// }

export async function getSubscriptionData() {
  return napi.market().getSubscriptions();
}

// export async function getProduct(sku: string) {
//   let item;
//   try {
//     item = await napi.catalog().getProduct(sku);
//   } catch (e) {}
//   return item;
// }
