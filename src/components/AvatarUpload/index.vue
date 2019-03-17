<template>
  <div class="components-container">
    <pan-thumb :image="image"/>

    <el-button
      type="primary"
      icon="upload"
      @click="imagecropperShow=true"
      plain
      size="mini"
      class="button"
    >Upload</el-button>
    <!-- NOTE:url/field -->
    <image-cropper
      v-show="imagecropperShow"
      :width="100"
      :height="100"
      :key="imagecropperKey"
      :field="'curry'"
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
      image: '/static/images/default.jpg'
    }
  },
  methods: {
    cropSuccess(resData) {
      console.log('resData:', resData) //CHECK resData debug
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped lang="scss">
.components-container {
  display: flex;
  align-items: center;
  .button {
    margin-left: 20px;
  }
}
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>

