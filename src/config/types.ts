export interface configTypes {
  log?: boolean;
  request?: requestConfigType;
  middleware?: middlewareConfigType;
}

export interface requestConfigType {
  baseUrl?: string;
  header?: TaroGeneral.IAnyObject;
  timeout?: number;
  bearerToken?: boolean;
}

export interface middlewareConfigType {
  userAuth: {
    filterKey?: {
      phone: string;
      info: string;
    };
  };
}
