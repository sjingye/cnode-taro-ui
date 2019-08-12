import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtToast } from 'taro-ui'

import './index.less'

const moneyReg = /^\d+(\.\d{1,2})?$/
const nameReg = /^[\u4e00-\u9fa5A-Za-z\d]+$/
const phoneReg = /^1[\d]{10}$/
// 类型别名
type PageStateProps = {
    formData: {
        orderSum: string,
        name: string,
        phoneNo: string,
        imgpath: string,
        setFieldValue: Function,
    }
}

interface Index {
    props: PageStateProps;
}

@inject('formData')
@observer
class Index extends Component {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '首页'
    }
    constructor(props) {
        super(props)
        this.state = {
            toastVisible: false, 
            toastMsg: ''
        }
    }
    componentWillMount() { }

    componentWillReact() {
        // console.log('componentWillReact')
    }

    componentDidMount() {
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    handleInput = (type, e) => {
        let value = e.target.value;
        let flag = true
        let msg = ''
        switch (type) {
            case 'orderSum':
                flag = moneyReg.test(value)
                if(!flag) msg = '请输入最多两位小数的数字'
                break
            case 'name':
                flag = nameReg.test(value)
                if(!flag) msg = '请输入汉字、字母或者数字'
                break
            case 'phoneNo':
                flag = phoneReg.test(value)
                if(!flag) msg = '请输入正确格式的手机号'
                // value = value.substring(0,3) + '****' + value.substring(7,10)
                break
            default:
                value = ''
                msg = '请输入'
        }
        if (msg) {
            this.setState({
                toastVisible: true,
                toastMsg: msg
            })
        } else {
            this.setState({
                toastVisible: false,
                toastMsg: ''
            })
            this.props.formData.setFieldValue(type, value)
        }
        console.log(flag)
    }
    render() {
        const { formData: { orderSum, name, phoneNo } } = this.props
        const { toastVisible, toastMsg } = this.state
        return (
            <View className='home-container'>
                <p className="common-title">请录入您的信息</p>
                <form className="home-form">
                    <div className="home-form-tiem">
                        <span>销售金额：</span>
                        <input type="text" placeholder="请输入订单金额" value={orderSum} onChange={this.handleInput.bind(this, 'orderSum')} />
                    </div>
                    <div className="home-form-tiem">
                        <span>客户姓名：</span>
                        <input type="text" placeholder="请输入客户姓名" value={name} onChange={this.handleInput.bind(this, 'name')} />
                    </div>
                    <div className="home-form-tiem">
                        <span>客户电话：</span>
                        <input type="text" maxLength={13} placeholder="请输入客户电话" value={phoneNo} onChange={this.handleInput.bind(this, 'phoneNo')} />
                    </div>
                </form>
                <AtToast isOpened={toastVisible} text={toastMsg} ></AtToast>
            </View>
        )
    }
}

export default Index as ComponentType
