<template>
  <div class="Comment">
    <el-card>
      <template #header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <!-- 文章评论管理表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" prop="title" label="标题">
        </el-table-column>
        <el-table-column
          align="center"
          prop="total_comment_num"
          label="总评论数"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="fans_comment_num"
          label="粉丝评论数"
        >
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status === 0 ? '关闭' : '正常' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div>
              <el-tooltip
                :content="
                  scope.row.status === 0
                    ? '点击开启评论权限'
                    : '点击关闭评论权限'
                "
                placement="top"
              >
                <el-switch
                  v-model="scope.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  data() {
    return {
      tableData: [
        {
          title: 'vue全家桶如何使用?',
          total_comment_num: 531,
          fans_comment_num: 32,
          status: 0
        },
        {
          title: 'vue全家桶如何使用?',
          total_comment_num: 531,
          fans_comment_num: 32,
          status: 1
        },
        {
          title: 'vue全家桶如何使用?',
          total_comment_num: 5321,
          fans_comment_num: 456,
          status: 1
        },
        {
          title: 'vue全家桶如何使用?',
          total_comment_num: 5331,
          fans_comment_num: 322,
          status: 0
        },
        {
          title: 'vue全家桶如何使用?',
          total_comment_num: 531,
          fans_comment_num: 32,
          status: 0
        }
      ],
      currentPage4: 4 // 当前页数
    }
  },
  components: {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less" scoped></style>
