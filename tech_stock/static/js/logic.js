
var dateSeparate = {};
var table1 = [];
var yearBeginChoosen;
var yearEndChoosen;
var monthChoosen;

var tableData = [];
var stockTicker = [];
var stockName = [];
var percentChangeBar = [];

var button = d3.select(".btn");
var form = d3.select("#form");

button.on("click", runEnter);
form.on("submit", runEnter);

function insertOptions(valueChoosen, idChoosen){
  
  if (idChoosen === "yearBegin"){
    var option = "#monthBegin";
    yearBeginChoosen = valueChoosen;
  }
  else if (idChoosen === "yearEnd"){
    var option = "#monthEnd";
    yearEndChoosen = valueChoosen;
  }
  else{
    var option = "#" + idChoosen;
    yearEndChoosen = valueChoosen;
  }
  
  // begin month         
  var months = [];
    
  var selector = d3.select(option);
  selector.html("");
    
  var index = 0;
  for (i = 0 ; i < table1.length; i++) {
    if (dateSeparate[i][0] === valueChoosen){
      months[index] = dateSeparate[i][1];
      index +=1 ;
    }
  
  }
  
  var uniqueMonths = [...new Set(months)];
  uniqueMonths.sort();
          
  uniqueMonths.forEach((month) => {
      selector
          .append("option")
          .text(month)
          .property("value", month);
  });

  monthChoosen = uniqueMonths[0];
  if (idChoosen === "yearBegin"){
    valueChoosen = monthChoosen;
    idChoosen = 'monthBegin';
    insertOptions2(valueChoosen, idChoosen);
  }
  else if (idChoosen === "yearEnd"){
    valueChoosen = monthChoosen;
    idChoosen = 'monthEnd';
    insertOptions2(valueChoosen, idChoosen);
  }
  
}

function insertOptions2(valueChoosen, idChoosen){
    
  if (idChoosen === "monthBegin"){
    var option = "#dayBegin";
    var yearChoosen = yearBeginChoosen;
  }
  else if (idChoosen === "monthEnd"){
    var option = "#dayEnd";
    var yearChoosen = yearEndChoosen;
  }
    
  // begin day         
  var days = [];
    
  var selector = d3.select(option);
  selector.html("");
   
  var index = 0;
  for (i = 0 ; i < table1.length; i++) {
    if (dateSeparate[i][0] === yearChoosen && dateSeparate[i][1] === valueChoosen){ //month choosen
      days[index] = dateSeparate[i][2];
      index += 1;
    }
  
  }
 
  var uniqueDays = [...new Set(days)];
  uniqueDays.sort();
          
  uniqueDays.forEach((day) => {
      selector
          .append("option")
          .text(day)
          .property("value", day);
  });
}


function init() {
  d3.json("https://tech-stock.herokuapp.com/data").then(function(data, error)   {
    
    var stocks = Object.keys(data);
           
    for (i = 0 ; i < stocks.length - 1; i++){
      stockTicker[i] = stocks[i];
      
    }
    
    for (j = 0 ; j < stockTicker.length; j++){
      switch (stockTicker[j]) {
        case 'AAPL':
          stockName[j] = "Apple Inc.";
          break;
        case 'AMZN':
          stockName[j] = "Amazon.com Inc.";
          break;
        case 'FB':
          stockName[j] = "Facebook Inc.";
          break;
        case 'MSFT':
          stockName[j] = "Microsoft Corporation";
          break;
        case 'GOOG':
          stockName[j] = "Alphabet Inc.";
          break;
        default:
          stockName[j] = stockTicker[j];
      }
    }
       
    for (i = 0 ; i < stockTicker.length; i++){
      tableData[i] = data[stockTicker[i]];
    }

    
    // table search

    table1 = tableData[0];
    
      
    for (i = 0; i < table1.length; i++){ 
        dateSeparate[i] = table1[i].Date.split("-", 3);

    }
      
    // begin year          
    var years = [];
    
    var selector = d3.select("#yearBegin");
    selector.html("");
    for (index = 0 ; index < table1.length - 1; index++) {
      years[index] = dateSeparate[index][0];
      
    }
    
    var uniqueYears = [...new Set(years)];
    uniqueYears.sort();
    var uniqueYears2 = [...new Set(years)];
              
    uniqueYears.forEach((year) => {
        selector
            .append("option")
            .text(year)
            .property("value", year);
    });

    var selector2 = d3.select("#yearEnd");
    selector2.html("");
    uniqueYears2.forEach((year) => {
      selector2
          .append("option")
          .text(year)
          .property("value", year);
    });

    valueChoosen = uniqueYears[0];
    insertOptions(valueChoosen, "yearBegin");
       
    valueChoosen = uniqueYears2[0];
    insertOptions(valueChoosen, "yearEnd");
    
    runEnter();
    
  }).catch(function(error) {
  console.log(error);
  });
}


