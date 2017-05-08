<style lang="scss" src="./css/_messageCenter.scss" scoped></style>
<template>
	<div class="new">
	    <div class="main">
	        <div class="newsList corner">
	            <ul id="message_center_type_list">
	            	<div id="mc">
        				<div class="list-block" id="hf-app">
				            <li class="item-content" data-item="<%-models[i].type%>" id="<%-models[i].title%>">
			                    <a href="javascript:;" title="">
			                        <div class="item-media red-cil">
			                            
			                            <img src="./i/mci_wuliu.png" alt="">
			                           	                            
			                            <!-- <img src="./i/mci_mdfw.png" alt="">
			                           
			                            <img src="./i/mci_tzmc.png" alt="">
			                           
			                            <img src="./i/mci_p.png" alt="">
			                            
			                            <img src="./i/mci_cx.png" alt="">
			                            
			                            <img src="./i/mci_mzc.png" alt=""> -->	                        
			                        </div>
			                        <div class="item-inner">
			                            <div class="item-middle">
			                                <div class="item-title-row">
			                                    <div class="item-title"></div>
			                                    <span class="item-after newTitle"><span></span></span>
			                          
			                                    <div class="item-subtitle newInfo"></div>
			                                    
			                                    <div class="item-subtitle newInfo"></div>
			                                    
			                                </div>
			                            </div>
			                        </div>
			                    </a>
			                </li>
		                </div>
	                </div>
	            </ul>
	        </div>
	    </div>
	</div>
</template>

<script>
import api from 'src/api/index'
export default {

  name: 'messageCenter',

  data () {
    return {

    };
  },
  created() {
  	this.$loading.close();
  	api.loadMsgType({
  		"types": ['sys_data_msg_busniess_type']
  	}).then(data => {
  		console.log(data)
  		// let obj = JSON.stringify(data);
  		console.log("-----gjLoadMsgType-----" + data);
  	})
  }
};
</script>
