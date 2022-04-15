const productName = "Laptop";
const categoryName="Electronic"
const description = "This is the great laptop";
const email = "kamlesh@gmail.com";
const productImage = "http://hd.wallpaperswide.com/thumbs/laptop-t2.jpg";
const price = 160000;
const dummyEmail = "kamlesh@gmail.com";

describe("Create product test cases", () => {
  it("Check every field is mandatory", () => {
    cy.visit("http://localhost:3000");
    cy.get(`[data-testid='productAddButton']`).click();
    cy.get(`[data-testid='productSubmit']`).click();
    cy.contains(categoryName);
  });

  it("Email format error", () => {
    cy.visit("http://localhost:3000");
    cy.get(`[data-testid='productAddButton']`).click();
    cy.get(`#product-name`).click().type(productName);
    cy.get(`#description`).click().type(description);
    cy.get(`#developer-email`).click().type(dummyEmail);
    cy.get(`#product-image`).click().type(productImage);
    cy.get(`#category`).select(1);
    cy.get(`#price`).click().type(price);
    cy.get(`[data-testid='productSubmit']`).click();
    cy.contains(categoryName);
  });

  it("Create product successfullly", () => {
    cy.visit("http://localhost:3000");
    cy.get(`[data-testid='productAddButton']`).click();
    cy.get(`#product-name`).click().type(productName);
    cy.get(`#description`).click().type(description);
    cy.get(`#developer-email`).click().type(email);
    cy.get(`#product-image`).click().type(productImage);
    cy.get(`#category`).select(1);
    cy.get(`#price`).click().type(price);
    cy.get(`[data-testid='productSubmit']`).click();
    cy.wait(2000);
    cy.scrollTo("bottom");
    cy.contains(categoryName);
  });
});
