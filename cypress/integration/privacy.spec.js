it("testa a pagina privacidade de forma independente", () => {
  cy.visit("./src/privacy.html");
  cy.get("#title").should("be.visible");
});
