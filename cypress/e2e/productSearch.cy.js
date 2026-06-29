describe('Product Search', () => {
  beforeEach(() => {
    cy.sessionLogin()
  })

  it('should search for a product and display results', () => {
    cy.buscarProduto()
  })
})
