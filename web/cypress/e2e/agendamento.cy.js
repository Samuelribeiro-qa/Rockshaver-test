import calendario from '../fixtures/calendario.json'
import agendamentos from '../fixtures/agendamentos.json'

describe('Agendamento', () => {

    beforeEach(()=> {
        cy.intercept('GET', '**/api/calendario', {
            statusCode: 200,
            body: calendario,
        }).as('getCalendario')
    })

    it('Deve fazer um novo agendamento', () => {
        const agendamento = agendamentos.sucesso

        cy.deleteMany(
            { emailCliente: agendamento.usuario.email},
            { collection: 'agendamentos' })
            .then(result => {
                cy.log(result)
            })

        cy.iniciarPreCadastro(agendamento.usuario)
        cy.verificarPreCadastro(agendamento.usuario)

        cy.iniciarAgendamento()
        cy.escolherProfissional(agendamento.profissional.nome)
        cy.selecionarServico(agendamento.servico.descricao)
        cy.escolherDia(agendamento.dia)
        cy.escolherHorario(agendamento.hora)
        cy.finalizarAgendamento()
        cy.get('h3').should('be.visible')
            .and('have.text', 'Tudo certo por aqui! Seu horário está confirmado.')
    })

    it('Deve mostrar o slot ocupado', () => {
        const agendamento = agendamentos.duplicado

        cy.deleteMany(
            { emailCliente: agendamento.usuario.email },
            { collection: 'agendamentos' })
            .then(result => {
                cy.log(result)
            })

        cy.agendamentoAPI(agendamento)

        cy.iniciarPreCadastro(agendamento.usuario)
        cy.verificarPreCadastro(agendamento.usuario)
     
        cy.iniciarAgendamento()
        cy.escolherProfissional(agendamento.profissional.nome)
        cy.selecionarServico(agendamento.servico.descricao)
        cy.escolherDia(agendamento.dia)

        cy.get(`[slot="${agendamento.hora} - ocupado"]`)
            .should('be.visible')
            .find('svg')
            .should('be.visible')
            .and('have.css', 'color', 'rgb(255, 255, 255)')

    })

    it('Deve retornar uma notificação no sumário em caso de conflito de disponibilidade', () => {
        const agendamento = agendamentos.conflito

        cy.deleteMany(
            { emailCliente: agendamento.usuario.email },
            { collection: 'agendamentos' })
            .then(result => {
                cy.log(result)
            })

        cy.iniciarPreCadastro(agendamento.usuario)
        cy.verificarPreCadastro(agendamento.usuario)
        
        cy.iniciarAgendamento()
        cy.escolherProfissional(agendamento.profissional.nome)
        cy.selecionarServico(agendamento.servico.descricao)
        cy.escolherDia(agendamento.dia)
        cy.escolherHorario(agendamento.hora)

        cy.agendamentoAPI(agendamento)

        cy.finalizarAgendamento()

        cy.get('.alert-error')
            .should('be.visible')
            .and('have.text', 'Já existe um agendamento para essa data e hora. Por favor, escolha outro horário.')

    })
})
