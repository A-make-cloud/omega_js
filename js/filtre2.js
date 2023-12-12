// (async function () {
const storeItems = document.getElementById('store-items')
const storeSeach = document.getElementById('store-search')

function displayProds() {
  prods.map((elem) => {
    const { id, name, price, image, category } = elem;
    storeItems.innerHTML += `
      <div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item cakes"
              data-item="${category}">
              <div class="card ">
                <div class="../img-container">
                  <img src=${image} class="card-img-top store-img"
                    alt>
                  <h5 id="store-item-name">${name}</h5>
                  <h5 class="store-item-value"> <strong id="store-item-price"
                      class="font-weight-bold">${price}</strong></h5>
                  <span class="store-item-icon">
                    <i class="fas fa-shopping-cart"></i>
                  </span>
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
    // console.log(category);

    function filterMenu() {
      const buttons = document.querySelectorAll('.filter-btn')
      const storeImages = document.querySelectorAll('.store-item')
      buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault()
          const filt = e.target.dataset.filter
          storeImages.forEach(si => {
            const categ = e.target.dataset.item
            // console.log(filt);// categories sur laquelle on clique
            if (filt === 'all') {
              si.style.display = 'block'
              // si.style.background = 'green'
              console.log('categories avant:', category);
            } else if (filt === category) {
              let outlet = ''
              let categProds = prods
                .filter(fi => {
                  if (fi.category === filt) {
                    outlet +=
                      `
                    <div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item cakes"
                            data-item="${fi.category}">
                            <div class="card ">
                              <div class="../img-container">
                                <img src=${fi.image} class="card-img-top store-img"
                                  alt>
                                <h5 id="store-item-name">${fi.name}</h5>
                                <h5 class="store-item-value"> <strong id="store-item-price"
                                    class="font-weight-bold">${fi.price}</strong></h5>
                                <span class="store-item-icon">
                                  <i class="fas fa-shopping-cart"></i>
                                </span>
                              </div>
                              <div class="card-body">
                                <div
                                  class="card-text d-flex justify-content-between text-capitalize">
                
                                </div>
                              </div>
                
                            </div>
                            <!-- end of card-->
                          </div>
                    `
                  }
                  //return fi.category === filt
                }).join('')
              console.log('myCateg filter :', categProds);
              storeItems.innerHTML = outlet
            }
          })
        })
      })
    }
    filterMenu()
  })
}
// displayProds()
const filter = document.getElementById('filter')
const listItems = []
getData()
//function searchItem() {
const typeItem = document.querySelector('#search-item')

filter.addEventListener('input', (evt) => filterData(evt.target.value))
async function getData() {
  let res = await fetch('../catalogue.json');
  let { results } = await res.json()
  storeSeach.innerHTML = ''
  results.forEach(wo => {
    // const { name, image, price } = wo
    const li = document.createElement('li')
    listItems.push(li)
    li.innerHTML = `
            <div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item cupcakes"
            data-item="cupcakes">
            <div class="card ">
              <div class="img-container">
                <img src=${wo.image}
                 class="card-img-top store-img" alt="image prod">
                <span class="store-item-icon">
                  <i class="fas fa-shopping-cart"></i>
                </span>
              </div>
              <div class="card-body">
                <div
                  class="card-text d-flex justify-content-between text-capitalize">
                  <h5 id="store-item-name">${wo.name}</h5>
                  <h5 class="store-item-value">$ <strong id="store-item-price"
                      class="font-weight-bold">${wo.price}</strong></h5>

                </div>
              </div>

            </div>
            <!-- end of card-->
          </div>
       `

    //word = name.toLowerCase().startsWith('ch')
  })

  storeSeach.appendChild(li)
  // storeSeach.innerHTML = typeItem.value
  console.log(typeItem.value);

}
// searchItem()

function filterData(searchTerm) {
  console.log(searchTerm);
  listItems.forEach(item => {
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove('hide')
    } else {
      item.classList.add('hide')

    }
  })
}
// }())


