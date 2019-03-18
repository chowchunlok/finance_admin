<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Headlines">
        <el-input v-model="form.summary"/>
      </el-form-item>

      <el-form-item label="Published Time">
        <el-col :span="11">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 100%;"/>
        </el-col>
      </el-form-item>
      <el-form-item label="Figure captions">
        <el-select v-model="form.image" placeholder="大图">
          <el-option label="new01" value="new01.png"></el-option>
          <el-option label="new02" value="new02.png"></el-option>
          <el-option label="new03" value="new03.png"></el-option>
        </el-select>
        <el-select v-model="form.image_min" placeholder="小图">
          <el-option label="new01_min" value="new01_min.png"></el-option>
          <el-option label="new02_min" value="new02_min.png"></el-option>
          <el-option label="new03_min" value="new03_min.png"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Writer">
        <el-input v-model="form.editor"/>
      </el-form-item>
      <el-form-item label="Edit" class="news-content">
        <el-input v-model="form.artical" type="textarea" class="news-content-input"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">submit</el-button>
        <el-button @click="onCancel">reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import $api from 'axios'
import { publish } from '@/api/news'
export default {
  data() {
    return {
      form: {
        summary: '',
        editor: '',
        date: '',
        url: 'newsDetail/',
        artical: '',
        image: '',
        image_min: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$confirm(`确定发表新闻?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          publish({ data: this.form })
            .then(res => {
              this.$message({
                message: res.message,
                type: 'success',
                duration: 3 * 1000
              })
            })
            .catch(err => {})
        })
        .catch(() => {})
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.line {
  text-align: center;
}
</style>

