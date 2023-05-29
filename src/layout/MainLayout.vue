<template>
  <a-layout>
    <NavMenu :collapsed="collapsed"/>
    <a-layout>
      <MainHeader @collapsing="collapsed = !collapsed" />
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', height: 'calc(100vh - 112px)', overflow: 'auto' }"
      >
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavMenu from './NavMenu.vue';
import MainHeader from './MainHeader.vue'

export default defineComponent({
  components: {
    NavMenu,
    MainHeader,
  },
  setup() {
    return {
      selectedKeys: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
    };
  },
});
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

</style>
