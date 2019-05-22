<template>
  <div class="article-container" v-if="article">
    <div class="article-header">
      <div class="header-top">
        <type-block :item="article"></type-block>
        <p>{{article.title}}</p>
      </div>

      <div class="header-bottom">
        <ul>
          <li>
            发布于{{article.createTime}}前
          </li>
          <li>
            作者{{article.author.loginname}}
          </li>
          <li>
            {{article.visit_count}}次浏览
          </li>
          <li>
            来自分享
          </li>
        </ul>
      </div>
    </div>
    <div class="article-content">
      <wxParse v-if="article" :content="article.content"></wxParse>
    </div>
    <div class="article-comment">
      <div class="reply-count">{{article.reply_count}}&nbsp;条回复</div>
      <ul class="reply-list">
        <li v-for="(reply,index) in article.replies" :key="index">
          <div class="list-top">
            <avatar :user="reply.author"></avatar>
            <div>
              <span>{{reply.author.loginname}}</span>
              <span>{{index+1}}楼</span>&nbsp;
              <span> {{reply.createTime}}</span>
            </div>
          </div>
          <div class="list-bottom">
            <wxParse :content="reply.content"></wxParse>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import typeBlock from '@/components/type-block'
import avatar from '@/components/avatar'
import wxParse from 'mpvue-wxparse';
import fly from '@/utils/fly'
export default {
  data() {
    return {
      article: null
    }
  },
  components: {
    typeBlock,
    avatar,
    wxParse,
  },
  methods: {

  },
  async onLoad() {
    const {id} = this.$root.$mp.query
    wx.showLoading({title: '加载中'})
    let res = await fly.get(`topic/${id}`)
    if (res.success) {
      this.article = res.data
      this.article = Object.assign(this.article, {
        createTime: this.fromNow(res.data.create_at)
      })
      if (this.article.replies && this.article.replies.length) {
        this.article.replies = this.article.replies.map(reply => {
          reply.createTime = this.fromNow(reply.create_at)
          return reply
        })
      }
      wx.hideLoading()
    }
  }
}
</script>
<style lang="less" scoped>
.article-container {
  .article-header {
    border-bottom: 1px solid #E5E5E5;
    .header-top {
      display: flex;
      padding: 10px;
      p {
        margin-left: 10px;
        font-size: 20px;
        line-height: 24px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
        font-weight: bold;
      }
    }
    .header-bottom {
      padding-left: 10px;
      ul {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding: 10px 0px;
        
        li {
          color:#838383;
          font-size: 14px;
          margin-right: 5px;
        }
      }
    }
  }
  .article-content {
    padding: 10px;
  }
  .article-comment {
    .reply-count {
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 3px 3px 0 0;
    }
    ul.reply-list {
      li {
        padding: 10px 5px 20px;
        border-bottom: 1px solid #E5E5E5;
        .list-top {
          display: flex;
          padding-bottom: 10px;
          div {
            display: flex;
            span:first-child {
              color: #666;
              text-decoration: none;
              margin-left: 5px;
              margin-right: 5px;
            }
            span:nth-child(n+1) {
              color: #08c;
              text-decoration: none;
            }
          }
        }
      }
    }
  }
}
</style>
