'use strict';

const NEXMO_ENDPOINT = {
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

export default class HooqNexmo {
    constructor(account) {
        if (!account.key) {
            throw new Error('Nexmo key is required');
        }
        if (!account.secret) {
            throw new Error('Nexmo secret is required');
        }
        this.account = account;
    }

    sendSMS(params, callback) {
        try {
            if (!params.text) {
                throw new Error('Text message is required');
            } else if (!params.to) {
                throw new Error('Receiver number is required');
            } else if (!params.from) {
                throw new Error('Sender ID is required');
            } else {
                let data = {
                        api_key: this.account.key,
                        api_secret: this.account.secret,
                        to: params.to,
                        from: params.from,
                        text: params.text
                    },
                    url = `${NEXMO_ENDPOINT.host}${NEXMO_ENDPOINT.sms.path}`;

                // console.log(`sending SMS from ${params.from} to ${params.to} with text ${params.text}`);
                client.post(url, data, (err, body, res) => {
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
}
