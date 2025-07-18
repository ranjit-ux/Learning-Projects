const base_url = "https://latest.currency-api.pages.dev/v1/currencies/"

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromcurr=document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for(let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected=true;
        }
        else if(select.name==="to" && currcode==="INR"){
            newOption.selected=true;
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element)=>{
    let currcode = element.value;
    let countrycode= countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`

    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}


btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input")
    let amountval= amount.value;
    if(amountval==="" || amountval < 1){
        amountval=1;
        amount.value="1";
    }
    const URL = `${base_url}/${fromcurr.value.toLowerCase()}.json`;

    let fromresponse = await fetch(URL);
    let fromdata = await fromresponse.json();
    const rate = fromdata[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

    let finalamount = amount.value * rate;
    msg.innerText = `${amountval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
})