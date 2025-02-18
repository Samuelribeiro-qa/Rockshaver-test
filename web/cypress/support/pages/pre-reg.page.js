class PreRegPage {

    fillform(fullname, email) {
        cy.get('form h2')
            .should('be.visible')
            .and('have.text', 'Seus dados')
            
        cy.get('input[name="fullname"]')
            .type(fullname)
  
        cy.get('input[name="email"]')
            .type(email)
    }

    submit() {
        cy.contains('button[type=submit]', 'Continuar')
            .click()
    }

    alertHave(fieldName, text) {
        cy.contains('label', fieldName)
            .parent()
            .find('.alert-msg')
            .should('be.visible')
            .and('have.text', text)
    }

}

export default new PreRegPage()