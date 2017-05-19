<style lang="scss" src="./css/_category.scss" scoped></style>
<!--缴费分类-->
<template>
  <div class="category-content" >
    <ul>
<<<<<<< HEAD
      <li @click="selectGroup(item,$index)" v-for="(item, $index) in groupList ">
        <div>
          <span class="select"  :class="{'sel':item.active}"></span>
          <label>{{item.groupName}}</label>
=======
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
>>>>>>> dev
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
<<<<<<< HEAD
    props: {
      "groupItem": Object,
      "_groupList": Array
    },
    data() {
      return {
        type: 1,  // 1为水  2为电  3为煤
        groupList: []
      }
    },
    created() {
        this.$parent.toShow = false;
        // 1为水  2为电  3为煤
        let typeId = this.$route.params.type;
        this.type = typeId;
        this.groupList = this._groupList;
        let that = this;
        this.groupList.forEach(function(item) {
          that.$set(item, "active", false);
          if (item.id == that.groupItem.id) {
            that.$set(item, "active", true);
          }
        });
=======

    data() {
      return {
      }
    },
    created() {
>>>>>>> dev
    },
    mounted() {
    },
    methods: {
<<<<<<< HEAD
        selectGroup(item, $index) {
          let that = this;
          // 让所有的没有选中样式
          this.groupList.forEach(function(item) {
            that.$set(item, 'active', false);
          });
          // 设置当前样式
          this.$set(item, 'active', true);
          this.$emit("click", item);
          // 设置当前样式
          this.$set(item, 'active', true);
          this.$parent.toShow = true;
          this.$router.push({path: "/recharge/rates/" + this.type});
        }
=======
>>>>>>> dev
    }
  };
</script>

