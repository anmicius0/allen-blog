<template>
  <div
    class="flex flex-col rounded-xl border-2 border-green-300 px-2 py-5 text-center"
    style="text-wrap: balance"
  >
    <h2 class="py-4 text-xl font-medium">
      {{ $t("components.opchart.sources") }}
    </h2>
    <div
      :state="state"
      class="flex flex-wrap justify-between px-6 md:w-full md:flex-row md:px-12"
    >
      <div
        v-for="(item, key) in state"
        :name="key"
        :key="key"
        class="w-1/3 py-3 text-center"
      >
        <q-toggle
          :id="item.code"
          :label="item.name"
          color="primary"
          v-model="item.value"
          class="my-3"
          left-label
          :aria-label="item.name"
        />
      </div>
    </div>
  </div>

  <div class="h-96 w-full overflow-scroll">
    <div id="myChart" class="h-full md:w-full" style="width: 200vw"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts/core";
import { LineChart, ScatterChart } from "echarts/charts";
import { TooltipComponent, DatasetComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { debounce } from "lodash-es"; // Import debounce function
import p3 from "/assets/p3.json";
const { t } = useI18n();

// States
const state = reactive({
  formosa: {
    name: t("components.opchart.filters.formosa"),
    code: "美麗島",
    value: true,
  },
  cnews: {
    name: t("components.opchart.filters.cnews"),
    code: "匯流",
    value: true,
  },
  newtalk: {
    name: t("components.opchart.filters.newtalk"),
    code: "新頭殼",
    value: true,
  },
  ettoday: {
    name: t("components.opchart.filters.ettoday"),
    code: "ETtoday",
    value: true,
  },
  tpof: {
    name: t("components.opchart.filters.tpof"),
    code: "台灣民意基金會",
    value: true,
  },
  tvbs: {
    name: t("components.opchart.filters.tvbs"),
    code: "TVBS",
    value: true,
  },
});
const filter = computed(() => getFilter(state));
const chartData = computed(() => getData(p3, filter.value, t));

let myChart;

echarts.use([
  LineChart,
  ScatterChart,
  TooltipComponent,
  DatasetComponent,
  CanvasRenderer,
]);

onMounted(() => {
  myChart = echarts.init(document.getElementById("myChart"));
  drawChart(myChart, chartData.value);

  const resizeObserver = new ResizeObserver(
    debounce(() => {
      myChart.resize();
    }, 300),
  );
  resizeObserver.observe(document.getElementById("myChart"));

  watch(chartData, (newData) => {
    drawChart(myChart, newData);
  });
});

onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
  }
});
</script>
