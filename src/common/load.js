import React from 'react';

/**
 * @desc 动态加载组件
 * @template T - 组件类型
 * @param {function(): Promise<{default: T}>} loadComp - 需要要加载的组件
 * @param LoadingComp - 加载过程中展示的内容
 * @returns {T} - 被加载组件的代理
 */
export default (loadComp, LoadingComp = () => null) => (
    class AsyncComponent extends React.Component {
        constructor(args) {
            super(args);
            this.state = {
                Component: null,
                hot: false,
            };
        }

        componentDidMount() {
            const {Component} = this.state;
            if (Component) {
                return;
            }

            loadComp()
                .then((comp) => {
                    comp.onUpdate = (args) => {
                        this.setState({Component: args.default, hot: true});
                    };
                    this.setState({Component: comp.default});
                })
                .catch((err) => {
                    console.error('Cannot load component in async component. ', err.message);
                });
        }

        render() {
            const {Component, hot} = this.state;
            // eslint-disable-next-line react/jsx-props-no-spreading
            return (Component) ? <Component {...this.props} hot={hot} /> : <LoadingComp {...this.props} />;
        }
    }
);
