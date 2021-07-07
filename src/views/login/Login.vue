<template>
  <div class="Login">
    <el-form
      :model="user"
      status-icon
      :rules="rules"
      ref="user"
      class="form-login"
    >
      <el-form-item prop="mobile">
        <el-input
          type="type"
          v-model="user.mobile"
          placeholder="请输入手机号"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          type="password"
          v-model="user.code"
          placeholder="请输入密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checked">
        <el-checkbox v-model="user.checked"
          >我以阅读并同意协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="isLoginLoading"
          @click="submitForm('user')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
// 请求
import { login } from '@/network/user'
export default {
  name: 'Login',
  data() {
    // 验证是否勾选 我已阅读并同意协议
    const validateChecked = (rule, value, callback) => {
      if (value) {
        // 勾选了 通过
        callback()
      } else {
        // 没勾选 提示用户
        callback(new Error('请勾选同意协议'))
      }
    }
    return {
      isLoginLoading: false, // 登录按钮为加载状态(不可点击 防止用户多次点击登录)
      user: {
        mobile: '17090086870',
        code: '246810',
        checked: false // 用户是否同意了条款
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3|5|4|9|7|8|6]\d{9}$/,
            message: '请输入正确的手机格式',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入6位数字密码', trigger: 'blur' }
        ],
        checked: [{ validator: validateChecked, trigger: 'blur' }]
      }
    }
  },
  components: {},
  methods: {
    // 登录按钮
    submitForm(formName) {
      // 按钮显示加载 禁止用户点击按钮
      this.isLoginLoading = true
      // 触发表单验
      this.$refs[formName].validate(async valid => {
        // 判断是否通过表单验证
        if (valid) {
          // 深拷贝
          const user = Object.assign({}, this.user)
          delete user.checked
          // 发送登录请求  判断登录结果
          const result = await login(user)
          if (result) {
            // 多层数据结构 结构出data 再从data中结构出token
            const {
              data: { token }
            } = result
            // 本地存储token  跳转至访问的页面
            setItem('token', token)
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            // 返回上一级页面
            this.$router.back()
          } else {
            this.$message({
              type: 'error',
              message: '请检查用户名或密码'
            })
          }
        } else {
          console.log('error submit!!')
        }
        // 取消按钮加载状态
        this.isLoginLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.Login {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('~@/assets/image/login-bg.webp') no-repeat;
  background-size: cover;
  .form-login {
    padding: 80px;
    width: 550px;
    height: 350px;
    border-radius: 20px;
    background-color: #fff;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
