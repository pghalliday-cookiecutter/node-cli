import mapOptions from '../../../../../../src/cli/lib/util/map-options';

describe('cli', () => {
  describe('lib', () => {
    describe('#mapOptions', () => {
      it('should map flat options to a config object', () => {
        const config = {
          param1: 'value1',
          param2: 'value2',
          param3: {
            subparam1: 'subvalue1',
            subparam2: 'subvalue2',
          },
          param4: {
            subparam3: 'subvalue3',
            subparam4: 'subvalue4',
          },
          param7: [
            'listvalue1',
          ],
        };
        mapOptions(config, {
          override1: 'override1',
          override2: 'override2',
          override3: 'override3',
          override7: [
            'listoverride1',
            'listoverride2',
          ],
          override8: [
            'listoverride3',
            'listoverride4',
          ],
        }, {
          param1: 'override1',
          param3: {
            subparam1: 'override2',
          },
          param5: {
            subparam5: 'override3',
          },
          param6: 'override4',
          param7: 'override7',
          param8: 'override8',
        });
        config.should.eql({
          param1: 'override1',
          param2: 'value2',
          param3: {
            subparam1: 'override2',
            subparam2: 'subvalue2',
          },
          param4: {
            subparam3: 'subvalue3',
            subparam4: 'subvalue4',
          },
          param5: {
            subparam5: 'override3',
          },
          param7: [
            'listvalue1',
            'listoverride1',
            'listoverride2',
          ],
          param8: [
            'listoverride3',
            'listoverride4',
          ],
        });
      });

      it('should use callbacks to map composite options', () => {
        const config = {
          param: {
            subparam: {
              value: 'value',
            },
          },
        };
        mapOptions(config, {
          override: 'override',
        }, {
          param: (options) => {
            return {
              subparam: {
                value2: options.override,
              },
            };
          },
          param2: (options) => {
            return {
              value: options.override,
            };
          },
        });
        config.should.eql({
          param: {
            subparam: {
              value: 'value',
              value2: 'override',
            },
          },
          param2: {
            value: 'override',
          },
        });
      });
    });
  });
});
