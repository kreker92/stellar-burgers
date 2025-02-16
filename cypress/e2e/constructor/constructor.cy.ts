import orderNew from '../../fixtures/order-new.json';

describe('Constructor', () => {
  beforeEach(() => {
    cy.intercept('POST', 'api/auth/user', {
      fixture: 'auth'
    });
    cy.intercept('POST', 'api/login', {
      fixture: 'login'
    });
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients'
    });
    cy.intercept('GET', 'api/orders', {
      fixture: 'orders'
    });
    cy.intercept('POST', 'api/orders', {
      fixture: 'order-new'
    });
    cy.visit('');
    // window.localStorage.setItem(
    //   'refreshToken',
    //   JSON.stringify('test-refreshToken')
    // );
    // cy.setCookie('accessToken', 'test-accessToken');
  });

  it('should show order modal with correct number', () => {
    cy.get('a[href="/profile"]').click();
    const email = '2@qwe.ru';
    const password = '123456';
    cy.get('[data-testid=email_input').type(`${email}{enter}`);
    cy.get('[data-testid=password_input').type(`${password}{enter}`);
    cy.get('a[href="/"]').first().click();

    cy.get('li[data-testid=643d69a5c3f7b9001cfa093c] > button').click();
    const orderButton = cy.get('button[data-testid="order-button"]');
    // orderButton.contains('Оформить заказ');
    orderButton.click();
    cy.get(`h2[data-testid="${orderNew.order.number}"]`).contains(
      orderNew.order.number
    );
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
