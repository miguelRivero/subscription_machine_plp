export function getModalContent(
  market,
  lang,
  duration,
  periodic,
  subscription,
  sku
) {
  const imagePath =
    "https://www.nespresso.com/shared_res/agility/ABtests/subscription/images/subscription_logo_black.svg";
  const modalContent = window.SubscriptionMachinePLP[market].modalContent;
  const imageEl = document.querySelector(
    "[data-product-item-id='" + sku + "'] .ProductListElement__image img"
  )
    ? document.querySelector(
        "[data-product-item-id='" + sku + "'] .ProductListElement__image img"
      ).outerHTML
    : "<div></div>";
  return `
<div id="subscriptionInfoModal" aria-hidden="true">
  <div role="dialog" aria-modal="true" aria-labelledby="subscriptionInfoModal__title" class="subscriptionInfoModal__container">

    <header class="subscriptionInfoModal__title">
      <h2 class="VisuallyHidden">Subscription by Nespresso</h2>
      <img
      class="subscriptionHero__logo"
      aria-hidden="true"
      src="${imagePath}"
      alt="Subscription by Nespresso" />
    </header>

    <div class="subscriptionInfoModal__content">

      <div class="subscriptionInfoModal__price">
        ${imageEl}
        <p>
          <span class="subscriptionInfoModal__firstPrice">${modalContent.pay[
            lang
          ](subscription)}</span>
          <span class="subscriptionInfoModal__periodicPrice">${modalContent.and[
            lang
          ](periodic)}</span>
        </p>
      </div>

      <ul class="subscriptionInfoModal__details">
        <li>${modalContent.credits[lang](periodic)}</li>
        <li>${modalContent.free[lang]}</li>
      </ul>
      
      <p class="subscriptionInfoModal__minimum">
        ${modalContent.minimum[lang](duration)}
      </p>
    </div>
    
  </div>
</div>
    `;
}
