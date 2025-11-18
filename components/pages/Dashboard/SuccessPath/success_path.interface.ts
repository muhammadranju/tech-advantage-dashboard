export interface Assessment {
  _id: string;
  range: string;
  title?: string;
  begineerData: string;
  IntermediateData: string;
  proData: string;
}

export interface SuccessPathTitles {
  [key: string]: string[];
}

export type CategoryType =
  | "looking-to-get-into-tech"
  | "small-business"
  | "aspiring-entrepreneur";


  