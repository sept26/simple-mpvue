<template>
  <main class="content">
    <scroll-view scroll-y style="height:100%" @scrolltolower="toLow" @scrolltoupper="test">
      <a :href="'/pages/article/main?id='+item.id" class="feed-li"  v-for="(item,index) in list" :key="index">
        <div class="feed-title">
          <!-- <type-block></type-block> -->
          <p>swipe内容</p>
          <p>{{item.title}}</p>
        </div>
      </a>
    </scroll-view>
  </main>
</template>
<script>
import fly from '@/utils/fly'
// import typeBlock from '@/components/type-block'
// import avatar from '@/components/avatar'
export default {
  data() {
    return {
      articleList: [],
      page: 1
    }
  },
  props: ['currentTab'],
  methods: {
    async getList(page = 1) {
      wx.showLoading({
        title: '加载中'
      })
      let res = await fly.get('topics', {
        tab: this.currentTab.type,
        page,
        limit: 20,
      })

      if (res.success) {
        this.articleList = this.articleList.concat(res.data);
      }

      wx.hideLoading()
    },
    goArticle(item) {
      wx.navigateTo({
        url: '/pages/article/main?id=' + item.id
      })
    },
    toLow(e) {
      // 这里就是滚动到底部了
      this.page++;
      this.getList(this.page)
    }
  },
  computed: {
    list() {
      return this.articleList.map(item => {
        delete item.content
        return Object.assign(item, {createTime:item.createTime, lastReplyTime:item.lastReplyTime
            // createTime: this.formatTime(item.create_at),
            // lastReplyTime: this.fromNow(item.last_reply_at),
        })
      })
    }
  },
  async created() {
    this.getList()
  }
}
</script>

