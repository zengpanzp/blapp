<style lang="scss" src="./css/_category.scss" scoped></style>
<!--缴费分类-->
<template>
  <div class="category-content" >
    <ul>
      <li>
        <div>
          <img class="select" src="./i/iphone/unselected2.png">
          <label>我家</label>
          <img class="del" src="./i/category/delete.png">
          <img class="edit" src="./i/category/edit.png">
        </div>
      </li>
      <li>
        <div>
          <img class="select" src="./i/iphone/unselected2.png">
          <label>我家</label>
          <img class="del" src="./i/category/delete.png">
          <img class="edit" src="./i/category/edit.png">
        </div>
      </li>
      <li>
        <div>
          <img class="select" src="./i/iphone/unselected2.png">
          <label>我家</label>
          <img class="del" src="./i/category/delete.png">
          <img class="edit" src="./i/category/edit.png">
        </div>
      </li>
    </ul>
    <span class="addNew">
      <img class="select" src="./i/iphone/circle.jpg">
      <label>新建</label>
      <input placeholder="自定义缴费分类名称">
    </span>
    <bl-button type="blueBtn next selected bl-button">确 定</bl-button>
  </div>
</template>
<script>
//  import api from 'src/api/index'
//  import utils from 'src/utils'
  export default {

    name: '_category',

    data() {
      return {
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
  };
</script>

