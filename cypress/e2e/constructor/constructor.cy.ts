describe('Constructor', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: 'auth'
    });
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/login', {
      fixture: 'login'
    });
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients'
    });
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/orders', {
      fixture: 'orders'
    });
    cy.visit('http://localhost:4000/');
    // window.localStorage.setItem(
    //   'refreshToken',
    //   JSON.stringify('test-refreshToken')
    // );
    // cy.setCookie('accessToken', 'test-accessToken');
  });

  it('should show order button on ingredient click', () => {
    cy.get('li[data-testid=643d69a5c3f7b9001cfa093c] > button').click();
    const orderButton = cy.get('button[data-testid="order-button"]');
    orderButton.contains('Оформить заказ');
    // orderButton.click();
  });

  it('should show ingredient modal', () => {
    cy.get('li[data-testid=643d69a5c3f7b9001cfa093c] > a').click();
    const modalName = cy.get('h3[data-testid="name-in-details"]');
    modalName.contains('Краторная булка N-200i');
    cy.get('button[data-testid=btn-close-modal]').click();
    cy.get('#modals').should(($el) => {
      expect($el.text().trim()).equal('');
    });
  });
});
