let table = document.querySelector(".table");
let tableContainer = document.getElementById("TableContainer");
let total = document.getElementById("total");
let totalCount = document.getElementById("totalCount");
let home=document.querySelector(".home");
let remove=document.querySelector("remove")
let totalPrice = 0;
let totalBasketCount = 0;
let allProducts=GetBasket();


home.innerHTML=`<a href="./index.html">Go Home</a>`
function GetBasket() {
    let basket = localStorage.getItem("basket");
    let products = [];

    if (basket)
        products = JSON.parse(basket)
    return products;
};





if (GetBasket().length) {
    GetBasket().forEach(product => {
        let tr = document.createElement("tr");

        let tdImg = document.createElement("td");
        let img = document.createElement("img");

        img.setAttribute("src", product.image);
        img.style.width = ("100px");
        img.style.height = ("100px");

        tdImg.append(img)

        let tdName = document.createElement("td");
        tdName.innerText = product.name;

        let tdPrice = document.createElement("td");
        tdPrice.innerText = (product.count * product.price) + "$";

        let tdCount = document.createElement("td");
        tdCount.innerText = product.count;

        let tdRemove = document.createElement("td");
        tdRemove.style.cursor="pointer"
        tdRemove.innerHTML = `<i class="fa-solid fa-trash"></i>`

        let tdPlus=document.createElement("td");
        tdPlus.style.cursor="pointer"
        tdPlus.innerHTML='<i class="fa-solid fa-plus"></i>'

        let tdMinus=document.createElement("td");
        tdMinus.style.cursor="pointer"
        tdMinus.innerHTML='<i class="fa-solid fa-minus"></i>'
        

       tr.append(tdImg, tdName, tdPrice, tdCount, tdRemove,tdPlus,tdMinus)
        table.lastElementChild.append(tr)

        totalPrice += product.count * product.price;
        totalBasketCount += product.count

        tdRemove.onclick=function(){
           allProducts=allProducts.filter(prod=>prod.id!=product.id);
           localStorage.setItem("basket",JSON.stringify(allProducts));
           totalPrice -= product.count * product.price;
           totalBasketCount -= product.count;
           total.innerText = "Total Price: " + totalPrice + "$";
           totalCount.innerText = "Total Products Count: " + totalBasketCount;
           tr.remove();
        }

        tdPlus.onclick = function() {
            totalBasketCount++;
            product.count++;
            tdCount.innerText = product.count;
            tdPrice.innerText = (product.count * product.price) + "$";
            totalPrice += parseFloat(product.price);
            total.innerText = "Total Price: " + totalPrice + "$";
            totalCount.innerText = "Total Products Count: " + totalBasketCount;
            localStorage.setItem("basket", JSON.stringify(allProducts));
            Update();
        };

        tdMinus.onclick=function(){
            if(product.count>1){
                totalBasketCount--;
                product.count--;
                tdCount.innerText=product.count;
                tdPrice.innerText=(product.count * product.price) + "$";
                totalPrice-=parseFloat(product.price);
                total.innerText = "Total Price: " + totalPrice + "$";
                totalCount.innerText = "Total Products Count: " + totalBasketCount;
                localStorage.setItem("basket", JSON.stringify(allProducts));
                Update();
            }
           


        }


        function Update(){
            let productIndex = allProducts.findIndex(prod => prod.id === product.id);
            allProducts[productIndex] = product;
        }


    });
    
    total.innerText = "Total Price:" + " " + totalPrice + "$"
    totalCount.innerText = "Total Products Count:" + " " + totalBasketCount
    tableContainer.firstElementChild.classList.remove("d-none")
    
  

}



