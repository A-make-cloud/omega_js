(async function () {
  const storeItems = document.getElementById('store-items')
  const storeSeach = document.getElementById('store-search')
  let res = await fetch('../catalogue.json');
  let prods = await res.json()
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
  displayProds()

  function searchItem() {
    const searchItem = document.getElementById('search-item')
    const typeItem = document.querySelector('#search-item')
    let word = ''
    typeItem.addEventListener('input', (evt) => {
      let nameSearch = prods.map(wo => {
        const { name, image } = wo
        //   console.log(name);
        evt.preventDefault()
        let searchValue = evt.target.value;
        //if (name.toLowerCase().startsWith('str')) {
        if (name.toLowerCase().startsWith(searchValue)) {
          word +=
            `
        <img src=${image} width="150px">
       `
        }
        //word = name.toLowerCase().startsWith('ch')
      })

      storeSeach.innerHTML = word
      // storeSeach.innerHTML = typeItem.value
      console.log(typeItem.value);
    })
  }
  searchItem()
}())


