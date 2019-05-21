<template>
  <div class="type-block-container">
    <div class="topping" v-if="item.top">
      置顶
    </div>
    <div class="essence" v-else-if="item.good">
      精华
    </div>
    <div class="other-top" v-else>
      {{type}}
    </div>
  </div>
</template>
<script>
export default {
  props: ['item'],
  computed: {
    type() {
      return this.getTopicType(this.item.tab)
    }
  },
}
</script>
<style lang="less" scoped>
.type-block-container {
  div {
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    padding: 0 5px;
    border-radius: 4px;
    &.topping {
      background-color: #80bd01;
      color: #fff;
    }
    &.essence {
      background-color: #80bd01;
      color: #fff;
    }
    &.other-top {
      background-color: #e3e3e3;
      color: #333;
    } 
  }
}
</style>

