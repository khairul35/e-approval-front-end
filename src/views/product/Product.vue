<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <a-row :gutter="16">
      <a-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
        <div>
          <a-button type="primary" class="add-button" size="large" @click="createProduct">
            Create new Product
          </a-button>
          <div class="list-container">
            <div v-for="item in products" :key="item.productId">
              <a-card
                class="card clickable hoverable"
                @click="select(item)"
                :style="item.productId == selectedProduct.productId ? `border-left: 10px solid #3490FF`: ''">
                {{ item.description }}
              </a-card>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :xl="16" :lg="16" :md="24" :sm="24" :xs="24" class="right-panel" v-if="selectedProduct.productId">
        <h2>{{ selectedProduct.description }}</h2>
        <a-divider />
        <div align="left">
          <div align="right">
            <a-popover
              trigger="hover"
              placement="bottom"
            >
              <template #content>
                <p class="action-option" @click="onEdit(selectedProduct)">Edit</p>
              </template>
              <a-button>Action</a-button>
            </a-popover>
          </div>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Product Name</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedProduct.description }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Price</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedProduct.unitAmount }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Item Code</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedProduct.itemCode }}
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
              <b>Category</b>
            </a-col>
            <a-col :xl="18" :lg="16" :md="16" :sm="24" :xs="24">
              : {{ selectedProduct.category }}
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
    <ProductForm
      :showForm="showForm"
      :product="formContent"
      @close="showForm = false"
      @update="findAllProducts"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProductForm from './ProductForm.vue';
import ProductRepository from '@/repository/ProductRepository';

export default defineComponent({
  components: {
    ProductForm,
  },
  data() {
    return {
      products: ref([]),
      showForm: ref(false),
      selectedProduct: ref({
        id: 0,
        description: null,
        unitAmount: 0.00,
        itemCode: null,
        category: null,
      }),
      formContent: ref({
        id: 0,
        description: null,
        unitAmount: 0.00,
        itemCode: null,
        category: null,
      }),
    };
  },
  methods: {
    createProduct() {
      this.formContent = {
        id: 0,
        description: null,
        unitAmount: 0.00,
        itemCode: null,
        category: null,
      };
      this.showForm = true;
    },
    onEdit() {
      this.formContent = this.selectedProduct;
      this.showForm = true;
    },
    select(e) {
      this.selectedProduct = e;
    },
    async findAllProducts() {
      const { data } = await ProductRepository.findAllProducts();
      this.products = data;
      this.showForm = false;
      if (this.products.length > 0) this.selectedProduct = this.products[0];
    },
  },
  mounted() {
    this.findAllProducts();
  },
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

.action-option {
  padding: 5px 15px;
}
.action-option:hover {
  background-color: #c6e0ff50;
  cursor: pointer;
}
</style>

