import { atom, computed, map, action } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { v4 } from "uuid";

import type { Tab, TabData, TabDataWithId } from "../types";

// store
export const tabs = atom<Tab[]>([]);
export const persistAtom = persistentAtom("tabs", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
tabs.listen((tabs) => persistAtom.set(tabs));
tabs.set(persistAtom.get());

// actions
export const setActiveTab = action(tabs, "setActiveTab", (tabs, id) => {
  if (id === tabsActive.get().id) return;

  tabs.set(
    tabs.get().map((tab) => ({
      ...tab,
      active: tab.id === id,
    }))
  );
});

export const addTab = action(tabs, "addTab", (tabs) => {
  const tabsLength = tabs.get().length;
  const id = v4();

  const newTabData: TabDataWithId = {
    tabId: id,
    value1: "",
    value2: "",
  };

  const newTab = {
    id: id,
    test: `tab-${tabsLength}`,
    active: tabsLength === 0,
    data: newTabData,
  };
  tabs.set([...tabs.get(), newTab]);
});

export const removeTab = action(tabs, "removeTab", (tabs, id) => {
  tabs.set(tabs.get().filter((tab) => tab.id !== id));
});

export const removeAllTabs = action(tabs, "removeAllTabs", (tabs) => {
  tabs.set([]);
});

export const updateTabData = action(
  tabs,
  "updateTabData",
  (tabs, data: TabData) => {
    tabs.set(
      tabs.get().map((tab) => {
        if (tab.id === tabsActive.get().id) {
          const newData = { ...tab.data, ...data };
          tab.data = newData;
        }
        return tab;
      })
    );
  }
);

// computed values
export const tabsActive = computed(tabs, (tabs) => {
  return tabs.filter((tab) => tab.active)?.[0] || {};
});

export const tabsActiveData = computed(
  tabsActive,
  (tabsActive) => tabsActive?.data
);

export const numberOfTabs = computed(tabs, (tabs) => tabs.length);

export const tabsSize = computed(tabs, (tabs) => JSON.stringify(tabs).length);
