
function loadLiveReport() {
$(".contain").empty();

let chartContainer = document.createElement("div");
chartContainer.setAttribute("id", "chartContainer");
$(".contain").append(chartContainer);

    let localStorageData = localStorage.getItem("liveReportCards")
    let localStorageDataParse = JSON.parse(localStorageData);
    console.log(localStorageDataParse);
    
	var chart = new CanvasJS.Chart("chartContainer", { 
        
		title: {
			text: "Live report coins value in US Dollars"
        },
        axisX: {
            title: "Coins:"
        },

		data: [
		]
	});
	chart.render();	
for(let i=0; i < localStorageDataParse.length; i++){
    let linkSymbol =localStorageDataParse[i].link;

    chart.options.data.push({type: "spline",
    name: localStorageDataParse[i].name,
    showInLegend: true,
    dataPoints: []})
   

	setInterval(function () {
        dateForX = new Date();
$.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${linkSymbol}&tsyms=USD`, (res)=>{
   
    console.log(res[linkSymbol].USD)
    chart.options.data[i].dataPoints.push({ x: dateForX, y: res[linkSymbol].USD});
    
	chart.render();
    })
    }, 2000);
}}

