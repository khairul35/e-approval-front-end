<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <a-row :gutter="16">
            <a-col :span="24">
                <div v-for="item in users" :key="item.id" align="left">
                    <a-card class="user-card">
                        <a-row :gutter="16">
                            <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                <h2>{{ item.name }}</h2>
                                <span class="username">@{{ item.username }}</span>
                            </a-col>
                            <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24" align="right">
                                <a-select v-model:value="item.roleId" style="width: 150px" @change="updateRole(item.id, item.roleId)">
                                    <a-select-option :value="1">Super Admin</a-select-option>
                                    <a-select-option :value="2">Supervisor</a-select-option>
                                    <a-select-option :value="3">Seller</a-select-option>
                                </a-select>
                            </a-col>
                        </a-row>
                    </a-card>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
import UserRepository from '@/repository/UserRepository';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    data() {
        return {
            users: ref([]),
        };
    },
    methods: {
        async findAllUsers() {
            const { data } = await UserRepository.findAllUser();
            this.users = data;
        },
        async updateRole(userId: number, roleId: number) {
            await UserRepository.updateRole(roleId, userId).then(() => {
                this.$message.success('Successfully update role');
                this.findAllUsers();
            }).catch((err) => {
                window.console.log(err);
                this.$message.error('Oopss.. failed to update role');
            });
        },
    },
    mounted() {
        this.findAllUsers();
    },
});
</script>

<style scoped>
.user-card {
    border-radius: 10px;
    margin: 20px 50px;
}

.username {
    color: grey;
}
</style>
