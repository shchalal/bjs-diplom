'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
  console.log('Попытка авторизации с данными:', data);

  ApiConnector.login(
    { login: data.login, password: data.password },
    (response) => {
      console.log('Ответ сервера на авторизацию:', response);

      if (response.success) {
        location.reload();
      } else {
        userForm.setLoginErrorMessage(response.error);
      }
    }
  );
};

userForm.registerFormCallback = function(data) {
  console.log('Попытка регистрации с данными:', data);

  ApiConnector.register(
    { login: data.login, password: data.password },
    (response) => {
      console.log('Ответ сервера на регистрацию:', response);

      if (response.success) {
        location.reload();
      } else {
        userForm.setRegisterErrorMessage(response.error);
      }
    }
  );
};
