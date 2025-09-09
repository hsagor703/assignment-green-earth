const categoriesContainer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");
const displayDetailsModal = document.getElementById("cardDetailsModal");
const modalContainer = document.getElementById("modal-container");
const cartContainerSection = document.getElementById("cart-container-section");
const cartContainer = document.getElementById("cart-container");
const priceContainer = document.getElementById("price-container");
const cartCrossBtn = document.getElementById("cart-cross-btn");
let cartContainerTotalPrice = document.getElementById("cart-container-total-price")
let cartItems = [];
// all plant api
const displayAllPlant = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      const plantData = data.plants;
      displayLoading();
      cardContainer.innerHTML = "";
      plantData
        .forEach((pData) => {
          displayCardContainer(pData);
        })
        .catch((err) => {
          console.log(err);
        });
    });
};

// categories api
const categories = () => {
  displayAllPlant();
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categoriesName = data.categories;
      categoriesContainer.innerHTML = "";
      categoriesName.forEach((name) => {
        const categoriesItemsNames = name.category_name;
        const categoriesItemsNamesId = name.id;
        categoriesContainer.innerHTML += `
            <li id="${categoriesItemsNamesId}" class="list-none p-2 my-1 hover:bg-green-700 rounded-lg font-medium hover:text-white">${categoriesItemsNames}</li>
            `;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// categories and card api
const categoriesAndCard = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const plantData = data.plants;
      displayLoading();
      cardContainer.innerHTML = "";
      plantData.forEach((pData) => {
        displayCardContainer(pData);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const displayCardContainer = (pData) => {
  cardContainer.innerHTML += `
             <div class="cards bg-white rounded-lg h-full overflow-hidden shadow-xl">
                <img class="h-60 md:w-60 w-full  " src="${pData.image}" alt="">
                <h2 id
                ="${pData.id}" class="card-title font-semibold p-3">${pData.name}</h2>
                <p class="text-sm my-2 p-3">${pData.description}</p>
                <div class="flex justify-between items-center p-3">
                  <p class="bg-green-300 text-green-800 px-2 rounded-lg font-medium">${pData.category}</p>
                  <p class="cart-price font-semibold">৳${pData.price}</p>
                </div>
                <div class="p-3"><button id="${pData.id}" class="card-btn p-1.5 mt-2  w-full rounded-full text-white bg-green-700">Add to Cart</button></div>
              </div>
        `;
};

// click categories items too show categories data
categoriesContainer.addEventListener("click", (e) => {
  // active button
  const categoriesItems = document.querySelectorAll("li");
  categoriesItems.forEach((item) => {
    item.classList.remove("bg-green-700");
    item.classList.remove("text-white");
  });

  if (e.target.localName === "li") {
    e.target.classList.add("bg-green-700");
    e.target.classList.add("text-white");
  }
  displayLoading();
  categoriesAndCard(e.target.id);
});

// all plant details api
cardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-title")) {
    const id = e.target.id;
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
      .then((res) => res.json())
      .then((data) => {
        modalContainer.innerHTML = `
     <div class="">
       <h2 id="" class="font-bold ">${data.plants.name}</h2>
      <img class="h-60 w-full my-3 rounded-lg" src="${data.plants.image}" alt="">
      <p class="rounded-lg mb-2"><span class="font-bold">Category</span>: ${data.plants.category}</p>
      <p class=""><span class="font-bold">Price</span>: ৳${data.plants.price}</p>
      <p class="text-sm my-2 "><span class="font-bold">Description</span>: ${data.plants.description}</p>
     </div>
    `;
      });
    displayDetailsModal.showModal();
  }
});

// cart
cardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-btn")) {
    cartItemsHandle(e);
  }
});

const cartItemsHandle = (e) => {
  const title = e.target.parentNode.parentNode.children[1].innerText;
  const price = e.target.parentNode.parentNode.children[3].children[1].innerText;
  const titleId = e.target.parentNode.parentNode.children[1].id;

  cartItems.push({
    title: title,
    price: price,
    id: titleId,
  });

  displayCartItems(cartItems);
  
};

const displayCartItems = (cartItems) => {
  // alert("card added successfully");
  cartContainer.innerHTML = "";
  cartItems.forEach((cartItem) => {
    cartContainer.innerHTML += `
               <div class="cart-item flex justify-between items-center p-3 bg-[#f0fdf4] rounded-md">
                   <div class="">
                     <h3>${cartItem.title}</h3>
                     <p>${cartItem.price} x1</p>
                   </div>
                   <button  class="">
                     <i id="" onclick="cardItemsDelete(${cartItem.id})" class="cart-cross-btn fa-solid fa-xmark text-red-600"></i>
                   </button>
                 </div>
         `;
  });
  totalPrice()
};

const cardItemsDelete = (cartItemsId) => {
  console.log(cartItemsId);
  const filterCartItems = cartItems.filter(
    (cartItem) => Number(cartItem.id) !== cartItemsId
  );
  cartItems = filterCartItems;
  displayCartItems(cartItems);
};

const totalPrice = () => {
  priceContainer.innerHTML = ""
  cartItems.forEach(carts => {
    priceContainer.innerHTML = `
    <div class="flex p-3 justify-between">
        <h1>total</h1>
        <p id="cart-container-total-price">${carts.price}</p>
    </div>
    `
  });
}


const displayLoading = () => {
  cardContainer.innerHTML = `
  <span class="loading loading-dots loading-xl"></span>
  `;
};

categories();
