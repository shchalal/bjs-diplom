'use strict';


const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((response) => {
    console.log('Ответ сервера при логауте:', response);
    if (response.success) {
      location.reload();
    } else {
      alert('Ошибка при выходе: ' + response.error);
    }
  });
};


ApiConnector.current((response) => {
  console.log('Данные текущего пользователя:', response);
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  } else {
    alert('Не удалось получить данные профиля: ' + response.error);
  }
});


const ratesBoard = new RatesBoard();
function updateRates() {
  ApiConnector.getStocks((response) => {
    console.log('Курсы валют:', response);
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } else {
      console.error('Ошибка при получении курсов валют:', response.error);
    }
  });
}
updateRates();
setInterval(updateRates, 60 * 1000);


const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    console.log('Пополнение баланса:', response);
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Баланс успешно пополнен');
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    console.log('Конвертация валюты:', response);
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Конвертация выполнена успешно');
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};


moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    console.log('Перевод средств:', response);
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Перевод успешно выполнен');
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};


const favoritesWidget = new FavoritesWidget();


function initFavorites() {
  ApiConnector.getFavorites((response) => {
    console.log('Список избранного:', response);
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      favoritesWidget.updateUsersList(response.data);
    } else {
      console.error('Ошибка при получении списка избранного:', response.error);
    }
  });
}

initFavorites();

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    console.log('Добавление в избранное:', response);
    if (response.success) {
      initFavorites();
      favoritesWidget.setMessage(true, 'Пользователь добавлен в избранное');
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};


favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    console.log('Удаление из избранного:', response);
    if (response.success) {
      initFavorites();
      favoritesWidget.setMessage(true, 'Пользователь удалён из избранного');
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};
