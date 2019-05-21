<template>
  <div class="main-container">
    <slider-nav :menuWidth="60" :currentTab.sync="currentTab" :navList="this.navList"></slider-nav>
    <swiper :current="currentTab" :style="'height:'+contentHeight" class="swiper-box" duration="300" @change="swiperChange">
      <swiper-item v-for="(item,index) in navList" :key="index">
        <content-v v-if="index==currentTab" :currentTab="item"></content-v>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import fly from "@/utils/fly"
import wxp from 'minapp-api-promise'
import content from '@/components/content'
import sliderNav from '@/components/slider-nav'
import {navList} from '@/common/js/basic'
export default {
  data () {
    return {
      // tab切换
      currentTab: 0,
      navList: navList,
      winWidth: 0,
      winHeight: 0
    }
  },

  components: {
    sliderNav,
    contentV: content
  },
  computed: {
    contentHeight() {
        return this.winHeight - 50 + 'px'
    }
  },
  methods: {
    swiperChange(e) {
      let {current} = e.target
      this.currentTab = current
    }
  },
  async onLoad() {
    let info = await wxp.getSystemInfo()
    this.winWidth = info.windowWidth
    this.winHeight = info.windowHeight
  }
}
</script>

<style lang="less" scoped>
.main-container {

}
</style>
