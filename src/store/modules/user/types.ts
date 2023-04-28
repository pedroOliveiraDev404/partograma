export interface UserReducer {
  hubInfo: UserInfo;
}

export type UserInfo = {
  guid?: string;
  schoolId?: string;
  schoolName?: string;
  roles?: string[];
  selectedRole?: string;
  educationalLevel?: string;
  class?: string;
};
