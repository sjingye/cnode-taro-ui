import { observable } from 'mobx'

const formData = observable({
  orderSum: '', //金额
  name: '', //姓名
  phoneNo: '', //手机号
  imgpath: '', //图片地址
  setFieldValue(type, value) {
    this[type] = value
  }
})
export default formData