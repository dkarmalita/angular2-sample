import { VanillaPage } from './app.po';

describe('vanilla App', function() {
  let page: VanillaPage;

  beforeEach(() => {
    page = new VanillaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
