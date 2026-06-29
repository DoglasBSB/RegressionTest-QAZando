describe('Shopping Cart', () => {
  beforeEach(() => {
    cy.sessionLogin()
  })

  it('should add a product to the cart', () => {
    cy.adicionarProduto()
  })
})
