describe('Login', () => {
  beforeEach(() => {
    const email = '2@qwe.ru';
    const password = '123456';
    cy.intercept('POST', 'auth/login', { fixture: 'login' });
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'orders', { fixture: 'orders' });

    cy.visit('profile');
    cy.get('[data-testid=email_input').type(`${email}{enter}`);
    cy.get('[data-testid=password_input').type(`${password}{enter}`);
  });

  it('should show my orders', () => {
    cy.get('a[href="/profile/orders"]').click();
    cy.get('p[data-testid=page-description]').contains(
      'В этом разделе вы можете просмотреть свою историю заказов'
    );
  });

  it('should go to login page after logout', () => {
    cy.get('button.text').click();
    cy.get('form[name=login]').should('exist');
  });
});
