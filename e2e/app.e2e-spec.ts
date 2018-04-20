import { WobiAppPage } from './app.po';

describe('wobi-app App', function() {
  let page: WobiAppPage;

  beforeEach(() => {
    page = new WobiAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
