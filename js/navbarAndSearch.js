$("#facebook").click(()=>{
    window.open("https://www.facebook.com/tomer.levi.9235?ref=bookmarks")
})

$("#telegram").click(()=>{
    alert("Unvailable currecly.")
})
$("#instagram").click(()=>{
    window.open('https://www.instagram.com/tomer.levi__/')
})

$("#searchBTN").click(()=>{
    searchVal = document.getElementById('searchInput').value;
    if($(".contain").attr("isGetLoad") == 1){
    $(".contain").empty();
    $(".contain").attr("isGetLoad", 0);
}
    $.get('https://api.coingecko.com/api/v3/coins/list', (reso) => {
 for(let i = 0; i < reso.length; i++){
if(reso[i].name == searchVal){
let newCard = document.createElement("div");
newCard.className = "card"

let symbol = document.createElement("h1");
            symbol.textContent = reso[i].symbol;
            newCard.appendChild(symbol);

            let CName = document.createElement("h4");
            CName.textContent = reso[i].name;
            newCard.appendChild(CName);
            newCard.setAttribute("id", reso[i].name);

            let newIMG = document.createElement("img");
            newIMG.className = "toggleImg";
            let eur = document.createElement("h1");
            eur.className = "coinText";
            let usd = document.createElement("h1");
            usd.className = "coinText";
            let ils = document.createElement("h1");
            ils.className = "coinText";
            let spinner = document.createElement("div");
            spinner.className = "spinner-border text-muted";
            let toggleDiv = document.createElement("div");
            toggleDiv.className = "collapse";
            let backBTN = document.createElement("button");
            backBTN.className = "btn btn-primary btn-lg active";
            backBTN.textContent = "Back";
            newCard.appendChild(backBTN);


            $(toggleDiv).append(spinner);
newCard.appendChild(toggleDiv)

let dataSearcher = $.get(`https://api.coingecko.com/api/v3/coins/${searchVal}`, (dat)=>{

    eur.textContent = "Euro: " + dat.market_data.current_price.eur + "€";
    usd.textContent = "US Dollars: " + dat.market_data.current_price.usd + "$";
    ils.textContent = "Israel Shekel: " + dat.market_data.current_price.ils + "₪";
    newIMG.style.backgroundImage = `url(${dat.image.small})`;
    toggleDiv.removeChild(spinner);


    $(toggleDiv).append(newIMG);
    $(toggleDiv).append(eur);
    $(toggleDiv).append(usd);
    $(toggleDiv).append(ils);
})
$(toggleDiv).slideToggle(300);

dataSearcher.fail(()=>{
        $(toggleDiv).text("Failed to load data, Check your API");
})
            $(".contain").append(newCard);
      $(backBTN).click(()=>{
        location.href ="index.html"
      })      

}
 }
    })
    })