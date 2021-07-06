<template>
  <div class="Layout">
    <el-container class="layout-container">
      <el-aside>
        <AsideMenu />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 侧边菜单
import AsideMenu from './AsideMenu.vue'
import Header from './Header.vue'

export default {
  name: 'Layout',
  data() {
    return {}
  },
  components: { AsideMenu, Header },
  methods: {}
}
</script>

<style lang="less" scoped>
// 设置布局容器的 大小
.layout-container {
  width: 100vw;
  height: 100vh;
}
.el-aside {
  width: 240px !important;
  background-color: rgb(59, 194, 218);
}
.el-header {
  height: 72px !important;
  background-color: rgb(179, 50, 50);
}
.el-main {
  background-color: rgb(143, 91, 91);
}
</style>
