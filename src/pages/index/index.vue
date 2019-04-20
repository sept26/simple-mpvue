<template>
  <div class="main-container">
    <slider-nav :menuWidth="60" :currentTab.sync="currentTab" :navList="this.navList"></slider-nav>
  </div>
</template>

<script>
import sliderNav from '@/components/slider-nav'
import {navList} from '@/common/js/basic'
export default {
  data () {
    return {
      // tab切换
      currentTab: 0,
      navList: navList
    }
  },

  components: {
    sliderNav
  },

  methods: {

  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="less" scoped>
.main-container {

}
</style>
