<template>
    <div class="main">
        <div :id="title"></div>
    </div>
</template>

<script>
import * as d3 from "d3"

export default {
    props: {
        title: String,
        data: Array,
    },
    data() {
        console.log(this.data)
        return {
            chartData: this.data.map(d => {
                return {weight: d.weight, date: d.date}
            }),
        }
    },
    mounted() {
        console.log(this.chartData)
        this.generateChart();
    },
    methods: {
        generateChart() {
            const margin = {top: 10, right: 30, bottom: 30, left: 60},
                width = /*460*/ 400 - margin.left - margin.right,
                height = /*400*/ 340 - margin.top - margin.bottom;
            
            const svg = d3.select(`#${this.title}`)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);
            
            const x = d3.scaleTime()
                .domain(d3.extent(this.chartData, (d) => {return d.date}))
                .range([0, width])
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x))
            
            const max = d3.max(this.chartData, (d) => {return +d.weight})

            let y = d3.scaleLinear()
                .domain([0, max])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y))
            
            svg.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("y1", y(0))
            .attr("x2", 0)
            .attr("y2", y(max))
            .selectAll("stop")
                .data([
                {offset: "0%", color: "blue"},
                {offset: "100%", color: "red"}
                ])
            .enter().append("stop")
                .attr("offset", function(d) { return d.offset; })
                .attr("stop-color", function(d) { return d.color; });

            svg.append("path")
                .datum(this.chartData)
                .attr("fill", "none")
                .attr("stroke", "url(#line-gradient)")
                .attr("stroke-width", 2)
                .attr("d", d3.line()
                    .x(function(d) {return x(d.date)})
                    .y(function(d) {return y(d.weight)})
                    );
            
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height + margin.top + 20)
                .text("Time")
            
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left + 20)
                .attr("x", -margin.top)
                .text("Weight")
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin: auto;
}

.svg-container {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    vertical-align: top;
    overflow: hidden;
}

.svg-content-responsive {
    display: inline-block;
    position: absolute;
    top: 10px;
    left: 0;
}
</style>