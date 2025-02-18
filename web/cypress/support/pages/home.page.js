import header from "./components/header"


class homePage {

    constructor() {
        this.header = header
    }

    go() {
        cy.visit('/')
    }
}

export default new homePage()