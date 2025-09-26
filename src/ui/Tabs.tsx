// We implemented this Tabs component using compound component pattern to be more flexible

import { createContext, ReactNode, useContext, useState } from "react";

interface TabsContextType {
  selectedId: string;
  openTab: (id: string) => void;
  closeTab: () => void;
}

interface TabsProps {
  children: ReactNode;
  defaultTab: string;
}

interface TabsListProps {
  children: ReactNode;
  bgColor?: string;
}

interface TabProps {
  id: string;
  children: ReactNode;
  textColor: string;
  activeBgcolor?: string;
  activeTextColor?: string;
}

interface TabContentProps {
  children: ReactNode;
  id: string;
}

// create context
const TabsContext = createContext<TabsContextType | null>(null);

// parent component
function Tabs({ children, defaultTab }: TabsProps) {
  const [selectedId, setSelectedId] = useState<string>(defaultTab);

  function openTab(id: string) {
    setSelectedId(id);
  }

  function closeTab() {
    setSelectedId("");
  }

  return (
    <TabsContext.Provider value={{ selectedId, openTab, closeTab }}>
      {children}
    </TabsContext.Provider>
  );
}

// child components
function TabsList({ children, bgColor }: TabsListProps) {
  return (
    <div className="max-md:overflow-x-auto">
      <ul
        className={`${
          bgColor ? bgColor : "bg-ternary"
        } px-2 py-3 rounded-sm flex items-center gap-4 w-fit `}
      >
        {children}
      </ul>
    </div>
  );
}

function Tab({
  children,
  id,
  textColor,
  activeBgcolor = "bg-secondary",
  activeTextColor = "text-primary_4",
}: TabProps) {
  const context = useContext(TabsContext);

  function handleClick(id: string) {
    if (context?.selectedId !== id) {
      context?.openTab(id);
    }

    //  if (context?.selectedId !== id) {
    //   context?.openTab(id);
    // } else {
    //   context.closeTab();
    // }
  }

  return (
    <li
      onClick={() => handleClick(id)}
      className={`${context?.selectedId === id ? activeTextColor : textColor} ${
        context?.selectedId === id ? activeBgcolor : textColor
      } px-4 py-1 rounded-sm uppercase cursor-pointer text-primary_2 whitespace-nowrap`}
    >
      {children}
    </li>
  );
}

function TabContent({ children, id }: TabContentProps) {
  const context = useContext(TabsContext);

  return (
    <div
      className={`mt-2 rounded-sm ${
        context?.selectedId === id ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  );
}

// add child components to parent component
Tabs.TabsList = TabsList;
Tabs.Tab = Tab;
Tabs.TabContent = TabContent;

export default Tabs;
