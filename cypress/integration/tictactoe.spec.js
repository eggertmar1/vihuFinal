describe("#️⃣ Tic Tac Toe", () => {
  // TODO add e2e tests
  // visit on port 3000

  beforeEach(() => {
    cy.visit("localhost:3000/");
  });

  // should test for player1 to win
  it("should test for player1 to win", () => {
    cy.getBySel("player1").type("player1");
    cy.getBySel("player2").type("player2");
    cy.getBySel("start-game").click();
    cy.getBySel("cell-0").click();
    cy.getBySel("cell-1").click();
    cy.getBySel("cell-2").click();
    cy.getBySel("cell-3").click();
    cy.getBySel("cell-4").click();
    cy.getBySel("cell-5").click();
    cy.getBySel("cell-6").click();
    cy.getBySel("cell-7").click();
    cy.getBySel("winner").should("contain", "player1");
  });

  it("should test for player2 to win", () => {
    cy.getBySel("player1").type("player1");
    cy.getBySel("player2").type("player2");
    cy.getBySel("start-game").click();
    cy.getBySel("cell-0").click();
    cy.getBySel("cell-1").click();
    cy.getBySel("cell-2").click();
    cy.getBySel("cell-4").click();
    cy.getBySel("cell-3").click();
    cy.getBySel("cell-7").click();
    cy.getBySel("cell-5").click();
    cy.getBySel("cell-6").click();
    cy.getBySel("winner").should("contain", "player2");
  });

  it("should test for draws", () => {
    cy.getBySel("player1").type("player1");
    cy.getBySel("player2").type("player2");
    cy.getBySel("start-game").click();
    cy.getBySel("cell-0").click();
    cy.getBySel("cell-1").click();
    cy.getBySel("cell-3").click();
    cy.getBySel("cell-4").click();
    cy.getBySel("cell-2").click();
    cy.getBySel("cell-5").click();
    cy.getBySel("cell-7").click();
    cy.getBySel("cell-6").click();
    cy.getBySel("cell-8").click();
    cy.getBySel("draw").should("contain", "draw");
  });
});
