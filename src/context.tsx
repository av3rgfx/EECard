import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { DemoState, Property, Doc, Route, Scenario } from "./data";
export type Panel = { kind: string; id?: string } | null;
export interface AppContext {
  state: DemoState;
  setState: Dispatch<SetStateAction<DemoState>>;
  route: Route;
  go: (r: Route) => void;
  scenario: Scenario;
  setScenario: (s: Scenario) => void;
  houses: Property[];
  docs: Doc[];
  activeHouses: Property[];
  panel: Panel;
  open: (kind: string, id?: string) => void;
  close: () => void;
}
export const Context = createContext<AppContext>(null!);
export const useApp = () => useContext(Context);
