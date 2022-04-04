import { MetaMaskInpageProvider } from '@metamask/providers';

import ProviderNotFound from '../errors/ProviderNotFound';
import { chains } from '../constants/chains';
import { GenericChains } from '../types/chains';
import { EventsCallbacks } from '../types/events';

import { getEvents } from '../helpers/getEvents';

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

  #isUnlocked = async (): Promise<boolean> => {
    const isUnlocked = await this.#provider._metamask.isUnlocked();
    return isUnlocked;
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
    const { requestPermission = true } = settings;
    try {
      const accounts: string[] = await this.#provider.request({
        method: requestPermission ? 'eth_requestAccounts' : 'eth_accounts',
        params: [],
      });
      if (accounts.length) this.#accounts = accounts;
    } catch (error) {
      console.error(error);
      throw Error(error);
    }
  };

  getPermissions = () => this.#provider.request({
    method: 'wallet_requestPermissions',
    params: [{ eth_accounts: {} }],
  });

  getAccounts = (): string[] => this.#accounts;

  isConnected = (): boolean => this.#provider.isConnected();
}

export default Provider;
