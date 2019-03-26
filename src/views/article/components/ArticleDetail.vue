<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <!-- 评论开关 发表 草稿 -->
      <sticky :class-name="'sub-navbar '+postForm.status">
        <CommentDropdown v-model="postForm.comment_disabled"/>
        <el-button
          v-loading="loading"
          style="margin-left: 10px;"
          type="success"
          @click="submitForm"
        >Publish</el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">Draft</el-button>
      </sticky>

      <!-- 文章内容 -->
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>Title</MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="Author: " class="postInfo-container-item">
                    <el-select
                      v-model="postForm.author"
                      :remote-method="getRemoteAuthorList"
                      filterable
                      remote
                      placeholder="Search Author"
                    >
                      <el-option
                        v-for="(item,index) in authorListOptions"
                        :key="item+index"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="45px" label="Type: " class="postInfo-container-item">
                    <el-select v-model="postForm.type" filterable placeholder="Select Type">
                      <el-option
                        v-for="(item,index) in typeListOptions"
                        :key="item+index"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="60px" label="Imp:" class="postInfo-container-item">
                    <el-rate
                      v-model="postForm.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="margin-top:8px;"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item
                    label-width="100px"
                    label="Display_time:"
                    class="postInfo-container-item"
                  >
                    <el-date-picker
                      v-model="postForm.display_time"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      placeholder="Select Release Date"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="80px" label="Summary:">
          <el-input
            :rows="1"
            v-model="postForm.summary"
            type="textarea"
            class="article-textarea"
            autosize
            placeholder="Please enter the content"
          />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}characters</span>
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" :height="400" v-model="postForm.content"/>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky'
import { validURL } from '@/utils/validate'
import { fetchArticle, createArticle, updateArticle } from '@/api/article'
import { searchAuthorList } from '@/api/article'
import { CommentDropdown } from './Dropdown'
import { parseTime } from '@/utils'

const defaultForm = {
  status: 'draft',
  title: '',
  content: '',
  summary: '',
  display_time: undefined,
  id: undefined,
  comment_disabled: false,
  importance: 0,
  // extra
  timestamp: undefined,
  author: undefined,
  type: '',
  pageviews: 0
}

export default {
  name: 'ArticleDetail',
  components: {
    Tinymce,
    MDinput,
    Sticky,
    CommentDropdown
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + ' is necessary',
          type: 'error'
        })
        callback(new Error(rule.field + ' is necessary'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      authorListOptions: [],
      typeListOptions: ['News', 'Finance', 'Daily', 'Company'],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.summary.length
    },
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    // Edit --> update, Create ---> create
    submitMethod(isEdit, postForm, flag) {
      this.$confirm(`Confirm to ${flag} the article?`, 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancle',
        type: 'warning'
      })
        .then(() => {
          if (isEdit) {
            updateArticle(postForm)
              .then(res => {
                this.$notify({
                  title: 'Success',
                  message: res.message,
                  type: 'success',
                  duration: 2000
                })
              })
              .catch(err => {
                console.log('submitMethod err', err)
              })
          } else {
            createArticle(postForm)
              .then(res => {
                this.$notify({
                  title: 'Success',
                  message: res.message,
                  type: 'success',
                  duration: 2000
                })
              })
              .catch(err => {
                console.log('submitMethod err', err)
              })
          }
        })
        .catch(() => {})
    },
    fetchData(id) {
      fetchArticle(id)
        .then(response => {
          this.postForm = response.data.items
          console.log('response.data.items', response.data.items) //CHECK: postForm

          // Set tagsview title
          // this.setTagsViewTitle()
        })
        .catch(err => {
          console.log('fetchData err', err) //DEBUG: fetchData err
        })
    },
    // setTagsViewTitle() {
    //   const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
    //   const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
    //   this.$store.dispatch('updateVisitedView', route)
    // },
    submitForm() {
      this.postForm.display_time = parseTime(this.postForm.display_time)
      this.postForm.timestamp = Date.now()
      // console.log('submitForm before api', this.postForm) //CHECK: submitForm
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true

          // update / create article
          this.submitMethod(this.isEdit, this.postForm, 'publish')

          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      this.postForm.display_time ? parseTime(this.postForm.display_time) : ''
      this.postForm.timestamp = Date.now()
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: 'Please Fill in the Title and Content',
          type: 'warning'
        })
        return
      }
      // draft article
      this.submitMethod(this.isEdit, this.postForm, 'draft')
      this.postForm.status = 'draft'
    },
    getRemoteAuthorList(query) {
      searchAuthorList(query).then(response => {
        if (!response.data.authorList) return
        this.authorListOptions = response.data.authorList.map(v => v.name)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/mixin.scss';
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
