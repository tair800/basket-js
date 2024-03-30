let wishlist = [];
if (localStorage.getItem("wishlist")===null){
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
} else {
    wishlist = JSON.parse(localStorage.getItem("wishlist"));
}

const heartBtns = document.querySelectorAll(".fa-heart");
heartBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        const id = this.parentElement.getAttribute("data-id");

        const existProduct = wishlist.find((m) => m.id ===id);
        if (existProduct === undefined) {
            wishlist.push({
                id: id,
                name: this.parentElement.firstElementChild.nextElementSibling.innerText,
                desc: this.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerText,
                price: this.previousElementSibling.previousElementSibling.innerText.split("$")[0],
                image: this.parentElement.previousElementSibling.getAttribute("src"),

            })
            this.style.color = "red";
        }else{
            wishlist=wishlist.filter(m=>m.id!=id);
            this.style.color="gray"
        }
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
        calculateCount()
    })
});

function calculateCount(){
    const wishlistCount=document.querySelector(".favCount");
    let wish=localStorage.getItem("wishlist");
    let length=0;
    if(wish){
        length=JSON.parse(wish).length;
        wishlistCount.innerText=length;
    }
}
calculateCount()

function setWishlistColor(){
    const products=document.querySelectorAll(".card");

    products.forEach(item=>{
        wishlist.forEach(wishlist=>{
            const productId=item.querySelector(".card-body").getAttribute("data-id");
            if(wishlist.id==productId){
               const heart=item.querySelector(".fa-heart");
               heart.style.color="red";
            }
        });
    });
};
setWishlistColor()