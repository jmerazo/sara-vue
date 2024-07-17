import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "../src/assets/styles.css";
import "../src/assets/normalize.css";
import Toaster from "@meforma/vue-toaster";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

const app = createApp(App);
//const secret_key_recaptcha = "6LepWkAoAAAAAFqnxSEbfmFvuRyF4_ut9E-ZeTM3";

import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

import {} from "@fortawesome/free-brands-svg-icons";


library.add(fas, fab, faCopy, faCircleUser);


app.use(createPinia());
app.use(router);
app.use(Toaster, {
  position: "top-right",
  duration: 5000,
});
app.component("font-awesome-icon", FontAwesomeIcon);


app.mount("#app");
