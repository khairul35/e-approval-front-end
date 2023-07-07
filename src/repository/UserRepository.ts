import Repository from './Repository';

export default {
    findAllUser() {
        return Repository.get(`user`);
    },
    setActiveTenant(tenantId: string) {
        return Repository.put(`user/active-tenant`, { tenantId });
    },
    updateRole(roleId: number, userId: number) {
        return Repository.put(`user/role`, { roleId, userId });
    },
};
