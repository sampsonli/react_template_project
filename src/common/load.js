import React from 'react';

/**
 * 动态加载组件
 * @template T
 * @param {function(): Promise<{default: T, onUpdate?: function({default: T})}>} loadComp - 组件加载方法
 * @param {React.Component|function(...arg)} [LoadingComp] - 加载中渲染组件
 * @return {T}
 */
export default (loadComp, LoadingComp = () => null) => (
    class AsyncComponent extends React.Component {
        constructor(args) {
            super(args);
            this.state = {
                Comp: null,
                hot: false,
            };
        }

        componentDidMount() {
            const {Comp} = this.state;
            if (Comp) {
                return;
            }

            loadComp()
                .then((comp) => {
                    comp.onUpdate = (args) => {
                        this.setState({Comp: args.default, hot: true});
                    };
                    this.setState({Comp: comp.default});
                })
                .catch((err) => {
                    console.error('Cannot load component in async component. ', err.message);
                });
        }

        render() {
            const {Comp, hot} = this.state;
            // eslint-disable-next-line react/jsx-props-no-spreading
            return (Comp) ? <Comp {...this.props} hot={hot} /> : <LoadingComp {...this.props} />;
        }
    }
);
