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
  initialRoute?: string;
  tabs?: Array<MFNTab>;
  initialActiveTab?: number;
  routes: Record<string, MFNRoute>;
  renderTopNav: React.ReactNode;
  topNavHeight?: number;
  width?: number;
  height?: number;
}
