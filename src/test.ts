import './interfaces/augment-api';
import './interfaces/augment-types';
import { ApiPromise, WsProvider } from "@polkadot/api";

const testCall = async (): Promise<void> => {
  const provider = new WsProvider('wss://rpc.astar.network');
  const apiPromise = new ApiPromise({ provider });
  await apiPromise.isReady;

  // Polkadot pallet query
  const balance = await apiPromise.query.system.account('YDFDMh78emMcyN67CtwiiKrCWH6tDNVPcKeEUckY9YjRdPe');
  console.log(balance.toHuman());

  // Custom Astar pallet query.
  const eraInfo = await apiPromise.query.dappsStaking.generalEraInfo(100);
  console.log(eraInfo.toHuman());
  const unwrapped = eraInfo.unwrapOrDefault();

  if (unwrapped) {
    console.log(unwrapped.toHuman())
  } else {
    console.error('no era info');
  }
};

testCall();
