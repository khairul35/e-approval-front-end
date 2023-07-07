import { clientId, redirectUris, clientSecret, scopes } from '@/constant/XeroConfig';
import Repository from './Repository';

export default {
    findAllInvoice() {
        return Repository.get(`invoice`);
    },
    createInvoice(body) {
        return Repository.post(`invoice`, body);
    },
    approveInvoice(id) {
        return Repository.put(`invoice/approve/${id}`);
    },
    updateInvoice(id, body) {
        return Repository.put(`invoice/${id}`, body);
    },
};
