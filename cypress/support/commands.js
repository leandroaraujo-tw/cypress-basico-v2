Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    const longText = 'Test Test Test TestTest TestTest TestTest TestTest TestTest TestTest TestTest TestTest Test'

    cy.get('#firstName').should('be.visible').type('Leandro').should('have.value', 'Leandro')
    cy.get('#lastName').should('be.visible').type('Araujo').should('have.value', 'Araujo')
    cy.get('#email').should('be.visible').type('leandro.araujo@thoughtworks.com', {delay: 0})
    cy.get('#phone').should('be.visible').type('9191919191')
    cy.get('#open-text-area').should('be.visible').type(longText, {delay:0})
    cy.contains('button', 'Enviar').should('be.visible').click()
})
