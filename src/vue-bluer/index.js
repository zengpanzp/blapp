/*!
 * vue-bluer
 * (c) 2017 chen peng
 * Released under the MIT License.
 */
// import Bar from './bar'
// import Button from './button'
// import Switch from './switch'
// import Actionsheet from './actionsheet'
// import TabContainer from './tab-container'
// import TabContainerItem from './tab-container-item'
// import Popup from './popup'
// import Picker from './picker/picker'
// import DatetimePicker from './datetime-picker'
// import Slide from './slide'
// import Swipeout from './swipeout/swipeout'
// import SwipeoutItem from './swipeout/swipeout-item'
// import SwipeoutButton from './swipeout/swipeout-button'
import tabContainer from './tab-container/index'
import tabContainerItem from './tab-container-item'

import Toast from './toast'
import Modal from './modal/modal'
import ModalJs from './modal'
import Navbar from './navbar'
import TabItem from './tab-item'
import Cell from './cell'
import scrollRecord from './route-data/scroll-record'
const install = function(Vue) {
  if (install.installed) return;
  // Vue.component('bl' + Bar.name, Bar);
  // Vue.component('bl' + Switch.name, Switch);
  Vue.component('blButton', resolve => {
    require(['./button'], resolve)
  });
  Vue.component('blActionsheet', resolve => {
    require(['./actionsheet'], resolve)
  });
  Vue.component('blPopup', resolve => {
    require(['./popup'], resolve)
  });
  Vue.component('blSlide', resolve => {
    require(['./slide'], resolve)
  });
  Vue.component('blSwipeout', resolve => {
    require(['./swipeout/swipeout'], resolve)
  });
  Vue.component('blSwipeoutItem', resolve => {
    require(['./swipeout/swipeout-item'], resolve)
  });
  Vue.component('blSwipeoutButton', resolve => {
    require(['./swipeout/swipeout-button'], resolve)
  });
  Vue.component('blUpload', resolve => {
    require(['src/components/iBailianApp/comment/comment-upload'], resolve)
  });
  Vue.component('blComment', resolve => {
    require(['src/components/iBailianApp/comment/comment-textarea'], resolve)
  });
  // slide-bar
  Vue.component('blSlideBar', resolve => {
    require(['src/components/iBailianApp/slideBar/bl-slide-bar'], resolve)
  });

  Vue.component('bl' + tabContainer.name, tabContainer);
  Vue.component('bl' + tabContainerItem.name, tabContainerItem);
  Vue.component('bl' + Cell.name, Cell);
  Vue.component('bl' + Navbar.name, Navbar);
  Vue.component('bl' + TabItem.name, TabItem);
  Vue.component('bl' + Modal.name, Modal);

  Vue.$toast = Vue.prototype.$toast = Toast;
  Vue.$modal = Vue.prototype.$modal = ModalJs;

  Vue.directive('scroll-record', scrollRecord)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default install
