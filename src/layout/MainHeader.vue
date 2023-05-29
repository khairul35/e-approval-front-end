<template>
    <a-layout-header style="background: #fff; padding-left: 20px" align="left">
      <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="collapsing"
      />
      <menu-fold-outlined v-else class="trigger" @click="collapsing" />
      <a-select v-model:value="tenant" style="padding-left: 20px">
        <a-select
          v-for="item in connections"
          :key="item.id"
          :value="item.tenantId"
        >
          {{ item.tenantName }} 
        </a-select>
      </a-select>
    </a-layout-header>
    <a-modal
      centered
      title="Integrate With Xero"
      v-model:visible="showDialogRouteToApplication"
      :footer="null"
    >
      <div align="center">
        <h2>Hey, let's integrate with your organization from Xero!</h2>
        <a-button type="primary" size="large" @click="routeToApplication">
          Let's start
        </a-button>
      </div>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import XeroRepository from '@/repository/XeroRepository';

export default defineComponent({
  data() {
    return {
      collapsed: ref<boolean>(false),
      connections: ref([]),
      tenant: ref(''),
      showDialogRouteToApplication: ref(false),
    };
  },
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  emits: [
    'collapsing',
  ],
  methods: {
    collapsing() {
      this.collapsed = !this.collapsed;
      this.$emit("collapsing");
    },
    routeToApplication() {
      this.showDialogRouteToApplication = false;
      this.$router.push('/app-integration');
    },
    async findAllConnection() {
      await XeroRepository.getAllConnection()
        .then(({ data }) => {
          this.connections = data;
          if (data.length > 0) {
            this.tenant = data[0].tenantId;
            localStorage.setItem('tenant', data[0].tenantId);
          } else {
            this.showDialogRouteToApplication = true;
          }
        })
        .catch(() => {
          this.connections = [];
          this.showDialogRouteToApplication = true;
        });
    },
  },
  watch: {
    tenant() {
      localStorage.setItem('tenant', this.tenant);
    }
  },
  mounted() {
    if (localStorage.getItem('logged_in') == 'true') {
      this.findAllConnection();
    }
  },

});
</script>