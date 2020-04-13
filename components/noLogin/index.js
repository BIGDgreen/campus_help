import { LoginModel } from '../../models/loginModel'
const loginModel = new LoginModel();
Component({
  data: {},
  properties: {},
  methods: {
    login() {
      loginModel.login()
    }
  }
})