`use strict`;

// define variable
let mainRow = document.querySelector(`.main .row`);

// get api meal
async function getApi() {
  $(`.loader`).css(`display`, `block`);
  $(`nav`).addClass(`d-none`);
  let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
  let apiJson = await apiResponse.json();
  let apiArr = apiJson.meals;
  displayMeals(apiArr);
  $(`nav`).removeClass(`d-none`);
  $(`.loader`).css(`display`, `none`);
}
getApi();
// display meals
function displayMeals(apiArr) {
  let box = ``;
  for (const meal of apiArr) {
    let { strMealThumb, strMeal } = meal;
    box += `<div class="col-md-3 col-12">
    <div onclick="getDetails('${meal.idMeal}')" class="meal rounded overflow-hidden position-relative cursor-pointer">
      <img src="${strMealThumb}" class="w-100" alt="${strMeal}" />
      <div class="overlay bg-white bg-opacity-75 opacity-0 w-100 top-100 bottom-0 position-absolute d-flex align-items-center">
        <h3>${strMeal}</h3>
      </div>
    </div>
  </div>`;
  }
  mainRow.innerHTML = box;
}








// get api details about meals
async function getDetails(id) {
  $(`.main`).addClass(`d-none`);
  $(`.loader`).css(`display`, `block`);
  let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  let apiJson = await apiResponse.json();
  let apiObj = apiJson.meals[0];

  displayDetails(apiObj);
  $(`.loader`).css(`display`, `none`);
}
// display details meals
function displayDetails(apiObj) {
  $(`#details`).removeClass(`d-none`);
  let box = ``;
  box += `<div class="container">
  <div class="row text-center text-md-start">
    <div class="col-md-4 col-12">
      <div class="rounded overflow-hidden">
        <img src="${apiObj.strMealThumb}" class="w-100" alt="${apiObj.strMeal}">
      </div>
      <h2 class="text-white">${apiObj.strMeal}</h2>
    </div>
    <div class="col-md-8 col-12">
      <div class="text-white">
        <h2>Instructions</h2>
        <p>${apiObj.strInstructions}</p>
      </div>
      <div class="text-white fs-3">
        <span class="fw-bold">Area : </span><span>${apiObj.strArea}</span>
        <br/>
        <span class="fw-bold">Category : </span><span>${apiObj.strCategory}</span>
      </div>
      <div>
        <h3 class="text-white mb-3">Recipes :</h3>`;

  for (let i = 1; i <= 20; i++) {
    if (apiObj[`strMeasure${i}`] && apiObj[`strIngredient${i}`]) {
      box += `<span class="bg-info-subtle text-muted p-1 rounded d-inline-block m-2">${apiObj[`strMeasure${i}`]} ${apiObj[`strIngredient${i}`]}</span>`;
    }
  }
  box += `</div>
      <div>
        <h3 class="text-white">Tags :</h3>`;

  if (apiObj.strTags) {
    let tagsArr = apiObj.strTags.split(',');
    for (let i = 0; i < tagsArr.length; i++) {
      box += `<span class="bg-info-subtle text-muted p-1 rounded d-inline-block m-2">${tagsArr[i]}</span>`;
    }
  }

  box += `</div>
      <div class="mt-3">
        <a href="${apiObj.strSource}" target="_blank" class="btn btn-success py-2 px-3">Source</a>
        <a href="${apiObj.strYoutube}" target="_blank" class="btn btn-danger py-2 px-3">Youtube</a>
      </div>
    </div>
  </div>
</div>`;
  details.innerHTML = box;
}







//open and close nav 
$(`.fa-bars`).click(() => {
  $(`nav`).animate({ left: `0px` });
  for (let i = 0; i < 5; i++) {
    $(`nav li a`).eq(i).animate({ top: `0px` }, (i + 5) * 100);
  }
  $(`.fa-bars`).addClass(`d-none`);
  $(`.fa-xmark`).removeClass(`d-none`);
});

$(`.fa-xmark`).click(() => {
  closeNav();
});

let closeNav = () => {
  let widthLinks = $(`.links`).innerWidth();
  $(`nav`).animate({ left: -widthLinks });
  for (let i = 0; i < 5; i++) {
    $(`nav li a`).eq(i).animate({ top: `300px` }, (i + 5) * 100);
  }
  $(`.fa-xmark`).addClass(`d-none`);
  $(`.fa-bars`).removeClass(`d-none`);
};






// all about search
$(`nav li a`).eq(0).click(() => {
  $(`.main`).addClass(`d-none`);
  $(`#details`).addClass(`d-none`);
  $(`#contact`).addClass(`d-none`);
  $(`.search`).removeClass(`d-none`);
  $(`.search`).html(`
    <div class="container py-5">
      <div class="row">
        <div class="col-md-6">
          <input id="searchName" class="form-control bg-transparent text-white" placeholder="Search by Name" type="text">
        </div>
        <div class="col-md-6">
          <input id="searchFirstLetter" class="form-control bg-transparent text-white" maxlength="1" placeholder="Search by Name" type="text">
        </div>
      </div>
    </div>
  `);
  closeNav();

  searchName.addEventListener(`input`, (eventInfo) => {
    $(`.main`).removeClass(`d-none`);
    getMealByName(eventInfo.target.value);
  });

  searchFirstLetter.addEventListener(`input`, (eventInfo) => {
    $(`.main`).removeClass(`d-none`);
    getMealByFirstLetter(eventInfo.target.value);
  })
});

