const cartContainerParent = document.getElementById('cart-parent');
const cartContainer = document.getElementById('cart');
const panierContainer = document.getElementById('cart-item');
const prixht = document.getElementById('store-item-price');

const totalItem = document.getElementById('item-count');

const itemCount = document.querySelector('.item-total')



const cartTotal = document.getElementById('cart-total')
function clearCart() {
    const clearCart = document.getElementById('clear-cart')
    clearCart.addEventListener('click', () => {
        cartItems.innerText = ''
        //cartTotal.innerText = 0
        grandTotalCart.innerHTML = `
        <div id="cart-grand-total"><h3>Total : </h3> $ 0</div>
        `;
        //total panier montant et quantite
        itemTotal.innerText = 0
        itemCount.innerText = 0
    })
}
clearCart()

function totalCart() {
    let totalHT = 0;
    let totalItems = 0;

    let totalTTC = 0
    cart.forEach((item) => {
        totalHT += item.price * item.nbrItem;
        totalItems += item.nbrItem;

    })
    prixht.innerHTML = totalHT.toFixed(2)
    itemCount.innerHTML = totalHT.toFixed(0)

    totalHT += totalPriceItem
    totalItem.innerHTML = totalItems

}
let cart = []
function addtocart(id) {
    if (cart.some((item) => item.id === id)) {
        changeQty('plus', id);
    } else {
        const item = prods.find((prod) => prod.id === id)

        cart.push({
            ...item,
            nbrItem: 1,
        });
        console.log(cart);
    }
    updateCart();
}

function updateCart() {
    renderCart()
    totalCart()
}
function renderCart() {
    panierContainer.innerHTML = "";
    cart.forEach((item) => {
        totalPriceItem = `${item.price}` * `${item.nbrItem}`
        panierContainer.innerHTML +=
            `
            <table>
            <tr>
            <td id="my_tr"><input class="uk-checkbox input-checkbox" id="input-checkbox" type="checkbox"></td>

            <td><img class="uk-preserve-width uk-border-circle"
            src=${item.image} width="40" alt></td>
            <td class="uk-table-link">
            <h5 class="item-name">${item.name}</h5>
          </td>
          <td class="uk-text-truncate item-price"><h5>$${item.price}</h5></td>
        <td>
        <div >
        <h5 class="quantite_panier">${item.nbrItem}</h5>
    </div>
    </td>
    <td>

    <div >
    <h3 class="prix_panier">${totalPriceItem.toFixed(2)}</h3>

    </div>
    <td>
          <td>
         <div class="options_panier">
         <button class="moins" onclick="changeQty('moins',${item.id})"> &nbsp;- &nbsp;</button>
         <button onclick="removeItem(${item.id})">Del</button>
         <button class="plus" onclick="changeQty('plus',${item.id})">&nbsp;+&nbsp;</button>
     </div>
         </td>
          </tr>
          </table>
   
  
    </div>
   
        `;


    });
}

function changeQty(action, id) {
    cart = cart.map((item) => {
        let nbrItem = item.nbrItem
        if (item.id === id) {
            if (action === 'moins' && nbrItem > 1) {
                nbrItem--
            } else if (action === 'plus') {
                nbrItem++

            }
        }
        return {
            ...item,
            nbrItem,
        }
    });

    updateCart()

}
function removeItem(id) {
    cart = cart.filter((item) => item.id !== id)
    updateCart()
}
function openCart() {
    const cartInfo = document.querySelector('#cart-info')
    const cartClass = document.querySelector('.cart')
    cartInfo.addEventListener('click', () => {
        cartClass.classList.add('show-cart')
    })
}
openCart()

function closeCart() {
    const checkoutCart = document.querySelector('#checkout-cart')
    const cartClass = document.querySelector('.cart')
    checkoutCart.addEventListener('click', () => {
        cartClass.classList.remove('show-cart')
    })
}
closeCart()
