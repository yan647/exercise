export interface IElectronAPI{
  setTitle:(title:string) => Promise<void>;
}

export interface IVersions {
  node:()=>string;
  chrome:()=>string;
  electron:()=>string;
}

declare global{
  interface Window{
    electronAPI: IElectronAPI;
    versions:IVersions;
  }
}
