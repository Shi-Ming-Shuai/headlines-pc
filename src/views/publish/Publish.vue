<template>
  <div class="Publish">
    <el-card>
      <!-- 头部面包屑 -->
      <template #header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            >{{ articleId ? '修改' : '发布' }}文章</el-breadcrumb-item
          >
        </el-breadcrumb>
      </template>
      <!-- 发布文章 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <div id="wangeditor"></div>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio v-model="ruleForm.cover.type" :label="1">单图</el-radio>
          <el-radio v-model="ruleForm.cover.type" :label="3">三图</el-radio>
          <el-radio v-model="ruleForm.cover.type" :label="0">无图</el-radio>
          <el-radio v-model="ruleForm.cover.type" :label="-1">自动</el-radio>
          <!-- 上传封面 -->
          <template v-if="ruleForm.cover.type > 0">
            <!-- <div class="upload-cover">
              <UploadCover
                v-for="(item, i) in ruleForm.cover.type"
                :key="item"
                :coverImg="ruleForm.cover.images"
                :index="i"
                @updateCover="updateCover(i, $event)"
              />
            </div> -->
            <div class="upload-cover">
              <UploadCover
                v-for="(item, i) in ruleForm.cover.type"
                :key="item"
                :coverImg.sync="ruleForm.cover.images[i]"
                @updateCover="updateCover(i, $event)"
              />
            </div>
          </template>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="ruleForm.channel_id" placeholder="请选择频道">
            <el-option label="频道一" value="频道一"></el-option>
            <el-option label="频道二" value="频道二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publishArticle(false)">{{
            articleId ? '修改' : '发布'
          }}</el-button>
          <el-button @click="publishArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import UploadCover from './childCpn/UploadCover'

// import { request } from '@/utils/request'
// 使用富文本编辑器
import E from 'wangeditor'

export default {
  name: 'Publish',
  data() {
    return {
      editor: null, // 富文本 编辑器
      articleId: null,
      ruleForm: {
        title: '',
        channel_id: '',
        content: '',
        cover: {
          images: [], // 封面的网络地址
          type: 1
        }
      },
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  components: { UploadCover },
  created() {
    // 如果有查询参数 代表是修改文章
    const { articleId } = this.$route.query
    // 获取修改的文章 内容 绑定到模板
    if (articleId) {
      this.articleId = articleId
      // 请求到的数据
      const obj = {
        title: `${articleId}修改的标题`,
        channel_id: '频道一',
        content: '<p>修改的文章内容</p><h1>123132</h1>',
        cover: {
          images: [
            'https://img2.baidu.com/it/u=200324289,4272402363&fm=26&fmt=auto&gp=0.jpg',
            'https://img1.baidu.com/it/u=2066807717,3377458782&fm=15&fmt=auto&gp=0.jpg',
            'https://img2.baidu.com/it/u=1188493434,1798908701&fm=26&fmt=auto&gp=0.jpg'
          ], // 封面的网络地址
          type: 3
        }
      }
      this.ruleForm = obj
    }
  },
  mounted() {
    // 使用富文本编辑器
    this.editor = new E('#wangeditor')
    // this.editor.config.showLinkImg = false // 禁止显示网络图片上传
    // 设置z-index的值为100
    // this.editor.customConfig.zIndex = 10000
    // 本地图片上传
    this.editor.config.customUploadImg = async function(
      resultFiles,
      insertImgFn
    ) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      console.log(resultFiles)
      // 将本地图片转换为 网络地址图片 插入到富文本编辑器中
      // const token = await request({
      //   url: '/sm/token',
      //   method: 'post',
      //   data: {
      //     username: 'ShiMingShuai',
      //     password: '159317..aa'
      //   }
      // })
      // const token = await www({
      //   url: '/module/token',
      //   method: 'post',
      //   data: {
      //     username: 'ShiMingShuai',
      //     password: '159317..aa'
      //   }
      // })
      // const token = await axios.post('/app2/token', {
      //   username: 'ShiMingShuai',
      //   password: '159317..aa'
      // })
      // console.log(token)
      // 上传图片，返回结果，将图片插入到编辑器中
      insertImgFn(
        'https://img2.baidu.com/it/u=621698748,567605561&fm=26&fmt=auto&gp=0.jpg'
      )
    }
    this.editor.create()
    const { articleId } = this.$route.query
    if (articleId) {
      this.editor.txt.html(this.ruleForm.content) // 重新设置编辑器内容
    }
  },
  watch: {
    '$route.query.articleId': {
      handler(newv, oldv) {
        if (newv === undefined) {
          console.log('重新加载页面')
          this.$router.go(0)
        }
      }
    }
  },
  methods: {
    // 更新封面 子组件 updateCover 自定义事件
    updateCover(i, fileUrl) {
      // 根据实例触发自定义事件的指定下标 添加图片地址
      this.ruleForm.cover.images[i] = fileUrl
    },
    // 发布文章 或 存入草稿 draft=false 为存入草稿
    publishArticle(draft = false) {
      // 读取富文本编辑器中的内容
      const content = this.editor.txt.html()
      this.ruleForm.content = content
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const obj = {
            url: 'xxxxx.xxx',
            method: 'Post',
            params: {
              draft
            },
            data: this.ruleForm
          }
          this.$message.success(`${this.articleId ? '修改成功' : '发布成功'}`)
          console.log(obj)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.upload-cover {
  display: flex;
}
/deep/ .w-e-toolbar {
  z-index: 3 !important;
}
/deep/ .w-e-menu {
  z-index: 2 !important;
}
/deep/ .w-e-text-container {
  z-index: 1 !important;
}
</style>
