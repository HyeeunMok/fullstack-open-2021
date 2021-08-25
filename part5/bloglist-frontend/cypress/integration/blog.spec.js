describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Test Doe',
      username: 'tester',
      password: 'dkfjake',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });
  it('Login form is shown', function () {
    cy.get('[data-cy=login-form]');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[data-cy=username]').type('tester');
      cy.get('[data-cy=password]').type('dkfjake');
      cy.get('[data-cy=login-button]').click();
      cy.get('[data-cy=notification]')
        .should('contain', 'tester successfully logged in')
        .and('have.css', 'color', 'rgb(17, 109, 17)');
      cy.get('html').should('contain', 'Test Doe logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('[data-cy=username]').type('tester');
      cy.get('[data-cy=password]').type('wrongPassword');
      cy.get('[data-cy=login-button]').click();
      cy.get('[data-cy=notification]')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(182, 17, 17)');
      cy.get('html').should('not.contain', 'logged in');
    });
  });
});
