<template>
  <div>
    <a-drawer
      v-model:visible="visible"
      :maskClosable="false"
      :closable="false"
      :destroyOnClose="true"
      :title="'New Invoice'"
      :width="1000">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form
            name="basic"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 24 }"
            :model="formState"
          >
            <a-row :gutter="16">
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="Type">
                  <a-select
                    v-model:value="formState.type"
                    placeholder="Type"
                  >
                    <a-select-option value="ACCPAY">ACCPAY</a-select-option>
                    <a-select-option value="ACCREC">ACCREC</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="Contact">
                  <a-select
                    v-model:value="formState.contactId"
                    style="width: 100%"
                    placeholder="Select Contact"
                  >
                    <a-select-option v-for="item in contacts" :key="item.ContactID" :value="item.ContactID">
                      {{ item.Name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="Date">
                  <a-date-picker
                    v-model:value="formState.date"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="Due Date">
                  <a-date-picker
                    v-model:value="formState.dueDate"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                <a-form-item label="Reference">
                  <a-textarea
                    v-model:value="formState.reference"
                    placeholder="Reference"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-divider />
            <h3>Line Items</h3>
            <div v-for="(item, index) in formState.lineItems" :key="index">
              <a-row :gutter="16">
                <a-col :span="7">
                  <a-form-item label="Description">
                    <a-select v-model:value="formState.lineItems[index].description" placeholder="Enter Description" >
                      <a-select-option
                        v-for="product in products"
                        :key="product.id"
                        :value="product.description"
                        @click="productChange(index, product)">
                        ({{ product.category }}): {{ product.description }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="3">
                  <a-form-item label="Quantity">
                    <a-input-number v-model:value="formState.lineItems[index].quantity" placeholder="Enter Quantity" />
                  </a-form-item>
                </a-col>
                <a-col :span="3">
                  <a-form-item label="Price per unit">
                    <a-input-number v-model:value="formState.lineItems[index].unitAmount" placeholder="Enter Price per Unit" />
                  </a-form-item>
                </a-col>
                <a-col :span="3">
                  <a-form-item label="Discount">
                    <a-input-number v-model:value="formState.lineItems[index].discountRate" placeholder="Enter Discount <Optional>" />
                  </a-form-item>
                </a-col>
                <a-col :span="3">
                  <p style="padding-top: 4px" align="center">Total</p>
                  <p align="center">
                    {{ (formState.lineItems[index].quantity * formState.lineItems[index].unitAmount) - ((formState.lineItems[index].quantity * formState.lineItems[index].unitAmount) * formState.lineItems[index].discountRate / 100) }}
                  </p>
                </a-col>
                <a-col :span="2">
                  <a style="color: red" @click="deleteLineItem(index)">
                    <DeleteOutlined class="delete-icon"/>
                  </a>
                </a-col>
              </a-row>
            </div>
            <a-col :span="24">
                <a-button
                  type="dashed"
                  @click="addItem"
                  style="margin-bottom: 40px; width: 100%"
                >
                  Add Item
                </a-button>
            </a-col>
          </a-form>
        </a-col>
      </a-row>
      <template #footer>
        <div>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-button class="full-width" @click="onClose">Cancel</a-button>
            </a-col>
            <a-col :span="12">
              <a-button type="primary" class="full-width" @click="submit">
                Submit
              </a-button>
            </a-col>
          </a-row>
        </div>
      </template>
    </a-drawer>
  </div>
  <a-modal
    v-model:visible="showCurrencyForm"
    title="Create new currency"
    okText="Create"
    @ok="createCurrency"
    :destroyOnClose="true"
  >
    <h3>Currency Code</h3>
    <a-input placeholder="USD" v-model:value="currencyCode" />
    <h3 style="margin-top:20px">Currency Description</h3>
    <a-input placeholder="United State Dollar" v-model:value="currencyDescription" />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import dayjs, { Dayjs } from "dayjs";
import { DeleteOutlined } from "@ant-design/icons-vue";
import InvoiceRepository from '@/repository/InvoiceRepository';
import CurrencyRepository from '@/repository/CurrencyRepository';


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

export default defineComponent({
    props: {
      showForm: Boolean,
      invoice: Object,
      contacts: Array,
      products: Array,
    },
    components: {
      DeleteOutlined,
    },
    emits: ["close", "success"],
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
        lineItems: [],
        subTotal: 0,
        total: 0,
      };
      return {
        currencies: ref([]),
        visible: ref(false),
        formState: ref<Invoice>(emptyInvoice),
        currencyCode: ref(''),
        currencyDescription: ref(''),
        showCurrencyForm: ref(false),
      };
    },
    methods: {
      async submit() {
        const {
          type,
          contactId,
          date,
          dueDate,
          reference,
          lineItems,
        } = this.formState;
        let body = {
          type,
          contactId,
          date: date.format('YYYY-MM-DD'),
          dueDate: dueDate.format('YYYY-MM-DD'),
          reference: reference,
          lineItems: [],
        };
        body.lineItems = lineItems.map((e) => {
          return {
            description: e.description,
            quantity: e.quantity,
            unitAmount: e.unitAmount,
            category: e.category,
            discountRate: e.discountRate,
            lineAmount: e.unitAmount * ((100-e.discountRate) / 100),
          };
        })
        if (this.invoice.id) {
          await InvoiceRepository.updateInvoice(this.invoice.id, body).then(() => {
            this.$message.success('Successfully updated invoice');
            this.$emit('success');
            this.onClose();
          }).catch((err) => {
            this.$message.error('Oopss, failed to update invoice');
            window.console.log(err);
          });
        } else {
          await InvoiceRepository.createInvoice(body).then(() => {
            this.$message.success('Successfully created new invoice');
            this.$emit('success');
            this.onClose();
          }).catch((err) => {
            this.$message.error('Oopss, failed to create invoice');
            window.console.log(err);
          });
        }
      },
      addItem() {
        this.formState.lineItems.push({
          description: null,
          quantity: 1,
          unitAmount: 0,
          discountRate: 0,
          category: null,
        });
      },
      productChange(index, product) {
        this.formState.lineItems[index].quantity = 0;
        this.formState.lineItems[index].unitAmount = product.unitAmount;
        this.formState.lineItems[index].discountRate = 0;
        this.formState.lineItems[index].category = product.category;
      },
      openCurrencyForm() {
        this.showCurrencyForm = true;
      },
      deleteLineItem(index: number) {
        if (index == 0) return this.$message.error('please insert at least one items');
        this.formState.lineItems.splice(index, 1);
      },
      onClose() {
        this.$emit("close")
      },
      async findAllCurrency() {
        const { data } = await CurrencyRepository.findAllCurrency();
        this.currencies = data;
      },
      async createCurrency() {
        if (this.currencyCode.length <= 0)
          return this.$message.error("Currency Code is required");
        if (this.currencyDescription.length <= 0)
          return this.$message.error("Currency Description is required");
        await CurrencyRepository.createCurrency({
          Code: this.currencyCode,
          Description: this.currencyDescription,
        }).then(() => {
          this.findAllCurrency();
          this.$message.success('Successfully created currency');
          this.showCurrencyForm = false;
        }).catch((err) =>{
          console.log(err);
          this.$message.error('Oopss.. failed to create currency');
        });
      },
    },
    watch: {
      showForm() {
        this.visible = this.showForm;
        if (this.visible) {
          this.findAllCurrency();
          this.formState = this.invoice;
        }
      },
    },
});
</script>

<style scoped>
  .full-width {
    width: 100%;
  }

  .delete-icon {
    margin-top: 40px;
    font-size: 20px;
  }
</style>
