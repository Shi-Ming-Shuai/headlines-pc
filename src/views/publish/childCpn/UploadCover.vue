<template>
  <div class="UploadCover" @click="slectCover">
    <!-- <el-image v-if="coverImg[index]" :src="coverImg[index]" fit="cover"> -->
    <el-image v-if="coverImg" :src="coverImg" fit="cover"> </el-image>
    <!-- 弹出框 -->
    <el-dialog
      title="选择封面"
      append-to-body
      :visible.sync="dialogVisible"
      width="50%"
      @closed="dialogClosed1"
    >
      <!-- tabs标签栏 -->
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="素材库" name="素材库">
          <ImageList :isShowUpload="false" :screenXl="6" />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="上传图片">
          <el-upload
            ref="el-upload"
            action="#"
            list-type="picture-card"
            multiple
            :limit="1"
            :auto-upload="false"
            :on-change="fileChange"
            :on-exceed="exceedLimt"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog append-to-body :visible.sync="dialogVisible2">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入定制组件
import ImageList from '@/components/content/ImageList'

// 引入手动上传
export default {
  name: 'UploadCover',
  data() {
    return {
      dialogVisible: false, // 弹出层
      activeName: '上传图片', // 当前活跃的标签栏名称
      // 图片上传
      dialogImageUrl: '',
      dialogVisible2: false,
      disabled: false,
      file: null
    }
  },
  // 接收父组件传递过来的 图片
  props: {
    // 封面数组
    coverImg: {
      type: String,
      default: ''
    }
    // coverImg: {
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // },
    // // 当前图片索引 所处封面数组中的索引
    // index: {
    //   type: Number
    // }
  },
  components: { ImageList },
  methods: {
    // 选择封面
    slectCover() {
      this.dialogVisible = true
    },
    // 确认封面按钮
    onSubmit() {
      // 验证是否选择了文件
      if (!this.file) {
        this.$message.error('请选择图片')
        return
      }
      const fileUrl = window.URL.createObjectURL(this.file)
      // 父组件添加数据
      this.$emit('update:coverImg', fileUrl)
      this.dialogVisible = false
    },
    // 选择封面弹出框 关闭以后触发
    dialogClosed1() {
      // 清空已上传的文件列表
      this.$refs['el-upload'].clearFiles()
    },
    // 图片操作  文件改变触发
    fileChange(file, fileList) {
      // console.log(file, fileList)
      this.file = file.raw
      // const fileUrl = window.URL.createObjectURL(file.raw)
      // console.log(fileUrl)
    },
    // 删除图片
    handleRemove(file) {
      // console.log(file)
      // console.dir(this.$refs['el-upload'])
      this.$refs['el-upload'].handleRemove(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible2 = true
    },
    handleDownload(file) {
      console.log(file)
    },
    // 选择文件超出限制提示
    exceedLimt() {
      this.$message.error('最多选择一张图片')
    }
  }
}
</script>

<style lang="less" scoped>
.UploadCover {
  margin-right: 30px;
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>
