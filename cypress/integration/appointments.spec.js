//Cypress Tests

describe("appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });
  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=student-name-input").type("Kevin Holmes");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Kevin Holmes");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit inteview", () => {
    cy.get("[alt=Edit]").first().click({ force: true });
    cy.get("[data-testid=student-name-input").clear().type("Kevin Holmes");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Kevin Holmes");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("it should cancel interview", () => {
    cy.get("[alt=Delete").first().click({ force: true });
    cy.contains("Confirm").first().click();
    cy.contains("Deleting...").should("exist");
    cy.contains("Deleting...").should("exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
