//Naigation Tests

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should nagivate tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
