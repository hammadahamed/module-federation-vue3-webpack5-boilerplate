// bootstrap.ts
import { createApp } from "vue";
import App from "./App.vue";

const mount = () => {
  const app = createApp(App);
  app.mount("#gf-form-app");
  return app;
};

let app: ReturnType<typeof createApp> | null = null;

const bootstrap = () => {
  app = mount();
};

// if ((module as any).hot) {
//   (module as any).hot.accept("./App.vue", () => {
//     console.log("HMR Update for App.vue");
//     if (app) {
//       const newApp = mount();
//       app.unmount();
//       app = newApp;
//     }
//   });
// }

bootstrap();
