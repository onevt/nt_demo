import styles from "./App.module.css";
import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import Input from "./Input";
import type { TabData, TabDataKey } from "./types";
import {
  tabs,
  tabsActive,
  setActiveTab,
  addTab,
  removeTab,
  removeAllTabs,
  numberOfTabs,
  tabsActiveData,
  updateTabData,
  tabsSize,
} from "./store/tabs";

function App() {
  const tabsList = useStore(tabs);
  const active = useStore(tabsActive);
  const activeData = useStore(tabsActiveData);

  const [dataForCurrentTab, setDataForCurrentTab] =
    useState<TabData>(activeData);
  const updateDataForCurrentTab = (data: TabData) => {
    setDataForCurrentTab({ ...dataForCurrentTab, ...data });
  };

  const handleSetTab = (newTabId: string) => {
    Object.keys(dataForCurrentTab).forEach((key) => {
      updateTabData({
        [key as TabDataKey]: dataForCurrentTab[key as TabDataKey],
      }); // update data for current tab
    });
    setActiveTab(newTabId); // set new active tab
    if (activeData && newTabId !== activeData.tabId) {
      setDataForCurrentTab({}); // reset local data for new tab
    }
  };

  useEffect(() => {
    setDataForCurrentTab({});
  }, [activeData?.tabId]);

  return (
    <div className={styles.App}>
      <div className={styles.tabs}>
        <button onClick={addTab}>New Tab</button>
        <button onClick={removeAllTabs}>Remove All</button>
        {tabsList &&
          tabsList.map((tab, index) => (
            <div
              onClick={() => handleSetTab(tab.id)}
              className={`${styles.tab} ${tab.active ? styles.active : ""}`}
              key={index}
            >
              <>
                <span>{tab.id}</span>
                <button onClick={() => removeTab(tab.id)}>Remove</button>
              </>
            </div>
          ))}
        <h4>Tabs - {numberOfTabs.get()}</h4>
        <h4>Tabs Size - {tabsSize.get()}</h4>
      </div>
      <div className={styles.data}>
        {active && activeData && (
          <>
            <Input
              label="VALUE 1 (updates on tab change)"
              value={dataForCurrentTab?.value1 ?? activeData?.value1}
              onChange={(event) =>
                updateDataForCurrentTab({ value1: event.target.value })
              }
            />
            <Input
              label="VALUE 2 (updates onChange)"
              value={activeData.value2}
              onChange={(event) =>
                updateTabData({ value2: event.target.value })
              }
            />
            <h2>{`Value 1: ${
              dataForCurrentTab?.value1 ?? activeData?.value1
            }`}</h2>
            <h2>{`Value 2: ${activeData.value2}`}</h2>
            <pre>{JSON.stringify(tabs.get(), null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
