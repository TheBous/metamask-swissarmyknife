import { MetaMaskInpageProvider } from '@metamask/providers';

import ProviderNotFound from '../errors/ProviderNotFound';
import { chains } from '../constants/chains';
import { GenericChains } from '../types/chains';
import { EventsCallbacks } from '../types/events';

import { getEvents } from './getEvents';

type GenericSettings = {
  requestPermission?: boolean;
};

class Provider {
  #chains: GenericChains = null;

  #provider: MetaMaskInpageProvider = null;

  #accounts: any[] = [];

  constructor(additionalChains: GenericChains = {}, eventsCallbacks: EventsCallbacks = {}) {
    const {
      onAccountsChanged = () => null,
      onChainChanged = () => null,
      onConnect = () => null,
      onDisconnect = () => null,
    } = eventsCallbacks;
    this.#chains = { ...chains, ...additionalChains };
    const { ethereum = {} } = window;
    if (typeof ethereum === undefined)
      throw new ProviderNotFound('Provider not found, install provider and try again');
    this.#provider = window.ethereum;
    this.#initializeEvents({
      onAccountsChanged,
      onChainChanged,
      onConnect,
      onDisconnect,
    });
  }

  #initializeEvents = (callbacks: EventsCallbacks) => {
    getEvents(this.#provider, callbacks);
  };

  connect = (): Promise<void> =>
    new Promise((resolve, reject) => {
      try {
        return resolve();
      } catch (e) {
        reject(e);
      }
    });

  retrieveAccounts = async (settings: GenericSettings = {}): Promise<void> => {
    const { requestPermission = false } = settings;
    try {
      const accounts: string[] = await this.#provider.request({
        method: requestPermission ? 'eth_requestAccounts' : 'eth_accounts',
        params: [],
      });
      if (accounts.length) this.#accounts = accounts;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw Error(error);
    }
  };

  getAccounts = () => this.#accounts;
}

export default Provider;
