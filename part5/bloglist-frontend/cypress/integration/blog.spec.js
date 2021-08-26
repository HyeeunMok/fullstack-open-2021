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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester', password: 'dkfjake' });
    });

    it('A blog can be created', function () {
      cy.get('[data-cy=create-button]').click();
      cy.get('[data-cy=title]').type('Testing for creating a blog');
      cy.get('[data-cy=author]').type('Test Doe');
      cy.get('[data-cy=url]').type('http://www.test.ca');
      cy.get('[data-cy=blog-submit-button]').click();
      cy.get('[data-cy=blog-list]').should(
        'contain',
        'Testing for creating a blog by Test Doe'
      );
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Testing for clicking a like button',
          author: 'Test Doe',
          url: 'http://www.test.ca',
          likes: 0,
        });
      });

      it('The blog can be liked', function () {
        cy.contains('Testing for clicking a like button');
        cy.get('[data-cy=view-button]').click();
        cy.get('[data-cy=like-button]').click();
        cy.get('.blogDetails').contains('likes: 1');
        cy.get('[data-cy=like-button]').click();
        cy.get('.blogDetails').contains('likes: 2');
      });
    });

    describe('A blog can be created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Testing for clicking a delete button',
          author: 'Test Doe',
          url: 'http://www.test.ca',
          likes: 0,
        });
      });

      it('and deleted by author', function () {
        cy.contains('Testing for clicking a delete button');
        cy.get('[data-cy=view-button]').click();
        cy.get('[data-cy=delete-button]').click();
        cy.get('html').should(
          'not.contain',
          'Testing for clicking a delete button'
        );
      });
    });
  });
});
