const zh = document.documentElement.lang.toLowerCase().startsWith('zh');
const names = zh ? ['产品优先', '套餐优先', '场景优先'] : ['Product first', 'Plans first', 'Use cases first'];
const keys = ['A', 'B', 'C'];
const current = new URL(location.href).searchParams.get('variant');
const index = Math.max(0, keys.indexOf(current));
document.body.dataset.variant = keys[index];

const hero = document.querySelector('.hero');
const products = document.querySelector('#products');
const pricing = document.querySelector('#pricing');
const solutions = document.querySelector('#solutions');
const actions = hero.querySelector('.actions');
actions.innerHTML = zh
  ? '<a class="btn" href="#pricing">查看套餐 →</a><a class="btn outline" href="#guide">接入指南</a>'
  : '<a class="btn" href="#pricing">View plans →</a><a class="btn outline" href="#guide">Setup guide</a>';

if (index === 1) {
  hero.querySelector('.network').remove();
  hero.querySelector('.wrap').append(pricing);
} else if (index === 2) {
  hero.querySelector('.network').remove();
  hero.querySelector('.wrap').append(solutions);
}
if (index !== 1) {
  const table = pricing.querySelector('table');
  const rows = [...table.tBodies[0].rows];
  const selector = document.createElement('div');
  selector.className = 'plan-switch';
  const buttons = rows.map((row, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = row.cells[0].textContent;
    button.addEventListener('click', () => selectPlan(i));
    selector.append(button);
    return button;
  });
  function selectPlan(selected) {
    rows.forEach((row, i) => {
      row.hidden = i !== selected;
      buttons[i].setAttribute('aria-pressed', String(i === selected));
    });
  }
  table.before(selector);
  selectPlan(0);
}

function variantLink(offset) {
  const url = new URL(location.href);
  url.searchParams.set('variant', keys[(index + offset + keys.length) % keys.length]);
  url.hash = '';
  return url.href;
}
document.querySelectorAll('a[hreflang]').forEach(link => {
  const url = new URL(link.href);
  url.searchParams.set('variant', keys[index]);
  link.href = url.href;
});
const switcher = document.createElement('aside');
switcher.className = 'prototype-switch';
switcher.setAttribute('aria-label', zh ? '切换原型' : 'Switch prototype');
switcher.innerHTML = '<a aria-label="' + (zh ? '上一方案' : 'Previous variant') + '" href="' + variantLink(-1) + '">←</a><span>' +
  (zh ? '原型' : 'Prototype') + ' · ' + keys[index] + ' / ' + names[index] +
  '</span><a aria-label="' + (zh ? '下一方案' : 'Next variant') + '" href="' + variantLink(1) + '">→</a>';
document.body.append(switcher);
document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
      event.target.closest('input, textarea, select, button, [contenteditable]')) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    location.href = variantLink(event.key === 'ArrowLeft' ? -1 : 1);
  }
});
