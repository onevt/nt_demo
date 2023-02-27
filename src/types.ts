import { v4 } from "uuid";

export type StringTabData = "value1" | "value2";
export type NumberTabData = "value3" | "value4";
export type TabDataKey = StringTabData | NumberTabData;

export type TabData = {
  [key in StringTabData]?: string;
} & {
  [key in NumberTabData]?: number;
};

export type TabDataWithId = TabData & {
  tabId: string;
};

export type Tab = {
  id: ReturnType<typeof v4>;
  data: TabDataWithId;
  active: boolean;
};
