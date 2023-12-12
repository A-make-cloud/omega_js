(async function () {
  const storeItems = document.getElementById('store-items')
  let res = await fetch('../catalogue.json');
  let prods = await res.json()
  function displayImageLightbox() {
    prods.map((elem) => {
      const { id, name, price, image } = elem;

      storeItems.innerHTML += `
    <div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item sweets"
            data-item="sweets">
            <div class="card ">
              <div class="../img-container">
                <img src=${image} class="card-img-top store-img" 
                  alt>
                <h5 id="store-item-name">${name}</h5>
                <h5 class="store-item-value"> <strong id="store-item-price"
                    class="font-weight-bold">$ ${price}</strong></h5>
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
    })
    const storeImg = document.querySelectorAll('.store-img')

    const lightboxContainer = document.querySelector('.lightbox-container')
    // afficher l'image du produit en backgroung au click
    storeImg.forEach(ele => {
      const lightboxItem = document.querySelector('.lightbox-item')
      ele.addEventListener('click', (event) => {
        id_image = event.target

        lightboxContainer.classList.add('show')
        lightboxItem.style.background = `url("${id_image.src}") center/contain fixed no-repeat`;

        const btnNext = document.querySelector('.fa-caret-right')
        let tabImg = prods.map(im => {
          return `<img src=${im.image} width=200 />`

        })
        let index = 0
        let imSlide = ''
        for (let i = `${id_image.src}`; i < tabImg.length; i++) {
          imSlide = tabImg[i];
          lightboxItem.innerHTML = imSlide[0]
        }
        btnNext.addEventListener('click', () => {
          index++
          imSlide = tabImg[index]
          lightboxItem.innerHTML = imSlide
          lightboxItem.style.width = '70%'
          lightboxItem.style.height = '86%'
        })


        const btnPrev = document.querySelector('.fa-caret-left')
        index = 0
        imSlide = ''
        for (let i = `${id_image.src}`; i > tabImg.length - 1; i--) {
          imSlide = tabImg[i];
          lightboxItem.innerHTML = imSlide[0]
        }
        btnPrev.addEventListener('click', () => {
          index++
          imSlide = tabImg[index]
          lightboxItem.innerHTML = imSlide
        })
      })


      //  close lightbox
      const btnClose = document.querySelector('.fa-window-close')
      btnClose.addEventListener('click', () => {
        lightboxContainer.classList.remove('show')
      })
      // slider image du produit en backgroung au click
      const btnNext = document.querySelector('.fa-caret-right')
      const btnPrev = document.querySelector('.fa-caret-left')

    })

  }
  displayImageLightbox()

}())


