import "./styles/style.scss";
//import "/82844/shared_res/mos/free_html/int/Subscription_Machine_PLP/main.scss";
import { getSubscriptionData, getPriceFormatted } from "./js/utils";

// const createSubscriptionEl = (price) => {
//   const copyText = (window as any).SubscriptionMachinePLP[getMarket()]
//     .subscriptionPrice[getLang()];

//   const container = document.createElement("div") as HTMLDivElement;
//   container.classList.add("ProductListElement__price--subscription");
//   const orEl = document.createElement("span") as HTMLDivElement;
//   orEl.innerHTML = copyText.or;
//   const priceEl = document.createElement("span") as HTMLDivElement;
//   priceEl.innerHTML = price;
//   priceEl.classList.add("ProductListElement__price--subscriptionPrice");
//   const withEl = document.createElement("span") as HTMLDivElement;
//   withEl.innerHTML = copyText.afterPrice;

//   container.append(orEl);
//   container.append(priceEl);
//   container.append(withEl);
//   return container;
// };

const getSubscriptions = async (): Promise<object> => {
  const response = await getSubscriptionData();
  return response.subscriptionProfiles;
};

const getProductSubscription = (sku: string, subscriptions) => {
  return subscriptions.find((plan) => {
    return plan.productChoices.some((item) => {
      return item === sku;
    });
  });
};

const addSubscriptionInfo = async () => {
  const subscriptions = await getSubscriptions();
  const products = document.querySelectorAll<HTMLDivElement>(
    ".ProductListGroup"
  );

  for (const product of products as any) {
    const productArticle = product.querySelector(".ProductListElement"),
      productSKU: string = productArticle?.getAttribute(
        "data-product-item-id"
      ) as string,
      priceEl = product.querySelector(".ProductListElement__price");

    if (priceEl) {
      const costContainer = document.createElement("div") as HTMLDivElement;
      costContainer.classList.add("ProductListElement__costs");
      priceEl.parentNode!.insertBefore(costContainer, priceEl.nextSibling!);
      costContainer.appendChild(priceEl);

      //Check if machine has a subscription plan
      const subscription = getProductSubscription(productSKU, subscriptions);
      if (subscription) {
        //Harcoded to 1 temporarily
        let priceSubscription = await getPriceFormatted(1);
        let pricePeriodicFee = await getPriceFormatted(
          subscription.periodicFee
        );
        // let priceSubscription = await getPriceFormatted(
        //   subscription.promotionalPrice
        // );
        priceSubscription = priceSubscription.split(".")[0];

        //Function
        const copyText = (window as any).SubscriptionMachinePLP[getMarket()]
          .subscriptionPrice[getLang()];

        const container = document.createElement("div") as HTMLDivElement;
        container.classList.add("ProductListElement__price--subscription");
        const var1 = `
          <span>${copyText.or}</span>
          <span class="ProductListElement__price--subscriptionPrice">${priceSubscription}</span>
          <span>+</span>
          <span class="ProductListElement__price--subscriptionPrice">${pricePeriodicFee}</span>
          <span>/month</span><br>
          <span>${copyText.afterPrice}</span>
        `;
        const var2 = `
          <span>${copyText.or}</span>
          <span class="ProductListElement__price--subscriptionPrice">${priceSubscription}</span>
          <span>${copyText.afterPrice}</span>
        `;
        container.innerHTML = var2;
        const badge = document.createElement("button") as HTMLButtonElement;
        badge.innerHTML = `i`;
        badge.classList.add("ProductListElement__price--infoIcon");
        badge.addEventListener("click", popup, false);
        container.append(badge);

        costContainer.appendChild(container);
      }
    }
  }
};

function popup(event) {
  event.preventDefault();
  event.stopPropagation();
  console.log("pup");
}
function getLang() {
  if (!(window as any).config) {
    console.log("AB - window.config not found");
  }
  const ns = (window as any).config.padl.namespace;
  if (!ns) {
    console.log("AB - padl.namespace not found");
  }
  const dataLayer = (window as any)[ns].dataLayer;
  if (!dataLayer) {
    console.log("AB - window[ns].dataLayer not found");
  }
  return (window as any)[ns].dataLayer.page.page.pageInfo.language;
}

function getMarket() {
  return (window as any).config.defaults.addressCountry;
}

//Check if .ProductList is rendered
let documentObserver = new MutationObserver(function (mutations) {
  if (document.contains(document.querySelector(".ProductList"))) {
    addSubscriptionInfo();
    documentObserver.disconnect();
  }
});

documentObserver.observe(document, {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
});
console.log("asa");
