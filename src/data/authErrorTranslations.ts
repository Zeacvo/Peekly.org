export interface AuthErrorTranslation {
  description: string;
  button: string;
}

export const authErrorTranslations: Record<string, AuthErrorTranslation> = {
  en: {
    description: "Missing required authorization code parameter.",
    button: "< Go to home page"
  },
  ru: {
    description: "Отсутствует обязательный параметр кода авторизации.",
    button: "< Перейти на главную страницу"
  },
  uk: {
    description: "Відсутній обов'язковий параметр коду авторизації.",
    button: "< Перейти на головну сторінку"
  },
  pl: {
    description: "Brak wymaganego parametru kodu autoryzacji.",
    button: "< Przejdź do strony głównej"
  },
  de: {
    description: "Erforderlicher Autorisierungscode-Parameter fehlt.",
    button: "< Zur Startseite"
  },
  fr: {
    description: "Paramètre de code d'autorisation requis manquant.",
    button: "< Aller à la page d'accueil"
  },
  es: {
    description: "Falta el parámetro de código de autorización requerido.",
    button: "< Ir a la página de inicio"
  },
  pt: {
    description: "Parâmetro de código de autorização obrigatório em falta.",
    button: "< Ir para a página inicial"
  },
  da: {
    description: "Påkrævet autorisationskode-parameter mangler.",
    button: "< Gå til forsiden"
  },
  fi: {
    description: "Vaadittu valtuutuskoodiparametri puuttuu.",
    button: "< Siirry etusivulle"
  },
  sv: {
    description: "Obligatorisk auktoriseringskodparameter saknas.",
    button: "< Gå till startsidan"
  },
  tr: {
    description: "Gerekli yetkilendirme kodu parametresi eksik.",
    button: "< Ana sayfaya git"
  },
  ar: {
    description: "معلمة رمز التفويض المطلوبة مفقودة.",
    button: "الانتقال إلى الصفحة الرئيسية >"
  },
  ja: {
    description: "必要な認証コードパラメータがありません。",
    button: "< ホームページへ戻る"
  },
  ko: {
    description: "필수 인증 코드 매개변수가 누락되었습니다.",
    button: "< 홈페이지로 이동"
  },
  zh: {
    description: "缺少必需的授权码参数。",
    button: "< 返回首页"
  }
};
