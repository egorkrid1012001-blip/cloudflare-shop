export async function onRequestGet(context) {
  const {env} = context;
  const raw = await env.ORDERS_KV.get('orders');
  const orders = raw ? JSON.parse(raw) : [];
  return new Response(JSON.stringify(orders), {headers:{'Content-Type':'application/json'}});
}
