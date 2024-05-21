import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import App from "@/app";
import router from "@/app/router";
import "element-plus/dist/index.css";
import "@/app/styles/_style.scss";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.mount("#app");
