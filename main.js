window.onload = function(){
    var data = [];
    var name1 = ["Rachel", "Monica", "Phoebe", "Joey", "Chandler", "Dr. Ross Geller"];
    var random_count = Math.floor((Math.random() * 10) + 1);
    for (i=0; i<random_count; i++){
        var random_object = {};
        random_object.position = Math.floor((Math.random() * 100) + 1);
        random_object.size = Math.floor((Math.random() * 50) + 1);
        random_object.author = name1[Math.floor((Math.random() * 6) )];
        data.push(random_object);
    };

    var right_point=0,
        left_point=1000000,
        max_radius= 0,
        min_radius=100000;
    for (var i = 0; i < data.length; i++) {
            if ( data[i].size >= max_radius ) { max_radius = data[i].size;}

            if ( data[i].size <= min_radius ) { min_radius = data[i].size;}
        };

    var linearScaleRadius = d3.scale.linear()
                            .domain([min_radius, max_radius])
                            .range([10,50]);

    for (i in data){
            data[i].size=linearScaleRadius(data[i].size);
        };

    for (var i = 0; i < data.length; i++) {

        if ( data[i].position >= right_point ) { right_point = data[i].position}

        if ( data[i].position <= left_point ) { left_point = data[i].position}

    };
    var linearScale = d3.scale.linear()
                            .domain([left_point, right_point])
                            .range([linearScaleRadius(max_radius),400-linearScaleRadius(max_radius)]);

    for (i in data){
            data[i].position=linearScale(data[i].position);
        };
    var svgContainer = d3.select("body").append("svg")
                                        .attr("width", 400)
                                        .attr("height", 220),
        line = svgContainer.append("line")
                        .attr("x1", 0)
                        .attr("y1", 100)
                        .attr("x2", 400)
                        .attr("y2", 100)
                        .attr("stroke", "gray"),
        circles = svgContainer.selectAll("circle")
                              .data(data)
                              .enter()
                              .append("circle");


    circles
        .attr("cx", function (d){return d.position})
        .attr("cy", 100)
        .attr("r", function (d){return d.size})
        .on("click", clickfn)
        .style("fill", "gray")
        .style("opacity", "0.5");
    function clickfn(d){
        circles.style("opacity", "0.5");
        d3.selectAll("[check]").remove()
        svgContainer.append("line")
                .attr("x1", d.position)
                .attr("y1", 100)
                .attr("x2", d.position)
                .attr("y2", 200)
                .attr("check","")
                .style("stroke", "gray")
                .style("stroke-width", 1);
        var text = svgContainer.append("text")
                .text(d.author)
                .attr("text-anchor", "middle")
                .attr("x", d.position)
                .attr("y", 212)
                .attr("check","")
                .style("font-size", 15);
        d3.select(this).style("opacity", "0.8");
    };
};