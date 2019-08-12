import { observable } from 'mobx';
const formData = observable({
  orderSum: '',
  name: '',
  phoneNo: '',
  imgpath: '',
  setFieldValue(type, value) {
    this[type] = value;
  }
});
export default formData;