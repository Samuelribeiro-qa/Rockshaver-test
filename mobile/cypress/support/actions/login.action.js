Cypress.Commands.add('login', (profissional) => {
    cy.get('input[id="matricula"]')
        .type(profissional.matricula)

    cy.get('input[id="senha"]')
        .type(profissional.senha)

    cy.contains('button', 'Entrar')
        .click()
})

Cypress.Commands.add('verificarUsuarioLogado', (profissional) => {
    cy.get('.usuario-logado').within(() => {
        cy.get('small')
            .should('be.visible')
            .and('have.text', `Olá ${profissional.nome},`)

        cy.get('h2')
            .should('be.visible')
            .and('have.text', 'esse é o seu painel de atendimento!')
    })

    cy.contains('h1', 'Meus agendamentos')
        .should('be.visible')
})