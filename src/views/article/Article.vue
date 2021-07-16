<template>
  <div class="Article">
    <!-- 头部表单卡片 -->
    <el-card class="head-form-card">
      <!-- 头部面包屑 -->
      <template #header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <!-- 查询表单 -->
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="状态">
          <el-radio v-model="article.status" label="">全部</el-radio>
          <el-radio v-model="article.status" :label="0">草稿</el-radio>
          <el-radio v-model="article.status" :label="1">待审核</el-radio>
          <el-radio v-model="article.status" :label="2">审核通过</el-radio>
          <el-radio v-model="article.status" :label="3">审核失败</el-radio>
          <el-radio v-model="article.status" :label="4">已删除</el-radio>
        </el-form-item>
        <el-form-item label="频道">
          <el-select
            v-model="article.channel_id"
            clearable
            placeholder="请选择频道"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="selectDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-mm-dd"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="isLoading" @click="onSearch"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 文章列表 卡片 -->
    <el-card class="acticle-list-card" v-loading="isLoading">
      <template #header>
        根据筛选条件共查询到1231条结果:
      </template>
      <!-- 文章表格(默认展示) -->
      <el-table
        class="acticle-list"
        :data="tableData"
        stripe
        height="300"
        border
        style="width: 100%"
      >
        <el-table-column align="center" label="封面" width="180">
          <template slot-scope="scope">
            <div class="photo">
              <el-image
                v-if="scope.row.photo"
                lazy
                fit="cover"
                :src="scope.row.photo"
                alt=""
              />
              <div class="no-image">
                无封面
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="标题" width="180">
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <!-- 判断当前status的值 来展示不同标签 -->
            <el-tag effect="plain" v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag type="warning" v-else-if="scope.row.status === 1"
              >待审核</el-tag
            >
            <el-tag type="success" v-else-if="scope.row.status === 2"
              >审核通过</el-tag
            >
            <el-tag type="danger" v-else-if="scope.row.status === 3"
              >审核失败</el-tag
            >
            <el-tag type="info" v-else-if="scope.row.status === 4"
              >已删除</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column align="center" prop="address" label="发布时间">
        </el-table-column>
        <el-table-column align="center" prop="address" label="操作">
          <!-- 编辑  -  删除 -->
          <template slot-scope="scope">
            <el-button
              type="primary"
              circle
              icon="el-icon-edit"
              @click="EditArticle(scope.row)"
            ></el-button>
            <el-button type="danger" circle icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 请求
// import { getArticleList } from '@/network/article'

export default {
  name: 'Article',
  data() {
    return {
      isLoading: false,
      // 表单
      article: {
        status: '', // 状态
        channel_id: '', // 频道id
        begin_pubdate: '', // 开始时间
        end_pubdate: '' // 结束时间
      },
      // 下拉菜单
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 日期  开始事件 结束时间
      selectDate: '',
      // 选择日期快捷键
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      // 文章表格
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 0,
          photo:
            'https://img2.baidu.com/it/u=301122350,2494888941&fm=11&fmt=auto&gp=0.jpg'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1,
          photo:
            'https://img2.baidu.com/it/u=2107049943,17727608&fm=11&fmt=auto&gp=0.jpg'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 2
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 3
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 4
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 2
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 4,
          photo:
            'https://img2.baidu.com/it/u=301122350,2494888941&fm=11&fmt=auto&gp=0.jpg'
        }
      ]
    }
  },
  components: {},
  created() {
    // 初始化文章列表
    // this.getArticleList()
  },
  methods: {
    // 表单查询按钮
    onSearch() {
      this.startLoading()
    },
    // 编辑文章按钮  row当前行数据
    EditArticle(row) {
      row.articleId = 234532154
      const { articleId } = row
      // 跳转至发布文章路由  携带 query参数  (当前文章id)
      this.$router.push({
        path: '/publish',
        query: {
          articleId
        }
      })
    },
    // 当前文件公共 - 触发loading
    startLoading() {
      // 触发loading
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    }
    // 获取文章列表 (page查询页数)
    // getArticleList() {}
  }
}
</script>

<style lang="less" scoped>
.head-form-card {
  margin-bottom: 30px;
}
.acticle-list {
  margin-bottom: 30px;
  .photo {
    width: 80px;
    height: 80px;
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
  .no-image {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
