import { SerializedEthereumRpcError } from 'eth-rpc-errors/dist/classes';
import { ConnectInfo } from './connect';

export type EventsCallbacks = {
  onAccountsChanged?: (accounts: string[]) => void;
  onChainChanged?: (chainId: string) => void;
  onConnect?: (connectInfo: ConnectInfo) => void;
  onDisconnect?: (error: SerializedEthereumRpcError) => void;
};
