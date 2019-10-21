export interface MFNavigationTab {
  button: (isSelected: boolean, onPress: Function) => React.ReactNode;
  initial: string;
}

export interface MFNavigationRoute {
  route: React.ReactNode;
  getTitle: Function;
  mode?: string;
}

export interface MFNavigationRouteComponent {
  route: React.ReactNode;
  Component: React.ReactNode;
  getTitle: Function;
  mode?: string;
}

export interface MFNavigationHistoryRoute {
  route: string;
}

export interface MFNavigationConfig {
  initialRoute?: string;
  tabs?: Array<MFNavigationTab>;
  initialActiveTab?: number;
  routes: Record<string, MFNavigationRoute>;
  renderTopNav: React.ReactNode;
  topNavHeight?: number;
  width?: number;
  height?: number;
}

export interface MFNavigationReducerConfig {
  initialTabRoutes?: string[];
  routeConfig: MFNavigationConfig;
  adapter?: {
    getRoute: Function;
    setRoute: Function;
    getTab: Function;
    setTab: Function;
  };
}
