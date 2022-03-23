import { MetaMaskInpageProvider } from '@metamask/providers';
import ProviderNotFound from '../errors/ProviderNotFound';
import { chains } from '../constants/chains';

import { GenericChains } from '../types/index';

type GenericSettings = {
  requestPermission?: boolean;
};

class Provider {
  #chains: GenericChains = null;

  #provider: MetaMaskInpageProvider = null;

  #accounts: any[] = [];

  constructor(additionalChains: GenericChains = {}) {
    this.#chains = { ...chains, ...additionalChains };
    const { ethereum = {} } = window;
    if (typeof ethereum === undefined) throw new ProviderNotFound('Provider not found, install provider and try again');
    this.#provider = window.ethereum;
  }

  connect = (): Promise<void> => new Promise((resolve, reject) => {
    try {
      return resolve();
    } catch (e) {
      reject(e);
    }
  });

  retrieveAccounts = async (settings: GenericSettings = {}): Promise<void> => {
    const { requestPermission = true } = settings;
    try {
      const accounts: string[] = await this.#provider.request({
        method: requestPermission ? 'eth_requestAccounts' : 'eth_accounts',
        params: [],
      });
      if (accounts.length) this.#accounts = accounts;
    } catch (error) {
      throw Error(error);
    }
  };

  getAccounts = () => this.#accounts;
}

export default Provider;
