import { BaseEntity } from "./baseType";
import { FileRequest } from "./clientType";

export interface Organization extends BaseEntity {
  orgId?: string;
  name?: string;
  description?: string;
  isCustomer?: boolean;
  isDefault?: boolean;
  language?: number;
}

export interface OrganizationInfo extends BaseEntity {
  orgId?: string;
  address?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  email?: string;
  referUrl?: string;
  country?: string;
  leaderName?: string;
  hashCode?: string;
  orgLogoId?: string;
}

export interface OrganizationClient extends BaseEntity {
  clientId?: string;
  orgId?: string;
  description?: string;
}

// ************************** REQUEST **************************
export interface NewOrgClient {
  orgId?: string;
  createdBy?: string;
  description?: string;
}
export interface NewOrganization {
  name?: string;
  description?: string;
  createdBy?: string;
  address?: string;
  email?: string;
  referUrl?: string;
  language?: string;
  country?: string;
  file?: FileRequest;
}
