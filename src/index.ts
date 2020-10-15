import "./styles/style.scss";
import { getSubscriptionData } from "./js/utils";

const products = document.querySelectorAll<HTMLDivElement>(".ProductListGroup");

for (const product of products) {
  const productArticle = product.querySelector<HTMLDivElement>(
      ".ProductListElement"
    ),
    productSKU = productArticle?.getAttribute("data-product-item-id"),
    colorTxtEl = product.querySelector<HTMLDivElement>(
      ".ProductListElement__color-shades-label"
    ),
    priceEl = product.querySelector<HTMLDivElement>(
      ".ProductListElement__price"
    );
  const productData = async () => {
    const data = await getSubscriptionData();
    console.log(data);
    return data;
  };

  if (colorTxtEl) {
    colorTxtEl.innerHTML = "Colors:";
  }
  //   // 2. Create a new <p></p> element programmatically
  //   const p = document.createElement("p");

  //   // 3. Add the text content
  //   p.textContent = "Hello, World!";
  //   product?.appendChild(p);
}
