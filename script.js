let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
let req = new XMLHttpRequest();
let values = [];
let xScale;
let yScale;
let width = 800;
let height = 600;
let padding = 40;

let svg = d3.select("svg");
let tooltip = d3.select("#tooltip");

let drawCanvas= () =>{
    svg.attr("width",width);
    svg.attr("height",height);
}

let generateScales = () =>{
    xScale = d3.scaleLinear()
                .domain([d3.min(values,item=>item["Year"]-1),d3.max(values,item=>item["Year"]+1)])
               .range([padding,width-padding])

    yScale = d3.scaleTime()
                .domain([d3.min(values,item=> new Date(item["Seconds"]*1000)),d3.max(values,item=> new Date(item["Seconds"]*1000))])
                .range([padding,height-padding])
}

let drawPoints = ()=>{
    svg.selectAll("circle")
        .data(values)
        .enter()
        .append("circle")
        .attr("class","dot")
        .attr("r","5")
        .attr("data-xvalue",item=>item["Year"])
        .attr("data-yvalue",item=> new Date(item["Seconds"]*1000))
        .attr("cx",item=>xScale(item["Year"]))
        .attr("cy",item=>yScale(new Date(item["Seconds"]*1000)))
        .attr("fill",item=>{
            if(item["Doping"]!=""){
                return "orange";
            }
            else {
                return "lightgreen";
            }
           
        })
        .on("mouseover", (event, item) => {
            tooltip.transition().style("visibility", "visible");
            if (item["Doping"] !== "") {
              tooltip.html(
                item["Year"] +
                  " - " +
                  item["Name"] +" - " +
                  "Time: " +
                  item["Time"] +" - " +
                  item["Doping"]
              );
            } else {
              tooltip.html(
                item["Year"] +
                  " - " +
                  item["Name"] +" -" +
                  "Time: " +
                  item["Time"] +" - "+
                  "No Allegations"
              );
            }
            tooltip.attr("data-year", item["Year"]);
            tooltip.style("top", event.pageY + "px").style("left", event.pageX + "px");
          })
          .on("mouseout", () => {
            tooltip.transition().style("visibility", "hidden");
          });
          
}

let generateAxis = () =>{
    let xAxis = d3.axisBottom(xScale)
                  .tickFormat(d3.format("d"));

    let yAxis = d3.axisLeft(yScale)
                  .tickFormat(d3.timeFormat("%M:%S"));

    svg.append("g")
        .call(xAxis)
        .attr("id","x-axis")
        .attr("transform","translate(0,"+(height-padding)+")");
    
    svg.append("g")
        .call(yAxis)
        .attr("id","y-axis")
        .attr("transform","translate("+padding+",0)")
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
