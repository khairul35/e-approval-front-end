import { clientId, redirectUris, clientSecret, scopes } from '@/constant/XeroConfig';
import axios from 'axios';
import Repository from './Repository';

export default {
    generateToken(code: string) {
        return Repository.post(`auth/register/xero?code=${code}`);
    },
    refreshToken() {
        const headers = {
            'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const data = new URLSearchParams();
        data.append('grant_type', 'refresh_token');
        data.append('refresh_token', localStorage.getItem('xeroRefreshToken'))
        return axios.post('https://identity.xero.com/connect/token', data, { headers })
    },
    getAllConnection() {
        return Repository.get(`connection`);
    },
    /** Purchase Order */
    getAllPurchaseOrder() {
        return Repository.get(`purchase-order?tenantId=${localStorage.getItem('tenant')}`);
    },
    /** / Purchase Order */

    /** Contact */
    getAllContact() {
        return Repository.get(`contact?tenantId=${localStorage.getItem('tenant')}`);
    },
    createContact(body) {
        return Repository.post(`contact?tenantId=${localStorage.getItem('tenant')}`, { "Contacts": [body] });
    }
    /** / Contact */
};