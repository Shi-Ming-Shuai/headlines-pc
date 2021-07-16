<template>
  <div class="Material">
    <el-card>
      <template #header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <!-- 筛选展示内容  全部  收藏 -->
      <!-- <div class="head">
        <el-radio-group v-model="radio" size="small" @change="radioChange">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
        <el-button
          type="success"
          size="small"
          @click.native="dialogVisible = true"
          >上传素材</el-button
        >
      </div> -->

      <!-- 响应式布局 -->
      <!-- <el-row>
        <el-col
          class="image-item"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
          v-for="item in 20"
          :key="item"
        >
          <el-image style="height:150px" :src="images" fit="cover"></el-image>
        </el-col>
      </el-row> -->
      <!-- 分页 -->
      <!-- <el-pagination
        background
        :page-size="20"
        layout="prev, pager, next"
        :total="100"
      >
      </el-pagination> -->
      <!-- 弹出层  上传图片素材 -->
      <!-- 中间弹出层 -->
      <!-- <el-dialog title="上传素材" :visible.sync="dialogVisible" width="30%">
        <el-upload
          ref="uploadFile"
          action="/up"
          multiple
          list-type="picture-card"
          :auto-upload="false"
          :on-change="handleChange"
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
        </el-upload> -->
      <!-- 底部确认上传 -->
      <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitFile">确 定</el-button>
        </span>
      </el-dialog> -->
      <!-- 图片预览 弹出层 -->
      <!-- <el-dialog :visible.sync="dialogVisible2">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog> -->
      <!-- 定制组件 -->
      <ImageList />
    </el-card>
  </div>
</template>

<script>
// 定制组件
import ImageList from '@/components/content/ImageList'
export default {
  name: 'Material',
  data() {
    return {
      // radio: '全部', // 展示指定素材
      // images:
      //   'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      // dialogVisible: false, // 中间弹出层
      // dialogVisible2: false, // 预览图片弹出层
      // dialogImageUrl: '', // 上传图片组件
      // disabled: false,
      // fileList: [] // 上传的文件列表
    }
  },
  components: { ImageList },
  methods: {
    //   // 全部 收藏 切换按钮
    //   radioChange(value) {
    //     //  数据绑定到data
    //     if (value === '全部') {
    //       this.images =
    //         'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    //     } else {
    //       this.images =
    //         'https://img0.baidu.com/it/u=1731598139,3690509438&fm=26&fmt=auto&gp=0.jpg'
    //     }
    //   },
    //   // 处理图片上传
    //   // 提交文件
    //   submitFile() {
    //     console.log(this.$refs.uploadFile)
    //   },
    //   // 文件改变触发
    //   handleChange(file, fileList) {
    //     this.fileList.push(file.raw)
    //   },
    //   // 删除图片
    //   handleRemove(file) {
    //     console.log(file)
    //   },
    //   // 图片预览
    //   handlePictureCardPreview(file) {
    //     this.dialogImageUrl = file.url
    //     this.dialogVisible2 = true
    //   },
    //   // 文件下载
    //   handleDownload(file) {
    //     console.log(file)
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
}
.image-item {
  padding: 20px;
}
</style>
