<style lang="scss" src="./css/_category.scss" scoped></style>
<!--缴费分类-->
<template>
  <div class="category-content" >
    <ul>
      <li @click="selectGroup(item,$index)" v-for="(item, $index) in groupList ">
        <div>
          <span class="select"  :class="{'sel':item.active}"></span>
          <label>{{item.groupName}}</label>
          <img v-show="!item.active" @click.stop="deleteItem(item)" class="del" src="./i/category/delete.png">
          <img v-show="!item.active" @click.stop="edit(item)" class="edit" src="./i/category/edit.png">
        </div>
      </li>
    </ul>
    <span class="addNew">
      <img class="select" src="./i/iphone/circle.jpg">
      <label>新建</label>
      <input v-model="newGroupName" placeholder="自定义缴费分类名称">
    </span>
    <bl-modal @click="isShow" v-show="visible" :visible="visible" ref="updateCategory"  title="编辑缴费分类" :inputValue="groupName" :placeholder="请输入分类名称" input="true" :buttons="buttons"></bl-modal>
    <bl-button @click="addNewGroup" ref="next" type="blueBtn next selected bl-button">确 定</bl-button>
  </div>
</template>
<script>
  import api from 'src/api/index'
  import utils from 'src/utils'
  export default {

    name: '_category',
    props: {
      "groupItem": Object,
      "_groupList": Array
    },
    data() {
      return {
        visible: false, // 是否弹出编辑
        groupName: "",
        type: 1,  // 1为水  2为电  3为煤
        groupList: [],
        buttons: [{
            text: "确定"
        }, {
          text: "取消"
        }],
        newGroupName: '' // 新的分类名称
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
        this.$loading.close();
    },
    mounted() {
    },
    methods: {
        // 编辑缴费分类
        edit(item) {
          this.item = item;  // 要修改的item
          this.visible = true;
          this.groupName = item.groupName;
          // 获得子组件实例
          if (this.$refs.updateCategory) {
            // 控制子组件 让modal显示
            // this.$refs.updateCategory.visible = true;
          }
        },
        // 接收弹出层的事件消息
        isShow(receive) {
            if (receive instanceof Array) {
              this.visible = receive[1];
              // 名称已修改
              if (receive[0] != this.item.groupName) {
                // 修改分类名称
                utils.isLogin().then(user => {
                    let timestamp = utils.getTimeFormatToday();
                    let memberToken = utils.ssdbGet('member_token');
                    api.recharge.updateMyGroup({
                        "member_token": memberToken,
                        "groupName": this.item.groupName,
                         "id": this.item.id,
                        "timestamp": timestamp
                    }).then(data => {
                        // 修改的名称
                        this.item.groupName = receive[0];
                        // 修改成功
                        if (data.body.resCode == "00100000") {
                            this.$set(this.item, 'groupName', this.item.groupName);
                        } else {
                            this.$toast({
                              position: 'bottom',
                              message: data.body.msg
                            });
                        }
                    }).then(err => {
                        console.log(err)
                    });
                })
              }
            } else {
              this.visible = receive;
            }
        },
        // 添加新的分类
        addNewGroup() {
            if (this.newGroupName == "") {
                this.$toast({
                  position: 'bottom',
                  message: "分组名称不能为空"
                });
                return false;
            }
            // 添加分类名称
            utils.isLogin().then(user => {
              let timestamp = utils.getTimeFormatToday();
              let memberToken = utils.ssdbGet('member_token');
              api.recharge.createMyGroup({
                "member_token": memberToken,
                "groupName": this.newGroupName,
                "timestamp": timestamp
              }).then(data => {
                let obj = JSON.parse(data.body.obj);
                // 添加成功
                if (data.body.resCode == "00100000") {
                    this.groupList.push({
                      id: obj.id,
                      groupName: obj.groupName
                    });
                    this.newGroupName = "";
                } else {
                  this.$toast({
                    position: 'bottom',
                    message: data.body.msg
                  });
                }
            }).then(err => {
                console.log(err)
            });
          })
        },
        // 删除分类
        deleteItem(item) {
          // 添加分类名称
          utils.isLogin().then(user => {
              let timestamp = utils.getTimeFormatToday();
              let memberToken = utils.ssdbGet('member_token');
              api.recharge.deleteMyGroup({
                "member_token": memberToken,
                "id": item.id,
                "timestamp": timestamp
              }).then(data => {
                console.log(data)
//                let obj = JSON.parse(data.body.obj);
                // 删除成功
                if (data.body.resCode == "00100000") {
                    let index = this.groupList.indexOf(item);
                    this.groupList.splice(index, 1)
                } else {
                  this.$toast({
                    position: 'bottom',
                    message: data.body.msg
                  });
                }
            }).then(err => {
                console.log(err)
            });
          })
        },
        selectGroup(item, $index) {
            debugger
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
    }
  };
</script>
