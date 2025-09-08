
const categoriesContainer = document.getElementById("categories-container");
const cardContainer = document.getElementById("card-container");
const displayDetailsModal = document.getElementById("cardDetailsModal");
const modalContainer = document.getElementById("modal-container")
// all plant api 
const displayAllPlant = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
  .then(res => res.json())
  .then((data) => {
      const plantData = data.plants;
      cardContainer.innerHTML=""
      plantData.forEach(pData => {
        displayCardContainer(pData)
      }).catch((err) => {
      console.log(err);
    });
    });
}


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
            <h1 id="${categoriesItemsNamesId}" class=" p-2 hover:bg-green-700 rounded-lg font-medium hover:text-white">${categoriesItemsNames}</h1>
            `;            
      });
    }).catch((err) => {
      console.log(err);
    });
};

// categories and card api
const categoriesAndCard = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const plantData = data.plants;
      cardContainer.innerHTML=""
      plantData.forEach(pData => {
        console.log(pData);
        displayCardContainer(pData);
      });
      
    }).catch((err) => {
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
                  <p class="font-semibold">৳${pData.price}</p>
                </div>
                <div class="p-3"><button class="card-btn p-1.5 mt-2  w-full rounded-full text-white bg-green-700">Add to Cart</button></div>
              </div>
        `;
};

// click categories items too show categories data
categoriesContainer.addEventListener("click", (e) => {
  categoriesAndCard(e.target.id)
  // if (e.target.innerText === ) {

  // }
});

// all plant details api 
cardContainer.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.classList.contains("card-title")) {
    const id = e.target.id;
     fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
      .then(res => res.json())
      .then(data => {
    modalContainer.innerHTML = `
     <div class="">
       <h2 id="" class="font-bold ">${data.plants.name}</h2>
      <img class="h-60 w-full my-3 rounded-lg" src="${data.plants.image}" alt="">
      <p class="rounded-lg mb-2"><span class="font-bold">Category</span>: ${data.plants.category}</p>
      <p class=""><span class="font-bold">Price</span>: ৳${data.plants.price}</p>
      <p class="text-sm my-2 "><span class="font-bold">Description</span>: ${data.plants.description}</p>
     </div>
    `
  });
  displayDetailsModal.showModal();
};

if (e.target.classList.contains("card-btn")) {
  const title = e.target.innerText
  console.log("click successfully", title);
}
});
categories();
