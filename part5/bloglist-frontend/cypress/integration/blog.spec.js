/* eslint-disable no-undef */
describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const test = {
      name: "test",
      username: "test",
      password: "test",
    };

    cy.request("POST", "http://localhost:3003/api/users/", test);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", () => {
    cy.contains("login");
    cy.contains("username");
    cy.contains("password");
    cy.contains("Login");
  });

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.contains("login");
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#submit").click();
      cy.contains("test logged in");
    });

    it("fails with wrong credentials", () => {
      cy.contains("login");
      cy.get("#username").type("testerr");
      cy.get("#password").type("testerr");
      cy.get("#submit").click();
      cy.contains("Login to see blog posts").should("be.visible")
      cy.get("body").should("not.contain", "testerr logged in")
    });
  });
});