async function getMealByName(mealName) {
  $(`.loader`).css(`display`, `block`);
  let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
  let apiJson = await apiResponse.json();
  let apiArr = apiJson.meals;
  apiArr ? displayMeals(apiArr) : displayMeals([])
  $(`.loader`).css(`display`, `none`);
}

async function getMealByFirstLetter(mealName) {
  $(`.loader`).css(`display`, `block`);
  let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
  let apiJson = await apiResponse.json();
  let apiArr = apiJson.meals;
  displayMeals(apiArr);
  $(`.loader`).css(`display`, `none`);
}





// all about categories
$(`nav li a`).eq(1).click(() => {
  $(`.main`).addClass(`d-none`);
  $(`#details`).addClass(`d-none`);
  $(`.search`).addClass(`d-none`);
  $(`#contact`).addClass(`d-none`);
  closeNav();
  getCategories();
});

async function getCategories() {
  $(`.loader`).css(`display`, `block`);
  let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  let apiJson = await apiResponse.json();
  let apiArr = apiJson.categories;
  displayCategories(apiArr);
  $(`.loader`).css(`display`, `none`);
}

function displayCategories(apiArr) {
  $(`.main`).removeClass(`d-none`);
  let box = ``;
  for (const category of apiArr) {
    let { strCategoryThumb, strCategory, strCategoryDescription } = category;
    box += `<div class="col-md-3 col-12">
    <div onclick="getMealFromCategory('${strCategory}')" class="meal rounded overflow-hidden position-relative cursor-pointer">
      <img src="${strCategoryThumb}" class="w-100" alt="${strCategory}" />
      <div class="overlay bg-white bg-opacity-75 opacity-0 w-100 top-100 bottom-0 position-absolute text-center">
        <h3>${strCategory}</h3>
        <p>${strCategoryDescription}</p>
      </div>
    </div>
  </div>`;
  }
  mainRow.innerHTML = box;
}

async function getMealFromCategory(categoryName) {
  $(`.loader`).css(`display`, `block`);
  let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
  let apiJson = await apiResponse.json();
  let apiArr = apiJson.meals;
  displayMeals(apiArr.slice(0, 20));
  $(`.loader`).css(`display`, `none`);
}






// all about area
$(`nav li a`).eq(2).click(() => {
  $(`.main`).addClass(`d-none`);
  $(`#details`).addClass(`d-none`);
  $(`.search`).addClass(`d-none`);
  $(`#contact`).addClass(`d-none`);
  closeNav();
  getAreas();
});

async function getAreas() {
  $(`.loader`).css(`display`, `block`);
  let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  let apiJson = await apiResponse.json();
  let apiArr = apiJson.meals;
  displayAreas(apiArr);
  $(`.loader`).css(`display`, `none`);
}

function displayAreas(apiArr) {
  $(`.main`).removeClass(`d-none`);
  let box = ``;
  for (const area of apiArr) {
    let { strArea } = area;
    box += `<div class="col-md-3 col-12">
    <div onclick="getMealFromArea('${strArea}')" style="font-size:64px" class="cursor-pointer text-white text-center">
    <i class="fa-solid fa-house-laptop"></i>
    <h3>${strArea}</h3>
    </div>
  </div>`;
  }
  mainRow.innerHTML = box;
}

async function getMealFromArea(areaName) {
  $(`.loader`).css(`display`, `block`);
  let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
  let apiJson = await apiResponse.json();
  let apiArr = apiJson.meals;
  displayMeals(apiArr.slice(0, 20));
  $(`.loader`).css(`display`, `none`);
}









// all about ingredients
$(`nav li a`).eq(3).click(() => {
  $(`.main`).addClass(`d-none`);
  $(`#details`).addClass(`d-none`);
  $(`.search`).addClass(`d-none`);
  $(`#contact`).addClass(`d-none`);
  closeNav();
  getIngredients();
});

async function getIngredients() {
  $(`.loader`).css(`display`, `block`);
  let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  let apiJson = await apiResponse.json();
  let apiArr = apiJson.meals;
  displayIngredients(apiArr.slice(0, 20));
  $(`.loader`).css(`display`, `none`);
}

function displayIngredients(apiArr) {
  $(`.main`).removeClass(`d-none`);
  let box = ``;
  for (const Ingredients of apiArr) {
    let { strIngredient, strDescription } = Ingredients;
    box += `<div class="col-md-3 col-12">
    <div onclick="getMealFromIngredients('${strIngredient}')" class="cursor-pointer text-white text-center">
    <i style="font-size:64px" class="fa-solid fa-drumstick-bite"></i>
    <h3 class="mt-2">${strIngredient}</h3>
    <p>${strDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
  </div>`;
  }
  mainRow.innerHTML = box;
}

