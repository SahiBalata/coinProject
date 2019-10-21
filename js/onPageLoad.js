

$(document).ready(function() {
    
    let liveReportArr = []

    //When user enters the site, system will check if liveReport is exist in storage.
    if (localStorage.getItem("liveReportCards") === null) {
      localStorage.setItem("liveReportCards",JSON.stringify(liveReportArr));
      }

    let liveReportCheckers = JSON.parse(localStorage.getItem("liveReportCards"));

    let pageSpinner = document.createElement("div");
    pageSpinner.className = "spinner-border text-dark"
    pageSpinner.setAttribute("id", "pageSpinner");
    pageSpinner.setAttribute("style", "position: relative; left: 15%; top: 5%;")
   $(".cardsContain").append(pageSpinner);

    $.get('https://api.coingecko.com/api/v3/coins/list', (res) => {
        $(".cardsContain #pageSpinner").remove()
        $(".contain").attr("isGetLoad", 1); 
        for (let i = 0; i < 100; i++) {
            //Creates new card DIV
            let newCard = document.createElement("div");
            newCard.className = "card";

            //Creates new card text and content.
            let symbol = document.createElement("h1");
            symbol.textContent = res[i].symbol;
            newCard.appendChild(symbol);

            let CName = document.createElement("h4");
            CName.textContent = res[i].name;
            newCard.appendChild(CName);
            newCard.setAttribute("id", res[i].name);


            //Creates "More info" Button
            let infoBTN = document.createElement("button");
            infoBTN.className = "btn btn-primary btn-lg active";
            infoBTN.textContent = "More info"
            newCard.appendChild(infoBTN);

            //Create toggle button
            let toggleButtonLabel = document.createElement("label");
            toggleButtonLabel.className = "switch"
            
            let toggleButtonInput = document.createElement("input");
            toggleButtonInput.setAttribute("type", "checkbox");
            toggleButtonInput.setAttribute("buttonName", res[i].name)
             
            //Checks toggle button
            if(liveReportCheckers.some(obj => obj.name === res[i].name)){
                console.log(`${res[i].name} is exist` )
                toggleButtonInput.setAttribute("isLiveReport", 1)
            $(toggleButtonInput).prop("checked", true);
            } else {
                $(toggleButtonInput).prop("checked", false);
            toggleButtonInput.setAttribute("isLiveReport", 0)
            }



            $(toggleButtonLabel).append(toggleButtonInput);

            let toggleButtonSpan = document.createElement("span");
            toggleButtonSpan.className = "slider round";
            $(toggleButtonLabel).append(toggleButtonSpan);

            
            $(newCard).append(toggleButtonLabel);
            



            let toggleDiv = document.createElement("div");
            toggleDiv.className = "collapse";


            //Create checkers
            newCard.setAttribute("isOpened", 0);
            newCard.setAttribute("isDataTaken", 0);
             $(newCard).append(toggleDiv);

            //Gives "More info"button Event:
            $(infoBTN).click(() => {
                if (infoBTN.textContent == "More info") {
                    infoBTN.textContent = "Hide info"
                } else {
                    infoBTN.textContent = "More info"
                }

                //Checks if the info div is opened
                if ($(newCard).attr("isOpened") == 0) {
                    newCard.setAttribute("isOpened", 1);
                    let newIMG = document.createElement("img");
                    newIMG.className = "toggleImg";
                    let eur = document.createElement("h1");
                    eur.className = "coinText";
                    let usd = document.createElement("h1");
                    usd.className = "coinText";
                    let ils = document.createElement("h1");
                    ils.className = "coinText";
                    let spinner = document.createElement("div");
                    spinner.className = "spinner-border text-muted"

                    $(toggleDiv).append(spinner);


                    if ($(newCard).attr("isDataTaken") == 0) {

                        let dataReq = $.get(`https://api.coingecko.com/api/v3/coins/${res[i].name}`, (data) => {
                            toggleDiv.removeChild(spinner);
                            newCard.setAttribute("isDataTaken", 1);
                            //Creates local storage and objects.
                            let dataOBJ = {"name":res[i].name ,"symbol":res[i].symbol ,"eur": data.market_data.current_price.eur, "usd": data.market_data.current_price.usd, "ils": data.market_data.current_price.ils, "IMG": data.image.small, "link:": `https://api.coingecko.com/api/v3/coins/${res[i].name}` };
                            localStorage.setItem(res[i].name, JSON.stringify(dataOBJ));
                            
                     
                           

                            setInterval(() => {
                                newCard.setAttribute("isDataTaken", 0);
                                console.log("System will take data from API");
                            }, 120000)

                            eur.textContent = "Euro: " + data.market_data.current_price.eur + "€";
                            usd.textContent = "US Dollars: " + data.market_data.current_price.usd + "$";
                            ils.textContent = "Israel Shekel: " + data.market_data.current_price.ils + "₪";
                            newIMG.style.backgroundImage = `url(${data.image.small})`;



                            $(toggleDiv).append(newIMG);
                            $(toggleDiv).append(eur);
                            $(toggleDiv).append(usd);
                            $(toggleDiv).append(ils);
                        })




                        //If the request fail.
                        dataReq.fail(() => {
                            $(toggleDiv).text("Failed to load data, Check your API");
                            newCard.setAttribute("isDataTaken", 0);
                        })

                    }
                    //if data is equal to 1
                    else {

                        toggleDiv.removeChild(spinner);
                        //Retrive data from LocalStorage
                        let retriveData = localStorage.getItem(res[i].name);
                        let JSonOperate = JSON.parse(retriveData);
                        console.log(JSonOperate);
                        //Design card div from user Localstorage data.
                        eur.textContent = "Euro: " + JSonOperate.eur + "€";
                        usd.textContent = "US Dollars: " + JSonOperate.usd + "$";
                        ils.textContent = "Israel Shekel: " + JSonOperate.ils + "₪";
                        newIMG.style.backgroundImage = `url(${JSonOperate.IMG})`;
                    }

                    $(toggleDiv).slideToggle(300);
                }
                //If isOpened is equal to 1
                else {
                    $(toggleDiv).slideToggle(300);
                    newCard.setAttribute("isOpened", 0);
                }


            })

            //Apeends Everything into the Div
            $(".cardsContain").append(newCard);

            //Creates click event to the toggle button
           $(toggleButtonInput).click(()=>{
               if($(toggleButtonInput).attr("islivereport")==0){
            if($(newCard).attr("isDataTaken")== 0){
             alert(`Before adding the coin to your live report, please click on "More info" button`)
             $(toggleButtonInput).prop("checked", false);
            } else {
                AddToLiveReport({"name": res[i].name,  "link": res[i].symbol.toUpperCase()}, toggleButtonInput); 
            }    
            } else {
                liveReportRemover(res[i].name);
                toggleButtonInput.setAttribute("isLiveReport", 0);
            }

           })

        }
    })
})


