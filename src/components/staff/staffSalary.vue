<template>
  <div>
    <el-form :inline="true" ref="form" :model="info" label-width="80px">
      <el-form-item label="发放时间">
        <el-date-picker
          v-model="info.time"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="800" border style="width: 100%">
      <el-table-column prop="payTime" label="发放时间" width="180">
      </el-table-column>
      <el-table-column prop="baseSalary" label="基础工资"> </el-table-column>
      <el-table-column prop="overtimeSalary" label="加班补贴"> </el-table-column>
      <el-table-column prop="deductSalary" label="请假扣除"> </el-table-column>
      <el-table-column prop="grossSalary" label="实发工资"> </el-table-column>
    </el-table>
    <div class="Pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="count"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import submitLeave from "../../api/submitLeave";
import getSalaryListByUserId from "../../api/getSalaryListByUserId";
export default {
  data() {
    return {
      tableData: [],
      count: 0, //数据总数
      currentPage: 1, //当前页数
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();

        },
      },

      info: {
        time: "",
        leaveReason: "",
      },
    };
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //调用接口分页
    },
    onSubmit() {
      let data = {
        // leaveState: "待审批",
        applicantName: this.$store.state.userName,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      // submitLeave(data).then((resp) => {
      //   console.log(resp);
      //   alert("提交成功！");
      // });
      console.log(this.info.time);

    },

  },
  created() {
    let user = {id:this.$store.state.userId};
    getSalaryListByUserId(user).then(resp=>{
        this.tableData=resp.data.data;

    })
  }
};
</script>


<style scoped>
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
</style>
