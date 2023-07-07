<template>
  <div>
    <a-row :gutter="16">
      <a-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
        <div>
          <a-button type="primary" class="add-button" size="large" @click="createPurchaseOrder">
            Create new Purchase Order
          </a-button>
            <a-input
              placeholder="Search"
              size="large"
              class="search-input"
              v-model:value="search"
            />
          <div class="list-container">
            <div v-for="item in filtrate(purchaseOrders)" :key="item.PurchaseOrderNumber">
              <a-card
                class="card clickable hoverable"
                @click="select(item)"
                :style="item.PurchaseOrderID == selectedPO.PurchaseOrderID ? `border-left: 10px solid #3490FF`: ''">
                {{ item.PurchaseOrderNumber }}
              </a-card>
            </div>
            <div
              v-if="purchaseOrders.length <= 0"
              style="padding-top: 30px">
              No Purchase Order
            </div>
          </div>
        </div>
      </a-col>
      <a-col
        :xl="16"
        :lg="16"
        :md="24"
        :sm="24"
        :xs="24"
        v-if="selectedPO.PurchaseOrderID"
        style="line-height: 30px"
      >
        <h1 style="font-weight: bold; font-size: 30px;">
          {{ selectedPO.PurchaseOrderNumber }}
        </h1>
        <a-divider />
        <div align="left">
          <div align="right">
            <a-popover
              trigger="hover"
              placement="bottom"
            >
              <template #content>
                <p class="action-option" @click="onEdit(selectedPO)">Edit</p>
                <p class="action-option" v-if="selectedPO.IsApproved == 0" @click="approve(selectedPO.PurchaseOrderID)">Approve</p>
                <p class="action-option" v-if="selectedPO.IsApproved == 0">Reject</p>
              </template>
              <a-button>Action</a-button>
            </a-popover>
          </div>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Approved</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              :
              <a-tag color="orange" v-if="selectedPO.IsApproved == 0">
                Pending Approval
              </a-tag>
              <a-tag color="green" v-if="selectedPO.IsApproved == 1">
                Approved
                {{ selectedPO.ApprovedBy ? `by ${selectedPO.ApprovedBy}` : '' }}
              </a-tag>
              <a-tag color="red" v-if="selectedPO.IsApproved == 2">
                Rejected
              </a-tag>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Created Date</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ getDate(selectedPO.CreatedDate) || '-' }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
             <b>Delivery Date</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ getDate(selectedPO.DeliveryDate) || '-' }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Delivery Address</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedPO.DeliveryAddress || '-' }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Attention To</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedPO.AttentionTo || '-' }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Telephone</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedPO.Telephone || '-' }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Delivery Instructions</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedPO.DeliveryInstructions || '-' }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Currency</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedPO.CurrencyCode }}
            </a-col>
          </a-row>
          <a-divider />
          <a-row style="margin-top: 30px">
            <h2>Line Items</h2>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-table :columns="columns" :data-source="selectedPO.lineItems" :pagination="false">
                <template #footer>
                  <div align="right">
                    <h3
                      v-for="item in calculateTotalByCategory(selectedPO.lineItems)"
                      :key="item.category"
                    >
                      <a-row :gutter="16">
                        <a-col :span="20">
                          Total {{ item?.category || 'Unknown Category' }}
                        </a-col>
                        <a-col :span="4">
                          {{ item.value }}
                        </a-col>
                      </a-row>
                    </h3>
                    <a-divider />
                    <h3>
                      <a-row :gutter="16">
                        <a-col :span="20">
                          Subtotal
                        </a-col>
                        <a-col :span="4">
                          {{ selectedPO.SubTotal || 0 }}
                        </a-col>
                      </a-row>
                    </h3>
                    <h3>
                      <a-row :gutter="16">
                        <a-col :span="20">
                          Total
                        </a-col>
                        <a-col :span="4">
                          {{ selectedPO.Total || 0 }}
                        </a-col>
                      </a-row>
                    </h3>
                  </div>
                </template>
              </a-table>
            </a-col>
          </a-row>
          <a-divider />
          <a-row style="margin-top: 30px">
            <h2>Contact Detail</h2>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Name</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ getContactName(getContacts(selectedPO.ContactID)) }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Phone Number</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              <a-row :gutter="16">
                <a-col :span="1">
                  :
                </a-col>
                <a-col :span="23">
                  <div v-for="item in getContacts(selectedPO.ContactID).Phones" :key="item" class="sub-item-box">
                    <a-row :gutter="16">
                      <a-col :span="8"><b>Phone Type</b></a-col>
                      <a-col :span="16">: {{ item.PhoneType }}</a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="8"><b>Phone Number</b></a-col>
                      <a-col :span="16">: {{ item.PhoneCountryCode }}{{ item.PhoneNumber }}</a-col>
                    </a-row>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row :gutter="16" style="margin-top: 20px">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Addresses</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              <a-row :gutter="16">
                <a-col :span="1">
                  :
                </a-col>
                <a-col :span="23">
                  <div v-for="item in (getContacts(selectedPO.ContactID).Addresses)" :key="item" class="sub-item-box">
                    <a-row :gutter="16">
                      <a-col :span="8"><b>Address Type</b></a-col>
                      <a-col :span="16">: {{ item.AddressType }}</a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="8"><b>City</b></a-col>
                      <a-col :span="16">: {{ item.City }}</a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="8"><b>Region</b></a-col>
                      <a-col :span="16">: {{ item.Region }}</a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="8"><b>Postal Code</b></a-col>
                      <a-col :span="16">: {{ item.PostalCode }}</a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="8"><b>Country</b></a-col>
                      <a-col :span="16">: {{ item.Country }}</a-col>
                    </a-row>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
    <PurchaseOrderForm
      :showForm="showForm"
      :po="selectedPO"
      @close="showForm = false"
      @success="findPurchaseOrder"
      :contacts="contacts"
      :products="products"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import dayjs from 'dayjs';
