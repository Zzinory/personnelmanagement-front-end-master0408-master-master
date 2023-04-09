<template>
  <div>
    <visitor-pie :pieData="pieData"></visitor-pie>
     <div class="calendarLegend" v-for="item in dateData" :key="item.type">
        <div class="key" :style="{background:item.background}"></div>
         <div class="name">{{item.name}}</div>
     </div>
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="scope">
        <div style="position: relative">
          {{ scope.data.day.split("-").slice(1).join("-") }}
          <div v-for="item in dateData" :key="item.type">
            <div
              v-if="
                item.value.indexOf(scope.data.day) != -1 &&
                item.type == 'overTime'
              "
              class="overTime"
              :style="{background:item.background}"
            >
              {{ scope.data.day.split("-").slice(1).join("-") }}
            </div>
            <div
              v-if="
                item.value.indexOf(scope.data.day) != -1 &&
                item.type == 'awayOfficial'
              "
              class="awayOfficial"
              :style="{background:item.background}"
            >
              {{ scope.data.day.split("-").slice(1).join("-") }}
            </div>
            <div
              v-if="
                item.value.indexOf(scope.data.day) != -1 &&
                item.type == 'leave'
              "
              class="leave"
              :style="{background:item.background}"
            >
              {{ scope.data.day.split("-").slice(1).join("-") }}
            </div>
            <div v-else></div>
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
import visitorPie from "../visitorPie";
export default {
  data() {
    return {
      value: new Date(),
      pieData: {},
      dateData: [
        //加班
        { name:'加班',background:'#8BC472',type: "overTime", value: ["2023-04-01", "2023-04-02"] },
        //出差
        { name:'出差',background:'#E56464',type: "awayOfficial", value: ["2023-04-22", "2023-04-23"] },
        //请假
        {name:'请假',background:'#536CBE', type: "leave", value: ["2023-04-17", "2023-04-28"] },
      ],
    };
  },
  components: {
    visitorPie,
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        this.pieData = {
          leaveCount: 20, //请假天数
          overTimeCount: 365, //加班天数
          attendanceCount: 300, //出勤天数
          awayOfficialCount: 100, //出差天数
        };
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
  },
};
</script>

<style scoped>
.calendarLegend{
  display: flex;
  margin: 10px 0px;
}
.calendarLegend .name{
  font-size: 12px;
  counter-reset: #999;
}
.calendarLegend .key{
  width: 40px;
  height: 20px;
  border-radius: 5px;
  margin-right: 10px;

}

.overTime,
.awayOfficial,.leave {
  width: 165px;
  position: absolute;
  top: -8px;
  left: -8px;
  bottom: 30px;
  height: 85px;
  color: #fff;
}

</style>
