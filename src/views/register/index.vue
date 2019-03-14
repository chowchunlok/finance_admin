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
      <div class="register-title">Register Admin</div>
      <el-form-item label="name">
        <el-input v-model="registerForm.name"></el-input>
      </el-form-item>
      <el-form-item label="roles">
        <el-select v-model="registerForm.roles" placeholder="Please select the role">
          <el-option label="admin" value="admin"></el-option>
          <el-option label="editor" value="editor"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="password" prop="pass">
        <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="confirm" prop="checkPass">
        <el-input type="password" v-model="registerForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">register</el-button>
        <el-button @click="resetForm('registerForm')">reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Message, MessageBox } from 'element-ui'
// import { mapActions } from 'vuex'
export default {
	data() {
		var validatePass1 = (rule, value, callback) => {
			// 6-16, number or a-z/A-Z ---> at least 2 of them, and cannot contain blank and chinese
			let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/
			if (!reg.test(value)) {
				callback(
					new Error(
						'Password length must be 6-16 digits and contains letters and characters'
					)
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
					// {
					// 	validator: validatePass1,
					// 	trigger: 'blur'
					// }
				],
				checkPass: [
					{
						required: true,
						message: 'Please enter your password again',
						trigger: 'blur',
						validator: validatePass2
					}
					// {
					// 	validator: validatePass2,
					// 	trigger: 'blur'
					// }
				]
			}
		}
	},
	methods: {
		// ...mapActions('user', ['register']),
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
							if (res.success) {
								Message({
									type: 'success',
									message: `register success`
								})
							} else {
								MessageBox.confirm({
									type: 'error',
									message: 'Account already exists'
								})
							}
						})
						.catch(err => {
							console.log(err)
						})
				} else {
					console.log('error submit!!')
					return false
				}
			})
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
	.register-title {
		height: 100px;
		font-size: 26px;
		text-align: center;
	}
	.register-form {
		min-width: 40%;
		justify-content: center;
	}
}
</style>