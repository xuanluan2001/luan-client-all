import BaseFetch from "service-sdk/lib/fetch/BaseFetch";
import { NewClientRequest } from "../types/clientType";
import { BaseFilter } from "service-sdk/lib/types/BaseType";
import {
  CREATE_CLIENT_URL,
  SEARCH_CLIENT_URL,
  UPLOAD_FILE_URL,
  GET_CLIENT_TYPES_URL,
  GET_CLIENT_DETAIL_URL,
  SEND_EMAIL_CLIENT_URL,
  SEND_EMAIL_CONFIG_URL,
  GET_BUSINESS_CLient_URL,
} from "../constants/clientConstants";
import RestController, { tokenHeader } from "./base-rest";
import { EmailSender, EmailSenderConfig } from "../types/clientType";

const token = tokenHeader();

// superadmin
export const createClient = (request: NewClientRequest): Promise<BaseFetch> => {
  return RestController.postRestController(CREATE_CLIENT_URL, request, token);
};

export const searchClient = (
  clientId: string,
  filter: BaseFilter
): Promise<BaseFetch> => {
  return RestController.postRestController(
    SEARCH_CLIENT_URL + clientId,
    filter,
    token
  );
};

//client
export const uploadFile = (formData: FormData): Promise<BaseFetch> => {
  return RestController.postRestController(UPLOAD_FILE_URL, formData);
};

export const getClientTypes = (): Promise<BaseFetch> => {
  return RestController.getRestController(GET_CLIENT_TYPES_URL);
};

export const getClientDetail = (clientId?: string): Promise<BaseFetch> => {
  return RestController.getRestController(GET_CLIENT_DETAIL_URL + clientId);
};

export const sendEmailFromClient = (
  request: EmailSender
): Promise<BaseFetch> => {
  return RestController.postRestController(SEND_EMAIL_CLIENT_URL, request);
};

export const sendEmailOfConfig = (
  request: EmailSenderConfig
): Promise<BaseFetch> => {
  return RestController.postRestController(SEND_EMAIL_CONFIG_URL, request);
};

export const getAllBusinessClient = (): Promise<BaseFetch> => {
  return RestController.getRestController(GET_BUSINESS_CLient_URL);
};
