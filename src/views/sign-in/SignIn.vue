<template>
  <div class="login-page">
    <div class="login-container">
      <h1>e-approver</h1>
      <p> Let's Sign In to your accout </p>
      <a-divider />
      <a-input
        placeholder="Username"
        class="login-input"
        size="large"
        v-model:value="username" />
      <a-input-password
        placeholder="Password"
        class="login-input"
        size="large"
        v-model:value="password" />
      <a-button
        type="primary"
        class="login-input width-full"
        size="large"
        @click="signIn"
      >
        Sign In
      </a-button>
      <p class="login-input">does not have account?
        <a @click="this.$router.push('/register')">Sign Up here</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AuthRepository from '@/repository/AuthRepository';

export default defineComponent({
    data() {
      return {
        username: ref<string>(''),
        password: ref<string>(''),
      };
    },
    methods: {
      async signIn(): Promise<void> {
        localStorage.setItem('accessToken', null);
        if (this.username.length <= 0 || this.password.length <= 0)
          return this.$message.error('Username and Password is required!');
        await AuthRepository.signIn(this.username, this.password)
          .then(async ({ data }) => {
            await localStorage.setItem('accessToken', data.accessToken);
            await localStorage.setItem('logged_in', 'true');
            this.$message.success('Sign In Successfully');
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            this.$message.error(err.message);
          });
      },
    },
});
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1A90FF;
  background-image: linear-gradient(to right, #1A90FF, #001528);
}

.login-container {
  width: 700px;
  background-color: #ffffff;
  border: 2px solid #1A90FF;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-input {
  margin-top: 20px;
}

.width-full {
  width: 100%;
}
</style>
