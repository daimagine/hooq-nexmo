'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NEXMO_ENDPOINT = {
    host: 'https://rest.nexmo.com',
    sms: {
        path: '/sms/json'
    }
},
    client = require('flashheart').createClient({
    name: 'sms',
    retries: 3,
    retryTimeout: 100,
    logger: console
});

var HooqNexmo = function () {
    function HooqNexmo(account) {
        _classCallCheck(this, HooqNexmo);

        if (!account.key) {
            throw new Error('Nexmo key is required');
        }
        if (!account.secret) {
            throw new Error('Nexmo secret is required');
        }
        this.account = account;
    }

    _createClass(HooqNexmo, [{
        key: 'sendSMS',
        value: function sendSMS(params, callback) {
            try {
                if (!params.text) {
                    throw new Error('Text message is required');
                } else if (!params.to) {
                    throw new Error('Receiver number is required');
                } else if (!params.from) {
                    throw new Error('Sender ID is required');
                } else {
                    var data = {
                        api_key: this.account.key,
                        api_secret: this.account.secret,
                        to: params.to,
                        from: params.from,
                        text: params.text
                    },
                        url = '' + NEXMO_ENDPOINT.host + NEXMO_ENDPOINT.sms.path;

                    // console.log(`sending SMS from ${params.from} to ${params.to} with text ${params.text}`);
                    client.post(url, data, function (err, body, res) {
                        // console.log(err, body);
                        if (callback) {
                            if (body.messages[0].status > 0) {
                                callback(new Error(body.messages[0]['error-text']));
                            } else {
                                callback(err, body.messages[0]);
                            }
                        }
                    });
                }
            } catch (err) {
                callback(err);
            }
        }
    }]);

    return HooqNexmo;
}();

exports.default = HooqNexmo;
