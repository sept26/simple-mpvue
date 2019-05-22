<template>
  <div class="user-container">
    <div class="user-info" :style="'height:'+height+'px'">
      <div class="avatar-box">
        <avatar v-if="author" :user="author" :size="120"></avatar>
      </div>
      <div class="name" v-if="user">
        {{user.loginname}}
      </div>
      <div class="link" v-if="user">
        {{user.githubUsername}}@github.com
      </div>
      <div v-if="user">
        <span>注册时间：{{user.create_at}}</span>  
        <span style="color:#80bd01">积分：{{user.score}}</span>
      </div>
    </div>
    <slider-nav :navList="navList" :currentTab.sync="currentTab"></slider-nav>
    <swiper :current="currentTab" class="swiper-box" duration="300" @change="swiperChange" :style="'height:'+contentHeight">
      <swiper-item v-for="(item,index) in navList" :key="index">
        <scroll-view scroll-y style="height:100%;" @scroll="scrollFn" @scrolltoupper="toUp" v-if="articleList.length">
          <simple-article v-for="(item,i) in articleList" :article="item" :key="i"></simple-article>
        </scroll-view>
        <p v-else style="text-align:center">暂无数据</p>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import fly from '@/utils/fly'
import typeBlock from '@/components/type-block'
import avatar from '@/components/avatar'
import wxParse from 'mpvue-wxparse';
import wxp from 'minapp-api-promise';
import sliderNav from '@/components/slider-nav'
import simpleArticle from '@/components/simple-article'
const navList = [{
  title: '最近回复',
  type: 'reply',
}, {
  title: '最新发布',
  type: 'topic',
}, {
  title: '话题收藏',
  type: 'collect',
}, ]
export default {
  data() {
    return {
      articleList: [],
      height: 220,
      winHeight: null,
      navList: navList,
      article: null,
      user: null,
      author: null,
      currentTab: 0,
      userId: null
    }
  },
  components: {
    typeBlock,
    avatar,
    sliderNav,
    simpleArticle
  },
  methods: {
    toUp() {
      this.height = 220
    },
    scrollFn(e) {
      let top = e.mp.detail.scrollTop
      if (top > 60) {
        this.height = 0
      }
    },
    swiperChange(e) {
      let {current} = e.target
      this.currentTab = current
    },
    // 获取用户信息
    async getUserInfo(id) {
      let res
      try {
        res = await fly.get('user/' + id)
      } catch (err) {
        console.log(err)
      }
      if (res.success) {
        let {
          create_at
        } = res.data
        create_at = this.fromNow(create_at)
        this.user = Object.assign(res.data, {
          create_at,
        })
      }

      this.articleList = this.user.recent_replies
      // this.author = pick(this.user, ['loginname', 'avatar_url'])
      this.author = {'loginname': this.user.loginname, 'avatar_url': this.user.avatar_url}
    },
    // 获取用户收藏主题
    async getUserCollect() {
      wx.showLoading({
        title: '加载中'
      })
      try {
          let res = await fly.get('/topic_collect/' + this.userId)
          if (res.success && res.data && res.data.length) {
            this.articleList = res.data.map(item => {
                item.author = {'loginname': this.user.loginname, 'avatar_url': this.user.avatar_url}
                // return pick(item, ['title', 'id', 'last_reply_at', 'author'])
                return {'title': item.title, 'id':item.id, 'last_reply_at': item.last_reply_at, 'author':item.author}
            })
          }
      } catch (err) {

      }
      wx.hideLoading()
    }
  },
  watch: {
    currentTab(newVal, oldVal) {
      switch (newVal) {
        case 0:
          this.articleList = this.user.recent_replies;
          break;
        case 1:
          this.articleList = this.user.recent_topics;
          break;
        default:
          this.getUserCollect()
      }
    }
  },
  computed: {
    contentHeight() {
      if (this.winHeight) {
        return this.winHeight - 44 - this.height + 'px'
      }
    }
  },
  async onLoad() {
    // 获取系统消息
    let info = await wxp.getSystemInfo();
    this.winHeight = info.windowHeight
    this.userId = this.$root.$mp.query.id;
    wx.showLoading({
      title: '加载中',
    })
    this.height=220
    this.currentTab=0
    this.getUserInfo(this.userId)
    wx.hideLoading()
  }
}
</script>
<style lang="less" scoped>
.user-container {
  height: 100%;
  .user-info {  
    padding: 10px;
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
    height: 220px;
    div:nth-child(-n+3) {
      text-align: center;
      margin-bottom: 10px;
    }
    div:last-child {
      display: flex;
      justify-content: space-between;
    }
    .avatar-box {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
    }
    .name {
      font-size: 24px;
      margin-bottom: 15px;
    }
    .link {
      font-size: 24px;
    }
  }
}
</style>

