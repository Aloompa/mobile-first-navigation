export interface MFNTab {
  button: (isSelected: boolean) => React.ReactNode;
  initial: string;
}

export interface MFNRoute {
  route: React.ReactNode;
  getTitle: Function;
  mode?: string;
}
