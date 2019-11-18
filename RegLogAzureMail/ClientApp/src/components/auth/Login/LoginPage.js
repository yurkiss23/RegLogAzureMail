import React, { Component } from 'react';
import classnames from "classnames";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {loginUser} from './reducer';
import EclipseWidget from '../../Eclipse';

const propTypes = {
    login: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        loading: this.props.loading,
        errors: {
            //email: 'Invalid'
        }
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        console.log('Change props ');
        this.setState({
            loading: nextProps.loading,
            errors: nextProps.errors
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('--login submit--');
        const {email, password} = this.state;
        this.props.login({
            email: email, 
            password: password}
        );
    }

    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState({
                [name]: value,
                errors
            });
        } else {
            this.setState({ [name]: value });
        }
    };

    handleChange = e => {
        this.setStateByErrors(e.target.name, e.target.value);
    };

    render() {
        console.log('----This props LOGIN PAGE-----', this.props);
        console.log('----This state LOGIN PAGE-----', this.state);
        const {email, loading, password, errors} = this.state;
        return (
            <>
                <h2>Вхід</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Пошта</label>
                        <input type="text"
                            className={classnames('form-control', { 'is-invalid': !!errors.email })}
                            id="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange} />
                        {!!errors.email &&
                            <div className="help-block">{errors.email}</div>
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input type="password"
                            className={classnames('form-control', { 'is-invalid': !!errors.password })}
                            id="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange} />
                        {!!errors.password &&
                            <div className="help-block">{errors.password}</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Увійти</button>

                    </div>
                </form>

                {loading && <EclipseWidget/>}
            </>
        );
    }
}

const mapState = (state) => {
    return {
        loading: state.register.loading,
        errors: state.register.errors,
    }
}

LoginPage.propTypes=propTypes;
 
export default connect(mapState,{login:loginUser}) (LoginPage);