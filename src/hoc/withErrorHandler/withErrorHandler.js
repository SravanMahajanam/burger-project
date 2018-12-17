import React, {Component} from 'react';

import Auxillary from '../Auxillary/Auxillary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use( request => {
                console.log('req intercepted');
                this.setState({error: null});
                return request;
            });
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                console.log('response error '+error.message);
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            // console.log('will unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return(
                <Auxillary>
                    <Modal show={this.state.error}
                            modalClosed={this.errorConfirmedHandler}>
                            { this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent {...this.props} />
                </Auxillary>
            );
        }
    }
};

export default withErrorHandler;