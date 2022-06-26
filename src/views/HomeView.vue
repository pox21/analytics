<script>
import axios from "axios";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default {
  data() {
    return {
      data: [],
    };
  },
  methods: {
    async getData() {
      const resp = await axios({
        url: "./data.json",
        method: "GET",
      });
      this.data = resp.data;
      this.getGraphic();
    },
    getGraphic() {
      let root = am5.Root.new(this.$refs.chartdiv);
      root.interfaceColors.set("text", am5.color("#fff"));

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout,
        })
      );

      chart.set(
        "background",
        am5.Rectangle.new(root, {
          stroke: am5.color(0x297373),
          strokeOpacity: 0.5,
          fill: am5.color(0x297373),
          fillOpacity: 0.2,
        })
      );

      chart.topAxesContainer.children.push(
        am5.Label.new(root, {
          text: "Аналитика по визитам",
          fontSize: 30,
          fontWeight: "500",
          x: am5.p50,
          centerX: am5.p50,
        })
      );

      // Create Y-axis
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      // Create X-Axis
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {}),
          categoryField: "date",
        })
      );
      xAxis.data.setAll(this.data);

      // Create series
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Аналитика",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "visits",
          categoryXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "[bold]{date}[/]\n{valueX.formatDate()}: {valueY}",
          }),
        })
      );
      series1.data.setAll(this.data);
      series1.set("fill", am5.color("#315b57"));

      // Add legend
      let legend = chart.children.push(am5.Legend.new(root, {}));
      legend.data.setAll(chart.series.values);

      // Add cursor
      chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          snapToSeries: [series1],
        })
      );

      this.root = root;
    },
  },
  mounted() {
    if (localStorage.getItem("leadhit-site-id")) this.getData();
    if (!localStorage.getItem("leadhit-site-id")) this.$router.push("/auth");
  },
};
</script>

<template>
  <main class="analytics pt-10 pb-20">
    <h1 class="text-5xl text-center mb-10">Аналитика</h1>
    <div class="hello" ref="chartdiv"></div>
  </main>
</template>

<style>
.hello {
  width: 100%;
  height: 500px;
}
</style>
