describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const root = {
      name: 'root',
      username: 'root',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', root)
    const xue = {
      name: 'xue',
      username: 'xue',
      password: 'xue'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', xue)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()
      cy.contains('root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('123')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
      cy.get('#red').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()
      // cy.wait(5000)
      cy.contains('root logged in')
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('xue')
      cy.get('#url').type('empty')
      cy.get('#create').click()

      cy.wait(5000)
      cy.contains('a blog created by cypress')
    })
  })

  describe.only('when a blog is created', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('xue')
      cy.get('#url').type('empty')
      cy.get('#create').click()
      cy.wait(5000)
    })

    it('like a blog', function() {
      cy.contains('a blog created by cypress').get('#button').click()
      cy.get('#like-button').click()

      cy.get('#details').contains('1')
    })

    it('valid deletion', function() {
      cy.contains('a blog created by cypress').get('#delete-button').click()
      cy.get('html').should('not.contain', 'a blog created by cypress')
    })

    it('invalid deletion', function() {
      cy.contains('logout').click()
      cy.get('#username').type('xue')
      cy.get('#password').type('xue')
      cy.get('#login-button').click()
      cy.contains('a blog created by cypress').should('not.contain', 'remove')
    })
  })
})
