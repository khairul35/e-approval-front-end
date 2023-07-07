<template>
  <div>
    <p>
      <img src="@/assets/xero-logo.png" class="logo" @click="integrateXero"/>
    </p>
    <h2>Integrate with Xero</h2>
    <p align="right">
      <a-button type="primary" @click="integrateXero">Integrate</a-button>
    </p>
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="connections"
      :pagination="false"
      :loading="loading"
    >
    <template #bodyCell="{ column, text }">
      <template v-if="column.key === 'createdDate'">
        {{ getDisplayDate(text) }}
      </template>
      <template v-if="column.key === 'modifiedDate'">
        {{ getDisplayDate(text) }}
      </template>
    </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import moment from 'moment';
import { clientId, redirectUris, scopes } from '@/constant/XeroConfig';
import XeroRepository from '@/repository/XeroRepository';

function getQueryParametersFromCurrentURL(): { [key: string]: string } {
  const params: { [key: string]: string } = {};

  const queryString = window.location.search.substring(1);
  if (queryString) {
    const keyValuePairs = queryString.split('&');
    for (const pair of keyValuePairs) {
      const [key, value] = pair.split('=');
      params[key] = decodeURIComponent(value);
    }
  }

  return params;
}

const columns = [
  {
    title: 'Tenant Name',
    dataIndex: 'tenantName',
    sorter: true,
  },
  {
    title: 'Tenant Type',
    dataIndex: 'tenantType',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdDate',
    sorter: true,
    key: 'createdDate',
  },
  {
    title: 'Modified Date',
    dataIndex: 'modifiedDate',
    sorter: true,
    key: 'modifiedDate',
  },
];

export default defineComponent({
    name: 'app-integration',
    data() {
      return {
        columns,
        register: ref(false),
        code: ref(''),
        scope: ref(''),
        sessionState: ref(''),
        state: ref(''),
        connections: ref([]),
        loading: ref(true),
      };
    },
    methods: {
      integrateXero() {
        window.open(`https://login.xero.com/identity/connect/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUris}&scope=${scopes}&state=123`)
      },
      getDisplayDate(datetime) {
        if (!datetime) return '-';
        return moment(datetime).utc().format('DD MMM YYYY');
      },
      async findAllConnection() {
        this.loading = true;
        await XeroRepository.getAllConnection()
          .then(({ data }) => {
            this.connections = data;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
            this.connections = [];
          });
      },
    },
    async mounted() {
      this.findAllConnection();
    },
})
</script>

.<style scoped>
.logo {
  height: 100px;
  width: auto;
  cursor: pointer;
  border: 4px solid rgb(71,191,231);
  border-radius: 100px;
  background-color: rgb(71,191,231);
}

.logo:hover {
  border: 4px solid rgb(0, 102, 255);
}
</style>
