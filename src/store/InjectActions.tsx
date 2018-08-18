export interface InjectActions<T>  {
    [key: string]: (v: any) => (state: T) => void;
};
