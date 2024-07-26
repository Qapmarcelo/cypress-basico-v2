Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
  cy.get("#firstName").type("Marcelo");
  cy.get("#lastName").type("LC");
  cy.get("#email").type("marcelo.marcelo.com");
  cy.get("#support-type > :nth-child(3)").click();
  cy.get("#open-text-area").type("texto, texto", { delay: 0 });
  cy.contains("button", "Enviar").click();
});
