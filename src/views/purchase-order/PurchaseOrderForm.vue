<template>
  <div>
    <a-drawer
      v-model:visible="visible"
      :maskClosable="false"
      :closable="false"
      :destroyOnClose="true"
      :title="'New Purchase Order'"
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
                <a-form-item label="Purchase Order Number">
                  <a-input
                    v-model:value="formState.PurchaseOrderNumber"
                    placeholder="Purchase Order Number"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="Contact">
                  <a-select
                    v-model:value="formState.ContactID"
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
                <a-form-item label="Created Date">
                  <a-date-picker
                    v-model:value="formState.CreatedDate"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="Delivery Date">
                  <a-date-picker
                    v-model:value="formState.DeliveryDate"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                <a-form-item label="Delivery Address">
                  <a-textarea
                    v-model:value="formState.DeliveryAddress"
                    placeholder="Delivery Address"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                <a-form-item label="Delivery Instructions">
                  <a-textarea
                    v-model:value="formState.DeliveryInstructions"
                    placeholder="Delivery Instructions"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :xm="24" :xs="24">
                <a-form-item label="Attention To">
                  <a-input
                    v-model:value="formState.AttentionTo"
                    placeholder="Attention To"
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :xm="24" :xs="24">
                <a-form-item label="Telephone">
                  <a-input
                    v-model:value="formState.Telephone"
                    placeholder="Telephone"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-divider />
            <h3>Line Items</h3>
            <a-row :gutter="16">
              <a-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
                <a-form-item label="Currency">
                  <a-select
                    placeholder="Select Currency"
                    v-model:value="formState.Currency"
                    style="width: 100%"
                  >
                    <a-select-option
                      v-for="item in currencies"
                      :key="item.Code"
                      :value="item.Code"
                    >
                      {{ item.Description }}
                    </a-select-option>
                    <template #dropdownRender="{ menuNode: menu }">
                      <v-nodes :vnodes="menu" />
                      <a-divider style="margin: 4px 0" />
                      <div
                        style="padding: 8px; cursor: pointer"
                        @mousedown="e => e.preventDefault()"
                        @click="openCurrencyForm">
                        <plus-outlined /> Add Currency
                      </div>
                    </template>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <div v-for="(item, index) in formState.lineItems" :key="index">
              <a-row :gutter="16">
                <a-col :span="7">
                  <a-form-item label="Description">
                    <a-input v-model:value="formState.lineItems[index].description" placeholder="Enter Description" />
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
                  <a-form-item label="Tax">
                    <a-input-number v-model:value="formState.lineItems[index].tax" placeholder="Enter Discount <Optional>" />
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
import { DeleteOutlined , PlusOutlined} from "@ant-design/icons-vue";
import PurchaseOrderRepository from '@/repository/PurchaseOrderRepository';
import CurrencyRepository from '@/repository/CurrencyRepository';

interface LineItem {
  description: string;
  quantity: number;
  unitAmount: number;
  discountRate: number;
  tax: number
}

interface Contact {
  ContactID: string;
}

interface FormState {
  ContactID: string;
  PurchaseOrderNumber: string;
  lineItems: LineItem[];
  CreatedDate: Dayjs;
  DeliveryDate: Dayjs;
  DeliveryAddress: string,
  DeliveryInstructions: string,
  Currency: string,
  AttentionTo: string,
  Telephone: string,
}

export default defineComponent({
    props: {
      showForm: Boolean,
      po: Object,
      contacts: Array,
    },
    components: {
      DeleteOutlined,
      PlusOutlined,
      VNodes: (_, { attrs }) => {
        return attrs.vnodes;
      },
    },
    emits: ["close", "success"],
    data() {
      return {
        currencies: ref([]),
        visible: ref(false),
        formState: ref<FormState>({
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
        }),
        currencyCode: ref(''),
        currencyDescription: ref(''),
        showCurrencyForm: ref(false),
      };
    },
    methods: {
      async submit() {
        const {
          ContactID,
          CreatedDate,
          DeliveryInstructions,
          DeliveryDate,
          lineItems,
          PurchaseOrderNumber,
          DeliveryAddress,
          Currency,
          AttentionTo,
          Telephone,
        } = this.formState;
        const body = {
          contactID: ContactID,
          createdDate: CreatedDate.format('YYYY-MM-DD'),
          deliveryDate: DeliveryDate.format('YYYY-MM-DD'),
          lineItems: lineItems,
          purchaseOrderNumber: PurchaseOrderNumber,
          deliveryInstructions: DeliveryInstructions,
          deliveryAddress: DeliveryAddress,
          telephone: Telephone,
          attentionTo: AttentionTo,
          currency: Currency,
        };
        if (this.po.PurchaseOrderID) {
          await PurchaseOrderRepository.updatePurchaseOrder(this.po.PurchaseOrderID, body).then(() => {
            this.$message.success('Successfully updated purchase order');
            this.$emit('success');
            this.onClose();
          }).catch((err) => {
            this.$message.error('Oopss, failed to update purchase order');
            window.console.log(err);
          });
        } else {
          await PurchaseOrderRepository.createPurchaseOrder(body).then(() => {
            this.$message.success('Successfully created new purchase order');
            this.$emit('success');
            this.onClose();
          }).catch((err) => {
            this.$message.error('Oopss, failed to create purchase order');
            window.console.log(err);
          });
        }
      },
      addItem() {
        this.formState.lineItems.push({
          description: "item",
          quantity: 1,
          unitAmount: 0,
          discountRate: 0,
          tax: 0,
        });
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
          this.formState = this.po;
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
