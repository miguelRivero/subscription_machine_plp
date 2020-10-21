// export async function getProductData(sku: string) {
//   return napi.catalog().getProduct(sku);
// }

export async function getSubscriptionData() {
  return napi.market().getSubscriptions();
}

export async function getPriceFormatted(totalPrice) {
  return window.napi.priceFormat().then(function (price) {
    var currency = window[config.padl.namespace].dataLayer.app.app.currency;
    var formatedPrice = price.short(currency, totalPrice);
    //var formatedPirceHtml = price.html(currency, totalPrice);
    return formatedPrice;
  });
}
// export async function getProduct(sku: string) {
//   let item;
//   try {
//     item = await napi.catalog().getProduct(sku);
//   } catch (e) {}
//   return item;
// }
