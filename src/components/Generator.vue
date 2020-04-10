<!--
  - Copyright (c) 2019 TechnoL0g.
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  - copies of the Software, and to permit persons to whom the Software is
  - furnished to do so, subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  - IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  - FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  - AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  - LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  - OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  - SOFTWARE.
  -->

<template>
  <div class="hello">
    <div class="container noselect" v-if="mobile">
      <dm-button @click="showHideCoins" class="mb-2" color="black" full-width>SELECT COIN</dm-button>
    </div>

    <div class="container-fluid noselect" v-if="isShow">
      <div class="row">
        <span :key="idx" @click="selectCoin(idx)" class="select-coin" v-for="(item, idx) in coins">
            <img :src="item.logo" alt="item.title" width="18px"/> {{item.title}}
        </span>
      </div>
    </div>


    <div class="container-fluid">
      <img :src="coins[currentCoin].logo" @click="openLink(coins[currentCoin].downloadWallet)" alt="coin logo"
           class="pointer noselect" width="96px"/>
      <h2 class="noselect">{{coins[currentCoin].title}} <span
        class="text-white small">[{{currentCoin.toUpperCase()}}]</span></h2>

      <dm-button @click="generateAddress" color="black" size="large">Generate new {{coins[currentCoin].title}}
        account
      </dm-button>
      <PdfBitshares :coin="coins[currentCoin]" v-if="coins.bts.account.name && !mobile"/>
      <DownloadPdf :address="address" :coin="coins[currentCoin]" v-if="address.publicAddress && !mobile"/>
      <DownloadTxt :address="address" :coin="coins[currentCoin]" methodOut="download"
                   v-if="address.publicAddress && !mobile"/>
      <!--<DownloadPdf v-if="address.publicAddress && !mobile" :address="address" :coin="coins[currentCoin]" methodOut="print"/>-->

      <div class="container mt-4">
        <div v-if="coins[this.currentCoin].generator !== 'btsGenerator'">
          <div class="result-generate" v-if="address.publicAddress">
            <div class="row">

              <div class="col-md-5">

                <div class="qr-container">
                  <VueQrcode :options="{size:138, foreground: '#232D3D',level: 'H'}" :value="address.publicAddress"
                             id="qrPub"/>
                  <p class="text-white-50">Public Address</p>
                </div>

                <div class="qr-container">
                  <VueQrcode :options="{size:138, foreground: '#232D3D',level: 'H'}" :value="address.privateWif"
                             id="qrPriv"/>
                  <p class="text-white-50">Private Key</p>
                </div>
              </div>

              <div class="col-md-7">
                <table class="table table-responsive-sm text-info">
                  <tr>
                    <td class="text-right">Address</td>
                    <td>
                      <img class="clipboard" src="static/svg/copy.svg" v-clipboard="() => address.publicAddress"
                           v-clipboard:success="clipboardSuccessHandler"
                           width="20px"/>
                    </td>
                    <td class="text-left">
              <span class="barley-white">
                {{address.publicAddress}}
              </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right">PrivateKey</td>
                    <td>
                      <img class="clipboard" src="static/svg/copy.svg" v-clipboard="() => address.privateWif"
                           v-clipboard:success="clipboardSuccessHandler"
                           width="20px"/>
                    </td>
                    <td class="text-left">
                      <span class="barley-white">{{address.privateWif}}</span>
                    </td>
                  </tr>
                  <tr v-if="address.keyHex && coins[currentCoin].generator !== 'btcGenerator'">
                    <td>Seed</td>
                    <td><img class="clipboard" src="static/svg/copy.svg" v-clipboard="() => address.keyHex"
                             v-clipboard:success="clipboardSuccessHandler"
                             width="20px"/></td>
                    <td class="barley-white">{{address.keyHex}}</td>
                  </tr>
                  <tr v-if="coins[currentCoin].generator === 'btcGenerator'">
                    <td></td>
                    <td @click="showHideHelp"><img class="pointer" src="static/svg/help.svg" width="20px"/></td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>

          </div>
        </div>

        <small class="text-success">~ {{copied}} ~</small>

        <!-- Bitshares Generator Result -->
        <div v-if="onProcess"><h1>Loading...</h1></div>
        <div v-if="coins[this.currentCoin].generator === 'btsGenerator'">
          <h2 class="text-warning">For advanced users only!</h2>
          <div class="result-generate" v-if="coins.bts.account.owner.pubKey">
            <div class="row">
              <div class="col-md-12">
                <div class="mb-2 text-left">
                  <CopyClipboard :value="coins.bts.account.name"/>
                  Rand Account Name: <span class="text-white">{{coins.bts.account.name}}</span></div>
                <div class="mb-2 text-left">
                  <CopyClipboard :value="coins.bts.account.bip39"/>
                  Mnemonic Phrase: <span class="text-white text-sm-right">{{coins.bts.account.bip39}}</span></div>
              </div>
              <div class="col-md-12">
                <table class="table table-responsive-sm text-white">
                  <tr class="thead-dark">
                    <th>
                      <span class="text-white">Public</span>
                    </th>
                    <th>
                      <span class="text-white">Owner Keys</span>
                    </th>
                    <th>
                      <span class="text-white">Private</span>
                    </th>
                  </tr>
                  <tr class="bg-dark">
                    <td>
                      <VueQrcode :options="{size:160, foreground: '#232D3D',level: 'H'}" :value="coins.bts.account.owner.pubKey"
                                 id="qrPubOwner"/>
                    </td>
                    <td class="text-left pt-5">
                      <div class="mb-3">
                        <CopyClipboard :value="coins.bts.account.owner.pubKey" class="clipboard-bts"/>
                        <span class="text-info float-left mr-1">Public:</span>
                        <span class="text-center">{{coins.bts.account.owner.pubKey}}</span>
                      </div>

                      <div>
                        <CopyClipboard :value="coins.bts.account.owner.privateKey" class="clipboard-bts"/>
                        <span class="text-info float-left mr-1">Private:</span>
                        <span class="text-center">{{coins.bts.account.owner.privateKey}}</span>
                      </div>
                    </td>
                    <td>
                      <VueQrcode :options="{size:160, foreground: '#232D3D',level: 'H'}" :value="coins.bts.account.owner.privateKey"
                                 id="qrPrivOwner"/>
                    </td>
                  </tr>
                </table>

                <table class="table table-responsive-sm text-white">
                  <tr class="thead-dark">
                    <th>
                      <span class="text-white">Public</span>
                    </th>
                    <th>
                      <span class="text-white">Active Keys</span>
                    </th>
                    <th>
                      <span class="text-white">Private</span>
                    </th>
                  </tr>
                  <tr class="bg-dark">
                    <td>
                      <VueQrcode :options="{size:160, foreground: '#232D3D',level: 'H'}" :value="coins.bts.account.active.pubKey"
                                 id="qrPubActive"/>
                    </td>
                    <td class="text-left pt-5">
                      <div class="mb-3">
                        <CopyClipboard :value="coins.bts.account.active.pubKey" class="clipboard-bts"/>
                        <span class="text-info float-left mr-1">Public:</span>
                        <span class="text-center">{{coins.bts.account.active.pubKey}}</span>
                      </div>

                      <div>
                        <CopyClipboard :value="coins.bts.account.active.privateKey" class="clipboard-bts"/>
                        <span class="text-info float-left mr-1">Private:</span>
                        <span class="text-center">{{coins.bts.account.active.privateKey}}</span>
                      </div>
                    </td>
                    <td>
                      <VueQrcode :options="{size:160, foreground: '#232D3D',level: 'H'}" :value="coins.bts.account.active.privateKey"
                                 id="qrPrivActive"/>
                    </td>
                  </tr>
                </table>

                <table class="table table-responsive-sm text-white">
                  <tr class="thead-dark">
                    <th>
                      <span class="text-white">Public</span>
                    </th>
                    <th>
                      <span class="text-white">Memo Keys</span>
                    </th>
                    <th>
                      <span class="text-white">Private</span>
                    </th>
                  </tr>
                  <tr class="bg-dark">
                    <td>
                      <VueQrcode :options="{size:160, foreground: '#232D3D',level: 'H'}" :value="coins.bts.account.memo.pubKey"
                                 id="qrPubMemo"/>
                    </td>
                    <td class="text-left pt-5">
                      <div class="mb-3">
                        <CopyClipboard :value="coins.bts.account.memo.pubKey" class="clipboard-bts"/>
                        <span class="text-info float-left mr-1">Public:</span>
                        <span class="text-center">{{coins.bts.account.memo.pubKey}}</span>
                      </div>

                      <div>
                        <CopyClipboard :value="coins.bts.account.memo.privateKey" class="clipboard-bts"/>
                        <span class="text-info float-left mr-1">Private:</span>
                        <span class="text-center">{{coins.bts.account.memo.privateKey}}</span>
                      </div>
                    </td>
                    <td>
                      <VueQrcode :options="{size:160, foreground: '#232D3D',level: 'H'}" :value="coins.bts.account.memo.privateKey"
                                 id="qrPrivMemo"/>
                    </td>
                  </tr>
                </table>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
    <dm-divider></dm-divider>
    <div class="container instruction p-3 mb-5" v-if="help">
      <ul>
        <li>
          <dm-list-item :number=1 icon-size="15">Open Your {{coins[currentCoin].title}} Wallet</dm-list-item>
        </li>
        <li>
          <dm-list-item :number=2>Select: <span class="text-info">Help > Debug window > Console</span></dm-list-item>
        </li>
        <li>
          <dm-list-item :number=3>Enter: <span
            class="text-info">importprivkey {{address.privateWif}} PaperWallet</span>
          </dm-list-item>
        </li>
        <li>
          <dm-list-item :number=4>Wait for the import/rescan to complete and then restart the wallet</dm-list-item>
        </li>
      </ul>
    </div>

    <!--
    <div v-if="coins.bts.account.owner.pubKey" class="container instruction p-3 mb-5 pointer" @click="openLink('https://bitsharestalk.org/index.php?topic=24495.0')">
      <img src="static/svg/help.svg" width="20px" class="pointer"/> How to use a Bitshares paper wallet, please see the forum Bitshares.
    </div>
    -->
  </div>
