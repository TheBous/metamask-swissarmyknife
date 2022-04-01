import { MetaMaskInpageProvider } from '@metamask/providers';
import { serializeError } from 'eth-rpc-errors';
import { SerializedEthereumRpcError } from 'eth-rpc-errors/dist/classes';

import { ProviderRpcError } from '../types/error';
import { ConnectInfo } from '../types/connect';
import { EventsCallbacks } from '../types/events';

import { fromHex } from '../helpers/hex';

export const getEvents = (provider: MetaMaskInpageProvider, {
  onAccountsChanged,
  onChainChanged,
  onConnect,
  onDisconnect,
}: EventsCallbacks) => {
  provider.on('accountsChanged', (accounts: string[]) => {
    console.warn('Triggered On accounts changed', accounts);
    onAccountsChanged(accounts);
  });

  provider.on('chainChanged', (chainId: string) => {
    console.warn('Triggered On Chain changed', fromHex(chainId), chainId);
    onChainChanged(chainId);
  });

  provider.on('connect', (connectInfo: ConnectInfo) => {
    console.warn('Triggered On Connect');
    onConnect(connectInfo);
  });

  provider.on('disconnect', (error: ProviderRpcError) => {
    console.warn('Triggered On Disconnect', error);
    const formattedError: SerializedEthereumRpcError = serializeError(error);
    onDisconnect(formattedError);
  });
};
