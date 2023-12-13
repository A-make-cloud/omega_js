let storeSeach = document.getElementById('store-search')
let storeItems = document.getElementById('store-items')

function displayProds() {
  prods.map((elem) => {
    const { id, name, price, image, category } = elem;
    storeItems.innerHTML += `
      <div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item cakes"
              data-item="${category}">
              <div class="card item-card">
                <div class="img-container">
                  <img src=${image} class="card-img-top store-img"
                    alt>
                </div>
                <div class='name-item'>
                <h5 id="store-item-name">${name}</h5>
                <h5 class="store-item-value"> <strong id="store-item-price"
                    class="font-weight-bold">${price} €</strong></h5>
            
                
                            <i class="fas fa-shopping-cart store-item-icon add-product" onclick='addtocart(${id})'></i>
              </div>
                <div class="card-body">
                  <div
                    class="card-text d-flex justify-content-between text-capitalize">
  
                  </div>
                </div>
  
              </div>
              <!-- end of card-->
            </div>
      `;



  })
}
displayProds()
const filter = document.getElementById('filter')
const listItems = []

getData()

filter.addEventListener('input', (evt) => filterData(evt.target.value))

async function getData() {
  const storeItems = document.getElementById('store-items')

  const displayResult = document.getElementById('result')
  const res = await fetch('../catalogue.json')
  /*
     const data = await res.json()
   //  Clear displayResult
   displayResult.innerHTML = ''
 
   data.results
 */

  //                 destructuration
  const results = await res.json()
  //  Clear result
  displayResult.innerHTML = ''

  results.forEach(wo => {
    //   console.log(user);
    const li = document.createElement('li')
    listItems.push(li)
    //  user.picture.large -> dans le api data

    li.innerHTML += `
    <div class="col-10 col-sm-6 col-lg-10 mx-auto my-3 store-item sweets item-list"
            data-item="sweets">
            <div class="card ">
              <div class="../img-container search-card">
                <img src=${wo.image} class="card-img-top store-img" 
                  alt>
                  <div> 
                   <h5 id="store-item-name">${wo.name}</h5>
                 
                <h5 class="store-item-value"> <strong id="store-item-price"
                    class="font-weight-bold">$ ${wo.price}</strong></h5>
                    </div>
           
                  <div class="descr"><h6>Fiche Produit</h6><p>${wo.description} </p></div>
              </div>
              <div class="card-body-search">
                <div
                  class="card-text d-flex justify-content-between text-capitalize">

                </div>
              </div>

            </div>
            <!-- end of card-->
          </div>
    `;
    displayResult.appendChild(li)
  });
}
const itemList = document.querySelectorAll('.item-list')
itemList.forEach(it => {

  it.style.display = 'none'
})
function filterData(searchTerm) {
  console.log(searchTerm);
  // listItems.style.display = 'none'
  listItems.forEach(item => {

    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      itemList.forEach(it => {

        it.style.display = 'block'
      })
      item.classList.remove('hide')
      // listItems.style.display = 'block'
    } else {
      item.classList.add('hide')

    }
  })
}
