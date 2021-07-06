<template>
  <div class="Header">
    <div class="title">
      <i
        class="fold-icon"
        :class="isFoldMenu ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="isFoldMenu = !isFoldMenu"
      ></i>
      <span>河北保定直抒教育有限公司</span>
    </div>
    <div class="user vertical-center">
      <el-avatar
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="cover"
        shape="square"
      ></el-avatar>
      <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
          用户昵称
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user">个人资料</el-dropdown-item>
          <el-dropdown-item icon="el-icon-back">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
// 请求
// import { getUserProfile } from '@/network/user'

export default {
  name: 'Header',
  data() {
    return {
      isFoldMenu: false // 折叠菜单
    }
  },
  components: {},
  created() {
    // this.getUserProfile()
  },
  methods: {
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
