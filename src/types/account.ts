// AccountStatus
export enum AccountStatus {
  ON = "ON",
  OFF = "OFF",
}

// RoleLevel
export enum RoleLevel {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  USER = "USER",
  CLIENT = "CLIENT",
}

// 定義帳號資料的結構 (Interface)
export interface Account {
  id: string; // 通常列表回傳會帶有 id
  name: string;
  email: string;
  roleLevel: RoleLevel;
  status: AccountStatus;
}

// 定義新增/修改時使用的 DTO (對應文件上的 AccountFormDto)
export interface AccountFormDto {
  name: string;
  email: string;
  roleLevel: RoleLevel;
  status: AccountStatus;
}
