import CoinKey from 'coinkey'
import cryptoRandomString from 'crypto-random-string'
import {entropyToMnemonic} from 'bip39';
import sthCrypto from 'sthjs';
import bitcore from 'bitcore-lib-cash';
import ethWallet from 'ethereumjs-wallet';
import * as wavesCrypto from '@waves/waves-crypto';
//import * as ergo from "@coinbarn/ergo-ts";
//import * as bip32 from "bip32";
const Bip38 = require('bip38');
//const ci = require('coininfo');
//import sha256 from 'crypto-js/sha256';
//import sha384 from 'crypto-js/sha384';
const secureRandom = require('secure-random')

let {privateKeyToAddress} = require('@faast/tron-payments');

import {coins} from "@/config";
import wif from "wif";

export default {
    data() {
        return {
            coins: coins,
            accounts: [],
        }
    },
    methods: {


        async WavesGenerator() {
            let result = {
                keySeed: null,
                address: null,
                wif: null,
                bip39: null,
                privateKey: null,
                publicKey: null,
                keyType: 'wif',
            };

            const {randomSeed} = wavesCrypto.crypto();
            const privateKeySeed = randomSeed();
            const {address, keyPair} = wavesCrypto.crypto();
            const kp = keyPair(privateKeySeed);
            result.address = address(privateKeySeed);
            result.wif = kp.privateKey;
            result.keySeed = privateKeySeed;
            result.privateKey = result.wif;
            return result;
        },

        async EthGenerator() {
            const wallet = ethWallet.generate();
            let result = {
                keySeed: null,
                address: null,
                wif: null,
                bip39: null,
                privateKey: null,
                publicKey: null,
                keyType: 'wif',
            };
            result.wif = wallet.getPrivateKeyString();
            result.address = wallet.getAddressString();
            result.privateKey = result.wif;
            return result;
        },

        async BtcGenerator(ticker, password = '', privateKey = '', type = 'default') {
            let result = {
                keySeed: null,
                address: null,
                wif: null,
                bip39: null,
                privateKey: null,
                publicKey: null,
                keyType: 'wif',
            };
            if (type === 'default') {
                const privateKeySeed = cryptoRandomString({length: 64});
                /*
                const key = (new CoinKey(new Buffer.from(privateKeySeed, 'hex'), {
                    private: this.coins[ticker].private,
                    public: this.coins[ticker].public
                }));
                 */
                //const key = CoinKey.createRandom(ci(ticker).versions)

                let bytes = secureRandom.randomBuffer(32)
                let key = new CoinKey(bytes, {
                    private: this.coins[ticker].private,
                    public: this.coins[ticker].public
                })

                result.keySeed = privateKeySeed;
                result.address = key.publicAddress;
                result.wif = key.privateWif;
                result.bip39 = entropyToMnemonic(privateKeySeed)
                result.privateKey = key.privateWif;
            }

            if (type === 'brain') {
                const key = (new CoinKey(new Buffer.from(privateKey, 'hex'), {
                    private: this.coins[ticker].private,
                    public: this.coins[ticker].public
                }));

                result.keySeed = privateKey;
                result.address = key.publicAddress;
                result.wif = key.privateWif;
                result.bip39 = entropyToMnemonic(privateKey)
                result.privateKey = privateKey;
            }

            if (type === 'wif') {
                const key = CoinKey.fromWif(privateKey, {
                    private: this.coins[ticker].private,
                    public: this.coins[ticker].public
                });
                result.address = key.publicAddress;
                result.wif = privateKey;
                result.privateKey = privateKey;
            }

            if (type === 'bip38') {
                try {
                    let decryptedKey = await Bip38.decrypt(privateKey, password);
                    let pKey = wif.encode(this.coins[ticker].private, decryptedKey.privateKey, decryptedKey.compressed);
                    const key = CoinKey.fromWif(pKey,
                        {
                            private: this.coins[ticker].private,
                            public: this.coins[ticker].public
                        });
                    result.address = key.publicAddress;
                    result.wif = pKey;
                    result.privateKey = pKey;
                } catch(e) {
                    alert('Password is not valid');
                }
            }



            return result;
        },

        async SthGenerator(ticker, password = '', privateKey = '', type = 'default') {

            let result = {
                keySeed: null,
                address: null,
                wif: null,
                bip39: null,
                privateKey: null,
                publicKey: null,
                keyType: 'bip39',
            };

            if (type === 'default') {
                const privateKeySeed = cryptoRandomString({length: 32});
                const mnemonic = entropyToMnemonic(privateKeySeed);
                const PUB_KEY = sthCrypto.crypto.getKeys(mnemonic).publicKey;
                result.keySeed = privateKeySeed;
                result.address = sthCrypto.crypto.getAddress(PUB_KEY, this.coins[ticker].public);
                result.wif = sthCrypto.crypto.getKeys(mnemonic).toWIF();
                result.bip39 = mnemonic;
                result.publicKey = PUB_KEY;
                result.privateKey = mnemonic;
            }

            if (type === 'brain') {
                const PUB_KEY = sthCrypto.crypto.getKeys(privateKey).publicKey;
                result.address = sthCrypto.crypto.getAddress(PUB_KEY, this.coins[ticker].public);
                result.wif = sthCrypto.crypto.getKeys(privateKey).toWIF();
                result.bip39 = '';
                result.publicKey = PUB_KEY;
                result.privateKey = privateKey;
            }
            return result;
        },

        async BchGenerator() {
            let result = {
                keySeed: null,
                address: null,
                wif: null,
                bip39: null,
                privateKey: null,
                publicKey: null,
                keyType: 'wif',
            };
            const privateKey = new bitcore.PrivateKey();
            const address = privateKey.toAddress();
            result.address = address.toString();
            result.wif = privateKey.toString();
            result.privateKey = result.wif;
            return result;
        },



        async TrxGenerator() {
            let result = {
                keySeed: null,
                address: null,
                wif: null,
                bip39: null,
                privateKey: null,
                publicKey: null,
                keyType: 'wif',
            };
            const privateKeyHex = cryptoRandomString({length: 64})
            result.address = privateKeyToAddress(privateKeyHex);
            result.wif = privateKeyHex.toUpperCase();
            result.privateKey = result.wif;
            return result;
        },

        async generateAddress(ticker, count = 1, password, privateKey, type = 'default') {
            this.accounts = [];
            if (this.coins[ticker].generator === 'btcGenerator') {
                for (let i = 0; i < count; i++) {
                    this.accounts.push(await this.BtcGenerator(ticker, password, privateKey, type));
                }
            }

            if (this.coins[ticker].generator === 'sthGenerator') {
                for (let i = 0; i < count; i++) {
                    this.accounts.push(await this.SthGenerator(ticker, password, privateKey, type));
                }
            }

            if (this.coins[ticker].generator === 'bchGenerator') {
                for (let i = 0; i < count; i++) {
                    this.accounts.push(await this.BchGenerator());
                }
            }

            if (this.coins[ticker].generator === 'ethGenerator') {
                for (let i = 0; i < count; i++) {
                    this.accounts.push(await this.EthGenerator());
                }
            }

            if (this.coins[ticker].generator === 'wavesGenerator') {
                for (let i = 0; i < count; i++) {
                    this.accounts.push(await this.WavesGenerator());
                }
            }

            if (this.coins[ticker].generator === 'trxGenerator') {
                for (let i = 0; i < count; i++) {
                    this.accounts.push(await this.TrxGenerator());
                }
            }

            if (this.coins[ticker].generator === 'kasGenerator') {
                for (let i = 0; i < count; i++) {
                    this.accounts.push(await this.TrxGenerator());
                }
            }



            return this.accounts;
        }
    }

}
