(function(){
  let state = {city:null, product:null, district:null, pay:null};
  const show = id => document.querySelectorAll('.step').forEach(s=>s.classList.remove('active')) || document.getElementById(id).classList.add('active');

  // city selection
  document.querySelectorAll('[data-city]').forEach(b=>b.onclick=()=>{ state.city=b.dataset.city; loadProducts(); show('step-product'); });

  document.getElementById('back-to-city').onclick = ()=> show('step-city');
  document.getElementById('back-to-product').onclick = ()=> show('step-product');
  document.getElementById('back-to-district').onclick = ()=> show('step-district');
  document.getElementById('back-to-payment').onclick = ()=> show('step-payment');
  document.getElementById('back-to-product')?.addEventListener('click', ()=>{});

  async function loadProducts(){
    const res = await fetch('/api/products');
    const items = await res.json();
    const el = document.getElementById('products');
    el.innerHTML = '';
    items.forEach(i=>{
      const div = document.createElement('div');
      div.className='product';
      div.innerHTML = `<b>${i.name}</b> — ${i.price} <br><button class="chip" data-name="${i.name}">Выбрать</button>`;
      el.appendChild(div);
    });
    el.querySelectorAll('[data-name]').forEach(b=>b.onclick=()=>{ state.product=b.dataset.name; show('step-district'); });
  }

  document.querySelectorAll('#districts .chip').forEach(b=>b.onclick=()=>{ state.district=b.dataset.district; show('step-payment'); });

  document.querySelectorAll('.pay').forEach(b=>b.onclick=()=>{ state.pay=b.dataset.pay; show('step-contact'); document.getElementById('orderForm').dataset.product=state.product; });

  // submit order
  document.getElementById('orderForm').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      city: state.city,
      product: fd.get('product') || e.target.dataset.product,
      district: state.district,
      pay: state.pay,
      name: fd.get('name'),
      phone: fd.get('phone'),
      comment: fd.get('comment')
    };
    const res = await fetch('/api/order', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload)});
    const j = await res.json();
    show('thanks');
    document.getElementById('thanksText').textContent = j.message || 'Заказ принят';
  });

  // initial show
  show('step-city');
})();
