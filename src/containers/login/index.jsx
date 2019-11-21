import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import {reqLogin} from '../../api'
import {getUserAsync} from '../../redux/action-creators/users'
import logo from './logo.png'
import './index.less'
 class Login extends Component {
    handleConfirmPassword = (rule, value, callback) => {
        // console.log(rule),field是rule属性
        const name=rule.field==='username'?'用户名':'密码'
        if(!value){
            callback(`请输入${name}`)
        }else if (value.length<4 ) {
            callback(`${name}长度要大于4位`)
        }else if (value.length>10) {
            callback(`${name}长度要小于10位`)
        }else{
            // 全部校验成功
            callback();
        }
    };
    handeleSubmit=(e)=>{
        const {form}=this.props;
        // 组织表单提交的默认行为
        e.preventDefault();
        const {validateFields}=form;
        // 点击登陆时，全部校验成功
        validateFields((err, values) => {
            const {username,password}=values;
            if (!err) {
             reqLogin(username,password)
             .then((response)=>{
                this.props.history.push('/');
                })
             .catch((err)=>{
                 form.resetFields(['password']);
             })   
            }
    })
}
 
render() {
        const  getFieldDecorator  = this.props.form.getFieldDecorator;
        return (
            <div className='login'>
                <header>
                    <img src={logo} alt='img'></img>
                    <h1>
                        React项目:后台管理系统
                    </h1>
                </header>
                <section className='login-section'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handeleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('username',{
                            rules:[
                                // {   required:true,
                                //     message:'用户名必须填写'
                                // }
                                {validator:this.handleConfirmPassword}
                            ]})(<Input
                                prefix={<Icon type="user"  />}
                                placeholder="Username" className='login-input'/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password',{
                                rules:[
                                    {
                                        validator:this.handleConfirmPassword
                                    }
                                ]
                            })(<Input
                            prefix={<Icon type="lock" />}
                            type="password"
                            placeholder="Password" className='login-input'/>)}
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className='login-btn'>登录</Button>
                        </Form.Item>
                    </Form>  
                </section>
            </div>
        )
    }
}
connect(null,{getUserAsync})(Login)
export default Form.create()(Login);
