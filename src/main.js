import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import internal components
import ContentHeader from './dashboard/ContentHeader.vue'

// Import internal function
import DateFormat from './Pipeline/DateFormat';

// Import external components
import Select2 from 'vue3-select2-component';

// Import vue-fontawesome differents icon styles
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {dom, library} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {faLock, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faGooglePlus} from '@fortawesome/free-brands-svg-icons';


//import adminlte scripts
import "../node_modules/admin-lte/dist/js/adminlte.min.js"
import "../node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js"
import "../node_modules/admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"

import "../node_modules/admin-lte/plugins/daterangepicker/daterangepicker.js"
import "../node_modules/admin-lte/plugins/jquery-knob/jquery.knob.min.js"
import "../node_modules/admin-lte/plugins/sparklines/sparkline.js"
import "../node_modules/admin-lte/plugins/jquery/jquery.min.js"
import "../node_modules/admin-lte/plugins/jquery-ui/jquery-ui.min.js"
import "../node_modules/admin-lte/plugins/inputmask/jquery.inputmask.min.js"
import "../node_modules/admin-lte/plugins/bootstrap-switch/js/bootstrap-switch.min.js"
import "../node_modules/admin-lte/plugins/bs-stepper/js/bs-stepper.min.js"
import "../node_modules/admin-lte/plugins/dropzone/min/dropzone.min.js"


//import adminlte styles
import '../node_modules/admin-lte/dist/css/adminlte.min.css'
import "../node_modules/admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css"
import "../node_modules/admin-lte/plugins/summernote/summernote-bs4.min.css"
import "../node_modules/admin-lte/plugins/daterangepicker/daterangepicker.css"
import "../node_modules/admin-lte/plugins/jqvmap/jqvmap.min.css"
import "../node_modules/admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css"
import "../node_modules/admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css"
import "../node_modules/admin-lte/plugins/bootstrap4-duallistbox/bootstrap-duallistbox.min.css"
import "../node_modules/admin-lte/plugins/bs-stepper/css/bs-stepper.min.css"
import "../node_modules/admin-lte/plugins/dropzone/min/dropzone.min.css"

// Import jquery
window.$ = window.jQuery = require("jquery");

// Include different icon style
library.add(fas, fab, far, faLock, faEnvelope, faFacebook, faGooglePlus);

// A basic installation of Font Awesome has the ability to automatically transform <i class="fas fa-coffee"></i> into <svg class="...">...</svg> icons. 
dom.watch(); // This will kick of the initial replacement of i to svg tags and configure a MutationObserver

/* Init app */
var app = createApp(App)

/* Set global function */ 
app.config.globalProperties.$filters = {
    DateFormat(value) {
      return DateFormat(value)
    }
}

/* Include global components and mount app into #app */
app.component("font-awesome-icon", FontAwesomeIcon).component('Select2',Select2).use(router).component('ContentHeader',ContentHeader).mount('#app')
