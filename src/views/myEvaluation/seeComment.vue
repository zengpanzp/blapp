<style lang="scss" src="./css/seeComment.scss" scoped></style>
<template>
    <div class="main">
        <div class="pinglunCon corner again">
            <div class="chanpin">
                <div class="chanpinPic"><img src=""></div>
                <div class="chanpinWz">
                </div>
            </div>
            <div class="pingjiaXing">
                <div class="xingConA score">
                    <p class="iconfont icon-star icon-fullstar"></p>
                    <p class="iconfont icon-star"></p>
                </div>
                <div class="jieguo"></div>
                <div class="comment-date"></div>
            </div>
            <div class="comment-tag">
            </div>
            <div class="comment-content">
            </div>
            <div class="uploadPic corner-bottom show-pic">
                <dd><a href="#showPicListPage/<%-model.comment.allPicList%>/swipe_<%-i%>">
                    <img src=""></a>
                </dd>
            </div>
            <div class="date-time">
                <span>购买日期:</span>
            </div>
            <a class="goodbtn full"><i></i>(<span></span>)</a>
            <a class="goodbtn"><i></i>(<span></span>)</a>
            <div class="comment-reply corner">
                【客服回复】<br/>
            </div>
            <hr class="comment-line"/>
            <div class="comment-plus">
                <span>【追评】</span>
            </div>
            <div class='comment-reply corner'>
                【客服回复】<br/>
            </div>
        </div>
        <div id="addPic">
            <div class="columnTitle border corner-top">上传图片</div>
            <div class="uploadPic corner-bottom" id="uploadPic">
                <dd id="getPhoto">
                    <li class="shoot-logo-show"></li>
                </dd>
                <p>有图有真相，晒单最多可获20积分!（最多上传<span>5</span>张）</p>
            </div>
        </div>
        <div class="hr1"></div>
        <div id="addContent" class="pinglunCon corner">
            <div class="pingjiaWX corner">
                <textarea id="content" placeholder="请填写1-250字哟！"></textarea>
                <span>250</span>
            </div>
        </div>
        <div class="hr1"></div>
        <footer>
            <div class="fixedMainbtn commentSubmit">
                <button id="submit" type="submit" class="btn-1">发表晒单</button>
            </div>
        </footer>
    </div>
</template>

<script>
export default {

  name: 'seeComment',

  data () {
    return {

    };
  },
  created() {
  	this.$loading.close()
  	console.log("-------seeComment-------" + decodeURIComponent(this.$route.params.product))
  }
};
</script>
<style lang="css" scoped>
</style>
