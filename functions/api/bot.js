export async function onRequestPost(context) {
  const {request, env} = context;
  const body = await request.json().catch(()=>null);
  if (!body || !body.message) return new Response('ok');
  const msg = body.message;
  const text = msg.text || '';
  const chatId = msg.chat && msg.chat.id;

  if (text.startsWith('/addproduct ')) {
    const payload = text.replace('/addproduct ', '').trim();
    const parts = payload.split('|').map(s=>s.trim());
    const name = parts[0] || 'unnamed';
    const price = parts[1] || '';
    const raw = await env.PRODUCTS_KV.get('products');
    const products = raw ? JSON.parse(raw) : [];
    products.push({name, price});
    await env.PRODUCTS_KV.put('products', JSON.stringify(products));
    const token = env.TELEGRAM_TOKEN;
    if (token && chatId) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {method:'POST', body: JSON.stringify({chat_id: chatId, text: 'Продукт добавлен: ' + name}), headers:{'Content-Type':'application/json'}}).catch(()=>{});
    }
  }

  return new Response('ok');
}
