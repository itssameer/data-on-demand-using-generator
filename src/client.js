/**
 * data processing:
 * 1. read data from service1
 * 2. get data from service2
 * 3. submit data to any other api
 */

const mockDB = async () =>
  Array.from(
    {
      length: 1000,
    },
    (v, index) => `${index}-laptop`
  );

const PRODUCT_API = `http://localhost:3000/products`;
const CART_API = `http://localhost:3001/cart`;

/* async function processDBData() {
  const products = await mockDB();

  const responses = [];

  for (const product of products) {
    const productInfo = await (
      await fetch(`${PRODUCT_API}?name=${product}`)
    ).text();

    const cartInfo = await (
      await fetch(CART_API, {
        method: "POST",
        body: productInfo,
      })
    ).text();
    responses.push(cartInfo);
  }

  return responses;
} */

async function* processDBDataGen() {
  const products = await mockDB();

  const responses = [];

  for (const product of products) {
    const productInfo = await (
      await fetch(`${PRODUCT_API}?name=${product}`)
    ).text();

    const cartInfo = await (
      await fetch(CART_API, {
        method: "POST",
        body: productInfo,
      })
    ).text();

    yield cartInfo;
  }
}

for await (const data of processDBDataGen()) {
  console.table(data);
}
