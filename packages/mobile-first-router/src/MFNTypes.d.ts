export interface MFNTab {
  button: (isSelected: boolean, onPress: Function) => React.ReactNode;
  initial: string;
}

export interface MFNRoute {
  route: React.ReactNode;
  getTitle: Function;
  mode?: string;
}
export interface MFNConfig {
  tabs?: Array<MFNTab>;
  routes: Record<string, MFNRoute>;
  renderTopNav: React.ReactNode;
  topNavHeight?: number;
  width?: number;
  height?: number;
}
