import React, { Component } from 'react';
import classes from './Register.module.css';

import Input from './Input/Input';
import FormLoading from '../Ui/Loader/FormLoading/FormLoading';

// import axios from '../../../axios-orders';
import axios from 'axios';
// import withErrorHandler from '../../../hoc/WithErrorHandler/withErrorHandler';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

const EMAILREgex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const USERNAMEREgex = /^(?=.{4,32}$)(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/;
const PASSWORDREGex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

const FORM_STATE = {
    logIn: 'logIn',
    signUp: 'signUp'
};

const FORM_HEADER = {
    logIn: 'ورود به حساب کاربری',
    signUp: 'ساخت حساب کاربری'
};

const FORM_BUTTON = {
    login: 'وارد شدن',
    signup: 'عضو شدن'
}

const FORM_FOOTER = {
    logIn: {
        paragraph: 'کاربر جدید هستید؟',
        span: 'ساخت حساب کاربری'
    } ,
    signUp: {
        paragraph: 'حساب کاربری دارید؟',
        span: 'ورود به حساب کاربری'
    }
};

class Register extends Component {

    state = {
        formState: FORM_STATE.logIn,
        formValid: false,
        formData: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ' نام کاربری خود را وارد کنید',
                    spellCheck: false
                },
                label: 'نام کاربری',
                value: '',
                validity: {
                    required: true,
                    validUserName:true
                },
                valid: null,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'test@test.com',
                    spellCheck: false
                },
                label: 'ایمیل',
                value: '',
                validity: {
                    required: true,
                    validEmail: true
                },
                valid: null,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'رمز عبور',
                    spellCheck: false
                },
                label: 'رمز عبور',
                value: '',
                validity: {
                    required: true,
                    validPassword: true
                },
                valid: null,
                touched: false
            },
            password2: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'تکرار رمز عبور',
                    spellCheck: false
                },
                label: 'تکرار رمز عبور',
                value: '',
                validity: {
                    required: true,
                    validRepPassword: true
                },
                valid: null,
                touched: false
            }
        }
    }

    componentDidMount() {
        console.log(this.props);

        if(this.props.match.path === '/account/login') {
            let email = localStorage.getItem('email');
            let password = localStorage.getItem('password');
            
            this.setState({
                formState: FORM_STATE.logIn,
            });
        }

        if(this.props.match.path === '/account/register') {
            this.setState({
                formState: FORM_STATE.signUp
            });
        }
    }

    orderBtnHandler = event => {
        event.preventDefault();
        if(!this.state.formValid) return;

        const userData = {};
        const formData = this.state.formData;
        for (const elm in formData) {
            if(this.state.formState === FORM_STATE.logIn && (elm === 'username' || elm === 'password2')) {
                continue;
            }
            userData[elm] = formData[elm].value;
        }
        console.log(userData);

        if(this.state.formState === FORM_STATE.logIn) {
            this.props.onSubmitLogin(userData);
        }

        if(this.state.formState === FORM_STATE.signUp) {
            this.props.onSubmitSignUp(userData);
        }
    }

    checkValidity = (value, rules) => {
        let valid = true;
        let invalidReason;

        if(rules.required) {
            valid = value.trim() !== '' && valid;
            invalidReason = 'این قسمت حتما باید تکمیل شود';
        }

        if(rules.validUserName) {
            valid = USERNAMEREgex.test(value.trim()) && valid;
            if(value.trim().length > 0) {
                invalidReason = 'نام کاربری باید حداقل 4 کاراکتر که فقط ترکیب حروف انگلیسی و اعدادهستند باشد';
            }
        }

        if(rules.validEmail) {
            valid = EMAILREgex.test(value.trim()) && valid;
            if(value.trim().length > 0) {
                invalidReason = 'ایمیل خود را طبق الگوی نوشته شده پر کنید';
            }
        }

        if(rules.validPassword) {
            valid = PASSWORDREGex.test(value.trim()) && valid;
            if(value.trim().length > 0) {
                invalidReason = 'رمز عبور باید حداقل 8 کاراکتر که ترکیبی از اعداد و حروف انگلیسی و کاراکترهای @#$%^& باشد';
            }
        }

        if(rules.validRepPassword) {
            const passwordValue = this.state.formData.password.value;
            valid = value.trim() === passwordValue && valid;
            invalidReason = 'رمز وارد شده باید همان رمز تعیین شده باشد';
        }

        return [valid, invalidReason];
    }

    inputChangeHandler = (event, elementForm) => {
        const formData = {...this.state.formData};
        const formElement = {...formData[elementForm]};
        formElement.value = event.target.value;
        if(formElement.validity) {
            formElement.valid = this.checkValidity(formElement.value, formElement.validity);
            formElement.touched = true;
        }
        formData[elementForm] = formElement;

        let formIsValid = true;
        for(const formKey in formData) {
            if(this.state.formState === FORM_STATE.logIn && (formKey === 'password2' || formKey === 'username')) {
                continue;
            }
            if(!formData[formKey].validity) {
                continue;
            }
            formIsValid = 
                formData[formKey].validity &&
                !!formData[formKey].valid &&
                formData[formKey].valid[0] &&
                formIsValid;
        }
        // console.log(formIsValid);
        // console.log(formData[elementForm]);
        this.setState({
            formData: formData,
            formValid: formIsValid
        });
    }

    changeFormState = () => {
        const formData = {...this.state.formData};
        for(const formKey in formData) {
            formData[formKey].value = '';
            formData[formKey].valid = null;
        }

        let formState;
        if(this.state.formState === FORM_STATE.logIn) {
            formState = FORM_STATE.signUp;
            this.props.history.replace('/account/register');
        } else if(this.state.formState === FORM_STATE.signUp) {
            formState = FORM_STATE.logIn;
            this.props.history.replace('/account/login');
        }
        this.setState({
            formData: formData,
            formValid: false,
            formState: formState
        });
    }

    render() {
        const formData = this.state.formData;
        const formDataArray = [];

        for (const elm in formData) {
            if(
                this.state.formState === FORM_STATE.logIn &&
                (elm === 'username' || elm === 'password2')
            ) {
                continue;
            }
            formDataArray.push({
                id: elm,
                config: formData[elm]
            });
        }

        const form = formDataArray.map(elm => {
            return (
                <Input 
                    key={elm.id}
                    id={elm.id}
                    elementType={elm.config.elementType} 
                    label={elm.config.label}
                    elementConfig={elm.config.elementConfig}
                    value={elm.config.value}
                    isValid={elm.config.valid}
                    shouldValidate={elm.config.validity}
                    touched={elm.config.touched}
                    changed={event => this.inputChangeHandler(event, elm.id)} />
                );
        });

        let formHeader;
        let buttonText;
        let formFooterParagraph;
        let formFooterSpan;
        if(this.state.formState === FORM_STATE.logIn) {
            formHeader = FORM_HEADER.logIn ;
            buttonText = FORM_BUTTON.login;
            formFooterParagraph = FORM_FOOTER.logIn.paragraph;
            formFooterSpan = FORM_FOOTER.logIn.span;
        } else if(this.state.formState === FORM_STATE.signUp) {
            formHeader = FORM_HEADER.signUp;
            buttonText = FORM_BUTTON.signup;
            formFooterSpan = FORM_FOOTER.signUp.span;
            formFooterParagraph = FORM_FOOTER.signUp.paragraph;
        }
        
        return(
            <div className={classes.ContactData}>
                {this.props.isAuth && <Redirect to="/dashboard" />}
                <h3>{formHeader}</h3>
                <form onSubmit={this.orderBtnHandler}>
                    {form}
                    <button className={classes.Button} disabled={!this.state.formValid}>
                        {buttonText}
                        {this.props.loading && 
                            <div className={classes.loader}>
                                <FormLoading />
                            </div>
                        }
                    </button>
                    <p className={classes.FormFooter}>
                        {formFooterParagraph}
                        <span onClick={this.changeFormState}>
                            {formFooterSpan}
                        </span>
                    </p>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuth: state.auth.accessToken !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitSignUp: (userData) => dispatch(actions.submitSignup(userData)),
        onSubmitLogin: (userData) => dispatch(actions.submitLogin(userData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));