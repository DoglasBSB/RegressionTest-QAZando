describe('Logout', () => {
  beforeEach(() => {
    cy.guiLogin()
    cy.get('.swal2-confirm').click()
  })

  it('should logout successfully', () => {
    cy.get('#my-account_area ul li .fa-sign-out').should('be.visible').click()
    cy.contains('h2', 'Logout Sucessfull').should('be.visible')
  })
})
