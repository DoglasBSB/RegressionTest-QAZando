describe('Product Selection', () => {
  beforeEach(() => {
    cy.sessionLogin()
  })

  it('should navigate to the product detail page', () => {
    cy.selecionarProduto()
  })
})
