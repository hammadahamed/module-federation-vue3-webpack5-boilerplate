<script setup lang="ts">
import { onMounted , createApp, defineAsyncComponent, ref } from "vue";
import Content from "gfFormApp/Content";
// const Content = defineAsyncComponent(() => import("gfFormApp/Content"));
console.log("🚀 ~ Content1:", Content)

let remoteApp: any = null;
const message = ref(1)

function mountRemoteApp() {
    console.log("🚀 ~ remoteApp:", remoteApp);
    console.log("🚀 ~ Content2:", Content)

    if (remoteApp?.unmount) {
        try {
            remoteApp.unmount();
        } catch (error) {
            console.log("🚀 ~ mountRemoteApp ~ error:", error);
        }
    }
    remoteApp = createApp(Content, {
        fromParentApp: true,
        message
    });
    console.log("🚀 ~ mountRemoteApp ~ remoteApp:", remoteApp)


    remoteApp.mount("#remote-app-mf");
}

onMounted(() => {
    mountRemoteApp();
});
</script>

<template>
  <div>
    <p>hey {{ message }}</p>
    <div @click="message = message + 1">cahnge</div>
    <div id="remote-app-mf"></div>
    <Content />
  </div>
</template>
