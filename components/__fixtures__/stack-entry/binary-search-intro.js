import binarySearch from '../../../algorithms/binary-search';
import BinarySearch from '../../../components/ill/binary-search/binary-search';

const { code } = binarySearch;

export default {
  layoutFor: 'binarySearch',
  frameFrom: {
    prevStep: {
      bindings: {
        list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
        item: 'panda'
      },
      intro: true
    },
    nextStep: {
      bindings: {
        list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
        item: 'panda'
      },
      intro: true
    },
    stepProgress: 0
  },
  props: {
    code,
    illustration: BinarySearch,
    actions: {
      generateSteps: steps => console.log('steps', steps)
    }
  }
};
