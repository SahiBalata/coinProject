
function replaceWindow(incomingCoin, expeledCoin){
  alert("Can't")
  let liveReportModal = document.getElementById("liveReportModal");
  liveReportModal.style.display = "block";
}

function AddToLiveReport(coinData ,checker)  {
  let storageChecker =  (JSON.parse(localStorage.getItem("liveReportCards")).length);
  if(storageChecker >= 5){
    $(checker).prop("checked", false);
    
    replaceWindow();
      }
  else  if ($(checker).attr("isLiveReport") == 0){   
let existCards =  localStorage.getItem("liveReportCards");
let existCardsJSON = JSON.parse(existCards);
 existCardsJSON.push(coinData);
 localStorage.setItem("liveReportCards", JSON.stringify(existCardsJSON))
 $(checker).prop("checked", true);
                checker.setAttribute("isLiveReport", 1);
}
}

function  liveReportRemover(coin){
  let existARR = JSON.parse(localStorage.getItem ("liveReportCards"));
   let newLiveARR = existARR.filter(obj => obj.name !== coin);
   if(newLiveARR.length == 0){
     let randomARR = [];
    localStorage.setItem("liveReportCards", JSON.stringify(randomARR));
   } else{
 localStorage.setItem("liveReportCards", JSON.stringify(newLiveARR));
   }
}



//let newARR =  existCardJSON.filter(obj => obj.name !== "01coin")