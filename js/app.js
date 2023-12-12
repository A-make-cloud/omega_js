
(async function () {
  let result = await fetch('../catalogue.json');
  let catalogue = await result.json()

  const storeItems = document.getElementById('store-items');
  const itemcontainer = document.querySelectorAll('.img-container');
  const cartItems = document.getElementById('cart-item');

  const storeItemsAll = document.querySelectorAll('.store-items');
  const storeEachItem = document.querySelectorAll('.store-item');
  const lightboxContainer = document.querySelectorAll('.lightbox-container');
  const lightboxItem = document.querySelectorAll('.lightbox-item');
  const btnClose = document.querySelectorAll('.fa-window-close')

  const iconAddToCart = document.querySelectorAll('.store-item-icon')
  const itemCart = document.querySelectorAll('.cart')
  const cart = document.getElementById('cart')
  const grandTotalCart = document.getElementById('total-cart-all')
  // ICONE
  const itemTotal = document.querySelector('.item-total')
  const itemCount = document.querySelector('#item-count')
  let TotalCount = 0
  let amountCount = 1
  function addToCart() {
    iconAddToCart.forEach(ic => {
      let count = 0
      ic.addEventListener('click', (event) => {
        let allProducts = '';
        btn = event.target
        // console.log(btn);//<i class="fas fa-shopping-cart">
        let btnGrandParent = btn.parentElement.parentElement//<div class="card ">

        let btnParent = btn.parentElement.parentElement//<div class="../img-container">
        //let btnChildren = btnGrandParent.children//HTMLCollection { 0: div.../img-container, 1: div.card-body, length: 2 }
        let itemImage = btnGrandParent.children[0].src//http://127.0.0.1:5500/img/doughnut-2.jpeg
        let cartBody = btn.parentElement.parentElement.children[1]//icon
        let itemName = btnGrandParent.children[1].innerText
        let itemPrice = btnGrandParent.children[2].innerText
        let priceNbr = +(itemPrice);
        let totalItemPrice = priceNbr;
        // itemPrice.setAttribute("h5", "")

        //let itemPrice = btnParent.children[1].innerText
        console.log(itemPrice);

        let itemContainer = document.createElement('tr')
        let cartContainer = document.getElementsByTagName('tbody')[0]
        cartItems.append(itemContainer)

        itemContainer.innerHTML = `
      <td id="my_tr"><input class="uk-checkbox input-checkbox" id="input-checkbox" type="checkbox"></td>
              <td><img class="uk-preserve-width uk-border-circle"
                  src=${itemImage} width="40" alt></td>
              <td class="uk-table-link">
                <h5 class="item-name">${itemName}</h5>
              </td>
              <td class="uk-text-truncate item-price"><h3>$${priceNbr}</h3></td>
              <td id="num"><input type='number' class='num' id="num" width='40px'  value='1'></td>
              <td class="uk-text-truncate total-price"><h3>$${totalItemPrice}</h3></td>
              <td><button class="uk-button uk-button-danger remove-prod" type="button" id="remove-prod" >Remove</button></td>
      </br>`;
        grandTotalCart.innerHTML += `${totalItemPrice}`;

        // input cart
        const quantityFields = document.querySelectorAll('.num');
        for (let i = 0; i < quantityFields.length; i++) {
          quantityFields[i].value = 1;
          //quantityFields[i].addEventListener('change', totalCost)
          quantityFields[i].addEventListener('click', totalCost)
        }
        function clearItemCart() {
          let itemContent = document.querySelector('tr')
          let btnRemoveInput = document.querySelector("#remove-prod")

          let btnRemove = document.querySelectorAll(".remove-prod")
          btnRemove.forEach(rem => {
            rem.addEventListener('click', (evt) => {
              // alert('btn')
              // btnRemoveInput.forEach(rem => {
              let item = ''
              for (let i = 0; i < itemContainer.length; i++) {
                item = itemContainer[i];
                console.log(itemContainer[i]);
              }
              itemContainer.innerHTML = ''
              //  itemContainer.style.display = 'none'
              // cartContainer.style.backgroungColor = 'yellow'
              grandTotal()
              itemNbrCount()
            })

          })
        }
        clearItemCart()
        // This function helps to multiply the quantity and the price
        function totalCost(event) {
          let quantity = event.target
          quantity_parent = quantity.parentElement.parentElement
          //console.log('quantity_parent', quantity_parent);
          price_field = quantity_parent.getElementsByClassName('item-price')[0]
          total_field = quantity_parent.getElementsByClassName('total-price')[0]
          price_field_content = price_field.innerText.replace('$', '')
          total_field.children[0].innerText = '$' + quantity.value * price_field_content
          grandTotal()
          if (isNaN(quantity.value) || quantity.value <= 0) {
            quantity.value = 1
          }
          amountCount = quantity.value
        }
        //This function helps to add up the total of the items
        function grandTotal() {
          let total = 0
          let grand_total = document.getElementsByClassName('grand-total')[0]
          all_total_fields = document.getElementsByClassName('total-price')
          for (let i = 0; i < all_total_fields.length; i++) {
            all_prices = Number(all_total_fields[i].innerText.replace('$', ''))
            total += all_prices
          }

          let grandT = 0;
          grandT += total

          // //  montant de l'ICONE panier
          itemTotal.innerText = grandT.toFixed(2)
          itemCount.innerText = TotalCount


          const cartTotal = document.getElementById('cart-total')

          grandTotalCart.innerHTML = `
          <div id="cart-grand-total"><h3>Total : </h3> $ ${grandT.toFixed(2)}</div>
          `;
          // grand_total.children[0].innerText = "$" + total
        }
        grandTotal()
        function itemNbrCount() {

          // //  quantite de l'ICONE panier
          let totalCount = amountCount++
          itemCount.innerText = totalCount;
        }
        itemNbrCount()

      })
    })

  }
  addToCart()

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

  function addLocalStorage() {
    // let products = localStorage.setItem('nam', 'cake')
  }
  addLocalStorage()
}())
