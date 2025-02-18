Cypress.Commands.add('iniciarPreCadastro', (user)=> {
    cy.visit('/')

    cy.get('header nav a[href="pre-cadastro"]')
        .click()

    cy.get('form h2')
        .should('be.visible')
        .and('have.text', 'Seus dados')
            
    cy.get('input[name="fullname"]').as('nome')  
    cy.get('input[name="email"]').as('email')

    if(user?.fullname) {
        cy.get('@nome').type(user.fullname)
    }

    if(user?.email) {
        cy.get('@email').type(user.email)
    }

    cy.contains('button[type=submit]', 'Continuar')
        .click()
})

Cypress.Commands.add('verificarPreCadastro', (user) => {
    cy.get('.usuario-nome')
        .should('be.visible')
        .and('have.text', 'Olá, ' + user.fullname.split(' ')[0])

    cy.get('.usuario-email')
        .should('be.visible')
        .and('have.text', user.email)
})

Cypress.Commands.add('verificarAlerta', (fieldName, text) => {
    cy.contains('label', fieldName)
    .parent()
    .find('.alert-msg')
    .should('be.visible')
    .and('have.text', text)
})