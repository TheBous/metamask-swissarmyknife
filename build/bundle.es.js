
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

class ProviderNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'Provider Not Found';
    }
}

const chains = {
    mainnet: '1',
    ropsten: '3',
    rinkeby: '4',
    goerli: '5',
    kovan: '42',
    bsc: '',
    fantom: '',
};

var _Provider_chains, _Provider_provider, _Provider_accounts;
class Provider {
    constructor(additionalChains = {}) {
        _Provider_chains.set(this, null);
        _Provider_provider.set(this, null);
        _Provider_accounts.set(this, []);
        this.connect = () => new Promise((resolve, reject) => {
            try {
                return resolve();
            }
            catch (e) {
                reject(e);
            }
        });
        this.retrieveAccounts = (settings = {}) => __awaiter(this, void 0, void 0, function* () {
            const { requestPermission = true } = settings;
            try {
                const accounts = yield __classPrivateFieldGet(this, _Provider_provider, "f").request({
                    method: requestPermission ? 'eth_requestAccounts' : 'eth_accounts',
                    params: [],
                });
                if (accounts.length)
                    __classPrivateFieldSet(this, _Provider_accounts, accounts, "f");
            }
            catch (error) {
                throw Error(error);
            }
        });
        this.getAccounts = () => __classPrivateFieldGet(this, _Provider_accounts, "f");
        __classPrivateFieldSet(this, _Provider_chains, Object.assign(Object.assign({}, chains), additionalChains), "f");
        const { ethereum = {} } = window;
        if (typeof ethereum === undefined)
            throw new ProviderNotFound('Provider not found, install provider and try again');
        __classPrivateFieldSet(this, _Provider_provider, window.ethereum, "f");
    }
}
_Provider_chains = new WeakMap(), _Provider_provider = new WeakMap(), _Provider_accounts = new WeakMap();

export { Provider as default };
