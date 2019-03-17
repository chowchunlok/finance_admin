<template>
  <el-upload
    class="upload-demo"
    action="/api/avatar/upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList2"
    :headers="{'Access-Control-Allow-Origin': true}"
    list-type="picture"
    name="avatar"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList2: [
        {
          name: 'food.jpeg',
          url: '/static/images/editor.jpg'
        }
      ]
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>