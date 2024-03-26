const buttons = document.querySelectorAll(".btn-primary");
const basketCount = document.querySelector(".count");


buttons.forEach(button => {
    button.onclick = function (ev) {
        ev.preventDefault();
        let products;
        let productId = this.parentElement.getAttribute("data-id");

        if (localStorage.getItem("basket") == null) {
           localStorage.setItem("basket",JSON.stringify([]));
        } else {
            products = JSON.parse(localStorage.getItem("basket"));
        }

        let existProduct = products.find(p => p.id == productId)

        if (existProduct) {
            existProduct.count++;
        } else {
            let product = {

                id: productId,
                name: this.parentElement.firstElementChild.innerText,
                desc: this.previousElementSibling.previousElementSibling.innerText,
                price: this.previousElementSibling.innerText.split("$")[0],
                count:1,
                image:this.parentElement.previousElementSibling.getAttribute("src"),
               


            }
            products.push(product)

        }

        localStorage.setItem("basket", JSON.stringify(products))

        calculateBasketCount();


    }
});

function calculateBasketCount() {
    let basket = localStorage.getItem("basket");
    let length = 0;
    if (basket) {
        length = JSON.parse(basket).length;
        basketCount.innerText = length;
    }

}
calculateBasketCount();