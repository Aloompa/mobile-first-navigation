export interface MFNTab {
  button: (isSelected: boolean, onPress: Function) => React.ReactNode;
  initial: string;
}

export interface MFNRoute {
  route: React.ReactNode;
  getTitle: Function;
  mode?: string;
}
