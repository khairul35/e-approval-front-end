import Repository from './Repository';

export default {
    findAllProducts() {
        return Repository.get(`product?tenantId=${localStorage.getItem('tenant')}`);
    },
    createProduct(body) {
        return Repository.post(
            `product/${localStorage.getItem('tenant')}`,
            body,
        );
    },
    updateProduct(id, body) {
      return Repository.put(
        `product/${id}`,
        body,
      );
    },
    findCategory() {
        return Repository.get(`product/category?tenantId=${localStorage.getItem('tenant')}`);
    },
    createCategory(body) {
        return Repository.post(`product/category/${localStorage.getItem('tenant')}`,
        body);
    },
};
