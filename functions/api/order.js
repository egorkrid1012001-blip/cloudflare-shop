export async function onRequestPost(context) {
  const {request, env} = context;
  const body = await request.json().catch(()=>({}));
  const order = {
    id: Date.now().toString(),
    city: body.city,
    product: body.product,
    district: body.district,
    pay: body.pay,
    name: body.name,
    phone: body.phone,
    comment: body.comment,
    created_at: new Date().toISOString()
  };

  const raw = await env.ORDERS_KV.get('orders');
  let orders = raw ? JSON.parse(raw) : [];
  orders.push(order);
  await env.ORDERS_KV.put('orders', JSON.stringify(orders));

  const token = env.TELEGRAM_TOKEN;
  const chat = env.TELEGRAM_CHAT_ID;
  if (token && chat) {
    const text = `Новый заказ\nID: ${order.id}\n${order.name} | ${order.phone}\n${order.city} / ${order.district}\nТовар: ${order.product}\nОплата: ${order.pay}\nКомментарий: ${order.comment}`;
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {method:'POST', body: JSON.stringify({chat_id: chat, text}), headers:{'Content-Type':'application/json'}}).catch(()=>{});
  }

  return new Response(JSON.stringify({ok:true, message:'Заказ отправлен', orderId: order.id}), {headers:{'Content-Type':'application/json'}});
}
