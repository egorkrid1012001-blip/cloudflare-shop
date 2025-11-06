export async function onRequestGet(context) {
  const {env} = context;
  let raw = await env.PRODUCTS_KV.get('products');
  let items = [];
  if (raw) {
    try { items = JSON.parse(raw); } catch (e) { items = []; }
  } else {
    items = [
      {name: "A-PVP 0.25 (пример)", price: "500"},
      {name: "A-PVP 0.5 (пример)", price: "900"},
      {name: "A-PVP 1 (пример)", price: "1700"}
    ];
  }
  return new Response(JSON.stringify(items), {headers: {'Content-Type':'application/json'}});
}
