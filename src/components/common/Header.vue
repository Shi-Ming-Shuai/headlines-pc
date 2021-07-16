<template>
  <div class="Header">
    <div class="title">
      <i
        class="fold-icon"
        :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="editCollapseState"
      ></i>
      <span>河北保定直抒教育有限公司</span>
    </div>
    <div class="user vertical-center">
      <el-avatar
        :src="userInfo.avatar_url"
        fit="cover"
        shape="square"
      ></el-avatar>
      <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
          {{ userInfo.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user">个人资料</el-dropdown-item>
          <el-dropdown-item icon="el-icon-back" @click.native="outLogin"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { removeItem } from '@/utils/storage'
// 请求
// import { getUserProfile } from '@/network/user'

export default {
  name: 'Header',
  data() {
    return {
      isCollapse: false, // 折叠菜单
      userInfo: {
        avatar_url:
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: '撒旦法双方都'
      }
    }
  },
  components: {},
  created() {
    // this.getUserProfile()
  },
  mounted() {
    // 订阅 setting 非父子组件通信
    this.$bus.$on('change-userinfo', data => {
      const { name, photo } = data
      this.userInfo = {
        name,
        avatar_url: photo
      }
    })
  },
  beforeDestroy() {
    // 组件销毁前 取消订阅自定义事件
    this.$off('change-userinfo')
  },
  methods: {
    // 点击折叠图标  修改折叠状态 发布自定义事件(AsideMenu 组件订阅自定义事件)
    editCollapseState() {
      // 修改折叠状态
      this.isCollapse = !this.isCollapse
      // 发布自定义事件
      this.$bus.$emit('collapse-menu', this.isCollapse)
    },
    // 用户退出登录  弹出 确认消息
    outLogin() {
      this.$confirm('确定退出登录吗', '退出登录提示', {
        type: 'warning'
      })
        .then(() => {
          // 删除本地存储 token
          removeItem('token')
          // 跳转到登录页
          this.$router.push('/login')
        })
        .catch(() => {})
    }
    // 获取用户个人资料
    // async getUserProfile() {
    //   const { data } = await getUserProfile()
    //   console.log(data)
    // }
  }
}
</script>

<style lang="less" scoped>
.Header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .fold-icon {
    margin-right: 5px;
    position: relative;
    top: 3px;
    font-size: 24px;
  }
  .user {
    // display: flex;
    // align-items: center;
    .dropdown {
      margin-left: 10px;
      color: #fff;
    }
  }
}
</style>
