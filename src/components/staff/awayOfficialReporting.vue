<template>
  <div style="display: flex">
    <div style="margin-right: 20px">
      <el-form ref="form" :model="info" label-width="80px">
        <el-form-item label="出差事由">
          <el-input  type="textarea"
            placeholder="请输入加班事由"
            :rows="10"
             v-model="info.leaveReason"
             ></el-input>
        </el-form-item>
        <el-form-item label="出差地点">
          <el-cascader
           style="width:100%"
            v-model="info.area"
            :options="areaOptions"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="出差时间">
          <el-date-picker
            v-model="info.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交审批</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="flex: 1">
      <el-table :data="tableData" height="800" border style="width: 100%">
        <el-table-column prop="leaveReason" label="出差事由" width="180">
        </el-table-column>
        <el-table-column prop="leaveTime" label="出差时间"> </el-table-column>
        <el-table-column prop="approver" label="审批人"> </el-table-column>
        <el-table-column prop="approveStatus" label="审批状态">
        </el-table-column>
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
  </div>
</template>
<script>
import submitLeave from "../../api/submitLeave";
import { getArea } from "../../area";
export default {
  data() {
    return {
      tableData: [],
      count: 0, //数据总数
      currentPage: 1, //当前页数
      areaOptions: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },

      info: {
        time: "",
        leaveReason: "",
        area: "",
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
        leaveState: "待审批",
        applicantName: this.$store.state.userName,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      submitLeave(data).then((resp) => {
        console.log(resp);
        alert("提交成功！");
      });
    },
  },
  mounted() {
    const area = getArea();
    this.areaOptions = area.children[0].children;
  },
};
</script>


<style scoped>
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
</style>
