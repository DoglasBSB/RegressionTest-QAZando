describe('Login', () => {
  it('should login successfully with valid credentials', () => {
    cy.guiLogin()
    cy.get('#userLogged').should('be.visible')
  })

  it('should show an error message with invalid credentials', () => {
    cy.visit('/login')
    cy.get('#user').type('invalid@email.com')
    cy.get('#password').type('wrongpassword', { log: false })
    cy.get('#btnLogin').click()
    cy.get('.swal2-html-container').should('be.visible')
  })

  it('should not submit the form when fields are empty', () => {
    cy.visit('/login')
    cy.get('#btnLogin').click()
    cy.url().should('include', '/login')
  })
})
