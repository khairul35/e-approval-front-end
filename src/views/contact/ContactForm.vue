<template>
  <div>
    <a-drawer
      v-model:visible="visible"
      :maskClosable="false"
      :closable="false"
      :destroyOnClose="true"
      :title="'New Contact'"
      :width="1000">
      <a-form
        name="basic"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        :model="formState"
      >
        <a-form-item label="Full Name" :required="true">
          <a-input v-model:value="formState.name" placeholder="Full Name" />
        </a-form-item>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="First Name">
              <a-input v-model:value="formState.firstName" placeholder="First Name" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Last Name">
              <a-input v-model:value="formState.lastName" placeholder="Last Name" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Email Address">
              <a-input v-model:value="formState.emailAddress" placeholder="Email Address" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Skype User Name">
              <a-input v-model:value="formState.skypeUserName" placeholder="Skype User Name" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Bank Account Name">
              <a-input v-model:value="formState.bankAccountDetails" placeholder="Bank Account Details" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Account Number">
              <a-input v-model:value="formState.accountNumber" placeholder="Account Number" />
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-form-item label="Contact ID">
          <a-input v-model:value="formState.contactId" />
        </a-form-item> -->
        <!-- <a-form-item label="Contact Number">
          <a-input v-model:value="formState.contactNumber" :disabled="true" />
        </a-form-item> -->
        <!-- <a-form-item label="Contact Status">
          <a-select v-model:value="formState.contactStatus" placeholder="Contact Status">
            <a-select-option value="ACTIVE">Active</a-select-option>
            <a-select-option value="ARCHIVED">Archived</a-select-option>
            <a-select-option value="DELETED">Deleted</a-select-option>
          </a-select>
        </a-form-item> -->
          <!-- <a-form-item label="Company Number">
        <a-input v-model:value="formState.companyNumber" placeholder="Company Number" />
          </a-form-item> -->
        <!-- <a-form-item label="Contact Persons">
          <a-select v-model:value="formState.contactPersons" mode="multiple" placeholder="Contact Persons" >
            <a-select-option v-for="person in contactPersons" :value="person.id" :key="person.id">
              {{ person.name }}
            </a-select-option>
          </a-select>
        </a-form-item> -->
        <a-form-item label="Tax Number">
          <a-input v-model:value="formState.taxNumber" placeholder="Tax Number" />
        </a-form-item>
        <!-- <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Accounts Receivable Tax Type">
              <a-select v-model:value="formState.accountsReceivableTaxType" placeholder="Account Receivable Tax Type">
                <a-select-option value="OUTPUT2">Output 2</a-select-option>
                <a-select-option value="OUTPUT3">Output 3</a-select-option>
                <a-select-option value="OUTPUT4">Output 4</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Accounts Payable Tax Type">
              <a-select v-model:value="formState.accountsPayableTaxType" placeholder="Accounts Payable Tax Type">
                <a-select-option value="INPUT2">Input 2</a-select-option>
                <a-select-option value="INPUT3">Input 3</a-select-option>
                <a-select-option value="INPUT4">Input 4</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row> -->
          <a-row :gutter="16">
            <h2>Addresses</h2>
            <a-col :span="24">
              <div v-for="(address, index) in formState.addresses" :key="index">
                <a-row :gutter="16">
                  <a-col :span="24">
                    <h3>Address {{ index + 1 }}</h3>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="Address line 1">
                    <a-input v-model:value="address.addressLine1" placeholder="Address Line 1" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="Address line 2">
                      <a-input v-model:value="address.addressLine2" placeholder="Address Line 2" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="City">
                      <a-input v-model:value="address.city" placeholder="City" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="Region">
                      <a-input v-model:value="address.region" placeholder="Region" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="Postal code">
                      <a-input v-model:value="address.postalCode" placeholder="Postal Code" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="Country">
                      <a-input v-model:value="address.country" placeholder="Country" />
                    </a-form-item>
                  </a-col>
                </a-row>
            </div>
            </a-col>
            <a-col :span="24">
              <a-button
                type="dashed"
                @click="addAddress"
                style="margin-bottom: 40px; width: 100%"
              >
                Add Address
              </a-button>
            </a-col>
          </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
          <h2>Phones</h2>
          <div v-for="(phone, index) in formState.phones" :key="index">
              <a-row :gutter="16">
                <a-col :span="24">
                  <h3>Phone {{ index + 1 }}</h3>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="Phone type">
                    <a-input v-model:value="phone.phoneType" placeholder="Phone Type" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="Phone number">
                    <a-input v-model:value="phone.phoneNumber" placeholder="Phone Number" />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
        </a-col>
        <a-col :span="24">
            <a-button
              type="dashed"
              @click="addPhone"
              style="margin-bottom: 40px; width: 100%"
            >
              Add Phone
            </a-button>
        </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Supplier">
              <a-switch v-model:checked="formState.isSupplier" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Customer">
              <a-switch v-model:checked="formState.isCustomer" />
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-form-item label="Default Currency">
          <a-input v-model:value="formState.defaultCurrency" placeholder="Default Currency" />
        </a-form-item>
        <a-form-item label="Xero Network Key">
          <a-input v-model:value="formState.xeroNetworkKey" placeholder="Xero Network Key" />
        </a-form-item>
        <a-form-item label="Sales Default Account Code">
          <a-input v-model:value="formState.salesDefaultAccountCode" placeholder="Sales Default Account Code" />
        </a-form-item>
        <a-form-item label="Purchases Default Account Code">
          <a-input v-model:value="formState.purchasesDefaultAccountCode" placeholder="Purchases Default Account Code" />
        </a-form-item> -->
        <!-- <a-form-item label="Sales Tracking Categories">
        <a-select v-model:value="formState.salesTrackingCategories" mode="multiple">
          <a-select-option v-for="(option, index) in salesTrackingCategoriesOptions" :key="index" :value="option.value">{{ option.label }}</a-select-option>
        </a-select>
        </a-form-item>
        <a-form-item label="Purchases Tracking Categories">
        <a-select v-model:value="formState.purchasesTrackingCategories" mode="multiple">
          <a-select-option v-for="(option, index) in purchasesTrackingCategoriesOptions" :key="index" :value="option.value">{{ option.label }}</a-select-option>
        </a-select>
        </a-form-item> -->
        <!-- <a-form-item label="Tracking Category Name">
          <a-input v-model:value="formState.trackingCategoryName" placeholder="Tracking Category Name" />
        </a-form-item>
        <a-form-item label="Tracking Option Name">
          <a-input v-model:value="formState.trackingOptionName" placeholder="Tracking Option Name" />
        </a-form-item>
        <a-form-item label="Payment Terms">
          <a-input v-model:value="formState.paymentTerms" placeholder="Payment Terms" />
        </a-form-item> -->
      </a-form>
      <template #footer>
        <div>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-button class="full-width" @click="onClose">Cancel</a-button>
            </a-col>
            <a-col :span="12">
              <a-button type="primary" class="full-width" @click="onSubmit">
                Submit
              </a-button>
            </a-col>
          </a-row>
        </div>
      </template>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import XeroRepository from '@/repository/XeroRepository';

