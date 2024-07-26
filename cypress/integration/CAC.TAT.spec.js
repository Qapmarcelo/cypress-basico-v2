/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });
  it("verifica o título da aplicação", function () {
    cy.title().should("contain", "Central de Atendimento ao Cliente TAT");
  });

  it("Deve preencher os campos obrigatorios e evniar", () => {
    const longText =
      "tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt";
    cy.get("#firstName").type("Marcelo");
    cy.get("#lastName").type("LC");
    cy.get("#email").type("marcelo@teste.com.br");
    cy.get("#support-type > :nth-child(3)").click();
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  it("Deve aparecer mensagem de erro ao submeter form com email invalido", function () {
    cy.get("#firstName").type("Marcelo");
    cy.get("#lastName").type("LC");
    cy.get("#email").type("marcelo.marcelo.com");
    cy.get("#support-type > :nth-child(3)").click();
    cy.get("#open-text-area").type("texto, texto", { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
    cy.get("body").should("contain", "Valide os campos obrigatórios!");
  });

  it("Campo telefonico continua vazio quando preenchido com valor não-numerico", () => {
    cy.get("#phone").type("(LLLL-aaaa").should("have.value", "");
  });

  it("Exibe mensagem de erro quando tel se torna obrigatorio mas não é preenchido", function () {
    cy.get("#firstName").type("Marcelo");
    cy.get("#lastName").type("LC");
    cy.get("#email").type("marcelo@marcelo.com");
    cy.get("#phone").type("vazio");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("texto, texto", { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
    cy.get(".error").should("contain", "Valide os campos");
  });

  it("Preenche e limpa os campos nome, sobrenome, email, e telefone", () => {
    cy.get("#firstName")
      .type("Marcelo")
      .should("have.value", "Marcelo")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("LC")
      .should("have.value", "LC")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("marcelo@marcelo.com")
      .should("have.value", "marcelo@marcelo.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("19989878765")
      .should("have.value", "19989878765")
      .clear()
      .should("have.value", "");
  });

  it("Exibe mensagem de erro ao submeter o form sem preencher os campos obrigatórios", () => {
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("Envia o form com sucesso usando comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".error").should("be.visible");
  });
  it("Deve selecionar o produto (You Tube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("Deve selecionar o produto (Mentoria) pelo seu valor", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("Deve selecionar o produto (Blog) pelo seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('Deve marcar o tipo de atendimento "Feedback"', () => {
    cy.get("input[type=radio][value=feedback]")
      .check()
      .should("have.value", "feedback");
  });

  it("Marca cada tipo de atendimento", () => {
    cy.get("input[type=radio]")
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it("Marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should("not.be.checked");
  });
  it('Seleciona um arquivo da pasta fixtures "', () => {
    cy.get("input[type=file]")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("Seleciona um arquivo simulando um drag-and-drop", function () {
    cy.get("input[type=file]")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona arq com um fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("samplefile");
    cy.get('input[type="file"]')
      .selectFile("@samplefile")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("Abrir politica de privacidade em outra pagina sem a necessidade de um clique", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("acessa a página politica de privacidade removendo o target e clicando no link ", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();
    cy.contains("Talking About Testing").should("be.visible");
  });

  it("testar como diferentes dimensões", () => {
    cy.viewport(410, 860);
    cy.get("#firstName").type("Marcelo");
    cy.get("#lastName").type("LC");
    cy.viewport("ipad-mini");
    cy.get("#email").type("marcelo.marcelo.com");
    cy.get("#support-type > :nth-child(3)").click();
    cy.get("#open-text-area").type("texto, texto", { delay: 0 });
    cy.viewport("iphone-8");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
    cy.get("body").should("contain", "Valide os campos obrigatórios!");
  });
});
