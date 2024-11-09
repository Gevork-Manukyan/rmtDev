import { createContext } from "react";
import { useActiveJobItemId } from "../lib/hooks";

type ActiveIdContext = {
    activeJobItemId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContext | null>(null);

export default function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const activeJobItemId = useActiveJobItemId()

  return (
    <ActiveIdContext.Provider value={{activeJobItemId}}>{children}</ActiveIdContext.Provider>
  );
}
