

describe('Pré-Cadastro', () => {

  it('Deve realizar o pré-cadastro do cliente', () => {

    const user = {
      fullname: 'João Cabeção',
      email: 'joaocabeca@gmail.com'
    }

    cy.iniciarPreCadastro(user)
    cy.verificarPreCadastro(user)
  })

  it('Campos obrigatórios', ()=> {
    cy.iniciarPreCadastro()
    cy.verificarAlerta('Nome Completo', 'O campo nome é obrigatório.')
    cy.verificarAlerta('E-mail', 'O campo e-mail é obrigatório.')
  })

  it('Não deve fazer o pré-cadastro apenas com o primeiro nome', ()=> {

    const user = {
      fullname: 'João',
      email: 'joaocabeca@gmail.com'
    }

    cy.iniciarPreCadastro(user)
    cy.verificarAlerta('Nome Completo', 'Informe seu nome completo.')
  })

  it('Não deve fazer o pré-cadastro com o email incorreto', ()=> {

    const user = {
      fullname: 'João Cabeção',
      email: 'www.gmail.com'
    }   

    cy.iniciarPreCadastro(user)
    cy.verificarAlerta('E-mail', 'O e-mail inserido é inválido.')
  })

})