function runEnter() {
  //d3.event.preventDefault();
    
    var dropdownMenuYearBegin = d3.select("#yearBegin");
    
    var dropdownMenuMonthBegin = d3.select("#monthBegin");
    
    var dropdownMenuDayBegin = d3.select("#dayBegin");
  
    var inputBeginYearValue = dropdownMenuYearBegin.node().value;
    var inputBeginMonthValue = dropdownMenuMonthBegin.node().value;
    var inputBeginDayValue = dropdownMenuDayBegin.node().value;
  
    var dropdownMenuYearEnd = d3.select("#yearEnd");
    var dropdownMenuMonthEnd = d3.select("#monthEnd");
    var dropdownMenuDayEnd = d3.select("#dayEnd");
  
    var inputEndYearValue = dropdownMenuYearEnd.node().value;
    var inputEndMonthValue = dropdownMenuMonthEnd.node().value;
    var inputEndDayValue = dropdownMenuDayEnd.node().value;

    var inputBeginDateValue = inputBeginYearValue.concat("-",inputBeginMonthValue,"-",inputBeginDayValue);
    var inputEndDateValue = inputEndYearValue.concat("-",inputEndMonthValue,"-",inputEndDayValue);
    console.log(inputBeginDateValue)
     // new code tabulator
     var tableDataNew = [
       {Symbol: "S1", Name: "Stock1", Begin_Price: 0.00, End_Price:0.00 , Change: 0.00, Percent_Change: 0.00},
       {Symbol: "S2", Name: "Stock2", Begin_Price: 0.00, End_Price:0.00 , Change: 0.00, Percent_Change: 0.00},
       {Symbol: "S3", Name: "Stock3", Begin_Price: 0.00, End_Price:0.00 , Change: 0.00, Percent_Change: 0.00},
       {Symbol: "S4", Name: "Stock4", Begin_Price: 0.00, End_Price:0.00 , Change: 0.00, Percent_Change: 0.00},
       {Symbol: "S5", Name: "stock5", Begin_Price: 0.00, End_Price:0.00 , Change: 0.00, Percent_Change: 0.00},
     ];
      
   for (j = 0; j < tableData.length; j++){ 
    var recordBeginDate = tableData[j].filter(stock => stock.Date === inputBeginDateValue);
    var recordEndDate = tableData[j].filter(stock => stock.Date === inputEndDateValue);
    
    var change2 = 0.00;
    var perChg2 = 0.00;

    if (recordBeginDate.length === 0) {
        change2 = 0.00;
        perChg2 = 0.00;
       
      }
      else if (recordEndDate.length === 0) {
        change2 = 0.00;
        perChg2 = 0.00;
        
      }
      else {
        change = (recordEndDate[0]['Adj. Close'] - recordBeginDate[0]['Adj. Close']);
        change2= change.toFixed(2);
        perChg = ((recordEndDate[0]['Adj. Close'] - recordBeginDate[0]['Adj. Close']) / recordBeginDate[0]['Adj. Close'])*100;
        perChg2= perChg.toFixed(2);
      }
    percentChangeBar[j] = perChg2;
    
    tableDataNew[j].Symbol = stockTicker[j];
    tableDataNew[j].Name = stockName[j];
        
    if (recordBeginDate.length !== 0) {
      tableDataNew[j].Begin_Price = recordBeginDate[0]['Adj. Close'].toFixed(2);
    }
    else {
      tableDataNew[j].Begin_Price = "--";
    }

    if (recordEndDate.length !== 0) {
      tableDataNew[j].End_Price = recordEndDate[0]['Adj. Close'].toFixed(2);
    }
    else {
      tableDataNew[j].End_Price = "--";
    }
    
    if (change2 === 0.00){
        tableDataNew[j].Change = "--";
    }
    else {
        tableDataNew[j].Change = change2;
    }
    
    if (perChg2 === 0.00){
        tableDataNew[j].Percent_Change = "--";
    }
    else{
       tableDataNew[j].Percent_Change = perChg2 + " %";
      
    }

  }
  var table = new Tabulator("#table", {
    data:tableDataNew,
    autoColumns:true,
    layout:"fitDataTable",
    tooltips:true,
    headerSortElement:"<span><i class='fas fa-sort'></i><i class='fas fa-sort-up'></i><i class='fas fa-sort-down'></i></span>",
    columns:[
    {title:"Symbol", titleFormatter:"star", field:"Symbol"},
    {title:"Name", field:"Name", sorter:"number"},
    {title:"Begin Price", field:"Begin_Price"},
    {title:"End Price", field:"End_Price"},
    {title:"Change", field:"Change"},
    {title:"% Change", field:"Percent_Change", hozAlign:"center", frozen:false}
    ],
    initialSort:[
      {column:"End_Price", dir:"desc"}, 
      {column:"Begin_Price", dir:"desc"}, 
    ]
  });

  console.log("stockTicker", stockTicker);
  console.log("percentChangeBar=",percentChangeBar);

  var trace1 = {
    x: stockTicker,
    y: percentChangeBar,
    type: "bar"
  };
 
  var data = [trace1];
 
  var layout = {
    title: "Change in Stock Price (%)",
    xaxix: {title: "Stocks"},
    yaxis: {title: " % Change"},
  };
 
  Plotly.newPlot("plot", data, layout, {responsive: true});
  updatePlotly();
}
  
