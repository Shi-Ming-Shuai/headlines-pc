<template>
  <div class="Setiing">
    <el-card>
      <template #header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <el-row>
        <!-- 用户表单信息 -->
        <el-col :span="12">
          <el-form ref="form" :model="user" :rules="rules" label-width="80px">
            <el-form-item label="编号">
              <span>{{ user.id }}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ user.mobile }}</span>
            </el-form-item>
            <el-form-item label="媒体名称" prop="name">
              <el-input type="text" v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" prop="intro">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5 }"
                v-model="user.intro"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input type="text" v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :loading="saveBtnLoading"
                @click="saveBtn"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 用户头像 -->
        <el-col class="avatar" :offset="5" :span="4">
          <el-avatar
            :size="200"
            shape="square"
            fit="cover"
            :src="user.photo"
          ></el-avatar>
          <el-button class="edit-avatar" @click="$refs.uploadFile.click()"
            >点击修改头像</el-button
          >
          <!-- 上传文件 -->
          <input
            ref="uploadFile"
            type="file"
            accept="image/*"
            hidden
            @change="fileChange"
          />
        </el-col>
      </el-row>
    </el-card>
    <!-- 预览图片 弹出层 -->
    <el-dialog
      title="裁切头像"
      :visible.sync="dialogVisible"
      @opened="dialogOpened"
      @closed="dialogClosed"
    >
      <img id="image" ref="photo" :src="previewImage" alt="" />
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updatePhoto">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// 图像裁切
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'Setiing',
  data() {
    return {
      cropper: null, // 图像裁切实例
      user: {
        id: 15643214,
        mobile: 15930252991,
        name: '撒旦法双方都',
        intro: '一家新媒体公司  awdawd啊打我爱我的爱我的安慰d-------',
        email: '2992630812@qq.com',
        photo:
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      dialogVisible: false, // 预览图片弹出层
      saveBtnLoading: false, // 保存按钮loading
      previewImage:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', // 预览修改的图片
      rules: {
        name: [
          // 媒体名称验证
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 1, max: 7, message: '名称长度为1-7个字', trigger: 'change' }
        ],
        intro: [
          { required: true, message: '媒体介绍不能为空', trigger: 'blur' },
          { min: 5, message: '介绍最少为5个字', trigger: 'change' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {},
  methods: {
    // 当编辑头像弹出框打开动画结束时 触发图片裁切
    dialogOpened() {
      // 解决第二次切换图片 图片不更换（方法一:替换图片方法 方法二:销毁裁剪器并从图像中删除实例）
      if (this.cropper) {
        console.log(1)
        this.cropper.replace(this.previewImage)
        return
      }
      // 创建图像裁切实例
      const image = this.$refs.photo
      this.cropper = new Cropper(image, {
        minCropBoxWidth: 300, // 裁剪框的最小宽度(如果图像比最小宽度小 那么就是图像最大的宽度)。
        minCropBoxHeight: 300, // 裁剪框的最小高度。(如果图像比最小高度小 那么就是图像最大的高度)
        aspectRatio: 1, // 定义裁剪框的固定纵横比
        viewMode: 1, // 限制裁剪框不超过画布的大小
        dragMode: 'move', // 拖动模式 : 移动画布
        cropBoxMovable: true, // 剪切框是否可以移动
        cropBoxResizable: false, // 剪切框是否可以调整大小
        // background: false, // 显示容器的网格背景
        movable: true // 图像是否可以移动
      })
    },
    // 当编辑头像弹出层动画关闭时 将cropper实例删除
    dialogClosed() {
      // this.cropper.destroy()
      // this.cropper = null
    },
    // 用户选择图片文件
    fileChange() {
      const file = this.$refs.uploadFile
      // 将文件 转成blob地址
      const blob = window.URL.createObjectURL(file.files[0])
      this.previewImage = blob

      // 展示预览图片弹出层
      this.dialogVisible = true

      // 防止用户下一次选中这个图片 触发不了input 的 change事件
      // this.$refs.uploadFile.value = ''
    },
    updatePhoto() {
      // 显示loading
      this.$loading()
      // 获取裁切的图像
      this.cropper.getCroppedCanvas().toBlob(blob => {
        console.log(blob)
        // 上传到服务器 修改展示的用户头像
        const newUrl = URL.createObjectURL(blob)
        setTimeout(() => {
          this.user.photo = newUrl
          // 非父子组件通信  component/common/Header
          this.$bus.$emit('change-userinfo', this.user)

          this.$loading().close()
          // 关闭弹出层
          this.dialogVisible = false
          // 提示
          this.$message.success('更新头像成功')
        }, 3000)
      })
      // const file = this.cropper.getCroppedCanvas().toDataURL()
      // console.log(file)
    },
    // 保存设置
    saveBtn() {
      // 表单验证
      this.$refs.form.validate(valid => {
        // 保存按钮loading
        this.saveBtnLoading = true
        if (!valid) {
          console.log(valid)
          return
        }
        setTimeout(() => {
          // 表单验证成功 发送请求 修改数据
          // 非父子组件通信  component/common/Header
          this.$bus.$emit('change-userinfo', this.user)
          // 取消保存按钮loading
          this.saveBtnLoading = false
        }, 2000)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  display: flex;
  // flex-direction: column;
  // align-items: center;

  justify-content: center;
  flex-wrap: wrap;
  .edit-avatar {
    margin-top: 20px;
  }
}
/* 确保图像的大小完全适合容器 */
#image {
  display: block;
  /* 这个规则很重要，请不要忽略这个 */
  max-width: 100%;
  height: 400px;
}
// 图像裁切 样式
/deep/ .cropper-container {
  width: 100% !important;
}
</style>