interface FormState {
  name: string;
  firstName: string;
  lastName: string;
  accountNumber: string;
  contactStatus: 'ACTIVE' | 'ARCHIVED' | 'DELETED';
  companyNumber: string;
  emailAddress: string;
  skypeUserName: string;
  bankAccountDetails: string;
  taxNumber: string;
  addresses: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  }[];
  phones: {
    phoneType: string;
    phoneNumber: string;
  }[];
  isSupplier: boolean;
  isCustomer: boolean;
}


export default defineComponent({
    props: {
      showForm: Boolean,
      po: Object,
    },
    data() {
      return {
        visible: ref(false),
        formState: ref<FormState>({
        name: '',
        firstName: '',
        lastName: '',
        accountNumber: '',
        contactStatus: 'ACTIVE',
        companyNumber: '',
        emailAddress: '',
        skypeUserName: '',
        bankAccountDetails: '',
        taxNumber: '',
        addresses: [
            {
            addressLine1: '',
            addressLine2: '',
            city: '',
            region: '',
            postalCode: '',
            country: '',
            },
        ],
        phones: [
            {
            phoneType: 'Mobile Phone',
            phoneNumber: '',
            },
        ],
        isSupplier: false,
        isCustomer: false,
        }),
      };
    },
    methods: {
      onClose() {
        this.$emit("close")
      },
      onSubmit() {
        this.createContact(this.removeNullValues(this.formState));
      },
      async createContact(body) {
        console.log(this.replaceEmptyStringWithNull(body));
        await XeroRepository.createContact(this.replaceEmptyStringWithNull(body))
            .then(() => {
                this.$message.success("Successfully Create Contact");
                this.$emit('update');
            }).catch((err) => {
                this.$message.error("Failed to Create Contact");
                window.console.log(err);
            });
      },
      replaceEmptyStringWithNull(obj) {
        const result: any = {}; // we cast it to 'any' to avoid TypeScript errors when deleting properties
        for (const [key, value] of Object.entries(obj)) {
            const updatedValue = value === '' ? null : value;
            result[key] = updatedValue;
        }
        return result;
      },
      removeNullValues(obj: any) {
        const result: any = {}; // we cast it to 'any' to avoid TypeScript errors when deleting properties

        for (const [key, value] of Object.entries(obj)) {
            if (value !== null) {
            result[key] = value;
            }
        }

        return result;
      },
      addAddress() {
        this.formState.addresses.push({
          addressLine1: '',
          addressLine2: '',
          city: '',
          region: '',
          postalCode: '',
          country: ''
        })
      },
      addPhone() {
        this.formState.phones.push({
          phoneType: '',
          phoneNumber: ''
        })
      },
    },
    watch: {
      showForm() {
        this.visible = this.showForm;
      },
    },
});
</script>

<style scoped>
  .full-width {
    width: 100%;
  }
</style>