import PurchaseOrderForm from './PurchaseOrderForm.vue';
import PurchaseOrderRepository from '@/repository/PurchaseOrderRepository';
import ProductRepository from '@/repository/ProductRepository';
import XeroRepository from '@/repository/XeroRepository';
// import {
//   EllipsisOutlined,
// } from "@ant-design/icons-vue";

const columns = [
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'Description',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'Quantity',
    align: 'center',
  },
  {
    title: 'Unit Amount',
    dataIndex: 'unitAmount',
    key: 'UnitAmount',
    align: 'center',
  },
  {
    title: 'Discount Rate',
    dataIndex: 'discountRate',
    key: 'DiscountRate',
    align: 'center',
  },
  {
    title: 'Tax Amount',
    dataIndex: 'taxAmount',
    key: 'TaxAmount',
    align: 'center',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'LineAmount',
    align: 'center',
  },
];

export default defineComponent({
    name: 'purchase-order',
    components: {
      PurchaseOrderForm,
      // EllipsisOutlined,
    },
    data() {
      return {
        columns,
        purchaseOrders: ref([]),
        selectedPO: ref({}),
        showForm: ref(false),
        contacts: ref([]),
        search: ref(''),
        connections: ref([]),
        products: ref([]),
      };
    },
    methods: {
      getContacts(contactID: string) {
        if (!contactID) return {};
        return this.contacts.find(e => e.ContactID == contactID);
      },
      filtrate(POs) {
        if (this.search.length <= 0) return POs;
        return POs
          .filter((e) => (e.PurchaseOrderNumber || '').toLowerCase().includes(this.search.toLowerCase()))
      },
      async findPurchaseOrder() {
        const { data } = await PurchaseOrderRepository.findAllPurchaseOrder();
        this.purchaseOrders = data;
        if (data.length > 0) {
          this.selectedPO = data[0];
        }
      },
      async findAllContact() {
        const { data } = await XeroRepository.getAllContact();
        this.contacts = data.Contacts;
      },
      createPurchaseOrder() {
        if (this.connections.length <= 0)
          return this.$message.error('Please Connect your xero organization before able to create Purchase Order by go to Application page');
        this.selectedPO = {
          ContactID: undefined,
          PurchaseOrderNumber: "",
          lineItems: [
            {
              description: "item",
              quantity: 1,
              unitAmount: 0,
              discountRate: 0,
              tax: 0,
            }
          ],
          CreatedDate: dayjs(new Date()),
          DeliveryDate: dayjs(new Date()),
          DeliveryInstructions: "",
          DeliveryAddress: "",
          Currency: undefined,
          AttentionTo: "",
          Telephone: "",
        };
        this.showForm = true;
      },
      onEdit(record) {
        this.selectedPO = record;
        this.selectedPO.CreatedDate = dayjs(record.CreatedDate || new Date());
        this.selectedPO.DeliveryDate = dayjs(record.DeliveryDate || new Date());
        this.showForm = true;
      },
      getDate(datetime) {
        if (!datetime) return null;
        return dayjs(datetime).format("DD MMM YYYY");
      },
      getContactName(contact) {
        if (!contact) return '-';
        return contact.Name;
      },
      getContactPhones(contact) {
        if (!contact) return '-';
        return contact.Phones;
      },
      getAddresses(contact) {
        if (!contact) return '-';
        return contact.Addresses;
      },
      select(item) {
        this.selectedPO = item;
      },
      async approve(id: number) {
        await PurchaseOrderRepository.approvePurchaseOrder(id)
          .then(() => {
            this.$message.success("Approve Purchase Order");
            this.findPurchaseOrder();
          })
          .catch((err) => {
            window.console.log(err);
            this.$message.error('Oopss, failed to approve Purchase Order');
          });
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
      async findAllProduct() {
        const { data } = await ProductRepository.findAllProducts();
        this.products = data;
      },
      calculateTotalByCategory(lineItems): { category: string; value: string }[] {
        const categoryTotals: Record<string, number> = {};

        for (const lineItem of lineItems) {
          const category = lineItem.category;
          const total = parseFloat(lineItem.total);

          if (category in categoryTotals) {
            categoryTotals[category] += total;
          } else {
            categoryTotals[category] = total;
          }
        }

        const result: { category: string; value: string }[] = [];
        for (const category in categoryTotals) {
          result.push({ category, value: categoryTotals[category].toFixed(2) });
        }

        return result;
      },
    },
    async mounted() {
      this.findAllConnection();
      this.findAllProduct();
      await this.findAllContact();
      await this.findPurchaseOrder();
    },
})
</script>

<style scoped>
.add-button {
  width: 100%;
  margin: 20px 0px;
}

.list-container {
  margin: 5px;
  padding: 5px;
  height: 72vh;
  background-color: #1a90ff23;
  overflow: auto;
}

.card {
  background-color: rgb(248, 248, 248);
  margin: 5px 0px;
}

.clickable {
  cursor: pointer;
}

.hoverable:hover {
  background-color: #348fff50;
  color: #fff;
  font-weight: bold;
}

.sub-item-box {
  border: 1px solid #dad9d9;
  border-radius: 5px 0px;
  box-shadow: 0px 3px 6px #00000029;
  margin: 5px;
  padding: 5px;
}

.search-input {
  width: 95%;
  margin: auto;
  background-color: #f9f9f9;
}

.action-option {
  padding: 5px 15px;
}
.action-option:hover {
  background-color: #c6e0ff50;
  cursor: pointer;
}
</style>
