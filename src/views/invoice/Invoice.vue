<template>
  <div>
    <a-row :gutter="16">
      <a-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
        <div>
          <a-button type="primary" class="add-button" size="large" @click="createPurchaseOrder">
            Create new Invoice
          </a-button>
            <a-input
              placeholder="Search"
              size="large"
              class="search-input"
              v-model:value="search"
            />
          <div class="list-container">
            <div v-for="item in filtrate(invoices)" :key="item.id">
              <a-card
                class="card clickable hoverable"
                @click="select(item)"
                :style="item.id == selectedInvoice.id ? `border-left: 10px solid #3490FF`: ''">
                {{ item.type }} {{ item.id }}
              </a-card>
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
        style="line-height: 30px"
        v-if="selectedInvoice.id"
      >
        <h1 style="font-weight: bold; font-size: 30px;">
          {{ selectedInvoice.type }} {{ selectedInvoice.id }}
        </h1>
        <div align="left">
          <div align="right">
            <a-popover
              trigger="hover"
              placement="bottom"
            >
              <template #content>
                <p class="action-option" @click="onEdit(selectedInvoice)">Edit</p>
                <p class="action-option" v-if="selectedInvoice.isApproved == 0" @click="approve(selectedInvoice.id)">Approve</p>
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
              <a-tag color="orange" v-if="selectedInvoice.isApproved == 0">
                Pending Approval
              </a-tag>
              <a-tag color="green" v-if="selectedInvoice.isApproved == 1">
                Approved
                {{ selectedInvoice.approvedBy ? `by @${selectedInvoice.approvedBy}` : '' }}
              </a-tag>
              <a-tag color="red" v-if="selectedInvoice.isApproved == 2">
                Rejected
              </a-tag>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Date</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ getDate(selectedInvoice.date) || '-' }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Due Date</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ getDate(selectedInvoice.dueDate) || '-' }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>reference</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedInvoice.reference || '-' }}
            </a-col>
          </a-row>
          <a-divider />
          <a-row style="margin-top: 30px">
            <h2>Line Items</h2>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-table :columns="columns" :data-source="selectedInvoice.lineItems" :pagination="false">
                <template #footer>
                  <div align="right">
                    <h3
                      v-for="item in calculateTotalByCategory(selectedInvoice.lineItems)"
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
                          {{ selectedInvoice.subTotal || 0 }}
                        </a-col>
                      </a-row>
                    </h3>
                    <h3>
                      <a-row :gutter="16">
                        <a-col :span="20">
                          Total
                        </a-col>
                        <a-col :span="4">
                          {{ selectedInvoice.total || 0 }}
                        </a-col>
                      </a-row>
                    </h3>
                  </div>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
    <InvoiceForm
      :showForm="showForm"
      :invoice="selectedInvoice"
      @close="showForm = false"
      @success="findAllInvoice"
      :contacts="contacts"
      :products="products"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs';
import InvoiceForm from './InvoiceForm.vue';
import InvoiceRepository from '@/repository/InvoiceRepository';
import ProductRepository from '@/repository/ProductRepository';
import XeroRepository from '@/repository/XeroRepository';

interface Invoice {
  id: number;
  type: string;
  contactId: string;
  date: Dayjs;
  dueDate: Dayjs;
  reference: string;
  status: string;
  createdBy: string;
  tenantId: string;
  xeroInvoiceId: string | null;
  approvedBy: string | null;
  approvedDate: Date | null;
  isApproved: number;
  lineItems: LineItem[];
  subTotal: number;
  total: number;
}

interface LineItem {
  description: string;
  quantity: number;
  unitAmount: number;
  discountRate: number;
  category: null,
}

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
    title: 'Total',
    dataIndex: 'lineAmount',
    key: 'LineAmount',
    align: 'center',
  },
];

export default defineComponent({
    name: 'purchase-order',
    components: {
      InvoiceForm,
      // EllipsisOutlined,
    },
    data() {
      const emptyInvoice: Invoice = {
        id: 0,
        type: "",
        contactId: "",
        date: dayjs(new Date()),
        dueDate: dayjs(new Date()),
        reference: "",
        status: "",
        createdBy: "",
        tenantId: "",
        xeroInvoiceId: null,
        approvedBy: null,
        approvedDate: null,
        isApproved: 0,
        lineItems: 
          [{
            description: '',
            quantity: 1,
            unitAmount: 0,
            discountRate: 0,
            category: null,
          }],
        subTotal: 0,
        total: 0,
      };
      return {
        columns,
        emptyInvoice,
        invoices: ref<Invoice[]>([]),
        selectedInvoice: ref<Invoice>(emptyInvoice),
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
      filtrate(invoices) {
        if (this.search.length <= 0) return invoices;
        return invoices
          .filter((e) => (e.type || '').toLowerCase().includes(this.search.toLowerCase()))
      },
      async findAllInvoice() {
        const { data } = await InvoiceRepository.findAllInvoice();
        this.invoices = data;
        if (data.length > 0) {
          this.selectedInvoice = data[0];
        }
      },
      async findAllContact() {
        const { data } = await XeroRepository.getAllContact();
        this.contacts = data.Contacts;
      },
      createPurchaseOrder() {
        if (this.connections.length <= 0)
          return this.$message.error('Please Connect your xero organization before able to create invoice by go to Application page');
        this.selectedInvoice = this.emptyInvoice;
        this.showForm = true;
      },
      onEdit(record) {
        this.selectedInvoice = record;
        this.selectedInvoice.date = dayjs(record.date || new Date());
        this.selectedInvoice.dueDate = dayjs(record.dueDate || new Date());
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
        this.selectedInvoice = item;
      },
      async approve(id: number) {
        await InvoiceRepository.approveInvoice(id)
          .then(() => {
            this.$message.success("Approve invoice");
            this.findAllInvoice();
          })
          .catch((err) => {
            window.console.log(err);
            this.$message.error('Oopss, failed to approve invoice');
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
          const total = parseFloat(lineItem.lineAmount);

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
      await this.findAllInvoice();
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
  height: 70vh;
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
