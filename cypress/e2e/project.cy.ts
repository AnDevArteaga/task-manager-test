const proTitle = `Tarea prueba Cypress ${Date.now()}`;


describe("Gestión de proyectos", () => {
    beforeEach(() => {
        cy.visit("/projects");
    });

    it("Permite crear un proyecto", () => {
        cy.get("[data-cy=add-project-button]").first().click();
        cy.get("[data-cy=project-name-input]").type(proTitle);
        cy.get("[data-cy=save-project-button]").click();

        cy.get("[data-cy=project-card]").contains(proTitle).should(
            "exist",
        );
    });

    it("Permite editar el nombre del proyecto", () => {
        cy.get("[data-cy=project-card]")
            .contains(proTitle)
            .click();
        cy.get("[data-cy=project-edit-input]").clear().type(
            "Proyecto modificado{enter}",
        );

        cy.get("[data-cy=project-card]").contains("Proyecto modificado").should(
            "exist",
        );
    });

    it("Elimina un proyecto con confirmación en popover", () => {
        // Abrir popover de confirmación
        cy.get("[data-cy=project-delete-button]").first().click();

        // Confirmar que aparece el popover
        cy.get("[data-cy=confirm-delete-button]").should("be.visible");
        cy.contains("¿Eliminar este proyecto?").should("exist");

        // Confirmar eliminación
        cy.get("[data-cy=confirm-delete-button]").click();

    });
});
