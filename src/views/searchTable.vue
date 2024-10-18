<template>
  <el-container class="el-container-search">
    <el-header>
      <el-form v-model="form" inline class="el-form-style">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item style="width: auto;">
          <el-button type="default" @click="handleReset">重置</el-button>
          <el-button type="primary" @click="getTableList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="el-main">
      <el-table
        :data="dataSource"
        style="width: 100%"
      >
        <el-table-column prop="id" label="id" width="200"></el-table-column>
        <el-table-column prop="title" label="title" width="200"></el-table-column>
        <el-table-column prop="author" label="author" width="200"></el-table-column>
        <el-table-column prop="display_time" label="display_time" width="200"></el-table-column>
        <el-table-column prop="pageviews" label="pageviews"></el-table-column>
        <el-table-column label="action" fixed="right" width="200">
          <template v-slot="{ row }">
            <el-button type="text" @click="handleCheck(row.id)">查看</el-button>
            <el-button type="text" @click="handleEdit(row.id)">编辑</el-button>
            <el-button type="text" @click="handleCopy(row.id)">复制</el-button>
            <el-button type="text" @click="handleRemove(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        class="pagination"
        @current-change="handlePageSize"
        :current-page="pageParams.currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageParams.total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import { getList } from '@/api/search-table'
export default {
  name: 'SearchTable',
  data() {
    return {
      form: {

      },
      pageParams: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      dataSource: []
    }
  },
  mounted() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      getList({ ...this.form, page: this.pageParams.currentPage, pageSize: this.pageParams.pageSize }).then(res => {
        if (res.code === 20000) {
          this.dataSource = res.data.items
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handlePageSize() {

    },
    handleReset() {
      this.form = {}
      this.dataSource = []
    },
    handleCheck(id) {

    },
    handleEdit(id) {

    },
    handleCopy(id) {

    },
    handleRemove(id) {

    }
  }
}
</script>

<style scoped lang="scss">
.el-container-search {
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-top: 20px;
  .el-main {
    flex-grow: 1;
  }
  .el-header, .el-footer {
    flex-grow: 0;
    height: auto !important;
  }
  .el-pagination {

    margin-top: 20px;
  }
}
.button-style {
  text-align: right;
}
.el-form-item {
  margin-right: 0 !important;
}
.el-form-style {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .el-form-item {
    width: 300px;
  }
}
</style>
