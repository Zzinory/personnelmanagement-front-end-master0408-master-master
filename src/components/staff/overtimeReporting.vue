<template>
  <div style="display: flex">
    <div style="margin-right:20px">
      <el-button type="primary" @click="test">test</el-button>
      <el-form ref="form" :model="info" label-width="80px">
        <el-form-item label="加班时间">
          <el-date-picker
            v-model="info.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="加班事由">
          <el-input
            type="textarea"
            placeholder="请输入加班事由"
            :rows="10"
            v-model="info.overtimeReason"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交审批</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="flex:1">
      <el-table :data="tableData" height="800" border style="width: 100%">
        <el-table-column prop="overtimeReason" label="加班事由" width="180"></el-table-column>
        <el-table-column prop="overtimeTime" label="加班时间"> </el-table-column>
        <el-table-column prop="censorName" label="审批人"></el-table-column>
        <el-table-column prop="censorState" label="审批状态">
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
import overtimeSubmit from "../../api/overtimeSubmit";
import overTimeGetListById from "../../api/overtimeGetListById";
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
    test(){

      console.log(this.info.overtimeReason);

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //调用接口分页
    },
    onSubmit() {
      let data = {
        overtimeTime: this.$data.info.time[0]+this.$data.info.time[1],
        overtimeReason: this.info.overtimeReason,
        censorState: "待审批",
        userId:this.$store.state.userId,
        userName:this.$store.state.userName,
      };
      overtimeSubmit(data).then(resp=>{
        console.log(resp);
        alert("提交成功!");
      })
    },
  },
  created() {
    let data={userId:this.$store.state.userId};
    overTimeGetListById(data).then(resp=>{

      console.log(resp.data.data);
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
