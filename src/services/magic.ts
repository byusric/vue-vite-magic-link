import { Magic } from 'magic-sdk';
import Web3 from 'web3';
import { ConnectExtension } from "@magic-ext/connect";

export const auth = new Magic(import.meta.env.VITE_MAGIC_AUTH_KEY,{
    // extensions: [new ConnectExtension()]
    network:'rinkeby'
});

export const connect = new Magic(import.meta.env.VITE_MAGIC_CONNECT_KEY,{
    extensions: [new ConnectExtension()],
    network:'rinkeby'
});

export const web3 = new Web3(connect.rpcProvider)