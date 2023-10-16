const isNumber = (number: number) => !isNaN(number) || "Số điện thoại phải không bao gồm chữ cái";
const isEmail = (email: string) => String(email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) || 'Vui lòng nhập email hợp lệ'
  
export const registerOptions = {
    name: {required: 'Tên không được để trống'},
    email: {
        required: 'Email không được để trống',
        validate: isEmail,
    },
    phone: {
        required: 'Số điện thoại không được để trống',
        validate: isNumber,
    },
    shipping_address: {required: 'Địa chỉ không được để trống'},
}