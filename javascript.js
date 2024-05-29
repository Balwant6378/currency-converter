const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/";

const dropDowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")



for (let select of dropDowns) {
    for (currCode in countryList) {
        let newChoice = document.createElement("option");
        newChoice.innerText = currCode;
        newChoice.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newChoice.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newChoice.selected = "selected";
        }
        select.append(newChoice);
     }

     select.addEventListener("change" , (evnt) => {
        updateFlag(evnt.target);
     })
} 


const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newScr;

}
const updateExchangeRate = async ()=>{
    let amount = document.querySelector("form input");
   let amtVal = amount.value;
   if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
   }

   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
   let response = await fetch(URL);
   let data = await response.json();
   let rate =  data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   console.log(rate);
   let finalAmt = amtVal*rate;
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

btn.addEventListener("click", (evnt)=> {
   evnt.preventDefault();
   updateExchangeRate();
})
window.addEventListener("load", ()=>{
    updateExchangeRate();
})
