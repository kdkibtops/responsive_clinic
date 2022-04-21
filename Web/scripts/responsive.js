const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const themeToggler = document.querySelector('.theme-toggler');


menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelector('span').classList.toggle('active');
});

orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent = `
            <td>${order.productName}</td>
            <td>${order.productNumber}</td>
            <td>${order.payment}</td>
            <td class=${order.shipping === 'Declined' ? 'Danger': order.shipping === 'pending' ? 'Warning' :'Primary'}>${order.paymentStatus}</td>
            <td class="primary">${order.details}</td>
    `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
})