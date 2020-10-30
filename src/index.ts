import "./styles/style.scss";
//import "/82844/shared_res/mos/free_html/int/Subscription_Machine_PLP/main.scss";
import { getSubscriptionData, getPriceFormatted } from "./js/utils";
import { getModalContent } from "./js/modal";
// import $ from "jquery";
declare var $: any;
declare const window: any;
// interface MyWindow extends Window {
//   jQuery(): void;
//   config(): void;
//   ui(): void;
// }

// $(function () {
//   alert("Hello");
// });
let modal;

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
        const lang = getLang();
        const market = getMarket();
        //Function
        const copyText = (window as any).SubscriptionMachinePLP[market]
          .subscriptionPrice[lang];

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
        badge.addEventListener(
          "click",
          function (evt) {
            openModal(
              evt,
              market,
              lang,
              subscription.monthsDuration,
              pricePeriodicFee,
              priceSubscription,
              productSKU
            );
          },
          false
        );
        container.append(badge);

        costContainer.appendChild(container);
      }
    }
  }
};

function createModal() {
  modal = document.createElement("div");
  modal.classList.add("ab-modal-packaging");
  const wrapper = document.getElementById("main");
  wrapper!.appendChild(modal);

  const w = window.innerWidth;
  let popinWidth, popinHeight;
  //768 for ipad
  if (w <= 768) {
    popinWidth = w;
    $(modal).addClass("mobile");
  } else {
    popinWidth = 739;
  }
  popinHeight = "auto";

  $(modal).dialog({
    autoOpen: false,
    modal: true,
    position: {
      my: "center center",
      at: "center center",
      of: window,
    },
    dialogClass: "packagingContainer ui-popin popin-dialog-open dark",
    title: "",
    buttons: [
      {
        text: "",
        icon: "ui-icon-heart",
        class: "subscriptionInfoModal__closeBtn",
        click: function () {
          $(this).dialog("close");
        },
      },
    ],
    width: popinWidth,
    height: popinHeight,
    resizable: false,
    closeOnEscape: true,
    draggable: false,
    clickOutside: true,
    show: {
      effect: "fadeIn",
      duration: 300,
    },
    hide: {
      effect: "fadeOut",
      duration: 300,
    },
    open: function (e) {
      window
        .$(".abp-close-dialog, .ui-widget-overlay")
        .on("click", function (event) {
          event.preventDefault();
          window.$(e.target).dialog("close");
        });
      document.documentElement.classList.add("g_scrollLock");
    },
    close: function () {
      window.$(".abp-close-dialog, .ui-widget-overlay").off("click");
      document.documentElement.classList.remove("g_scrollLock");
    },
  });
}

function openModal(e, market, lang, duration, periodic, subscription, sku) {
  e!.preventDefault();
  e!.stopPropagation();

  modal.innerHTML = getModalContent(
    market,
    lang,
    duration,
    periodic,
    subscription,
    sku
  );
  $(modal).dialog("open");
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

function defer(method) {
  if (window.jQuery && window.jQuery.ui && window.config) {
    method();
  } else {
    setTimeout(function () {
      defer(method);
    }, 50);
  }
}

defer(function () {
  (async () => {
    console.log("waiting");
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
    createModal();
  })();
});

function init() {
  console.log("init");
}
