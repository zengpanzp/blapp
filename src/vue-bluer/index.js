/*!
 * vue-bluer
 * (c) 2017 chen peng
 * Released under the MIT License.
 */
// import Bar from './bar'
import Button from './button'
// import Switch from './switch'
// import Actionsheet from './actionsheet'
import Navbar from './navbar'
import TabItem from './tab-item'
import TabContainer from './tab-container'
import TabContainerItem from './tab-container-item'
import Scroll from './scroll'
import Popup from './popup'
// import Picker from './picker/picker'
// import DatetimePicker from './datetime-picker'
import Toast from './toast'
import Modal from './modal/modal'
import ModalJs from './modal'
import Slide from './slide'
import Swipeout from './swipeout/swipeout'
import SwipeoutItem from './swipeout/swipeout-item'
import SwipeoutButton from './swipeout/swipeout-button'

import scrollRecord from './route-data/scroll-record'
import tabContainer from './tab-container/index'
import tabContainerItem from './tab-container-item/index'
// import sortListView from './sortListView/sortList'
const install = function(Vue) {
  if (install.installed) return;
  // Vue.component('bl' + Bar.name, Bar);
  Vue.component('bl' + Button.name, Button);
  // Vue.component('bl' + Switch.name, Switch);
  // Vue.component('bl' + Actionsheet.name, Actionsheet);
  Vue.component('bl' + Navbar.name, Navbar);
  Vue.component('bl' + TabItem.name, TabItem);
  Vue.component('bl' + TabContainer.name, TabContainer);
  Vue.component('bl' + TabContainerItem.name, TabContainerItem);
  Vue.component('bl' + Scroll.name, Scroll);
  Vue.component('bl' + Popup.name, Popup);
  // Vue.component('bl' + Picker.name, Picker);
  // Vue.component('bl' + DatetimePicker.name, DatetimePicker);
  Vue.component('bl' + Modal.name, Modal);
  Vue.component('bl' + Slide.name, Slide);
  Vue.component('bl' + Swipeout.name, Swipeout);
  Vue.component('bl' + SwipeoutItem.name, SwipeoutItem);
  Vue.component('bl' + SwipeoutButton.name, SwipeoutButton);
  Vue.component('bl' + tabContainer.name, tabContainer);
  Vue.component('bl' + tabContainerItem.name, tabContainerItem);
  // Vue.component('bl' + sortListView.name, sortListView);
  Vue.$toast = Vue.prototype.$toast = Toast;
  Vue.$modal = Vue.prototype.$modal = ModalJs;

  Vue.directive('scroll-record', scrollRecord)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

// export {
//   Bar,
//   Loading,
//   Button,
//   Switch,
//   Actionsheet,
//   Navbar,
//   TabItem,
//   TabContainer,
//   TabContainerItem,
//   Scroll,
//   Popup,
//   Picker,
//   DatetimePicker,
//   Toast,
//   Modal,
//   Slide,
//   SlideItem
// }

export default install
