import Repository from './Repository';

export default {
    findAllCurrency() {
        return Repository.get(`currency?tenantId=${localStorage.getItem('tenant')}`);
    },
    createCurrency(body) {
        return Repository.post(
            `currency?tenantId=${localStorage.getItem('tenant')}`,
            body,
        );
    },
};
