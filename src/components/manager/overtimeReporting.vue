<template>
  <div>
    <el-form :inline="true" ref="form" :model="OverTimeInfo" label-width="80px">
      <el-form-item label="加班事由">
        <el-input v-model="OverTimeInfo.OverTimeReason"></el-input>
      </el-form-item>
      <el-form-item label="加班时间">
        <el-date-picker
          v-model="OverTimeInfo.OverTimeTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="800" border style="width: 100%">
      <el-table-column prop="OverTimeReason" label="加班事由" width="180">
      </el-table-column>
      <el-table-column prop="OverTimeTime" label="加班时间"> </el-table-column>
      <el-table-column prop="approver" label="审批人"> </el-table-column>
      <el-table-column prop="approveStatus" label="审批状态"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleApprover(scope.row)" type="text" size="small"
            >审批</el-button
          >
          <el-button type="text" size="small" @click="handleDelete(scope)"
            >删除</el-button
          >
        </template>
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
    <el-dialog
      v-if="editShow"
      title="审批"
      :visible.sync="editShow"
      append-to-body
      width="90%"
    >
      <el-form
       
        ref="form"
        :model="approverInfo"
        label-width="80px"
      >
        <el-form-item label="审批">
          <el-radio-group v-model="approverInfo.approveStatus">
            <el-radio label="同意"></el-radio>
            <el-radio label="拒绝"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="意见">
          <el-input type="textarea" :rows="10" v-model="approverInfo.OverTimeReason"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import submitLeave from "../../api/submitLeave";
export default {
  data() {
    return {
      editShow: false,
      tableData: [
        {
          OverTimeReason: "加班",
          OverTimeTime: "2023-01-01,2023-01-23",
          approver: "主管",
          approveStatus: "待处理",
        },
        {
          OverTimeReason: "加班1",
          OverTimeTime: "2023-01-01,2023-01-23",
          approver: "主管",
          approveStatus: "待处理",
        },
      ],
      count: 0, //数据总数
      currentPage: 1, //当前页数
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },

      OverTimeInfo: {
        time: "",
        OverTimeReason: "",
      },
      approverInfo: {
        //审批状态
        approveStatus: "",
        //意见
        OverTimeReason: "",
      },
    };
  },

  methods: {
    editSubmit(){

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //调用接口分页
    },
    handleApprover(record) {
      this.editShow = true;
      this.leaveInfo = record;
    },
    handleDelete(scope) {
      const $index = scope.$index;
      this.tableData = this.tableData.filter((item,index)=>index !== $index );
    },
    onSubmit() {
      console.log(this.leaveInfo);

      // let data = {
      //   leaveState: "待审批",
      //   applicantName: this.$store.state.userName,
      //   startTime: this.startTime,
      //   endTime: this.endTime,
      // };
      // submitLeave(data).then((resp) => {
      //   console.log(resp);
      //   alert("提交成功！");
      // });
    },
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
