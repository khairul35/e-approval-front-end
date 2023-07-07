<template>
  <div>
    <a-drawer
      v-model:visible="visible"
      :maskClosable="false"
      :closable="false"
      :destroyOnClose="true"
      :title="formState?.description || 'New Product'"
      :width="500">
      <a-form
        name="basic"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        :model="formState"
      >
        <a-row :gutter="16">
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <a-form-item label="Product Name" :required="true">
              <a-input v-model:value="formState.description" placeholder="Product Name" />
            </a-form-item>
          </a-col>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <a-form-item label="Product Price" :required="true">
              <a-input-number v-model:value="formState.unitAmount" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <a-form-item label="Product Code" :required="true">
              <a-input v-model:value="formState.itemCode" placeholder="Product Code" />
            </a-form-item>
          </a-col>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <a-form-item label="Category" :required="true">
              <a-select
                v-model:value="formState.category"
                placeholder="Category"
                showSearch
                optionFilterProp="key">
                <a-select-option
                  v-for="item in categories"
                  :key="item.id"
                  :value="item.category"
                >
                  {{ item.category }}
                </a-select-option>
                <a-select-option @click="addCategory" value="">
                  <plus-outlined /> Add Category
                </a-select-option>
                <!-- <template #dropdownRender="{ menuNode: menu }">
                  <v-nodes :vnodes="menu" />
                  <div style="padding: 8px; cursor: pointer" @click="addCategory">
                    <plus-outlined /> Add Category
                  </div>
                </template> -->
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
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
    <a-modal
      v-model:visible="showCategoryForm"
      title="New Category"
      okText="Submit"
      @cancel="showCategoryForm = false"
      @ok="createCategory"
    >
      <a-row :gutter="16">
        <a-col :span="24">
          <a-input placeholder="Category Name" v-model:value="categoryName" />
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
// import XeroRepository from '@/repository/XeroRepository';
import ProductRepository from '@/repository/ProductRepository';

export default defineComponent({
    props: {
        showForm: Boolean,
        product: Object,
    },
    components: {
      PlusOutlined,
      // VNodes: (_, { attrs }) => {
      //   return attrs.vnodes;
      // },
    },
    data() {
        return {
            categoryName: ref(null),
            showCategoryForm: ref(false),
            visible: ref<boolean>(false),
            formState: ref(),
            categories: ref([]),
        };
    },
    methods: {
        addCategory() {
          this.formState.category = null;
          this.categoryName = null;
          this.showCategoryForm = true;
        },
        onClose() {
            this.$emit("close");
        },
        onSubmit() {
            const body = {
              description: this.formState.description,
              unitAmount: this.formState.unitAmount,
              itemCode: this.formState.itemCode,
              category: this.formState.category,
            };
            if (this.product.productId) {
              this.updateProduct(this.product.productId, body);
            } else {
              this.createProduct(body);
            }
        },
        async createProduct(body) {
          await ProductRepository.createProduct(body).then(() => {
            this.$message.success('Successfully Create Product');
            this.$emit('update');
          }).catch((err) => {
            window.console.log(err);
            this.$message.console.error('Oopss.. Failed to Create Product');
          });
        },
        async updateProduct(id, body) {
          await ProductRepository.updateProduct(id, body).then(() => {
            this.$message.success('Successfully Update Product');
            this.$emit('update');
          }).catch((err) => {
            window.console.log(err);
            this.$message.error('Oopss.. Failed to Update Product')
          });
        },
        async findCategory() {
          const { data } = await ProductRepository.findCategory();
          this.categories = data;
        },
        async createCategory() {
            await ProductRepository.createCategory({ category: this.categoryName }).then(() => {
              this.findCategory();
              this.$message.success('Successfully Create Category');
              this.showCategoryForm = false;
            }).catch((err) => {
              window.console.log(err);
              this.$message.error('Oopss.. Failed to Create Category');
            });
        },
    },
    watch: {
        showForm() {
            this.visible = this.showForm;
            if (this.showForm) {
                this.findCategory();
                this.showCategoryForm = false,
                this.formState = this.product;
            }
        },
    },
});
</script>

<style scoped>
  .full-width {
    width: 100%;
  }
</style>