</template>

<script>
import CoinKey from 'coinkey'
import cryptoRandomString from 'crypto-random-string'
import VueQrcode from '@/components/utils/QRCode'
import DownloadPdf from '@/components/DownloadPdf'
import PdfBitshares from '@/components/PdfBitshares'
import DownloadTxt from '@/components/DownloadTxt'
import CopyClipboard from '@/components/CopyClipboard'

import sthCrypto from 'sthjs'
import {entropyToMnemonic} from 'bip39'
import * as wavesCrypto from '@waves/waves-crypto'
import ethWallet from 'ethereumjs-wallet'
import * as liskCrypto from '@liskhq/lisk-cryptography'

import {openUrl} from 'src/util/url'
import {Login} from "bitsharesjs"

export default {
    name: 'Generator',
    components: {
        CopyClipboard,
        VueQrcode,
        DownloadPdf,
        DownloadTxt,
        PdfBitshares,
    },
    data() {
        return {
            onProcess: false,
            help: false,
            mobile: false,
            isShow: true,
            currentCoin: "sth",
            address: {
                keyHex: null,
                publicAddress: null,
                privateWif: null,
                seed: null
            },
            copied: null,
            coins: {
                "sth": {
                    title: "SmartHoldem",
                    logo: "static/coins/sth.png",
                    public: 0x3f,
                    private: 0xff,
                    generator: 'sthGenerator',
                    downloadWallet: 'https://github.com/smartholdem/smartholdem-wallet/releases',
                },
                "btc": {
                    title: "Bitcoin",
                    logo: "static/coins/btc.png",
                    public: 0x0,
                    private: 0x80,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://bitcoin.org/en/choose-your-wallet',
                },
                "btg": {
                    title: "BitcoinGold",
                    logo: "static/coins/btg.png",
                    public: 0x26,
                    private: 0x80,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://bitcoingold.org/ecosystem/#wallets',
                },
                "bts": {
                    title: "Bitshares",
                    logo: "static/coins/bts.png",
                    help: false,
                    public: null,
                    private: null,
                    generator: 'btsGenerator',
                    downloadWallet: 'https://bitshares.org',
                    account: {
                        name: null,
                        bip39: null,
                        owner: {
                            pubKey: null,
                            privateKey: null,
                        },
                        active: {
                            pubKey: null,
                            privateKey: null,
                        },
                        memo: {
                            pubKey: null,
                            privateKey: null,
                        },
                    },
                },
                "block": {
                    title: "Blocknet",
                    logo: "static/coins/block.png",
                    public: 0x1a,
                    private: 0x9a,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://blocknet.co',
                },
                "dash": {
                    title: "Dash",
                    logo: "static/coins/dash.png",
                    public: 0x4c,
                    private: 0xcc,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://www.dash.org/downloads/',
                },
                "dgb": {
                    title: "DigiByte",
                    logo: "static/coins/dgb.png",
                    public: 0x1e,
                    private: 0x9e,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://www.digibyte.io/digibyte-wallet-downloads',
                },
                "onion": {
                    title: "DeepOnion",
                    logo: "static/coins/onion.png",
                    public: 0x1f,
                    private: 0x9f,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://github.com/deeponion/deeponion/releases',
                },
                "doge": {
                    title: "Dogecoin",
                    logo: "static/coins/doge.png",
                    public: 0x1e,
                    private: 0x9e,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://dogecoin.com/',
                },
                "eth": {
                    title: "Ethereum",
                    logo: "static/coins/eth.png",
                    public: null,
                    private: null,
                    generator: 'ethGenerator',
                    downloadWallet: 'https://metamask.io/',
                },
                "emc": {
                    title: "Emercoin",
                    logo: "static/coins/emc.png",
                    public: 0x21,
                    private: 0x80,
                    generator: 'btcGenerator',
                    downloadWallet: 'http://emercoin.com/en/for-coinholders#download',
                },
                "egc": {
                    title: "EverGreen",
                    logo: "static/coins/egc.png",
                    public: 0x21,
                    private: 0xa1,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://evergreencoin.org',
                },
                "lsk": {
                    title: "Lisk",
                    logo: "static/coins/lisk.png",
                    public: null,
                    private: null,
                    generator: 'liskGenerator',
                    downloadWallet: 'https://lisk.io',
                },
                "ltc": {
                    title: "Litecoin",
                    logo: "static/coins/ltc.png",
                    public: 0x30,
                    private: 0xb0,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://litecoin.org',
                },
                "nmc": {
                    title: "NameCoin",
                    logo: "static/coins/nmc.png",
                    public: 0x34,
                    private: 0x80,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://namecoin.org/download/',
                },
                "nobt": {
                    title: "NobtCoin",
                    logo: "static/coins/nobt.png",
                    public: 0xf,
                    private: 0x55,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://github.com/nobtcoin/Nobtcoin/releases',
                },
                "nvc": {
                    title: "Novacoin",
                    logo: "static/coins/nvc.png",
                    public: 0x08,
                    private: 0x88,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://sourceforge.net/projects/novacoin/files',
                },
                "post": {
                    title: "PostCoin",
                    logo: "static/coins/post.png",
                    public: 0x37,
                    private: 0xb7,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://postcoin.top/en/',
                },
                "pivx": {
                    title: "PIVX",
                    logo: "static/coins/pivx.png",
                    public: 0x1e,
                    private: 0xd4,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://pivx.org/wallet/',
                },
                "pot": {
                    title: "Potcoin",
                    logo: "static/coins/pot.png",
                    public: 0x37,
                    private: 0xb7,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://www.potcoin.com/wallets',
                },
                "ppc": {
                    title: "Peercoin",
                    logo: "static/coins/ppc.png",
                    public: 0x37,
                    private: 0xb7,
                    scripthash: 0xc4,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://peercoin.net/wallet.html',
                },
                "rdd": {
                    title: "ReddCoin",
                    logo: "static/coins/rdd.png",
                    public: 0x3d,
                    private: 0xbd,
                    scripthash: 0x05,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://reddcoin.com/get-started',
                },
                "steep": {
                    title: "SteepCoin",
                    logo: "static/coins/steep.png",
                    public: 0x7d,
                    private: 0xfd,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://steepcoin.org/en',
                },
                "vrc": {
                    title: "Vericoin",
                    logo: "static/coins/vrc.png",
                    public: 0x46,
                    private: 0x84,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://vericoin.info/vericoin-digital-currency',
                },
                "vrm": {
                    title: "Verium",
                    logo: "static/coins/vrm.png",
                    public: 0x46,
                    private: 0x84,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://vericoin.info/verium-digital-reserve',
                },
                "vtc": {
                    title: "Vertcoin",
                    logo: "static/coins/vtc.png",
                    public: 0x47,
                    private: 0x80,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://vertcoin.org/download-wallet',
                },
                "uni": {
                    title: "Universe",
                    logo: "static/coins/uni.png",
                    public: 0x44,
                    private: 0xc4,
                    generator: 'btcGenerator',
                    downloadWallet: 'http://universe-project.com',
                },
                "waves": {
                    title: "WAVES",
                    logo: "static/coins/waves.png",
                    public: null,
                    private: null,
                    generator: 'wavesGenerator',
                    downloadWallet: 'https://wavesplatform.com/products-wallet',
                },
                "xsm": {
                    title: "Smilo",
                    logo: "static/coins/xsm.png",
                    public: null,
                    private: null,
                    generator: 'ethGenerator',
                    downloadWallet: 'https://smilowallet.io/#/access-my-wallet',
                },
                "xspec": {
                    title: "Spectrecoin",
                    logo: "static/coins/xspec.png",
                    public: 0x3f,
                    private: 0xb3,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://spectreproject.io/',
                },
                "znz": {
                    title: "ZENZO",
                    logo: "static/coins/znz.png",
                    public: 0x51,
                    private: 0xd7,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://zenzo.io/resources/',
                },
                "bccx": {
                    title: "BCCX",
                    logo: "static/coins/bccx.png",
                    public: 0x4b,
                    private: 0xcb,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://www.thebitconnectcoincommunity.com',
                },
                "xp": {
                    title: "eXperience",
                    logo: "static/coins/xp.png",
                    public: 0x37,
                    private: 0x49,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://www.experiencepoints.io/downloads/',
                },
                "42": {
                    title: "42-Coin",
                    logo: "static/coins/42.png",
                    public: 0x08,
                    private: 0x88,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://github.com/42-coin/42/releases',
                    detail: {
                        description: "",
                        website: "",
                        community: "",
                        explorer: "",
                        github: ""
                    }
                },
                "ark": {
                    title: "Ark",
                    logo: "static/coins/ark.png",
                    public: 0x17,
                    private: 0xaa,
                    generator: 'sthGenerator',
                    downloadWallet: 'https://ark.io/wallet',
                },
                "guap": {
                    title: "GuapCoin",
                    logo: "static/coins/guap.png",
                    public: 0x26,
                    private: 0x2e,
                    generator: 'btcGenerator',
                    downloadWallet: 'http://www.guapcoin.org/',
                },
                "rvn": {
                    title: "Ravencoin",
                    logo: "static/coins/rvn.png",
                    public: 0x3c,
                    private: 0x80,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://ravencoin.org/',
                },
                "trx": {
                    title: "Tron",
                    logo: "static/coins/trx.png",
                    public: 0x41,
                    private: 0xc3,
                    generator: 'trxGenerator',
                    downloadWallet: 'https://tron.network/',
                },
                "prux": {
                    title: "PRUX",
                    logo: "static/coins/prux.png",
                    public: 0x37,
                    private: 0xb7,
                    generator: 'btcGenerator',
                    downloadWallet: 'https://prux.info/',
                },
            },
        }
    },
    methods: {
        openLink(link) {
            openUrl(link);
        },
        generateEth() {
            const wallet = ethWallet.generate();
            return {
                privateKey: wallet.getPrivateKeyString(),
                address: wallet.getAddressString()
            }
        },
        showHideCoins: function () {
            this.isShow = !this.isShow;
        },
        showHideHelp: function () {
            this.help = !this.help;
        },
        showHideHelpBts: function () {
            this.coins.bts.help = !this.coins.bts.help;
        },
        async BitsharesGenerator() {
            const seed = await cryptoRandomString({length: 48});
            const mnemonic = await entropyToMnemonic(seed);
            const randName = await cryptoRandomString({length: 18});

            let loginKey = await Login.generateKeys(
                randName,
                mnemonic,
                ["owner", "active", "memo"],
                "BTS"
            );

            this.coins.bts.account = {
                "name": randName,
                "bip39": mnemonic,
                "active": {
                    pubKey: loginKey.pubKeys.active,
                    privateKey: loginKey.privKeys.active.toWif(),
                },
                "owner": {
                    pubKey: loginKey.pubKeys.owner,
                    privateKey: loginKey.privKeys.owner.toWif(),
                },
                "memo": {
                    pubKey: loginKey.pubKeys.memo,
                    privateKey: loginKey.privKeys.memo.toWif(),
                }
            };

        },
        async generateAddress() {
            this.onProcess = true;
            if (this.coins[this.currentCoin].generator === 'btcGenerator') {
                let privateKeyHex = cryptoRandomString({length: 64});
                const key = (new CoinKey(new Buffer.from(privateKeyHex, 'hex'), {
                    private: this.coins[this.currentCoin].private,
                    public: this.coins[this.currentCoin].public
                }));
                this.address.keyHex = privateKeyHex;
                this.address.publicAddress = key.publicAddress;
                this.address.privateWif = key.privateWif;
            }

            if (this.coins[this.currentCoin].generator === 'sthGenerator') {
                const privateKeyHex = cryptoRandomString({length: 32});
                const mnemonic = entropyToMnemonic(privateKeyHex);
                const PUB_KEY = sthCrypto.crypto.getKeys(mnemonic).publicKey;
                this.address.publicAddress = sthCrypto.crypto.getAddress(PUB_KEY, this.coins[this.currentCoin].public);
                this.address.privateWif = mnemonic;
            }

            if (this.coins[this.currentCoin].generator === 'trxGenerator') {
                const privateKeyHex = cryptoRandomString({length: 64})
                let {privateKeyToAddress} = require('@faast/tron-payments')

                this.address.publicAddress = privateKeyToAddress(privateKeyHex);
                this.address.privateWif = privateKeyHex.toUpperCase();
            }

            if (this.coins[this.currentCoin].generator === 'liskGenerator') {
                const privateKeyHex = cryptoRandomString({length: 32})
                const mnemonic = entropyToMnemonic(privateKeyHex)
                const Keys = liskCrypto.getAddressAndPublicKeyFromPassphrase(mnemonic)
                this.address.publicAddress = Keys.address;
                this.address.privateWif = mnemonic;
            }

            if (this.coins[this.currentCoin].generator === 'wavesGenerator') {
                const {randomSeed} = wavesCrypto.crypto();
                const seed = randomSeed();
                const {address, keyPair} = wavesCrypto.crypto();
                const kp = keyPair(seed);
                this.address.publicAddress = address(seed);
                this.address.privateWif = kp.privateKey;
                this.address.keyHex = seed;
            }

            if (this.coins[this.currentCoin].generator === 'ethGenerator') {
                const ethData = this.generateEth();
                this.address.publicAddress = ethData.address;
                this.address.privateWif = ethData.privateKey;
            }

            if (this.coins[this.currentCoin].generator === 'btsGenerator') {
                await this.BitsharesGenerator();
            }

            this.onProcess = false;
        },
        selectCoin: function (selectedCoin) {
            this.coins.bts.account = {
                name: null,
                bip39: null,
                owner: {
                    pubKey: null,
                    privateKey: null,
                },
                active: {
                    pubKey: null,
                    privateKey: null,
                },
                memo: {
                    pubKey: null,
                    privateKey: null,
                },
            };

            this.help = false;
            this.currentCoin = selectedCoin;
            this.address = {
                keyHex: null,
                publicAddress: null,
                privateWif: null,
            };

            if (this.mobile) {
                this.isShow = false;
            }
        },
        clipboardSuccessHandler({value, event}) {
            this.copied = 'Copied to clipboard';
            setTimeout(() => (this.copied = null), 1500);
        },
    },
    mounted: function () {
        if (screen.width < 700) {
            this.mobile = true;
            this.isShow = false;
        }
    },

    async created() {
        this.$eventBus.on('copied', () => {
            this.copied = 'Copied to clipboard';
            setTimeout(() => (this.copied = null), 1500);
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .clipboard-bts {
    margin-right: 5px;
    text-align: left;
    float: left;
    clear: left;
  }

  .small {
    font-size: 70% !important;
    font-weight: 400;
  }

  h2 {
    color: #A9C7DF;
  }

  .hello {
    flex: 1 0 auto;
  }

  a {
    color: #42b983;
  }

  .barley-white {
    color: #FFF5CD
  }

  ul {
    list-style-type: none;
  }

  .instruction {
    background: #18191A;
    overflow: hidden;
    line-height: 140%;
  }

  .select-coin {
    float: left;
    font-size: 0.9em;
    margin-right: 4px;
    margin-left: 4px;
    padding: 5px;
    border: solid 1px #323E4F;
    background: #18191A;
    width: 126px;
    min-width: 126px;
    border-radius: 5px;
    margin-bottom: 6px;
  }

  .select-coin:hover {
    cursor: pointer;
    background: #323E4F
  }

  .clipboard:hover {
    color: #28a745 !important;
    cursor: pointer;
    border: solid 1px #232d3d;

  }

  .qr-container {
    width: 50%;
    float: left;
    margin: 0 auto;
  }

  @media screen and (max-width: 700px) {
    .select-coin {
      width: 47% !important;
      margin-left: 1% !important;
      font-size: 1.05em;
    }

    .instruction p {
      font-size: 0.85em !important;
      line-height: 140%;
    }

  }
</style>
