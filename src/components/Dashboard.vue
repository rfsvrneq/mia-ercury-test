<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import request from "../api";
import { RoleLevel, AccountStatus } from "../types/account";
import type { Account } from "../types/account";

const router = useRouter();
const accounts = ref<Account[]>([]);
const isLoading = ref(true);

// 讀取
const fetchAccounts = async () => {
  try {
    const response = await request.get("/accounts");
    console.log("API 回傳的原始資料:", response.data);
    const result = response.data.data || response.data;
    accounts.value = Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("API Error:", error);
    accounts.value = [];
  } finally {
    isLoading.value = false;
  }
};

// 新增
const handleAddMockData = async () => {
  try {
    // 建立一筆資料
    const newAccount = {
      name: "測試4",
      email: "mia.test@metcfire.com",
      roleLevel: RoleLevel.USER,
      status: AccountStatus.OFF,
    };

    // 發送 POST 請求建立資料
    await request.post("/create-account", newAccount);

    // GET 重新抓取列表更新畫面
    await fetchAccounts();
    alert("新增成功！");
  } catch (error) {
    console.error("新增資料失敗:", error);
    alert("新增失敗");
  }
};

// 刪除
const handleDelete = async (id: string) => {
  if (!confirm("確定要刪除此帳號嗎？")) return;
  try {
    await request.delete(`/delete-account/${id}`);
    accounts.value = accounts.value.filter((a) => a.id !== id);
    alert("刪除成功");
  } catch (error) {
    alert("刪除失敗");
  }
};

// 登出
const handleLogout = () => {
  localStorage.removeItem("accessToken");
  router.push("/login");
};

onMounted(() => fetchAccounts());
</script>

<template lang="pug">
.min-h-screen.bg-slate-50.p-6
  .max-w-6xl.mx-auto

          
    //- 新增
    .flex.items-center.mb-5
      button.bg-indigo-600.text-white.px-4.py-2.rounded-lg.font-medium.hover_bg-indigo-700.transition-colors(@click="handleAddMockData") 
        | + 新增帳號
      button.text-slate-600.hover_text-slate-900.flex.items-center(@click="handleLogout") 
        span.ml-4 登出

    //- 載入中
    .text-center.py-20(v-if="isLoading")
      p 載入中...

    //- 卡片列表
    .grid.gap-6(v-else class="grid-cols-1 sm:grid-cols-2 md:grid-cols-3")
      .bg-white.rounded-xl.border.border-slate-200.p-5(v-for="acc in accounts" :key="acc.id")
        //- 頭像與狀態
        .flex.justify-between.items-start.mb-4
          .flex.items-center.gap-3
            .w-12.h-12.bg-indigo-500.rounded-full.flex.items-center.justify-center.text-white.text-xl 
              | {{ acc.name.charAt(0) }}
            div
              h3.font-bold.text-slate-800 {{ acc.name }}
              span(class="inline-block px-2 py-0.5 rounded-full text-xs" :class="acc.status === AccountStatus.ON ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'")
                | {{ acc.status === AccountStatus.ON ? '啟用' : '停用' }}
        
        //- 資訊欄位
        .space-y-2.mb-6.text-sm.text-slate-600
          p ✉️ {{ acc.email }}
          p 👤 {{ acc.roleLevel }}
        
        //- 操作按鈕
        .flex.gap-3
          button.flex-1.bg-red-50.text-red-700.py-2.rounded-lg.font-medium.hover_bg-red-100(@click="handleDelete(acc.id)") 刪除
</template>
