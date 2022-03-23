import { GenericChains } from '../types/index';
declare type GenericSettings = {
    requestPermission?: boolean;
};
declare class Provider {
    #private;
    constructor(additionalChains?: GenericChains);
    connect: () => Promise<void>;
    retrieveAccounts: (settings?: GenericSettings) => Promise<void>;
    getAccounts: () => any[];
}
export default Provider;
