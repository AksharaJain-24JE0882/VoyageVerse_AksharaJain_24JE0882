let body=document.querySelector("body");
let home=document.querySelector(".h");
let form=document.querySelector("#login1");
let login=document.querySelector(".l");
let loginbtn=document.querySelector("#loginbtn");


// Button to change background
let ved = document.querySelectorAll(".ved");
ved.forEach( ele => {
  ele.addEventListener("click", () => {
    document.querySelector('.controls .active').classList.remove("active");
    ele.classList.add("active");
    let src = ele.getAttribute("data-src");
    document.querySelector('.video-slider').src = src;
  });
});

// weather insights
let weatherContainer=document.querySelector(".weatherContainer");
let weatherbtn=document.querySelector(".w");
let temp=document.querySelector(".temp");
let feels=document.querySelector(".feels");
let humidity=document.querySelector(".humidity");
let wind=document.querySelector(".wind");
let days=document.querySelector(".days");
let button1=document.querySelector(".button1");
let day1=document.querySelector(".day1data");
let day2=document.querySelector(".day2data");
let day3=document.querySelector(".day3data");
let day4=document.querySelector(".day4data");
let day5=document.querySelector(".day5data");

let loc=document.querySelector(".weatherContainer input");
button1.addEventListener("click", (evt) => {
  let location=loc.value;
  temp.innerHTML="Temperature:";
  feels.innerHTML="Feels Like:";
  humidity.innerHTML="Humidity:";
  wind.innerHTML="Wind Speed:";
  day1.innerHTML="";
  day2.innerHTML="";
  day3.innerHTML="";
  day4.innerHTML="";
  day5.innerHTML="";
  evt.preventDefault();
  resp(location);
});

const GeocodingApi =  "http://api.openweathermap.org/geo/1.0/direct?q=";
let resp = async (a)=>{
  let locapi=`${GeocodingApi}${a}&limit=1&appid=80e2492c20cfe2d1ae6be6af1cfb4842`
  let resp1=await fetch(locapi);
  let data= await resp1.json();
  let lat=data[0].lat;
  let lon=data[0].lon;
  respo(lat,lon);
  output(lat,lon);
}


const weatherURL= "https://api.openweathermap.org/data/2.5/weather?"
const respo=async(a,b)=>{
  const wURL=`${weatherURL}lat=${a}&lon=${b}&appid=80e2492c20cfe2d1ae6be6af1cfb4842`;
  let q=await fetch(wURL);
  let w = await q.json();
  let temper=w.main.temp;
  let feeling=w.main.feels_like;
  let hum=w.main.humidity;
  let speed=w.wind.speed;
  temp.innerHTML+=temper;
  feels.innerHTML+=feeling;
  humidity.innerHTML+=hum;
  wind.innerHTML+=speed;
}


const next="https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0";

const output=async(a,b)=>{
  const day=`${next}lon=${a}&lat=${b}&ac=0&unit=metric&output=json&tzshift=0`;
  let ak=await fetch(day);
  let sh = await ak.json();

  day1.innerHTML+=sh.dataseries[0].temp2m;
  day2.innerHTML+=sh.dataseries[1].temp2m;
  day3.innerHTML+=sh.dataseries[2].temp2m;
  day4.innerHTML+=sh.dataseries[3].temp2m;
  day5.innerHTML+=sh.dataseries[4].temp2m;
}

//currency converter code

const dropdowns = document.querySelectorAll(".dropdown select");
const ccbtn = document.querySelector(".ccbtn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const cc = document.querySelector(".hide1");
const cc1 = document.querySelector(".cc");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);     
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = "http://api.exchangeratesapi.io/v1/latest?access_key=ec5b31a50f5169978566183eca53c18d";
  let response = await fetch(URL);
  let data = await response.json();
  let rate =  data.rates[toCurr.value]/data.rates[fromCurr.value];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

ccbtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});


// Reviw form

let add=document.querySelector(".Add");
let reviewform=document.querySelector(".reviewform");
let publicreview=document.querySelector(".publicreview");
let explore=document.querySelector(".explore");
let ebtn = document.querySelector(".e");

add.addEventListener("click",(event)=>{
  event.preventDefault();
  reviewform.classList.remove("hidden");
  publicreview.classList.add("hide5");
  explore.classList.add("hidden");

});

// Explore 

const Explore_BASE_URL = "https://api.unsplash.com/search/photos?page=1&query=";

let searchbar = document.querySelector(".searchbar");
let searchbarbtn = document.querySelector(".searchbarbtn");
let searchedele = document.querySelector(".searchedele");
 
searchbarbtn.addEventListener("click" , async (event) => {
  event.preventDefault();
  
  let searchlocation = searchbar.value;
  const Explore_URL = `${Explore_BASE_URL}${searchlocation}&client_id=BkP9okztrXI52DRPnrFAmJ1UzT5RlmDkN17NaC9g1OI`;
  
  searchedele.innerText=searchlocation;

  let akshara = await fetch(Explore_URL);
  let jain = await akshara.json();
  let imagebyurl = jain.results[1].urls.full;
  let contentbyurl = jain.results[1].description;

  let imageunsplash = document.querySelector(".imageunsplash");
  let aboutsearched = document.querySelector(".aboutsearched");
  
  aboutsearched.innerText = contentbyurl;

  let img = document.createElement("img");
  img.src = imagebyurl; 
  img.alt = "Unsplash Image"; 
  img.classList.add("imageunsplash");

  imageunsplash.parentNode.replaceChild(img, imageunsplash);

});

let wishlistcontent = document.querySelector(".wishlistcontent");
let addtocart = document.querySelector(".addtocart");

addtocart.addEventListener("click" , () => {

  const clonedele = explore.cloneNode(true);
  wishlistcontent.appendChild(clonedele);

  // Storing cloned ele's html in local storage

  localStorage.setItem("wishlistHTML" , wishlistcontent.innerHTML);

});

window.onload = () => {
  const storedHTML = localStorage.getItem("wishlistHTML");
  if (storedHTML) {
    wishlistcontent.innerHTML = storedHTML;
  }
};

let createbtn = document.querySelector(".click");
let signup1 = document.querySelector("#signup1");
let login1 = document.querySelector("#login1");

createbtn.addEventListener("click" , (events) => {

  events.preventDefault();

  signup1.classList.remove("hide4");
  login1.classList.add("hide4");

})
