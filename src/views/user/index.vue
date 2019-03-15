<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="Email" width="200">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column label="Name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="birth" align="center">
        <template slot-scope="scope">{{ scope.row.birth }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Stock" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.stock }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Ceate_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" class="delete" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { getUserData, deleteUser } from '@/api/user'
import $api from 'axios'
import { resolve, reject } from 'q'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    // this.fetchData()
    this.fetchUserData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    fetchUserData() {
      console.log(getUserData())
      getUserData()
        .then(res => {
          this.list = res.data
          this.list.forEach(item => {
            item.create_time = item.create_time.slice(0, 10)
            item.birth = item.birth.slice(0, 10)
          })
          this.listLoading = false
        })
        .catch(err => {
          console.log(err) // TODO:
        })
    },
    handleDelete(index, row) {
      this.$confirm(`此操作将永久删除 ${row.name} 用户, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ email: row.email })
          .then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            setTimeout(() => {
              this.$router.go(0)
            }, 800)
          })
          .catch(() => {}) // caugth error
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
