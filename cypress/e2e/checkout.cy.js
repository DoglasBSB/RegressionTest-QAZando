describe('Checkout', () => {
  beforeEach(() => {
    cy.sessionLogin()
  })

  it('should complete the checkout successfully', () => {
    cy.checkout()
  })
})
