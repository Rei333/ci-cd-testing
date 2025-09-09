describe("Inscription au site", () => {
  it("Créer un compte", () => {
    // Arrange (préparation du terrain de test)
    cy.visit("http://127.0.0.1:8000/user/register");
    const message = "Le compte : test@test.com a été ajouté en BDD";

    // Act (actions à réaliser)
    cy.get("[name='firstname']").type("Prénom");
    cy.get("[name='lastname']").type("Nom");
    cy.get("[name='email']").type("test@test.com");
    cy.get("[name='password']").type("testest");
    cy.get("[name='submit']").click();
    cy.wait(1000);

    // Assert (vérification)
    cy.get(".error").contains(message);
  }),

  it("Créer un compte (dupliqué)", () => {
    cy.visit("http://127.0.0.1:8000/user/register");
    const message = "Le compte existe déja";

    cy.get("[name='firstname']").type("Prénom");
    cy.get("[name='lastname']").type("Nom");
    cy.get("[name='email']").type("test@test.com");
    cy.get("[name='password']").type("testest");
    cy.get("[name='submit']").click();
    cy.wait(1000);

    cy.get(".error").contains(message);
  })
})

describe("Connexion au site", () => {
  it("Connexion échouée", () => {
    cy.visit("http://127.0.0.1:8000/user/connexion");
    const message = "Les informations de connexion ne sont pas correctes";

    cy.get("[name='email']").type("test@test.com");
    cy.get("[name='password']").type("testeste");
    cy.get("[name='submit']").click();
    cy.wait(1000);

    cy.get(".error").contains(message);
  }),

  it("Connexion réussie", () => {
    cy.visit("http://127.0.0.1:8000/user/connexion");

    cy.get("[name='email']").type("test@test.com");
    cy.get("[name='password']").type("testest");
    cy.get("[name='submit']").click();
    cy.wait(1000);

    cy.get(":nth-child(2) > .secondary").contains("Ma Liste de taches");
  })
})