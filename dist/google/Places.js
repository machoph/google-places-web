"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent = require("superagent");
const Constants_1 = require("./Constants");
const GOOGLE_MAPS_API_TARGET = "https://maps.googleapis.com/maps/api/place";
class GooglePlaces {
    constructor(opts = { debug: false }) {
        this._debug = false;
        this.autocomplete = (opts) => __awaiter(this, void 0, void 0, function* () {
            const params = this._permitParams(Constants_1.API.AUTOCOMPLETE, opts);
            const res = yield this._query(Constants_1.API.AUTOCOMPLETE.path, params);
            return res.body;
        });
        this.queryautocomplete = (opts) => __awaiter(this, void 0, void 0, function* () {
            const params = this._permitParams(Constants_1.API.AUTOCOMPLETE, opts);
            const res = yield this._query(Constants_1.API.AUTOCOMPLETE.path, params);
            return res.body;
        });
        this.details = (opts) => __awaiter(this, void 0, void 0, function* () {
            const params = this._permitParams(Constants_1.API.DETAILS, opts);
            const res = yield this._query(Constants_1.API.DETAILS.path, params);
            return res.body;
        });
        this.nearbysearch = (opts) => __awaiter(this, void 0, void 0, function* () {
            const params = this._permitParams(Constants_1.API.NEARBY_SEARCH, opts);
            const res = yield this._query(Constants_1.API.NEARBY_SEARCH.path, params);
            return res.body;
        });
        this.textsearch = (opts) => __awaiter(this, void 0, void 0, function* () {
            const params = this._permitParams(Constants_1.API.TEXT_SEARCH, opts);
            const res = yield this._query(Constants_1.API.TEXT_SEARCH.path, params);
            return res.body;
        });
        this.radarsearch = (opts = {}) => __awaiter(this, void 0, void 0, function* () {
            const params = this._permitParams(Constants_1.API.RADAR_SEARCH, opts);
            if (!params.name && !params.keyword && !params.type) {
                throw new Error("Missing required parameter: [keyword, name, or type]");
            }
            const res = yield this._query(Constants_1.API.RADAR_SEARCH.path, params);
            return res.body;
        });
        this._googleApiRequest = (url, params) => __awaiter(this, void 0, void 0, function* () {
            const target = `${GOOGLE_MAPS_API_TARGET}${url}`;
            this._log(`GPW:REQ ${target}`, JSON.stringify(Object.assign({}, params)));
            return yield superagent.get(target).query(Object.assign({ key: this.apiKey }, params));
        });
        this._permitParams = ({ requiredKeys, optionalKeys }, params) => {
            if (!requiredKeys || !requiredKeys.length) {
                throw new Error("No required params defined");
            }
            else if (!params || Object.keys(params).length === 0) {
                throw new Error("No parameters provided");
            }
            const missingKeys = [];
            const filteredRequiredParams = requiredKeys.reduce((p, key) => {
                const param = params[key];
                if (param) {
                    p[key] = param;
                }
                else {
                    missingKeys.push(key);
                }
                return p;
            }, {});
            if (missingKeys.length > 0) {
                throw new Error(`Missing required params: [${missingKeys.join(", ")}]`);
            }
            const filteredOptionalParams = optionalKeys.reduce((p, key) => {
                const param = params[key];
                if (param) {
                    p[key] = param;
                }
                return p;
            }, {});
            this._log("GPW:PARAMS", JSON.stringify(params));
            return Object.assign({}, filteredOptionalParams, filteredRequiredParams);
        };
        const { apiKey, debug } = opts;
        this.apiKey = apiKey;
        this.debug = debug;
        this._query = this._query.bind(this);
    }
    set apiKey(apiKey) {
        if (apiKey && (typeof apiKey !== "string" || !apiKey.match(/^[^\s]+$/gi))) {
            throw new Error("Invalid API Key");
        }
        this._apiKey = apiKey;
    }
    get apiKey() {
        return this._apiKey;
    }
    set debug(isDebug) {
        this._debug = isDebug;
    }
    _log(title, message) {
        if (this._debug) {
            console.log(title, message);
        }
    }
    _query(path, params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._apiKey) {
                throw new Error("Invalid API key");
            }
            else if (!path) {
                throw new Error("Google API path is required");
            }
            else if (!params) {
                throw new Error("Missing params");
            }
            try {
                const response = yield this._googleApiRequest(`/${path}/json`, params);
                const body = response.body;
                this._log("GPW:RES", body);
                if (body.status !== "OK") {
                    throw new Error(body.status);
                }
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.GooglePlaces = GooglePlaces;
exports.default = new GooglePlaces();
//# sourceMappingURL=Places.js.map