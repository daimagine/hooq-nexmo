'use strict';

import { assert } from 'chai';

const HooqNexmo = require('../index.js').default,
    nexmoAccount = {
        key: 'xxx',
        secret: 'xxx'
    };

describe('HooqNexmo', () => {

    it('can be instantiated', () => {
        let nexmo = new HooqNexmo(nexmoAccount);

        assert.isNotNull(nexmo);
        assert.isPrototypeOf(nexmo, HooqNexmo);
    });

    describe('SMS', () => {
        let nexmo,
            params = {
                from: 'HOOQ',
                to: '+628561271000',
                text: 'lorem ipsum'
            };

        beforeEach(() => {
            nexmo = new HooqNexmo(nexmoAccount);
        });

        it('send SMS', (done) => {
            nexmo.sendSMS(params, (err, res) => {
                assert.isNull(err);
                assert.isNotNull(res);
                done();
            });
        });

        it('should not send SMS with incomplete params', (done) => {
            nexmo.sendSMS({
                to: '+628561271000',
                text: 'lorem ipsum'
            }, (err) => {
                assert.isNotNull(err);
                done();
            });
        });

        it('should not send SMS with invalid receiver number', (done) => {
            nexmo.sendSMS({
                from: 'HOOQ',
                to: '+0000000123',
                text: 'lorem ipsum'
            }, (err) => {
                assert.isNotNull(err);
                done();
            });
        });
    });

});
