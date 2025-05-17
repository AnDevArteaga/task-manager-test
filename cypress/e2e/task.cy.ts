
const taskTitle = `Tarea prueba Cypress ${Date.now()}`;

describe("Gestión de tareas", () => {
  beforeEach(() => {
    cy.visit("/projects");
  });

  it("Permite crear una tarea", () => {
    cy.get("[data-cy=add-task-button]").first().click();
    cy.get("[data-cy=task-input]").type(taskTitle);
    cy.get("[data-cy=save-task-button]").click();

    cy.get("[data-cy=task-item]").contains(taskTitle).should(
      "exist",
    );
  });

it("Permite marcar tarea como completada desde modal", () => {
  cy.get("[data-cy=task-item]")
    .first()
    .click();
    cy.wait(1000);

  cy.get('[data-cy=modal-complete-checkbox]')
    .click({ force: true })
    .should('have.class', 'bg-green-100');

    cy.wait(1000);

  cy.get('[data-cy="modal-save-button"]').click();

  cy.get('[data-cy="task-modal"]', { timeout: 10000 }).should('not.exist');

  cy.get("[data-cy=task-status]")
    .last()
    .contains('Completada')
});

it("Permite eliminar una tarea", () => {
  // 1. Click en el item para abrir modal de tarea
  cy.get("[data-cy=task-item]")
    .first()
    .click();

  // 2. Dentro del modal, click en el botón delete/trash
  cy.get('[data-cy="modal-delete-button"]').click();

  // 3. Esperar que aparezca el modal de confirmación y hacer click en eliminar
  cy.get('[data-cy="confirm-delete-button"]').should("be.visible").click();

  // 4. Esperar que el modal de tarea se cierre (opcional)
  cy.get('[data-cy="task-modal"]').should("not.exist");


});
});
