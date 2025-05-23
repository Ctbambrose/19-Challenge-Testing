describe("Tech Quiz E2E Test", () => {
  beforeEach(() => {

    cy.intercept("GET", "/api/questions/random", {
      fixture: "questions.json",
    }).as("getQuestions");
  });

  it("start the quiz, answer a question, and see results", () => {
    cy.visit("http://localhost:3001");

    cy.contains("Start Quiz").click();

    cy.wait("@getQuestions");

    cy.get("h2").should("exist");
    cy.get("button").first().click();

    cy.get("button").first().click({ multiple: true });

    cy.contains("Quiz Completed").should("exist");
    cy.contains("Your score").should("exist");
  });
});