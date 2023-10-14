const storeItems = document.getElementById('store-items');
const itemcontainer = document.querySelectorAll('.img-container');

const storeItemsAll = document.querySelectorAll('.store-items');
const storeEachItem = document.querySelectorAll('.store-item');
const lightboxContainer = document.querySelectorAll('.lightbox-container');
const lightboxItem = document.querySelectorAll('.lightbox-item');
const btnClose = document.querySelectorAll('.fa-window-close')

async function displayCatalogue() {
  let outlet = ''
  try {
    let result = await fetch('catalogue.json');
    let products = await result.json()
    /*
     let data = await result.json();
    let products = data.items;
*/
    let productItems = products.map(product => {
      return `
       <div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item cupcakes"
            data-item="cupcakes">
            <div class="card ">
              <div class="img-container">
                <img src=${product.image}
                 class="card-img-top store-img" alt="image prod">
                <span class="store-item-icon">
                  <i class="fas fa-shopping-cart"></i>
                </span>
              </div>
              <div class="card-body">
                <div
                  class="card-text d-flex justify-content-between text-capitalize">
                  <h5 id="store-item-name">${product.name}</h5>
                  <h5 class="store-item-value">$ <strong id="store-item-price"
                      class="font-weight-bold">${product.price}</strong></h5>

                </div>
              </div>

            </div>
            <!-- end of card-->
          </div>
          `;

    }).join('')
    storeItems.innerHTML = productItems;
  } catch (error) {

  }

}
displayCatalogue()

function displayLightbox() {

  document.querySelectorAll('.img-container').forEach(item => {

    item.addEventListener('click', () => {
      item.style.backgroundColor = 'red'
      alert('fff')

      // const showImg = document.querySelectorAll('.lightbox-container');

      //document.querySelectorAll('.lightbox-container').classList.add('show')
      //lightboxContainer.style.remove('hide')
      lightboxContainer.forEach(im => {
        alert('fff')
        im.style.display = 'block'

      })
      lightboxItem.forEach(li => {
        // im.style.display = 'block'
        li.style.background = 'url("../img/cake-2.jpeg")' + 'center/cover fixed no-repeat';
        // li.style.background = 'url("../img/cake-2.jpeg") center/cover fixed no-repeat;'
      })
    })
  })
  btnClose.forEach(bt => {
    bt.addEventListener('click', () => {
      lightboxContainer.forEach(im => {
        im.style.display = 'none'
      })
    })
  })

}
displayLightbox()
