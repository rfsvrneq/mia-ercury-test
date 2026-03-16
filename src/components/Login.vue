<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("test@example.com");
const password = ref("123456");
const errorMessage = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = "請輸入完整資訊";
    return;
  }
  isLoading.value = true;
  try {
    await authStore.login(email.value, password.value);
    router.push("/");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template lang="pug">
.min-h-screen.bg-slate-100.flex.items-center.justify-center.p-4
  .bg-white.w-full.max-w-md.rounded-xl.shadow-md.p-8
    .text-center.mb-8
      .w-12.h-12.bg-indigo-600.rounded-full.flex.items-center.justify-center.mx-auto.mb-4
        span.text-white.font-bold.text-xl →]
      h1.text-2xl.font-bold.text-slate-800 歡迎回來
      p.text-slate-500.mt-2 請登入您的帳號以繼續

    form(@submit.prevent="handleLogin")
      .mb-5
        label.block.text-sm.font-medium.text-slate-700.mb-1 電子郵件
        input.w-full.px-4.py-2.border.border-slate-300.rounded-lg(v-model="email" type="email" placeholder="your@email.com")
      .mb-6
        label.block.text-sm.font-medium.text-slate-700.mb-1 密碼
        input.w-full.px-4.py-2.border.border-slate-300.rounded-lg(v-model="password" type="password" placeholder="••••••••")
      
      button.w-full.bg-indigo-600.text-white.py-3.rounded-lg.font-medium.hover_bg-indigo-700.transition-colors(type="submit" :disabled="isLoading")
        span(v-if="isLoading") 登入中...
        span(v-else) →] 登入
        
    .mt-6.bg-blue-50.text-blue-700.p-4.rounded-lg.text-sm.text-center
      p 💡 提示：輸入任意電子郵件和密碼即可登入
</template>
