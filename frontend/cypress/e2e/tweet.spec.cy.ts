describe('user form flow', () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.visit('http://localhost:3000/');
  });

  // 새 트윗 작성
  it('user posts a tweet', () => {
    cy.get('.compose-tweet-btn').click();
    cy.get('textarea[name="tweet"]').type('[테스트] 새 트윗 작성1');
    cy.get('.post-tweet-btn');
  });

  //
  it('user posts a second tweet', () => {
    // Post a tweet
    cy.get('.compose-tweet-btn').click();
    cy.get('textarea[name="tweet"]').type(
      'That was an Attack on Titan easter egg 🥚 😄'
    );
    cy.get('.post-tweet-btn').click();
  });

  it('user posts a third tweet', () => {
    // Post a tweet
    cy.get('.compose-tweet-btn').click();
    cy.get('textarea[name="tweet"]').type(
      'The Rumbling arrives on Marley 😱 https://www.youtube.com/watch?v=wT2H68kEmi8'
    );
    cy.get('.post-tweet-btn').click();
  });
});
