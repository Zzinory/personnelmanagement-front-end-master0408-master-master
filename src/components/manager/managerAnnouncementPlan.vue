<template>
  <div>
    <el-button type="primary" @click="handlerPublish()">发布</el-button>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        column-key="date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        >
      </el-table-column>
       <el-table-column
        prop="desc"
        label="内容"
        >
      </el-table-column>
      <el-table-column
        prop="op"
        label="编辑"
        width="180">
         <template slot-scope="scope">
           <el-button @click="handlerPublish(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
     
    </el-table>
  

       <el-dialog
      v-if="publish"
      title="发布"
      :visible.sync="publish"
      append-to-body
      width="90%"
    >
      <el-form
        ref="form"
        :model="publishAnnouncement"
        label-width="80px"
      >
       <el-form-item label="标题">
          <el-input v-model="publishAnnouncement.title"></el-input>
        </el-form-item>
      
        <el-form-item label="内容">
          <el-input type="textarea" :rows="10" v-model="publishAnnouncement.desc"></el-input>
        </el-form-item>
        

        <el-form-item>
          <el-button type="primary" @click="editSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
      
  </div>

</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      publish:false,
      publishAnnouncement:{},
      tableData: [{
        date: '2016-05-02',
        title: '公告1',
        desc:'公告详情111',
        
      }, {
        date: '2016-05-04',
       title: '公告2',
        desc:'公告详情222',
      }, {
        date: '2016-05-01',
        title: '公告3',
         desc:'公告详情333',
      }, {
        date: '2016-05-03',
        title: '公告4',
         desc:'公告详情444',
      }]
    }
  },
  methods: {
    editSubmit(){

    },
    handlerPublish(record){
      this.publish = true;
      if(record){
        this.publishAnnouncement = record;
      }
    },
    handleDetail(row){
      this.dialogFormVisible = true;
      this.announcement = row
      
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  }
}
</script>

<style scoped>

</style>
