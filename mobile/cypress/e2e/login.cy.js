describe('Login', () => {

  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('/')

    cy.contains('p', 'Faça login com a sua conta')
      .should('be.visible')
  })

  it('Deve logar como barbeiro', () => {

    const funcionario = {
      matricula: '1007',
      senha: 'pwd123',
      nome: 'Slash'
    }

    cy.login(funcionario)
    cy.verificarUsuarioLogado(funcionario)
  })

  it('Não deve logar quando a senha é inválida!', () => {

    const funcionario = {
      matricula: '1001',
      senha: 'abc456',
    }

    cy.login(funcionario)
    cy.verificarToast('Falha ao realizar login. Verifique suas credenciais.')
  })

  it('Não deve logar quando a matricula não existe!', () => {

    const funcionario = {
      matricula: '1020',
      senha: 'pwd123',
    }

    cy.login(funcionario)
    cy.verificarToast('Falha ao realizar login. Verifique suas credenciais.')

  })

  it('Não deve logar quando os campos não são preenchidos!', () => {
    cy.get('form').submit()
    cy.verificarToast('Informe sua matrícula e sua senha!')
  })

})
