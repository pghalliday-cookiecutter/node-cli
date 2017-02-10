import _ from 'lodash';

export default function mapOptions(config, options, mapping) {
  return Object.keys(mapping).reduce((memo, field) => {
    if (typeof mapping[field] === 'function') {
      memo[field] = _.isUndefined(memo[field]) ? {} : memo[field];
      _.merge(memo[field], mapping[field](options));
    } else if (typeof mapping[field] === 'object') {
      memo[field] = _.isUndefined(memo[field]) ? {} : memo[field];
      memo[field] = mapOptions(memo[field], options, mapping[field]);
    } else if (!_.isUndefined(options[mapping[field]])) {
      if (options[mapping[field]] instanceof Array) {
        memo[field] = _.isUndefined(memo[field]) ? [] : memo[field];
        memo[field] = memo[field].concat(options[mapping[field]]);
      } else {
        memo[field] = options[mapping[field]];
      }
    }
    return memo;
  }, config);
}
