import { clientId, redirectUris, clientSecret, scopes } from '@/constant/XeroConfig';
import axios from 'axios';
import Repository from './Repository';

export default {
    findAllPurchaseOrder() {
        return Repository.get(`purchase-order?tenantId=${localStorage.getItem('tenant')}`);
    },
    createPurchaseOrder(body) {
        return Repository.post(`purchase-order?tenantId=${localStorage.getItem('tenant')}`, body);
    },
    approvePurchaseOrder(id) {
        return Repository.put(`Purchase-order/approve/${id}?tenantId=${localStorage.getItem('tenant')}`);
    },
    updatePurchaseOrder(id, body) {
        return Repository.put(`Purchase-order/${id}?tenantId=${localStorage.getItem('tenant')}`, body);
    },
};
