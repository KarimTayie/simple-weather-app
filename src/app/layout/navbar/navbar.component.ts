import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  radioModel = 'en';
  isCollapsed = true;

  constructor(
    public translate: TranslateService
  ) {
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    // Checking if there is any lang setted in the local storage
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.radioModel = lang;
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
    }

    // Updating local storage when the language is changed
    this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        localStorage.setItem('lang', event.lang);
      }
    );
  }

}
