import React from 'react';
import isEqual from 'lodash.isequal';
import quicksort from '../algorithms/quicksort';
import SourceCode from '../components/source-code';
import Preview from '../components/preview';

class StackEntry extends React.Component {
  render() {
    const { code, currStep, prevStep } = this.props;
    const { start, end, context, returnValue } = currStep;
    const prevContext = prevStep ? prevStep.context : {};

    return (
      <div>
        <SourceCode
          def={code}
          start={start}
          end={end}
        />
        <Preview
          context={context}
          changedKeys={Object.keys(context).filter(key => !isEqual(context[key], prevContext[key]))}
          returnValue={returnValue}
        />
        {returnValue !== undefined && (
          <pre style={{ backgroundColor: 'gray', color: 'white' }}>
            Return: {JSON.stringify(returnValue)}
          </pre>
        )}
      </div>
    );
  }
}

StackEntry.propTypes = {
  code: React.PropTypes.string.isRequired,
  currStep: React.PropTypes.object.isRequired,
  prevStep: React.PropTypes.object,
};

class Quicksort extends React.Component {
  static async getInitialProps() {
    const items = [
      'dog', 'cat', 'cow', 'fox', 'bear', 'pig', 'rat'
    ];
    return quicksort(items);
  }

  constructor(props) {
    super(props);

    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);

    this.state = {
      stepIndex: 0,
    };
  }

  handlePrev() {
    this.setState({
      stepIndex: this.state.stepIndex - 1,
    });
  }

  handleNext() {
    this.setState({
      stepIndex: this.state.stepIndex + 1,
    });
  }

  getPrevStep(stepIndex) {
    const { steps } = this.props;

    if (stepIndex <= 0) {
      return;
    }

    const currStep = steps[stepIndex];
    let prevStepIndex = stepIndex - 1;
    let prevStep = steps[prevStepIndex];

    while (prevStepIndex >= 0 && prevStep.parentStepId !== currStep.parentStepId) {
      prevStepIndex -= 1;
      prevStep = steps[prevStepIndex];
    }

    return prevStep;
  }

  render() {
    const { steps, code } = this.props;
    const { stepIndex } = this.state;

    const stackEntries = [];
    let currStepIndex = stepIndex;
    let currStep = steps[currStepIndex];
    let prevStep;

    while (currStep) {
      prevStep = this.getPrevStep(currStepIndex);

      stackEntries.unshift(
        <StackEntry
          key={currStepIndex}
          code={code}
          currStep={currStep}
          prevStep={prevStep}
        />
      );

      currStepIndex = currStep.parentStepId;
      currStep = steps[currStepIndex];
    }

    return (
      <div>
        <div>
          <button disabled={stepIndex <= 0} onClick={this.handlePrev}>back</button>
          <button disabled={stepIndex >= steps.length - 1} onClick={this.handleNext}>forward</button>
        </div>
        {stackEntries}
      </div>
    );
  }
}

Quicksort.propTypes = {
  steps: React.PropTypes.array.isRequired,
  code: React.PropTypes.string.isRequired,
};

export default Quicksort;