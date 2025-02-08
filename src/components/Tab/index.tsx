import { cn } from "@/utils/cn";
import type React from "react";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type TabContextType = {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  titleId: string;
  tabIdPrefix: string;
  panelIdPrefix: string;
};

const TabContext = createContext<TabContextType | null>(null);

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("TabContext must be used within a TabProvider");
  }
  return context;
};

type GroupProps = {
  children: React.ReactNode;
  activeIndex?: number;
};

const Group = ({
  activeIndex: defaultActiveIndex = 0,
  children,
}: GroupProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const titleId = `tab-title-${useId()}`;
  const tabIdPrefix = `tab-${useId()}`;
  const panelIdPrefix = `panel-${useId()}`;

  return (
    <TabContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        titleId,
        tabIdPrefix,
        panelIdPrefix,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  const { titleId } = useTabContext();

  return <div id={titleId}>{children}</div>;
};

const useKeyboardNavigation = (
  tabListRef: React.RefObject<HTMLDivElement>,
  tabCount: number,
) => {
  const { setActiveIndex, tabIdPrefix } = useTabContext();
  const focusTab = (index: number) => {
    const tab = tabListRef.current?.querySelector(
      `[id="${tabIdPrefix}-${index}"]`,
    );
    if (tab) {
      (tab as HTMLElement).focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        setActiveIndex((prevIndex: number) => {
          if (prevIndex === 0) {
            const nextIndex = tabCount - 1;
            focusTab(nextIndex);
            return nextIndex;
          }
          const nextIndex = prevIndex - 1;
          focusTab(nextIndex);
          return nextIndex;
        });

        break;
      case "ArrowRight":
        event.preventDefault();
        setActiveIndex((prevIndex: number) => {
          if (prevIndex === tabCount - 1) {
            const nextIndex = 0;
            focusTab(nextIndex);
            return nextIndex;
          }
          const nextIndex = prevIndex + 1;
          focusTab(nextIndex);
          return nextIndex;
        });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const tabList = tabListRef.current;
    tabList?.addEventListener("keydown", handleKeyDown);

    return () => {
      tabList?.removeEventListener("keydown", handleKeyDown);
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, [tabListRef, handleKeyDown]);
};

/**
 * タブのリストコンポーネント
 */
type ListProps = {
  tabItems: {
    id: number;
    content: React.ReactNode;
  }[];
};
const List = ({ tabItems }: ListProps) => {
  const { titleId } = useTabContext();
  const tabListRef = useRef<HTMLDivElement>(null);
  useKeyboardNavigation(tabListRef, tabItems.length);

  return (
    <div role="tablist" aria-labelledby={titleId} ref={tabListRef}>
      {tabItems.map((tabItem, index) => {
        return (
          <Tab key={tabItem.id} index={index}>
            {tabItem.content}
          </Tab>
        );
      })}
    </div>
  );
};

/**
 * タブUIにおけるコンテンツ(パネル)のリストコンポーネント
 */
type PanelListProps = {
  panelItems: {
    id: number;
    content: React.ReactNode;
  }[];
};
const PanelList = ({ panelItems }: PanelListProps) => {
  return (
    <div>
      {panelItems.map((panelItem, index) => {
        return (
          <Panel key={panelItem.id} index={index}>
            {panelItem.content}
          </Panel>
        );
      })}
    </div>
  );
};

type TabProps = {
  children: React.ReactNode;
  index?: number;
};

/**
 * タブUIにおけるコンテンツ(パネル)のコンポーネント
 */
const Panel = ({ children, index }: TabProps) => {
  const { activeIndex, tabIdPrefix, panelIdPrefix } = useTabContext();
  if (index === undefined) {
    throw new Error("Tab must have an index prop");
  }

  return (
    <div
      role="tabpanel"
      aria-labelledby={`${tabIdPrefix}-${index}`}
      id={`${panelIdPrefix}-${index}`}
      className={index === activeIndex ? "" : "hidden"}
    >
      {children}
    </div>
  );
};

/**
 * タブ相当のコンポーネント
 */
const Tab = ({ children, index }: TabProps) => {
  const { activeIndex, setActiveIndex, tabIdPrefix, panelIdPrefix } =
    useTabContext();

  if (index === undefined) {
    throw new Error("Tab must have an index prop");
  }

  const variableClasses =
    index === activeIndex
      ? "text-blue-600 bg-gray-100 font-bold"
      : "hover:text-gray-600 hover:bg-gray-50";
  const tabClasses = cn(
    "w-1/4 border-b-2 px-1 py-4 text-center text-xs sm:text-base cursor-pointer",
    variableClasses,
  );

  return (
    <button
      type="button"
      role="tab"
      aria-controls={`${panelIdPrefix}-${index}`}
      aria-selected={index === activeIndex}
      id={`${tabIdPrefix}-${index}`}
      onClick={() => setActiveIndex(index)}
      tabIndex={index === activeIndex ? 0 : -1}
      className={tabClasses}
    >
      {children}
    </button>
  );
};

Tab.Group = Group;
Tab.Title = Title;
Tab.List = List;
Tab.PanelList = PanelList;

export default Tab;
