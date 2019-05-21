<template>
  <main class="content">
    <scroll-view scroll-y style="height:100%" @scroll="scrollFn" @scrolltolower="toLow" @scrolltoupper="test">
      <a :href="'/pages/article/main?id='+item.id" class="feed-li"  v-for="(item,index) in list" :key="index">
        <div class="feed-title">
          <type-block :item="item"></type-block>
          <p>{{item.title}}</p>
        </div>
        <div class="feed-content">
          <div class="feed-left">
            <avatar :user="item.author"></avatar>
          </div>
          <div class="feed-right">
            <div class="feed-right-top">
              <div class="avatar-name">
                {{item.author.loginname}}
              </div>
              <div class="count">
                <span>{{item.reply_count}}</span>&nbsp;/&nbsp;{{item.visit_count}}
              </div>
            </div>
            <div class="feed-right-bottom">
              <div class="feed-time">
                {{item.createTime}}
              </div>
              <div class="feed-pass">
                {{item.lastReplyTime}}
              </div>
            </div>
          </div>
        </div>
      </a>
    </scroll-view>
  </main>
</template>
<script>
import fly from '@/utils/fly'
import typeBlock from '@/components/type-block'
import avatar from '@/components/avatar'
export default {
  data() {
    return {
      articleList: [],
      page: 1
    }
  },
  props: ['currentTab'],
  components: {
    typeBlock,
    avatar
  },
  methods: {
    test(){
      console.log('test')
    },
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
    },
    scrollFn(e) {
    // console.log(e)
    },
  },
  computed: {
    list() {
      return this.articleList.map(item => {
        delete item.content
        return Object.assign(item, {
          createTime: this.formatTime(item.create_at),
          lastReplyTime: this.fromNow(item.last_reply_at)
        })
      })
    }
  },
  async created() {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
.content {
  height: 100%;
  .feed-title {
    padding: 10px;
    display: flex;
    p {
      margin-left: 8px;
      font-size: 18px;
      line-height: 24px;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
  }
  .feed-content {
    display: flex;
    font-size: 16px;
    padding: 0 10px;
    box-sizing: border-box;
    .feed-left {
      flex: 1;
      margin-bottom: 5px;
    }
    .feed-right {
      flex: 5;
      display: flex;
      flex-direction: column;
      .feed-right-top {
        display: flex;
        justify-content: space-between;
        .count {
          span {
            color: #80bd01;
          }
        }
      }
      .feed-right-bottom {
        display: flex;
        justify-content: space-between;
        .feed-time {
          color: #666;
        }
      }
    }
  }
}
</style>

