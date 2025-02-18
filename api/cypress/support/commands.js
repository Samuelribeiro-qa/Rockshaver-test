// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (matricula, senha) => {
    cy.api({
        method: 'POST',
        url: '/api/login',
        body: { matricula, senha }
    }).should((response) => {
        expect(response.status).to.eq(200)
        Cypress.env('token', response.body.token)
    })
})

Cypress.Commands.add('postAgendamento', (body) => {
    return cy.api({
        method: 'POST',
        url: '/api/agendamentos',
        headers: {
            'Authorization': 'Bearer 3a8a9b8fae87baf503e7c5fe5b97fd72'
        },
        body: body,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('postAgendamentos', (matricula, agendamentos) => {
    cy.deleteMany({ matricula }, { collection: 'agendamentos' })

    cy.wrap(agendamentos).each((a) => {
        cy.api({
            method: 'POST',
            url: '/api/agendamentos',
            headers: {
                'Authorization': 'Bearer 3a8a9b8fae87baf503e7c5fe5b97fd72'
            },
            body: {
                nomeCliente: a.nomeCliente,
                emailCliente: a.emailCliente,
                data: a.data,
                hora: a.hora,
                matricula: matricula,
                codigoServico: a.codigoServico
            }
        }).should((response) => {
            expect(response.status).to.eq(201)
        })
    })
})

Cypress.Commands.add('deleteAgendamento', (id) => {
    return cy.api({
        method: 'DELETE',
        url: `/api/agendamentos/${id}`,
        headers: {
            Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('postLembrete', (id) => {
    return cy.api({
        method: 'POST',
        url: `/api/agendamentos/${id}/lembrete`,
        headers: {
            Authorization: `Bearer ${Cypress.env('token')}`
        },
        failOnStatusCode: false
    })
})