// function to display the initial chart before user uses dropdown list
function init2() {
  var startStock = "AAPL";
  buildLineBar(startStock);
  console.log(startStock);
}

//function to plot the chart
function buildLineBar(stock) {
  d3.json("https://tech-stock.herokuapp.com/data").then(function(data)   {

var volumeData = [];
var closeData = [];
var dateData = [];


    var dropdownMenu = d3.select("#stockChoice");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

    var filterData = data[dataset];
    console.log(filterData);
    
    var data2 = Object.entries(filterData)
    data2.forEach(function([key, value]) {
      //console.log(data2[key][1]["Date"]);

      dateData.push(data2[key][1]["Date"]);
      closeData.push(data2[key][1]["Adj. Close"]);
      volumeData.push(data2[key][1]["Volume"]);


    });

    var index = volumeData.length - 1;
    console.log(index);

    console.log(dateData[index])
    var dropdownMenuYearBegin = d3.select("#yearBegin");
    
    var dropdownMenuMonthBegin = d3.select("#monthBegin");
    
    var dropdownMenuDayBegin = d3.select("#dayBegin");
  
    var inputBeginYearValue = dropdownMenuYearBegin.node().value;
    var inputBeginMonthValue = dropdownMenuMonthBegin.node().value;
    var inputBeginDayValue = dropdownMenuDayBegin.node().value;
  
    var dropdownMenuYearEnd = d3.select("#yearEnd");
    var dropdownMenuMonthEnd = d3.select("#monthEnd");
    var dropdownMenuDayEnd = d3.select("#dayEnd");
  
    var inputEndYearValue = dropdownMenuYearEnd.node().value;
    var inputEndMonthValue = dropdownMenuMonthEnd.node().value;
    var inputEndDayValue = dropdownMenuDayEnd.node().value;

    var inputBeginDateValue = inputBeginYearValue.concat("-",inputBeginMonthValue,"-",inputBeginDayValue);
    var inputEndDateValue = inputEndYearValue.concat("-",inputEndMonthValue,"-",inputEndDayValue);

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: stock,
      x: dateData,
      y: closeData,
      yaxis: 'y2',
      line: {
        color: "DarkBlue"
      }
    };

    var trace2 = {
      type: "bar",
      name: stock,
      x: dateData,
      y: volumeData,
      marker: {
        color: "CornflowerBlue"
      }
    };

    var data = [trace1, trace2];

    var layout = {
      title: `${dataset} Stock Price / Volume`,
      //width: 1000,
      showlegend: false,
      xaxis: {
        range: [inputBeginDateValue, inputEndDateValue],
        type: "date"
      },
      yaxis2: {
        title: 'Closing Price',
        autorange: true,
        overlaying: 'y',
      },
      yaxis: {
        title: 'Daily Volume',
        autorange: true,
        side: 'right'
      }
    };
    Plotly.newPlot("line-bar", data, layout, {responsive: true});
  });
}

// this is for updating the chart based on user dropdown selection
d3.selectAll("#stockChoice").on("change", updatePlotly);
//button.on("click", updatePlotly);
//form.on("submit", updatePlotly);

function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#stockChoice");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  console.log(dataset);
  buildLineBar(dataset);
}

init2();


init();
