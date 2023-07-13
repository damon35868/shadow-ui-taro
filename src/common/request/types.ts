export interface configTypes {
  baseUrl?: string;
  header?: TaroGeneral.IAnyObject;
  timeout?: number;
  bearerToken?: boolean;
}

export interface requestOptions {
  url: string;
  method?: string | undefined;
  params?: any;
}

export interface configOptions {
  manual?: boolean;
}
