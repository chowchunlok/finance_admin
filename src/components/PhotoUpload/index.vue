<template>
  <div class="components-container">
    <pan-thumb :image="image"/>

    <el-button
      type="primary"
      icon="upload"
      style="position: absolute;bottom: 15px;margin-left: 20px;"
      @click="imagecropperShow=true"
      size="mini"
      plain
    >Upload</el-button>
    <!-- NOTE: width/height demintion 300/300-->
    <image-cropper
      v-show="imagecropperShow"
      :width="200"
      :height="200"
      :key="imagecropperKey"
      :url="url"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import ImageCropper from './components/ImageCropper'
import PanThumb from './components/PanThumb'

export default {
  name: 'AvatarUploadDemo',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: '/static/images/default.png',
      url: '/api/avatar/upload'
    }
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.filename
      this.$emit('uploadAvatar', resData.filename)
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
.avatar {
  /* width: 200px;
  height: 200px;
  border-radius: 50%; */
}
</style>

