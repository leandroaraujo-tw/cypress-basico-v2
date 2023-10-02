/// <reference types="Cypress" />

beforeEach(() => {
  cy.visit('./src/index.html')
})

describe('Central de Atendimento ao Cliente TAT', function() {

  it('Verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', function(){
    const longText = 'Test Test Test TestTest TestTest TestTest TestTest TestTest TestTest TestTest TestTest Test'

    cy.get('#firstName').should('be.visible').type('Leandro').should('have.value', 'Leandro')
    cy.get('#lastName').should('be.visible').type('Araujo').should('have.value', 'Araujo')
    cy.get('#email').should('be.visible').type('leandro.araujo@thoughtworks.com', {delay: 0})
    cy.get('#phone').should('be.visible').type('9191919191')
    cy.get('#open-text-area').should('be.visible').type(longText, {delay:0})
    cy.contains('button', 'Enviar').should('be.visible').click()

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').should('be.visible').type('Leandro').should('have.value', 'Leandro')
    cy.get('#lastName').should('be.visible').type('Araujo').should('have.value', 'Araujo')
    cy.get('#email').should('be.visible').type('leandro.araujo@thoughtworks,com')
    cy.get('#phone').should('be.visible').type('9191919191')
    cy.get('#open-text-area').should('be.visible').type('test')
    cy.contains('button', 'Enviar').should('be.visible').click()

    cy.get('.error').should('be.visible')
  })

  it('Valida que o campo de telefone continua vazio para inputs nao numericos', function() {
    cy.get('#phone').should('be.visible').type('test')
      .should('have.value','')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').should('be.visible').type('Leandro')
    cy.get('#lastName').should('be.visible').type('Araujo')
    cy.get('#email').should('be.visible').type('leandro.araujo@thoughtworks.com')
    cy.get('#phone').should('be.visible')
    cy.get('#open-text-area').should('be.visible').type('test')
    cy.get('#phone-checkbox').check().should('be.checked')
    cy.contains('button', 'Enviar').should('be.visible').click()

    cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName').should('be.visible').type('Leandro').should('have.value', 'Leandro').clear().should('have.value', '')
    cy.get('#lastName').should('be.visible').type('Araujo').should('have.value', 'Araujo').clear().should('have.value', '')
    cy.get('#email').should('be.visible').type('leandro.araujo@thoughtworks.com', {delay: 0}).should('have.value', 'leandro.araujo@thoughtworks.com').clear().should('have.value', '')
    cy.get('#phone').should('be.visible').type('9191919191').should('have.value', '9191919191').clear().should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button', 'Enviar').should('be.visible').click()
    cy.get('.error').should('be.visible')
  })

  it('Envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
  
  it('Seleciona um produto (YouTube) por seu texto, mentoria pelo seu valor, blog pelo seu indice', function(){

    cy.get('#product').select('YouTube').should('have.value', 'youtube')
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
  })

  it('Marca cada tipo de atendimento', function() {
     cy.get('input[type="radio"]').should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('Marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('input[type="checkbox"]').should('have.length', 2)
      .each(function($checkbox) {
        cy.wrap($checkbox).check()
        cy.wrap($checkbox).should('be.checked')
      })
      .last().uncheck().should('not.be.checked')
  })

  it('Seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]').should('not.have.value')
    .selectFile('cypress/fixtures/example.json')
    .should(function($input) {
      console.log($input)
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('input[type="file"]').should('not.have.value')
      .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]').should('not.have.value')
      .selectFile('@sampleFile', {action: "drag-drop"})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('Acessa a página de política de privacidade removendo o target e então clicando no link', function(){
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
  })
})