async function getMealFromIngredients(IngredientsName) {
  $(`.loader`).css(`display`, `block`);
  let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngredientsName}`);
  let apiJson = await apiResponse.json();
  let apiArr = apiJson.meals;
  displayMeals(apiArr.slice(0, 20));
  $(`.loader`).css(`display`, `none`);
}








// all about contact
$(`nav li a`).eq(4).click(() => {
  $(`.main`).addClass(`d-none`);
  $(`#details`).addClass(`d-none`);
  $(`.search`).addClass(`d-none`);
  $(`#contact`).removeClass(`d-none`);
  closeNav();
  contact();
});


function contact() {
  let box = ``;
  box = `<div class="container">
  <div class="row g-4 px-5 justify-content-center">
    <div class="col-md-6 col-12">
      <input  id="inputName" class="form-control bg-white" placeholder="Enter Your Name" type="text" />
      <div class="alert alert-danger d-none" role="alert">
        Special characters and numbers not allowed
      </div>
    </div>
    <div class="col-md-6 col-12">
      <input  id="inputEmail" class="form-control bg-white" placeholder="Enter Your Email" type="email" />
      <div class="alert alert-danger d-none" role="alert">
        Email not valid *exemple@yyy.zzz
      </div>
    </div>
    <div class="col-md-6 col-12">
      <input id="inputPhone" class="form-control bg-white" placeholder="Enter Your Phone" type="text" />
      <div class="alert alert-danger d-none" role="alert">
        Enter valid Phone Number
      </div>
    </div>
    <div class="col-md-6 col-12">
      <input id="inputAge" class="form-control bg-white" placeholder="Enter Your Age" type="number" />
      <div class="alert alert-danger d-none" role="alert">
        Enter valid age
      </div>
    </div>
    <div class="col-md-6 col-12">
      <input id="inputPassword" class="form-control bg-white" placeholder="Enter Your Password" type="password" />
      <div class="alert alert-danger d-none" role="alert">
        Enter valid password *Minimum eight characters, at least one letter and one number:*
      </div>
    </div>
    <div class="col-md-6 col-12">
      <input id="inputRepassword" class="form-control bg-white" placeholder="Repassword" type="password" />
      <div class="alert alert-danger d-none" role="alert">
        Enter valid repassword
      </div>
    </div>
    <button id="submit" class="btn btn-outline-danger w-25" disabled>Submit</button>
  </div>
</div>`;
  document.querySelector(`#contact`).innerHTML = box;



  inputName.addEventListener(`input`, () => {
    checkName();
    removeDesabled();
  })

  inputEmail.addEventListener(`input`, () => {
    checkEmail();
    removeDesabled();

  })

  inputPhone.addEventListener(`input`, () => {
    checkPhone();
    removeDesabled();

  })

  inputAge.addEventListener(`input`, () => {
    checkAge();
    removeDesabled();

  })

  inputPassword.addEventListener(`input`, () => {
    checkPassword();
    removeDesabled();

  })

  inputRepassword.addEventListener(`input`, () => {
    checkRepassword();
    removeDesabled();

  })



  function checkName() {
    let regex = /^[a-z]+$/i;
    if (regex.test(inputName.value)) {
      inputName.nextElementSibling.classList.add("d-none");
      return true;
    }
    else {
      inputName.nextElementSibling.classList.remove("d-none");
    }
  }

  function checkEmail() {
    let regex = /^\w+\@\w+\.[a-z]{2,}$/i;
    if (regex.test(inputEmail.value)) {
      inputEmail.nextElementSibling.classList.add("d-none");
      return true;
    }
    else {
      inputEmail.nextElementSibling.classList.remove("d-none");
    }
  }

  function checkPhone() {
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (regex.test(inputPhone.value)) {
      inputPhone.nextElementSibling.classList.add("d-none");
      return true;
    }
    else {
      inputPhone.nextElementSibling.classList.remove("d-none");
    }
  }


  function checkAge() {
    let regex = /^(0?[1-9]|[1-9][0-9])$/i;
    if (regex.test(inputAge.value)) {
      inputAge.nextElementSibling.classList.add("d-none");
      return true;
    }
    else {
      inputAge.nextElementSibling.classList.remove("d-none");
    }
  }


  function checkPassword() {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;
    if (regex.test(inputPassword.value)) {
      inputPassword.nextElementSibling.classList.add("d-none");
      return true;
    }
    else {
      inputPassword.nextElementSibling.classList.remove("d-none");
    }
  }


  function checkRepassword() {
    if (inputRepassword.value == inputPassword.value) {
      inputRepassword.nextElementSibling.classList.add("d-none");
      return true;
    }
    else {
      inputRepassword.nextElementSibling.classList.remove("d-none");
    }
  }



  function removeDesabled() {
    if (checkName() && checkEmail() && checkPhone() && checkAge() && checkPassword() && checkRepassword()) {
      submit.removeAttribute("disabled");
    }
    else {
      submit.setAttribute("disabled", "");
    }
  }

}