let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
let req = new XMLHttpRequest();
let values = [];
let xScale;
let yScale;
let width = 800;
let height = 600;
let padding = 40;
let svg = d3.select("svg");

let drawCanvas= () =>{
    svg.attr("width",width);
    svg.attr("height",height);
}

let generateScales = () =>{
    xScale = d3.scaleLinear()
               .range([padding,width-padding])
}

let drawPoints = ()=>{

}

let generateAxis = () =>{
    let xAxis = d3.axisBottom(xScale);

    svg.append("g")
        .call(xAxis)
        .attr("id","x-axis")
        .attr("transform","translate(0,"+(height-padding)+")")
}

req.open('GET',url,true)
req.onload = ()=>{
    values = JSON.parse(req.responseText);
    drawCanvas();
    generateScales();
    drawPoints();
    generateAxis();
}
req.send()