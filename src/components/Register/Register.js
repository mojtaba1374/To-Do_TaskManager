import React, { Component } from 'react';
import classes from './Register.module.css';

// import axios from '../../../axios-orders';
// import Button from '../../../components/UI/Button/Button';

// import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from './Input/Input';
// import { connect } from 'react-redux';

// import withErrorHandler from '../../../hoc/WithErrorHandler/withErrorHandler';
// import * as actionCreators from '../../../store/actions/index';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const EMAILREgex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const USERNAMEREgex = /^(?=.{4,32}$)(?![_.-])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/;
const PASSWORDREGex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

class Register extends Component {

    state = {
        formValid: false,
        formData: {
            name: {
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
            repPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
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

    // componentDidUpdate(prevProps, prevState) {
    //     if(this.state.formData !== prevState.formData) {
    //         let validateForm = true;
    //         for (const formElement in this.state.formData) {
    //             if(!validateForm) {
    //                 break;
    //             }
    //             if(!this.state.formData[formElement].validity) {
    //                 continue;
    //             }
    //             validateForm = 
    //                 !!this.state.formData[formElement].valid &&
    //                 this.state.formData[formElement].valid[0] &&
    //                 validateForm;
    //         }
    //         console.log(validateForm);
    //         this.setState({formValid: validateForm});
    //     }
    // }

    restructureNumber = num => {
        if(num < 10) {
            return '0' + num;
        }
        return num;
    }

    orderBtnHandler = event => {
        event.preventDefault();
        if(!this.state.formValid) return;
        this.setState({ loading: true });

        const date = new Date();
        const time = {
            hour: this.restructureNumber(date.getHours()),
            minute: this.restructureNumber(date.getMinutes()),
            second: this.restructureNumber(date.getSeconds())
        }

        const clientData = {};
        const formData = this.state.formData;
        for (const elm in formData) {
            clientData[elm] = formData[elm].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            orderDate: `
                ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}
            `,
            orderTime: `
                ${time.hour} : ${time.minute} : ${time.second}
            `,
            orderData: clientData
        };

        this.props.onOrderBurger(order, this.props.history);

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false});
        //         console.log(order);
        //         console.log('this order is sent to firebase');
        //         this.props.history.replace('/orders');
        //     })
        //     .catch(error => {
        //         this.setState({loading: false});
        //         // console.log(error);
        //     });
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
                invalidReason = 'رمز عبور باید حداقل 6 کاراکتر که ترکیبی از اعداد و حروف انگلیسی و کاراکترهای @#$%^& باشد';
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
        for(let formKey in formData) {
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

    render() {
        const formData = this.state.formData;
        const formDataArray = [];

        for (const elm in formData) {
            formDataArray.push({
                id: elm,
                config: formData[elm]
            });
        }

        const form = formDataArray.map(elm => {
            return (
                <Input 
                    key={elm.id}
                    elementType={elm.config.elementType} 
                    label={elm.config.label}
                    elementConfig={elm.config.elementConfig}
                    value={elm.config.value}
                    isValid={elm.config.valid}
                    shouldValidate={elm.config.validity}
                    touched={elm.config.touched}
                    changed={event => this.inputChangeHandler(event, elm.id)} />
                )
        });
        
        return(
            <div className={classes.ContactData}>
                {/* {this.props.loading && <Spinner />} */}
                <h3>اطلاعات کاربری</h3>
                <form onSubmit={this.orderBtnHandler}>
                    {form}
                    <button className={classes.Button} disabled={!this.state.formValid}>
                        عضو شدن
                    </button>
                </form>
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         ingredients: state.burger.ingredients,
//         totalPrice: state.burger.totalPrice,
//         loading: state.order.loading
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onOrderBurger: (orderData, history) => dispatch(actionCreators.purchaseBurger(orderData, history))
//     };
// };

export default Register;

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));