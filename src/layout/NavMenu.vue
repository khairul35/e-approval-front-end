<template>
    <a-layout-sider v-model:collapsed="isCollapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <router-link to="/contact">
            <contacts-outlined />
            <span>Contact</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/product">
            <shopping-outlined />
            <span>Product</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/purchase-order">
          <file-add-outlined />
            <span>Purchase Order</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/user">
          <UserOutlined />
            <span>Users</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link to="/app-integration">
            <cluster-outlined />
            <span>Application</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      class="nav-foot"
    >
      <a-menu-item @click="handleLogout" key="logout">
        <template #icon><logout-outlined /></template>
        <span>Log Out</span>
      </a-menu-item>
    </a-menu>
    </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  FileAddOutlined,
  LogoutOutlined,
  ClusterOutlined,
  ContactsOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
  data() {
    return {
      selectedKeys: ref<string[]>(['1']),
      isCollapsed: ref<boolean>(false),
    };
  },
  props: {
    collapsed: Boolean,
  },
  components: {
    FileAddOutlined,
    LogoutOutlined,
    ClusterOutlined,
    ContactsOutlined,
    ShoppingOutlined,
    UserOutlined,
  },
  methods: {
    handleLogout() {
      localStorage.setItem('logged_in', null);
      this.$router.push('/login');
    },
  },
  watch: {
    collapsed() {
      this.isCollapsed = this.collapsed;
    }
  },
});
</script>


<style scoped>
.logo {
  height: 32px !important;
  margin: 16px !important;
  background: rgba(255, 255, 255, 0.3) !important;
}

.nav-foot {
  position: absolute;
  left: -5px;
  bottom: 0;
}

</style>