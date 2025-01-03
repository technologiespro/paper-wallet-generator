export default {
    "sth": {
        ticker: "STH",
        title: "SmartHoldem",
        logo: "static/coins/sth.png",
        public: 0x3f,
        private: 0xff,
        generator: 'sthGenerator',
        downloadWallet: 'https://wallet.smartholdem.io',
        trade: "https://ex.xbts.io/market/XBTSX.STH_BTS",
        defi: "https://app.xbts.io/#/pools?a=sth",
        explorer: "https://explorer.smartholdem.io",
        bip38: false,
        brainWallet: true,
        bip39: true
    },
    "zec": {
        ticker: "ZEC",
        title: "Zcash",
        logo: "static/coins/zec.png",
        bip44: 133,
        public: 7352,
        private: 128, //0x1cbd,
        scriptHash: 7357,
        bip32: {
            private: 0x0488ade4,
            public: 0x0488b21e
        },
        generator: 'btcGenerator',
        downloadWallet: 'https://z.cash/',
        explorer: "https://zecblockexplorer.com/",
        trade: "https://ex.xbts.io/market/XBTSX.ZEC_XBTSX.USDT",
        brainWallet: true,
        bip38: true,
        bip39: false
    },
    "kmd": {
        ticker: "KMD",
        title: "Komodo",
        logo: "static/coins/kmd.png",
        bip44: 141,
        public: 0x3c,
        private: 0xbc,
        generator: 'btcGenerator',
        downloadWallet: 'https://komodoplatform.com',
        explorer: "https://kmdexplorer.io",
        trade: "https://ex.xbts.io/market/XBTSX.KMD_XBTSX.USDT",
        brainWallet: true,
        bip38: true,
        bip39: false
    },
    "flux": {
        ticker: "FLUX",
        title: "Flux",
        logo: "static/coins/flux.png",
        bip44: 19167, // https://github.com/satoshilabs/slips/blob/master/slip-0044.md
        public: 7352,
        private: 128, //0x1cbd,
        scriptHash: 7357,
        bip32: {
            private: 0x0488ade4,
            public: 0x0488b21e
        },
        generator: 'btcGenerator',
        downloadWallet: 'https://runonflux.io/',
        explorer: "https://explorer.runonflux.io/",
        trade: "https://ex.xbts.io/market/XBTSX.FLUX_XBTSX.USDT",
        brainWallet: true,
        bip38: true,
        bip39: false
    },
    "eth": {
        ticker: "ETH",
        title: "Ethereum",
        logo: "static/coins/eth.png",
        public: null,
        private: null,
        generator: 'ethGenerator',
        downloadWallet: 'https://metamask.io/',
        trade: "https://ex.xbts.io/market/XBTSX.ETH_XBTSX.USDT",
        defi: "https://app.xbts.io/#/pools?a=eth",
        explorer: "https://etherscan.io/",
        bip38: false,
    },
    "etc": {
        ticker: "ETC",
        title: "Ethereum Classic",
        logo: "static/coins/etc.png",
        public: null,
        private: null,
        generator: 'ethGenerator',
        downloadWallet: 'https://metamask.io/',
        trade: "https://ex.xbts.io/market/XBTSX.ETC_XBTSX.USDT",
        defi: "https://app.xbts.io/#/pools?a=etc",
        explorer: "https://etherscan.io/",
        bip38: false,
    },
    "bsc": {
        ticker: "BNB",
        title: "BNB",
        logo: "static/coins/bnb.png",
        public: null,
        private: null,
        generator: 'ethGenerator',
        downloadWallet: 'https://metamask.io/',
        trade: "https://ex.xbts.io/market/XBTSX.BNB_BTS",
        explorer: "https://bscscan.com",
        bip38: false,
    },
    "btc": {
        ticker: "BTC",
        title: "Bitcoin",
        logo: "static/coins/btc.png",
        public: 0x0,
        private: 0x80,
        generator: 'btcGenerator',
        downloadWallet: 'https://bitcoin.org/en/choose-your-wallet',
        trade: "https://ex.xbts.io/market/XBTSX.BTC_XBTSX.USDT",
        defi: "https://app.xbts.io/#/pools?a=btc",
        explorer: "https://www.blockchain.com/explorer?view=btc",
        bip38: true,
        brainWallet: true,
    },
    "qtum": {
        ticker: "QTUM",
        title: "Qtum",
        logo: "static/coins/qtum.png",
        bip32: {
            private: 0x0488ade4,
            public: 0x0488b21e
        },
        bip44: 2301,
        public: 0x3A,
        private: 0x80,
        scripthash: 0x32,
        generator: 'btcGenerator',
        downloadWallet: 'https://qtum.org/',
        trade: "",
        defi: "",
        explorer: "https://qtum.info/",
        bip38: true,
        brainWallet: true,
    },
    "ltc": {
        ticker: "LTC",
        title: "Litecoin",
        logo: "static/coins/ltc.png",
        public: 0x30,
        private: 0xb0,
        generator: 'btcGenerator',
        downloadWallet: 'https://litecoin.org',
        trade: "https://ex.xbts.io/market/XBTSX.LTC_XBTSX.USDT",
        explorer: "https://chainz.cryptoid.info/ltc/",
        bip38: true,
        brainWallet: true,
    },
    "dash": {
        ticker: "DASH",
        title: "Dash",
        logo: "static/coins/dash.png",
        public: 0x4c,
        private: 0xcc,
        generator: 'btcGenerator',
        downloadWallet: 'https://www.dash.org/downloads/',
        trade: "https://ex.xbts.io/market/XBTSX.DASH_XBTSX.USDT",
        explorer: "https://chainz.cryptoid.info/dash/",
        bip38: true,
        brainWallet: true,
    },
    "doge": {
        ticker: "DOGE",
        title: "Dogecoin",
        logo: "static/coins/doge.png",
        public: 0x1e,
        private: 0x9e,
        generator: 'btcGenerator',
        downloadWallet: 'https://dogecoin.com/',
        trade: "https://ex.xbts.io/market/XBTSX.DOGE_BTS",
        explorer: "https://dogechain.info/",
        bip38: true,
        brainWallet: true,
    },
    "waves": {
        ticker: "WAVES",
        title: "WAVES",
        logo: "static/coins/waves.png",
        public: null,
        private: null,
        generator: 'wavesGenerator',
        downloadWallet: 'https://wavesplatform.com/products-wallet',
        trade: "https://ex.xbts.io/market/XBTSX.WAVES_XBTSX.USDT",
        explorer: "https://wavesexplorer.com/",
        bip38: false,
    },
    "rvn": {
        ticker: "RVN",
        title: "Ravencoin",
        logo: "static/coins/rvn.png",
        public: 0x3c,
        private: 0x80,
        generator: 'btcGenerator',
        downloadWallet: 'https://ravencoin.org/',
        defi: "https://app.xbts.io/#/pools?a=rvn",
        trade: "https://ex.xbts.io/market/XBTSX.RVN_XBTSX.USDT",
        explorer: "https://ravencoin.network",
        bip38: true,
        brainWallet: true,
    },
    "ppc": {
        ticker: "PPC",
        title: "Peercoin",
        public: 0x37,
        private: 0xb7,
        scripthash: 0xc4,
        generator: 'btcGenerator',
        downloadWallet: 'https://peercoin.net/wallet.html',
        trade: "https://ex.xbts.io/market/XBTSX.PPC_XBTSX.USDT",
        explorer: "https://chainz.cryptoid.info/ppc/",
        bip38: true,
        brainWallet: true,
    },
    /*
    "hvq": {
        ticker: "HVQ",
        title: "Hivecoin",
        public: 0x28,
        private: 0x70,
        generator: 'btcGenerator',
        downloadWallet: 'https://hivecoin.org',
        explorer: "https://explorer.hivecoin.org",
        bip38: true,
        brainWallet: true,
    },

     */
    "vtc": {
        ticker: "VTC",
        title: "Vertcoin",
        public: 0x47,
        private: 0x80,
        generator: 'btcGenerator',
        downloadWallet: 'https://vertcoin.org/download-wallet',
        trade: "https://ex.xbts.io/market/XBTSX.VTC_XBTSX.USDT",
        explorer: "https://chainz.cryptoid.info/vtc",
        bip38: true,
        brainWallet: true,
    },
    "btg": {
        ticker: "BTG",
        title: "BitcoinGold",
        logo: "static/coins/btg.png",
        public: 0x26,
        private: 0x80,
        generator: 'btcGenerator',
        downloadWallet: 'https://bitcoingold.org/ecosystem/#wallets',
        trade: "https://ex.xbts.io/market/XBTSX.BTG_BTS",
        explorer: "https://btgexplorer.com",
        bip38: true,
        brainWallet: true,
    },
    "bch": {
        ticker: "BCH",
        title: "BitcoinCash",
        logo: "static/coins/bch.png",
        public: 0x0,
        private: 0x80,
        generator: 'bchGenerator',
        downloadWallet: 'https://www.bitcoincash.org/',
        trade: "https://ex.xbts.io/market/XBTSX.BCH_BTS",
        explorer: "https://btc.com/bch",
        bip38: false,
        brainWallet: false,
    },
    "dgb": {
        ticker: "DGB",
        title: "DigiByte",
        logo: "static/coins/dgb.png",
        bip44: 0x80000014,
        public: 0x1e,
        private: 0x9e,
        scripthash: 0x3f, // new 'S' prefix
        scripthash2: 0x05, // old '3' prefix
        generator: 'btcGenerator',
        downloadWallet: 'https://www.digibyte.io/digibyte-wallet-downloads',
        explorer: "https://chainz.cryptoid.info/dgb",
        bip38: false,
    },
    "onion": {
        ticker: "ONION",
        title: "DeepOnion",
        logo: "static/coins/onion.png",
        public: 0x1f,
        private: 0x9f,
        generator: 'btcGenerator',
        downloadWallet: 'https://github.com/deeponion/deeponion/releases',
        trade: "https://ex.xbts.io/market/XBTSX.ONION_BTS",
        explorer: "https://chainz.cryptoid.info/onion/",
        bip38: true,
        brainWallet: true
    },
    "emc": {
        ticker: "EMC",
        title: "Emercoin",
        logo: "static/coins/emc.png",
        public: 0x21,
        private: 0x80,
        generator: 'btcGenerator',
        downloadWallet: 'http://emercoin.com/en/for-coinholders#download',
        trade: "https://ex.xbts.io/market/XBTSX.EMC_BTS",
        explorer: "https://explorer1.emercoin.com/",
        bip38: true,
        brainWallet: true,
    },
    "egc": {
        ticker: "EGC",
        title: "EverGreenCoin",
        logo: "static/coins/egc.png",
        public: 0x21,
        private: 0xa1,
        generator: 'btcGenerator',
        downloadWallet: 'https://evergreencoin.org',
        trade: "https://ex.xbts.io/market/XBTSX.EGC_BTS",
        explorer: "https://chainz.cryptoid.info/egc/",
        bip38: true,
        brainWallet: true,
    },
    "nmc": {
        ticker: "NMC",
        title: "NameCoin",
        logo: "static/coins/nmc.png",
        public: 0x34,
        private: 0x80,
        generator: 'btcGenerator',
        downloadWallet: 'https://namecoin.org/download/',
        trade: "https://ex.xbts.io/market/XBTSX.NMC_BTS",
        explorer: "https://chainz.cryptoid.info/nmc/",
        bip38: true,
        brainWallet: true,
    },
    "nvc": {
        ticker: "NVC",
        title: "Novacoin",
        logo: "static/coins/nvc.png",
        public: 0x08,
        private: 0x88,
        generator: 'btcGenerator',
        downloadWallet: 'https://sourceforge.net/projects/novacoin/files',
        trade: "https://ex.xbts.io/market/XBTSX.NVC_BTS",
        explorer: "https://explorer.novaco.in/",
        bip38: true,
        brainWallet: true,
    },
    "post": {
        ticker: "POST",
        title: "PostCoin",
        logo: "static/coins/post.png",
        public: 0x37,
        private: 0xb7,
        generator: 'btcGenerator',
        downloadWallet: 'https://postcoin.top/en/',
        trade: "https://ex.xbts.io/market/XBTSX.POST_BTS",
        explorer: "https://explorer.postcoin.top/",
        bip38: true,
        brainWallet: true,
    },
    "pivx": {
        ticker: "PIVX",
        title: "PIVX",
        logo: "static/coins/pivx.png",
        public: 0x1e,
        private: 0xd4,
        generator: 'btcGenerator',
        downloadWallet: 'https://pivx.org/wallet/',
        explorer: "https://chainz.cryptoid.info/pivx/",
        bip38: true,
        brainWallet: true,
    },
    "rdd": {
        ticker: "RDD",
        title: "ReddCoin",
        logo: "static/coins/rdd.png",
        public: 0x3d,
        private: 0xbd,
        scripthash: 0x05,
        generator: 'btcGenerator',
        downloadWallet: 'https://reddcoin.com/get-started',
        explorer: "https://rddblockexplorer.com/",
        bip38: true,
        brainWallet: true,
    },
    "rtm": {
        ticker: "RTM",
        title: "Raptoreum",
        logo: "static/coins/rtm.png",
        public: 0x3c,
        private: 0x80,
        scripthash: null,
        generator: 'btcGenerator',
        downloadWallet: 'https://raptoreum.com',
        explorer: "https://explorer.raptoreum.com",
        bip38: true,
        brainWallet: true,
    },
    "vrc": {
        ticker: "VRC",
        title: "Vericoin",
        logo: "static/coins/vrc.png",
        public: 0x46,
        private: 0x84,
        generator: 'btcGenerator',
        downloadWallet: 'https://vericoin.info/vericoin-digital-currency',
        explorer: "https://chainz.cryptoid.info/vrc/",
        bip38: true,
        brainWallet: true,
    },
    "xccx": {
        ticker: "XCCX",
        title: "BlockChainCoinX",
        logo: "static/coins/xccx.png",
        public: 0x4b,
        private: 0xcb,
        generator: 'btcGenerator',
        downloadWallet: 'https://BlockChainCoin.dev',
        trade: "https://ex.xbts.io/market/XBTSX.BCCX_BTS",
        explorer: "https://chainz.cryptoid.info/xccx/",
        bip38: true,
        brainWallet: true,
    },
    "xp": {
        ticker: "XP",
        title: "eXperience",
        logo: "static/coins/xp.png",
        public: 0x37,
        private: 0x49,
        generator: 'btcGenerator',
        downloadWallet: 'https://www.experiencepoints.io/downloads/',
        explorer: "https://chainz.cryptoid.info/xp/",
        bip38: false,
    },
    "guap": {
        ticker: "GUAP",
        title: "GuapCoin",
        logo: "static/coins/guap.png",
        public: 0x26,
        private: 0x2e,
        generator: 'btcGenerator',
        downloadWallet: "http://www.guapcoin.org",
        trade: "https://ex.xbts.io/market/XBTSX.GUAP_BTS",
        explorer: "https://guapexplorer.com/",
        bip38: true,
        brainWallet: true,
    },
    "trx": {
        ticker: "TRX",
        title: "Tron",
        logo: "static/coins/trx.png",
        public: 0x41,
        private: 0xc3,
        generator: 'trxGenerator',
        downloadWallet: 'https://tron.network/',
        trade: "https://ex.xbts.io/market/XBTSX.TRX_BTS",
        explorer: "https://tronscan.org",
        bip38: false,

    },
    "block": {
        ticker: "BLOCK",
        title: "Blocknet",
        logo: "static/coins/block.png",
        public: 0x1a,
        private: 0x9a,
        generator: 'btcGenerator',
        downloadWallet: 'https://blocknet.co',
        explorer: "https://chainz.cryptoid.info/block/",
        bip38: false,
    },
    "aur": {
        ticker: "AUR",
        title: "AuroraCoin",
        logo: "static/coins/aur.png",
        public: 23,
        private: 176,
        generator: 'btcGenerator',
        bip38: true,
        brainWallet: true,
        downloadWallet: 'https://github.com/aurarad/Auroracoin/releases',
        trade: "https://ex.xbts.io/market/XBTSX.AUR_XBTSX.USDT",
        defi: "",
        explorer: "https://chainz.cryptoid.info/aur/",
    },
    "rxd": {
        ticker: "RXD",
        title: "Radiant",
        logo: "static/coins/rxd.png",
        public: 0x0,
        private: 0x80,
        generator: 'btcGenerator',
        downloadWallet: 'https://samara.app',
        trade: "https://ex.xbts.io/market/XBTSX.RXD_XBTSX.USDT",
        defi: false,
        explorer: "https://explorer.radiantblockchain.org",
        bip38: true,
        brainWallet: true,
    },
    "pep": {
        ticker: "PEP",
        title: "Pepecoin",
        public: 0x38,
        private: 0x16,
        generator: 'btcGenerator',
        downloadWallet: 'https://pepecoin.org',
        explorer: "https://pepeblocks.com",
        bip38: true,
        brainWallet: true,
    },

}
