// Suppress only known third-party runtime exceptions that don't affect test behavior
Cypress.on('uncaught:exception', (err) => {
  const knownErrors = [
    'ResizeObserver loop limit exceeded',
    'Cannot read properties of undefined (reading \'removeEventListener\')',
  ]
  return !knownErrors.some((msg) => err.message.includes(msg))
})

Cypress.Commands.add('guiLogin', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD'),
) => {
  cy.intercept('GET', '**/login').as('getLogin')
  cy.visit('/login')
  cy.get('#user').type(username)
  cy.get('#password').type(password, { log: false })
  cy.get('#btnLogin').click()
  cy.wait('@getLogin')
  cy.contains('h2', 'Login realizado').should('be.visible')
})

Cypress.Commands.add('sessionLogin', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD'),
) => {
  cy.session(username, () => cy.guiLogin(username, password), {
    cacheAcrossSpecs: true,
  })
})

Cypress.Commands.add('buscarProduto', (searchTerm = 'mobile') => {
  cy.intercept('GET', '**/my-account').as('getMyAccount')
  cy.visit('/my-account')
  cy.wait('@getMyAccount')
  cy.get(':nth-child(3) > .search_width > img').click()
  cy.get('form > input').type(`${searchTerm}{enter}`)
  cy.get('.swal2-confirm').click()
})

Cypress.Commands.add('selecionarProduto', () => {
  cy.intercept('GET', '**/shop').as('getShop')
  cy.visit('/shop')
  cy.wait('@getShop')
  cy.get('.product_wrappers_one').first().find('.title a').click()
  cy.url().should('include', '/product-details-one/')
})

Cypress.Commands.add('adicionarProduto', () => {
  cy.intercept('GET', '**/product-details-one/1').as('getProduct')
  cy.visit('/product-details-one/1')
  cy.wait('@getProduct')
  cy.get('.links_Product_areas > .theme-btn-one').click()
  cy.get('.modal_product_content_one > h3').should('have.text', 'Green Dress For Woman')
  cy.get('.col-12 > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
  cy.get('.offcanvas-cart-action-button > :nth-child(1) > .theme-btn-one').click()
  cy.get(':nth-child(4) > .product_name > a').should('be.visible')
})

Cypress.Commands.add('checkout', () => {
  cy.fixture('checkout').then((data) => {
    cy.intercept('GET', '**/checkout-one').as('getCheckout')
    cy.visit('/checkout-one')
    cy.wait('@getCheckout')

    cy.get('#fname').type(data.firstName)
    cy.get('#lname').type(data.lastName)
    cy.get('#cname').type(data.companyName)
    cy.get('#email').type(data.email)
    cy.get('#country').select(data.country)
    cy.get('#city').select(data.city)
    cy.get('#zip').type(data.zipCode)
    cy.get('#faddress').type(data.address)
    cy.get('#messages').type(data.message)

    cy.get('.form-check-label').click()
    cy.get('.checkout-area-bg > .theme-btn-one').click()

    cy.get(':nth-child(2) > h3').should('have.text', 'Billings Information registred with success!')
    cy.get(':nth-child(2) > .check-heading > h3').should('be.visible')
    cy.get(':nth-child(2) > :nth-child(2) > .theme-btn-one').click()

    cy.contains('h2', 'Order success!').should('be.visible')
    cy.get('.offer_modal_left > h3').should('have.text', 'Congrats! Your order was created with sucess!')
  })
})
