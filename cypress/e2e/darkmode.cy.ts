describe("Modo Oscuro", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Permite alternar modo oscuro", () => {
cy.get('[data-cy=darkmode-toggle]').click({ force: true });
    cy.get("html").should("have.class", "dark");
cy.get('[data-cy=darkmode-toggle]').click({ force: true });
    cy.get("html").should("not.have.class", "dark");
  });
});