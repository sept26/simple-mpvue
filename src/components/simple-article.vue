<template>
  <main class="article-container" @tap="goArticle" v-if="article">
    <avatar :user="article.author"></avatar>
    <div class="article-right">
      <div class="article-title">
        {{article.title}}
      </div>
      <div class="article-other-info">
        <span>
          {{article.author.loginname}}
        </span>
        <span>
          一个月以前
        </span>
      </div>
    </div>
  </main>
</template>
<script>
import avatar from '@/components/avatar'
export default {
  props: ['article'],
  data() {
    return {

    }
  },
  components: {
    avatar
  },
  methods: {
    goArticle() {
      wx.navigateTo({
        url: `/pages/article/main?id=${this.article.id}`
      })
    }
  }
}
</script>
<style lang="less" scoped>
.article-container {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  .article-right {
    flex: 5;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .article-title {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .article-other-info {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
