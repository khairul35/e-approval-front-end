<template>
  <div>
    <a-row :gutter="16">
      <a-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
        <div>
          <a-button type="primary" class="add-button" size="large" @click="createContact">
            Create new Contact
          </a-button>
          <div class="list-container">
            <div v-for="item in contacts" :key="item.ContactID">
              <a-card
                class="card clickable hoverable"
                @click="select(item)"
                :style="item.ContactID == selectedContact.ContactID ? `border-left: 10px solid #3490FF`: ''">
                {{ item.Name }}
              </a-card>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :xl="16" :lg="16" :md="24" :sm="24" :xs="24" class="right-pane" v-if="selectedContact.ContactID">
        <h2>
          {{ selectedContact.Name }}
          <a-tag
            :color="selectedContact.ContactStatus == 'ACTIVE' ? 'green' : 'red'"
            style="float: right; margin-right: 50px">
            {{ selectedContact.ContactStatus }}
          </a-tag>
        </h2>
        <a-divider />
        <div align="left">
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Email Address</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedContact.EmailAddress }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Bank Account</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedContact.BankAccountDetails }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Supplier</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedContact.IsSupplier ? 'Yes' : 'No' }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Customer</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedContact.IsCustomer ? 'Yes' : 'No' }}
            </a-col>
          </a-row>
          <a-divider />
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Addresses</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              <a-row :gutter="16">
                <a-col :span="1">
                  :
                </a-col>
                <a-col :span="23">
                  <div v-for="item in selectedContact.Addresses" :key="item" class="sub-item-box">
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
          <a-divider />
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Phones</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              <a-row :gutter="16">
                <a-col :span="1">
                  :
                </a-col>
                <a-col :span="23">
                  <div v-for="item in selectedContact.Phones" :key="item" class="sub-item-box">
                    <a-row :gutter="16">
                      <a-col :span="8"><b>Phone Type</b></a-col>
                      <a-col :span="16">: {{ item.PhoneType }}</a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="8"><b>Phone Number</b></a-col>
                      <a-col :span="16">: {{ item.PhoneNumber }}</a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="8"><b>Phone Area Code</b></a-col>
                      <a-col :span="16">: {{ item.PhoneAreaCode }}</a-col>
                    </a-row>
                    <a-row :gutter="16">
                      <a-col :span="8"><b>Phone Country Code</b></a-col>
                      <a-col :span="16">: {{ item.PhoneCountryCode }}</a-col>
                    </a-row>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-divider />
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Contact Groups</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              <a-row :gutter="16">
                <a-col :span="1">
                  :
                </a-col>
                <a-col :span="23">
                  <div v-for="item in selectedContact.ContactGroups" :key="item" class="sub-item-box">
                    {{ item }}
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-divider />
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Contact Persons</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              <a-row :gutter="16">
                <a-col :span="1">
                  :
                </a-col>
                <a-col :span="23">
                  <div v-for="item in selectedContact.ContactPersons" :key="item" class="sub-item-box">
                    {{ item }}
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-divider />
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Balances</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              <a-row :gutter="16">
                <a-col :span="1">
                  :
                </a-col>
                <a-col :span="23">
                  <a-row :gutter="16">
                    <a-col :span="24">
                      <h3>Accounts Receivable</h3>
                    </a-col>
                    <a-col :span="24">
                      <a-row :gutter="16">
                        <a-col :span="6">Outstanding</a-col>
                        <a-col :span="18">
                          : {{ getReceivable(selectedContact.Balances).Outstanding }}
                        </a-col>
                      </a-row>
                      <a-row :gutter="16">
                        <a-col :span="6">Outstanding</a-col>
                        <a-col :span="18">
                          : {{ getReceivable(selectedContact.Balances).Overdue }}
                        </a-col>
                      </a-row>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16" style="padding-top: 10px">
                    <a-col :span="24">
                      <h3>Accounts Payable</h3>
                    </a-col>
                    <a-col :span="24">
                      <a-row :gutter="16">
                        <a-col :span="6">Outstanding</a-col>
                        <a-col :span="18">
                          : {{ getPayable(selectedContact.Balances).Outstanding }}
                        </a-col>
                      </a-row>
                      <a-row :gutter="16">
                        <a-col :span="6">Outstanding</a-col>
                        <a-col :span="18">
                          : {{ getPayable(selectedContact.Balances).Overdue }}
                        </a-col>
                      </a-row>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
    <ContactForm
      :showForm="showForm"
      :po="formContent"
      @close="showForm = false"
      @update="findAllContact" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ContactForm from './ContactForm.vue';
import XeroRepository from '@/repository/XeroRepository';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "contacts",
    components: {
      ContactForm,
    },
    data() {
        return {
          contacts: [],
          selectedContact: {},
          showForm: ref(false),
          formContent: ref({}),
          connections: ref([]),
        };
    },
    methods: {
      async findAllContact() {
        this.showForm = false;
        const { data } = await XeroRepository.getAllContact();
        this.contacts = data.Contacts;
        if (this.contacts.length > 0) this.selectedContact = this.contacts[0];
      },
      createContact() {
        if (this.connections.length <= 0)
          return this.$message.error('Please Connect your xero organization before able to create contacts by go to Application page');
        this.showForm = true;
        this.formContent = {};
      },
      select(e) {
        this.selectedContact = e;
      },
      getReceivable(balance) {
        if (!balance) return {
          "Outstanding": 0,
          "Overdue": 0,
        };
        const data = balance.AccountsReceivable;
        return {
          "Outstanding": data.Outstanding,
          "Overdue": data.Overdue,
        };
      },
      getPayable(balance) {
        if (!balance) return {
          "Outstanding": 0,
          "Overdue": 0,
        };
        const data = balance.AccountsPayable;
        return {
          "Outstanding": data.Outstanding,
          "Overdue": data.Overdue,
        };
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
    mounted() {
      this.findAllConnection();
      this.findAllContact();
    }
});
</script>

<style scoped>
.list-container {
  margin: 5px;
  padding: 5px;
  height: 75vh;
  background-color: #1a90ff23;
  overflow: auto;
}

.add-button {
  width: 100%;
  margin: 20px 0px;
}

.sub-item-box {
  border: 1px solid #dad9d9;
  border-radius: 5px 0px;
  box-shadow: 0px 3px 6px #00000029;
  margin: 5px;
  padding: 5px;
}

.card {
  background-color: rgb(248, 248, 248);
  margin: 5px;
}

.clickable {
  cursor: pointer;
}

.hoverable:hover {
  background-color: #3490FF;
  color: #fff;
  font-weight: bold;
}
</style>
