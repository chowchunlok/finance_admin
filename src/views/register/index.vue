<template>
  <div class="register">
    <el-form
      :model="registerForm"
      status-icon
      :rules="rules"
      ref="registerForm"
      label-width="100px"
      class="register-form"
    >
      <div class="register-title">Register Administrator</div>
      <el-form-item label="Name">
        <el-input v-model="registerForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Avatar">
        <AvatarUpload @uploadAvatar="uploadAvatar"/>
      </el-form-item>
      <el-form-item label="Roles">
        <el-select v-model="registerForm.roles" placeholder="Please select the role">
          <el-option label="Admin" value="admin"></el-option>
          <el-option label="Editor" value="editor"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input type="password" v-model="registerForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')" size="small" plain>Register</el-button>
        <el-button @click="resetForm('registerForm')" size="small" plain>Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Message, MessageBox } from 'element-ui'
import AvatarUpload from '@/components/AvatarUpload'
export default {
  components: {
    AvatarUpload
  },
  data() {
    var validatePass1 = (rule, value, callback) => {
      // 6-16, number or a-z/A-Z ---> at least 2 of them, and cannot contain blank and chinese
      let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/
      if (!reg.test(value)) {
        callback(
          new Error('Password length must be 6-16 digits and contains letters and characters')
        )
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }

    // Monitor whether the passwords are the same twice
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter your password again'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('The two passwords are inconsistent!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        name: '',
        avatar: '',
        roles: [],
        password: '',
        checkPass: ''
      },
      rules: {
        password: [
          {
            required: true,
            message: 'Please enter the password',
            trigger: 'blur',
            validator: validatePass1
          }
        ],
        checkPass: [
          {
            required: true,
            message: 'Please enter your password again',
            trigger: 'blur',
            validator: validatePass2
          }
        ]
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.registerForm
          this.$store
            .dispatch('Register', data) // store ----> api
            .then(res => {
              if (res.code === 2000) {
                Message({
                  type: 'success',
                  message: `Register Success`
                })
                setTimeout(() => {
                  this.$router.push('/')
                }, 1000)
              }
            })
            .catch(err => {
              console.log('register index.vue err:', err) //DEBUG: register index.vue err debug
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    uploadAvatar(avatarUrl) {
      this.registerForm.avatar = avatarUrl
    }
  }
}
</script>
<style lang="scss" scoped>
.register {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  .register-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 40%;
    .register-title {
      height: 30px;
      font-size: 20px;
      margin-bottom: 20px;
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>