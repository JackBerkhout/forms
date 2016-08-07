export class FormsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('forms-app h1')).getText();
  }
}
