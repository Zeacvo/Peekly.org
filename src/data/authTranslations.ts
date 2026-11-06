import type { Language } from '../translations';

export interface AuthTranslation {
  // Navigation / Header
  nav_sign_in: string;

  // Login View
  signInTitle: string;
  createAccountLink: string;
  continueGoogle: string;
  continueFaceit: string;
  orDivider: string;
  emailPlaceholder: string;
  continueBtn: string;
  loginDisclaimer: string;
  dataManagedLink: string;
  passwordPlaceholder: string;
  signInBtn: string;
  forgotPassword: string;
  enterValidEmail: string;
  passwordRequired: string;
  pleaseWait: string;

  // Register View
  createAccountTitle: string;
  accountSubtitlePrefix: string;
  signInLink: string;
  nicknamePlaceholder: string;
  confirmPasswordPlaceholder: string;
  announcementsTitle: string;
  announcementsDesc: string;
  termsAgreePrefix: string;
  termsOfService: string;
  and: string;
  privacyPolicy: string;
  createAccountBtn: string;
  registerDisclaimer: string;
  nicknameRequirements: string;
  passwordsDoNotMatch: string;
  meetAllRequirements: string;
  passwordRequirementsTitle: string;
  strengthLabel: string;
  reqLength: string;
  reqNumber: string;
  reqUppercase: string;
  reqSpecial: string;
  passwordTip: string;
}

export const authTranslations: Record<Language, AuthTranslation> = {
  // ==========================================
  // RUSSIAN (Русский)
  // ==========================================
  ru: {
    nav_sign_in: 'Войти',
    signInTitle: 'Вход в Peekly',
    createAccountLink: 'Создать аккаунт Peekly',
    continueGoogle: 'Продолжить с Google',
    continueFaceit: 'Продолжить с FACEIT',
    orDivider: 'ИЛИ',
    emailPlaceholder: 'Электронная почта',
    continueBtn: 'ПРОДОЛЖИТЬ',
    loginDisclaimer: 'Информация вашего аккаунта Peekly используется для безопасного входа и доступа к статистике CS2.',
    dataManagedLink: 'Узнайте, как обрабатываются данные...',
    passwordPlaceholder: 'Пароль',
    signInBtn: 'ВОЙТИ',
    forgotPassword: 'Забыли пароль?',
    enterValidEmail: 'Введите корректный адрес электронной почты.',
    passwordRequired: 'Введите пароль.',
    pleaseWait: 'ПОЖАЛУЙСТА, ПОДОЖДИТЕ...',

    createAccountTitle: 'Создать аккаунт Peekly',
    accountSubtitlePrefix: 'Один аккаунт для всех сервисов. Уже есть аккаунт?',
    signInLink: 'Войти',
    nicknamePlaceholder: 'Никнейм',
    confirmPasswordPlaceholder: 'Подтвердите пароль',
    announcementsTitle: 'Новости и обновления.',
    announcementsDesc: 'Получайте обновления продукта и аналитику CS2 на почту.',
    termsAgreePrefix: 'Я принимаю',
    termsOfService: 'Условия обслуживания',
    and: 'и',
    privacyPolicy: 'Политику конфиденциальности',
    createAccountBtn: 'СОЗДАТЬ АККАУНТ',
    registerDisclaimer: 'Информация вашего аккаунта Peekly используется для безопасного входа и защиты аккаунта.',
    nicknameRequirements: 'От 3 до 20 символов, только буквы и цифры.',
    passwordsDoNotMatch: 'Пароли не совпадают.',
    meetAllRequirements: 'Пароль должен отвечать всем требованиям.',
    passwordRequirementsTitle: 'Требования к паролю',
    strengthLabel: 'Надежность',
    reqLength: 'От 8 символов',
    reqNumber: 'Хотя бы одна цифра',
    reqUppercase: 'Хотя бы одна заглавная буква',
    reqSpecial: 'Хотя бы один спецсимвол',
    passwordTip: 'Не используйте пароли от других сайтов.',
  },

  // ==========================================
  // ENGLISH
  // ==========================================
  en: {
    nav_sign_in: 'Sign in',
    signInTitle: 'Sign in to Peekly',
    createAccountLink: 'Create Your Peekly Account',
    continueGoogle: 'Continue with Google',
    continueFaceit: 'Continue with FACEIT',
    orDivider: 'OR',
    emailPlaceholder: 'Email address',
    continueBtn: 'CONTINUE',
    loginDisclaimer: 'Your Peekly Account information is used to allow you to sign in securely and access your CS2 stats.',
    dataManagedLink: 'See how your data is managed...',
    passwordPlaceholder: 'Password',
    signInBtn: 'SIGN IN',
    forgotPassword: 'Forgot password?',
    enterValidEmail: 'Enter a valid email address to use as your account email.',
    passwordRequired: 'Password is required.',
    pleaseWait: 'PLEASE WAIT...',

    createAccountTitle: 'Create Your Peekly Account',
    accountSubtitlePrefix: 'One Peekly Account is all you need. Already have an account?',
    signInLink: 'Sign in',
    nicknamePlaceholder: 'Nickname',
    confirmPasswordPlaceholder: 'Confirm password',
    announcementsTitle: 'Announcements & Updates.',
    announcementsDesc: 'Receive product updates and CS2 analytics via email.',
    termsAgreePrefix: 'I agree to the',
    termsOfService: 'Terms of Service',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
    createAccountBtn: 'CREATE ACCOUNT',
    registerDisclaimer: 'Your Peekly Account information is used to allow you to sign in securely and protect your account.',
    nicknameRequirements: '3 to 20 characters, letters and numbers only.',
    passwordsDoNotMatch: 'Passwords do not match.',
    meetAllRequirements: 'Must meet all password requirements.',
    passwordRequirementsTitle: 'Password Requirements',
    strengthLabel: 'Strength',
    reqLength: 'At least 8 characters',
    reqNumber: 'At least one number',
    reqUppercase: 'At least one uppercase letter',
    reqSpecial: 'At least one special character',
    passwordTip: 'Avoid using a password that you use with other websites or that might be easy for someone else to guess.',
  },

  // ==========================================
  // UKRAINIAN (Українська)
  // ==========================================
  uk: {
    nav_sign_in: 'Увійти',
    signInTitle: 'Вхід у Peekly',
    createAccountLink: 'Створити акаунт Peekly',
    continueGoogle: 'Продовжити з Google',
    continueFaceit: 'Продовжити з FACEIT',
    orDivider: 'АБО',
    emailPlaceholder: 'Електронна пошта',
    continueBtn: 'ПРОДОВЖИТИ',
    loginDisclaimer: 'Інформація вашого акаунта Peekly використовується для безпечного входу та доступу до статистики CS2.',
    dataManagedLink: 'Дізнайтеся, як обробляються дані...',
    passwordPlaceholder: 'Пароль',
    signInBtn: 'УВІЙТИ',
    forgotPassword: 'Забули пароль?',
    enterValidEmail: 'Введіть коректну адресу електронної пошти.',
    passwordRequired: 'Введіть пароль.',
    pleaseWait: 'БУДЬ ЛАСКА, ЗАЧЕКАЙТЕ...',

    createAccountTitle: 'Створити акаунт Peekly',
    accountSubtitlePrefix: 'Один акаунт для всіх сервісів. Вже маєте акаунт?',
    signInLink: 'Увійти',
    nicknamePlaceholder: 'Нікнейм',
    confirmPasswordPlaceholder: 'Підтвердіть пароль',
    announcementsTitle: 'Новини та оновлення.',
    announcementsDesc: 'Отримуйте оновлення продукту та аналітику CS2 на пошту.',
    termsAgreePrefix: 'Я приймаю',
    termsOfService: 'Умови обслуговування',
    and: 'та',
    privacyPolicy: 'Політику конфіденційності',
    createAccountBtn: 'СТВОРИТИ АКАУНТ',
    registerDisclaimer: 'Інформація вашого акаунта Peekly використовується для безпечного входу та захисту акаунта.',
    nicknameRequirements: 'Від 3 до 20 символів, лише букви та цифри.',
    passwordsDoNotMatch: 'Паролі не збігаються.',
    meetAllRequirements: 'Пароль має відповідати всім вимогам.',
    passwordRequirementsTitle: 'Вимоги до пароля',
    strengthLabel: 'Надійність',
    reqLength: 'Від 8 символів',
    reqNumber: 'Щонайменше одна цифра',
    reqUppercase: 'Щонайменше одна велика літера',
    reqSpecial: 'Щонайменше один спецсимвол',
    passwordTip: 'Уникайте використання паролів від інших сайтів.',
  },

  // ==========================================
  // GERMAN (Deutsch)
  // ==========================================
  de: {
    nav_sign_in: 'Anmelden',
    signInTitle: 'Bei Peekly anmelden',
    createAccountLink: 'Peekly-Konto erstellen',
    continueGoogle: 'Weiter mit Google',
    continueFaceit: 'Weiter mit FACEIT',
    orDivider: 'ODER',
    emailPlaceholder: 'E-Mail-Adresse',
    continueBtn: 'WEITER',
    loginDisclaimer: 'Ihre Peekly-Kontoinformationen werden für die sichere Anmeldung und den Zugriff auf Ihre CS2-Statistiken verwendet.',
    dataManagedLink: 'Erfahren Sie, wie Daten verwaltet werden...',
    passwordPlaceholder: 'Passwort',
    signInBtn: 'ANMELDEN',
    forgotPassword: 'Passwort vergessen?',
    enterValidEmail: 'Geben Sie eine gültige E-Mail-Adresse ein.',
    passwordRequired: 'Passwort ist erforderlich.',
    pleaseWait: 'BITTE WARTEN...',

    createAccountTitle: 'Peekly-Konto erstellen',
    accountSubtitlePrefix: 'Ein Peekly-Konto für alles. Bereits registriert?',
    signInLink: 'Anmelden',
    nicknamePlaceholder: 'Spitzname',
    confirmPasswordPlaceholder: 'Passwort bestätigen',
    announcementsTitle: 'Neuigkeiten & Updates.',
    announcementsDesc: 'Produkt-Updates und CS2-Analysen per E-Mail erhalten.',
    termsAgreePrefix: 'Ich akzeptiere die',
    termsOfService: 'Nutzungsbedingungen',
    and: 'und die',
    privacyPolicy: 'Datenschutzerklärung',
    createAccountBtn: 'KONTO ERSTELLEN',
    registerDisclaimer: 'Ihre Kontoinformationen werden für die sichere Anmeldung verwendet.',
    nicknameRequirements: '3 bis 20 Zeichen, nur Buchstaben und Zahlen.',
    passwordsDoNotMatch: 'Passwörter stimmen nicht überein.',
    meetAllRequirements: 'Muss alle Anforderungen erfüllen.',
    passwordRequirementsTitle: 'Passwortanforderungen',
    strengthLabel: 'Sicherheit',
    reqLength: 'Mindestens 8 Zeichen',
    reqNumber: 'Mindestens eine Zahl',
    reqUppercase: 'Mindestens ein Großbuchstabe',
    reqSpecial: 'Mindestens ein Sonderzeichen',
    passwordTip: 'Vermeiden Sie Passwörter, die Sie anderweitig nutzen.',
  },

  // ==========================================
  // POLISH (Polski)
  // ==========================================
  pl: {
    nav_sign_in: 'Zaloguj się',
    signInTitle: 'Zaloguj się do Peekly',
    createAccountLink: 'Utwórz konto Peekly',
    continueGoogle: 'Kontynuuj przez Google',
    continueFaceit: 'Kontynuuj przez FACEIT',
    orDivider: 'LUB',
    emailPlaceholder: 'Adres e-mail',
    continueBtn: 'DALEJ',
    loginDisclaimer: 'Informacje o koncie Peekly służą do bezpiecznego logowania i dostępu do statystyk CS2.',
    dataManagedLink: 'Zobacz, jak przetwarzane są dane...',
    passwordPlaceholder: 'Hasło',
    signInBtn: 'ZALOGUJ SIĘ',
    forgotPassword: 'Nie pamiętasz hasła?',
    enterValidEmail: 'Wprowadź poprawny adres e-mail.',
    passwordRequired: 'Hasło jest wymagane.',
    pleaseWait: 'PROSZĘ CZEKAĆ...',

    createAccountTitle: 'Utwórz konto Peekly',
    accountSubtitlePrefix: 'Jedno konto Peekly do wszystkiego. Masz już konto?',
    signInLink: 'Zaloguj się',
    nicknamePlaceholder: 'Pseudonim',
    confirmPasswordPlaceholder: 'Potwierdź hasło',
    announcementsTitle: 'Wiadomości i aktualizacje.',
    announcementsDesc: 'Otrzymuj aktualizacje produktu i analitykę CS2 pocztą.',
    termsAgreePrefix: 'Akceptuję',
    termsOfService: 'Warunki korzystania',
    and: 'oraz',
    privacyPolicy: 'Politykę prywatności',
    createAccountBtn: 'UTWÓRZ KONTO',
    registerDisclaimer: 'Twoje dane są używane do bezpiecznego logowania i ochrony konta.',
    nicknameRequirements: 'Od 3 do 20 znaków, tylko litery i cyfry.',
    passwordsDoNotMatch: 'Hasła nie są identyczne.',
    meetAllRequirements: 'Hasło musi spełniać wszystkie wymagania.',
    passwordRequirementsTitle: 'Wymagania dotyczące hasła',
    strengthLabel: 'Siła hasła',
    reqLength: 'Minimum 8 znaków',
    reqNumber: 'Co najmniej jedna cyfra',
    reqUppercase: 'Co najmniej jedna wielka litera',
    reqSpecial: 'Co najmniej jeden znak specjalny',
    passwordTip: 'Unikaj haseł używanych w innych serwisach.',
  },

  // ==========================================
  // FRENCH (Français)
  // ==========================================
  fr: {
    nav_sign_in: 'Connexion',
    signInTitle: 'Se connecter à Peekly',
    createAccountLink: 'Créer un compte Peekly',
    continueGoogle: 'Continuer avec Google',
    continueFaceit: 'Continuer avec FACEIT',
    orDivider: 'OU',
    emailPlaceholder: 'Adresse e-mail',
    continueBtn: 'CONTINUER',
    loginDisclaimer: 'Vos informations de compte Peekly sont utilisées pour une connexion sécurisée et l’accès à vos stats CS2.',
    dataManagedLink: 'Découvrez comment vos données sont gérées...',
    passwordPlaceholder: 'Mot de passe',
    signInBtn: 'SE CONNECTER',
    forgotPassword: 'Mot de passe oublié ?',
    enterValidEmail: 'Entrez une adresse e-mail valide.',
    passwordRequired: 'Le mot de passe est requis.',
    pleaseWait: 'VEUILLEZ PATIENTER...',

    createAccountTitle: 'Créer un compte Peekly',
    accountSubtitlePrefix: 'Un seul compte Peekly suffit. Vous avez déjà un compte ?',
    signInLink: 'Connexion',
    nicknamePlaceholder: 'Pseudo',
    confirmPasswordPlaceholder: 'Confirmer le mot de passe',
    announcementsTitle: 'Annonces et mises à jour.',
    announcementsDesc: 'Recevez les mises à jour et les analyses CS2 par e-mail.',
    termsAgreePrefix: 'J’accepte les',
    termsOfService: 'Conditions d’utilisation',
    and: 'et la',
    privacyPolicy: 'Politique de confidentialité',
    createAccountBtn: 'CRÉER UN COMPTE',
    registerDisclaimer: 'Vos données sont utilisées pour sécuriser votre compte.',
    nicknameRequirements: '3 à 20 caractères, lettres et chiffres uniquement.',
    passwordsDoNotMatch: 'Les mots de passe ne correspondent pas.',
    meetAllRequirements: 'Doit respecter toutes les exigences.',
    passwordRequirementsTitle: 'Exigences du mot de passe',
    strengthLabel: 'Force',
    reqLength: 'Au moins 8 caractères',
    reqNumber: 'Au moins un chiffre',
    reqUppercase: 'Au moins une majuscule',
    reqSpecial: 'Au moins un caractère spécial',
    passwordTip: 'Évitez d’utiliser un mot de passe déjà utilisé ailleurs.',
  },

  // ==========================================
  // SPANISH (Español)
  // ==========================================
  es: {
    nav_sign_in: 'Iniciar sesión',
    signInTitle: 'Iniciar sesión en Peekly',
    createAccountLink: 'Crear cuenta de Peekly',
    continueGoogle: 'Continuar con Google',
    continueFaceit: 'Continuar con FACEIT',
    orDivider: 'O',
    emailPlaceholder: 'Correo electrónico',
    continueBtn: 'CONTINUAR',
    loginDisclaimer: 'La información de tu cuenta Peekly se utiliza para iniciar sesión de forma segura y acceder a tus estadísticas de CS2.',
    dataManagedLink: 'Descubre cómo se gestionan tus datos...',
    passwordPlaceholder: 'Contraseña',
    signInBtn: 'INICIAR SESIÓN',
    forgotPassword: '¿Olvidaste tu contraseña?',
    enterValidEmail: 'Introduce un correo electrónico válido.',
    passwordRequired: 'La contraseña es obligatoria.',
    pleaseWait: 'ESPERE POR FAVOR...',

    createAccountTitle: 'Crear cuenta de Peekly',
    accountSubtitlePrefix: 'Una sola cuenta Peekly para todo. ¿Ya tienes cuenta?',
    signInLink: 'Iniciar sesión',
    nicknamePlaceholder: 'Nombre de usuario',
    confirmPasswordPlaceholder: 'Confirmar contraseña',
    announcementsTitle: 'Anuncios y actualizaciones.',
    announcementsDesc: 'Recibe novedades del producto y análisis de CS2 por correo.',
    termsAgreePrefix: 'Acepto los',
    termsOfService: 'Términos de servicio',
    and: 'y la',
    privacyPolicy: 'Política de privacidad',
    createAccountBtn: 'CREAR CUENTA',
    registerDisclaimer: 'Tus datos se usan para iniciar sesión de forma segura y proteger tu cuenta.',
    nicknameRequirements: 'De 3 a 20 caracteres, solo letras y números.',
    passwordsDoNotMatch: 'Las contraseñas no coinciden.',
    meetAllRequirements: 'Debe cumplir todos los requisitos.',
    passwordRequirementsTitle: 'Requisitos de la contraseña',
    strengthLabel: 'Seguridad',
    reqLength: 'Al menos 8 caracteres',
    reqNumber: 'Al menos un número',
    reqUppercase: 'Al menos una mayúscula',
    reqSpecial: 'Al menos un carácter especial',
    passwordTip: 'Evita contraseñas que uses en otros sitios.',
  },

  // ==========================================
  // DANISH (Dansk)
  // ==========================================
  da: {
    nav_sign_in: 'Log ind',
    signInTitle: 'Log ind på Peekly',
    createAccountLink: 'Opret din Peekly-konto',
    continueGoogle: 'Fortsæt med Google',
    continueFaceit: 'Fortsæt med FACEIT',
    orDivider: 'ELLER',
    emailPlaceholder: 'E-mail-adresse',
    continueBtn: 'FORTSÆT',
    loginDisclaimer: 'Dine Peekly-kontooplysninger bruges til sikker login og adgang til dine CS2-statistikker.',
    dataManagedLink: 'Se hvordan dine data håndteres...',
    passwordPlaceholder: 'Adgangskode',
    signInBtn: 'LOG IND',
    forgotPassword: 'Glemt adgangskode?',
    enterValidEmail: 'Indtast en gyldig e-mail-adresse.',
    passwordRequired: 'Adgangskode er påkrævet.',
    pleaseWait: 'VENT VENLIGST...',

    createAccountTitle: 'Opret din Peekly-konto',
    accountSubtitlePrefix: 'Én Peekly-konto er alt, du behøver. Har du allerede en konto?',
    signInLink: 'Log ind',
    nicknamePlaceholder: 'Brugernavn',
    confirmPasswordPlaceholder: 'Bekræft adgangskode',
    announcementsTitle: 'Meddelelser og opdateringer.',
    announcementsDesc: 'Modtag produktopdateringer og CS2-analyser via e-mail.',
    termsAgreePrefix: 'Jeg accepterer',
    termsOfService: 'Servicevilkår',
    and: 'og',
    privacyPolicy: 'Privatlivspolitik',
    createAccountBtn: 'OPRET KONTO',
    registerDisclaimer: 'Dine oplysninger bruges til at logge sikkert ind.',
    nicknameRequirements: '3 til 20 tegn, kun bogstaver og tal.',
    passwordsDoNotMatch: 'Adgangskoderne stemmer ikke overens.',
    meetAllRequirements: 'Skal opfylde alle krav.',
    passwordRequirementsTitle: 'Krav til adgangskode',
    strengthLabel: 'Styrke',
    reqLength: 'Mindst 8 tegn',
    reqNumber: 'Mindst ét tal',
    reqUppercase: 'Mindst ét stort bogstav',
    reqSpecial: 'Mindst ét specialtegn',
    passwordTip: 'Undgå adgangskoder du bruger andre steder.',
  },

  // ==========================================
  // PORTUGUESE (Português)
  // ==========================================
  pt: {
    nav_sign_in: 'Entrar',
    signInTitle: 'Entrar no Peekly',
    createAccountLink: 'Criar conta Peekly',
    continueGoogle: 'Continuar com o Google',
    continueFaceit: 'Continuar com o FACEIT',
    orDivider: 'OU',
    emailPlaceholder: 'Endereço de e-mail',
    continueBtn: 'CONTINUAR',
    loginDisclaimer: 'As informações da sua conta Peekly são usadas para login seguro e acesso às estatísticas do CS2.',
    dataManagedLink: 'Veja como seus dados são gerenciados...',
    passwordPlaceholder: 'Senha',
    signInBtn: 'ENTRAR',
    forgotPassword: 'Esqueceu a senha?',
    enterValidEmail: 'Insira um e-mail válido.',
    passwordRequired: 'A senha é obrigatória.',
    pleaseWait: 'POR FAVOR, AGUARDE...',

    createAccountTitle: 'Criar conta Peekly',
    accountSubtitlePrefix: 'Uma conta Peekly é tudo o que você precisa. Já tem uma conta?',
    signInLink: 'Entrar',
    nicknamePlaceholder: 'Apelido',
    confirmPasswordPlaceholder: 'Confirmar senha',
    announcementsTitle: 'Novidades e atualizações.',
    announcementsDesc: 'Receba novidades do produto e análises de CS2 por e-mail.',
    termsAgreePrefix: 'Eu concordo com os',
    termsOfService: 'Termos de Serviço',
    and: 'e a',
    privacyPolicy: 'Política de Privacidade',
    createAccountBtn: 'CRIAR CONTA',
    registerDisclaimer: 'Suas informações são usadas para login seguro e proteção da conta.',
    nicknameRequirements: '3 a 20 caracteres, apenas letras e números.',
    passwordsDoNotMatch: 'As senhas não coincidem.',
    meetAllRequirements: 'Deve atender a todos os requisitos.',
    passwordRequirementsTitle: 'Requisitos de senha',
    strengthLabel: 'Força',
    reqLength: 'Pelo menos 8 caracteres',
    reqNumber: 'Pelo menos um número',
    reqUppercase: 'Pelo menos uma letra maiúscula',
    reqSpecial: 'Pelo menos um caractere especial',
    passwordTip: 'Evite usar senhas já cadastradas em outros sites.',
  },

  // ==========================================
  // FINNISH (Suomi)
  // ==========================================
  fi: {
    nav_sign_in: 'Kirjaudu',
    signInTitle: 'Kirjaudu Peeklyyn',
    createAccountLink: 'Luo Peekly-tili',
    continueGoogle: 'Jatka Googlella',
    continueFaceit: 'Jatka FACEITilla',
    orDivider: 'TAI',
    emailPlaceholder: 'Sähköpostiosoite',
    continueBtn: 'JATKA',
    loginDisclaimer: 'Peekly-tilisi tietoja käytetään turvalliseen kirjautumiseen ja CS2-tilastojen käyttöön.',
    dataManagedLink: 'Katso, miten tietojasi käsitellään...',
    passwordPlaceholder: 'Salasana',
    signInBtn: 'KIRJAUDU',
    forgotPassword: 'Unohditko salasanan?',
    enterValidEmail: 'Syötä kelvollinen sähköpostiosoite.',
    passwordRequired: 'Salasana vaaditaan.',
    pleaseWait: 'ODOTA HETKI...',

    createAccountTitle: 'Luo Peekly-tili',
    accountSubtitlePrefix: 'Yksi Peekly-tili riittää kaikkeen. Onko sinulla jo tili?',
    signInLink: 'Kirjaudu',
    nicknamePlaceholder: 'Nimimerkki',
    confirmPasswordPlaceholder: 'Vahvista salasana',
    announcementsTitle: 'Uutiset ja päivitykset.',
    announcementsDesc: 'Vastaanota tuotepäivityksiä ja CS2-analytiikkaa sähköpostitse.',
    termsAgreePrefix: 'Hyväksyn',
    termsOfService: 'Käyttöehdot',
    and: 'ja',
    privacyPolicy: 'Tietosuojakäytännön',
    createAccountBtn: 'LUO TILI',
    registerDisclaimer: 'Tietojasi käytetään turvalliseen kirjautumiseen.',
    nicknameRequirements: '3–20 merkkiä, vain kirjaimia ja numeroita.',
    passwordsDoNotMatch: 'Salasanat eivät täsmää.',
    meetAllRequirements: 'On täytettävä kaikki vaatimukset.',
    passwordRequirementsTitle: 'Salasanan vaatimukset',
    strengthLabel: 'Vahvuus',
    reqLength: 'Vähintään 8 merkkiä',
    reqNumber: 'Vähintään yksi numero',
    reqUppercase: 'Vähintään yksi iso kirjain',
    reqSpecial: 'Vähintään yksi erikoismerkki',
    passwordTip: 'Vältä muiden sivustojen salasanoja.',
  },

  // ==========================================
  // SWEDISH (Svenska)
  // ==========================================
  sv: {
    nav_sign_in: 'Logga in',
    signInTitle: 'Logga in på Peekly',
    createAccountLink: 'Skapa ditt Peekly-konto',
    continueGoogle: 'Fortsätt med Google',
    continueFaceit: 'Fortsätt med FACEIT',
    orDivider: 'ELLER',
    emailPlaceholder: 'E-postadress',
    continueBtn: 'FORTSÄTT',
    loginDisclaimer: 'Dina Peekly-kontouppgifter används för säker inloggning och tillgång till din CS2-statistik.',
    dataManagedLink: 'Se hur dina data hanteras...',
    passwordPlaceholder: 'Lösenord',
    signInBtn: 'LOGGA IN',
    forgotPassword: 'Glömt lösenord?',
    enterValidEmail: 'Ange en giltig e-postadress.',
    passwordRequired: 'Lösenord krävs.',
    pleaseWait: 'VÄNLIGEN VÄNTA...',

    createAccountTitle: 'Skapa ditt Peekly-konto',
    accountSubtitlePrefix: 'Ett Peekly-konto är allt du behöver. Har du redan ett konto?',
    signInLink: 'Logga in',
    nicknamePlaceholder: 'Användarnamn',
    confirmPasswordPlaceholder: 'Bekräfta lösenord',
    announcementsTitle: 'Nyheter och uppdateringar.',
    announcementsDesc: 'Få produktuppdateringar och CS2-analys via e-post.',
    termsAgreePrefix: 'Jag godkänner',
    termsOfService: 'Användarvillkoren',
    and: 'och',
    privacyPolicy: 'Integritetspolicyn',
    createAccountBtn: 'SKAPA KONTO',
    registerDisclaimer: 'Dina uppgifter används för säker inloggning och kontoskydd.',
    nicknameRequirements: '3 till 20 tecken, endast bokstäver och siffror.',
    passwordsDoNotMatch: 'Lösenorden matchar inte.',
    meetAllRequirements: 'Måste uppfylla alla lösenordskrav.',
    passwordRequirementsTitle: 'Lösenordskrav',
    strengthLabel: 'Styrka',
    reqLength: 'Minst 8 tecken',
    reqNumber: 'Minst en siffra',
    reqUppercase: 'Minst en stor bokstav',
    reqSpecial: 'Minst ett specialtecken',
    passwordTip: 'Undvik lösenord som du använder på andra sajter.',
  },

  // ==========================================
  // TURKISH (Türkçe)
  // ==========================================
  tr: {
    nav_sign_in: 'Giriş yap',
    signInTitle: 'Peekly\'ye Giriş Yap',
    createAccountLink: 'Peekly Hesabı Oluştur',
    continueGoogle: 'Google ile devam et',
    continueFaceit: 'FACEIT ile devam et',
    orDivider: 'VEYA',
    emailPlaceholder: 'E-posta adresi',
    continueBtn: 'DEVAM ET',
    loginDisclaimer: 'Peekly Hesap bilgileriniz güvenli giriş ve CS2 istatistiklerinize erişim için kullanılır.',
    dataManagedLink: 'Verilerinizin nasıl yönetildiğini görün...',
    passwordPlaceholder: 'Şifre',
    signInBtn: 'GİRİŞ YAP',
    forgotPassword: 'Şifrenizi mi unuttunuz?',
    enterValidEmail: 'Geçerli bir e-posta adresi girin.',
    passwordRequired: 'Şifre gereklidir.',
    pleaseWait: 'LÜTFEN BEKLEYİN...',

    createAccountTitle: 'Peekly Hesabı Oluştur',
    accountSubtitlePrefix: 'Tüm hizmetler için tek bir hesap. Zaten hesabınız var mı?',
    signInLink: 'Giriş yap',
    nicknamePlaceholder: 'Kullanıcı adı',
    confirmPasswordPlaceholder: 'Şifreyi onayla',
    announcementsTitle: 'Duyurular ve Güncellemeler.',
    announcementsDesc: 'Ürün güncellemelerini ve CS2 analizlerini e-posta ile alın.',
    termsAgreePrefix: 'Kabul ediyorum:',
    termsOfService: 'Hizmet Şartları',
    and: 've',
    privacyPolicy: 'Gizlilik Politikası',
    createAccountBtn: 'HESAP OLUŞTUR',
    registerDisclaimer: 'Hesap bilgileriniz güvenli giriş için kullanılır.',
    nicknameRequirements: '3 ila 20 karakter, yalnızca harf ve rakamlar.',
    passwordsDoNotMatch: 'Şifreler eşleşmiyor.',
    meetAllRequirements: 'Tüm şifre gereksinimlerini karşılamalıdır.',
    passwordRequirementsTitle: 'Şifre Gereksinimleri',
    strengthLabel: 'Güç',
    reqLength: 'En az 8 karakter',
    reqNumber: 'En az bir rakam',
    reqUppercase: 'En az bir büyük harf',
    reqSpecial: 'En az bir özel karakter',
    passwordTip: 'Başka sitelerde kullandığınız şifreleri kullanmaktan kaçının.',
  },

  // ==========================================
  // CHINESE (中文)
  // ==========================================
  zh: {
    nav_sign_in: '登录',
    signInTitle: '登录 Peekly',
    createAccountLink: '创建 Peekly 账户',
    continueGoogle: '通过 Google 继续',
    continueFaceit: '通过 FACEIT 继续',
    orDivider: '或',
    emailPlaceholder: '电子邮件地址',
    continueBtn: '继续',
    loginDisclaimer: '您的 Peekly 账户信息用于安全登录及访问 CS2 数据分析。',
    dataManagedLink: '了解您的数据如何管理...',
    passwordPlaceholder: '密码',
    signInBtn: '登录',
    forgotPassword: '忘记密码？',
    enterValidEmail: '请输入有效的电子邮件地址。',
    passwordRequired: '密码不能为空。',
    pleaseWait: '请稍候...',

    createAccountTitle: '创建 Peekly 账户',
    accountSubtitlePrefix: '一个 Peekly 账户满足所有需求。已有账户？',
    signInLink: '登录',
    nicknamePlaceholder: '昵称',
    confirmPasswordPlaceholder: '确认密码',
    announcementsTitle: '最新公告与动态。',
    announcementsDesc: '通过邮件获取产品更新与 CS2 战术分析。',
    termsAgreePrefix: '我同意',
    termsOfService: '服务条款',
    and: '和',
    privacyPolicy: '隐私政策',
    createAccountBtn: '创建账户',
    registerDisclaimer: '您的账户信息用于安全登录与账户保护。',
    nicknameRequirements: '3 至 20 个字符，仅限字母与数字。',
    passwordsDoNotMatch: '两次输入的密码不一致。',
    meetAllRequirements: '必须符合所有密码要求。',
    passwordRequirementsTitle: '密码要求',
    strengthLabel: '密码强度',
    reqLength: '至少 8 个字符',
    reqNumber: '至少包含一个数字',
    reqUppercase: '至少包含一个大写字母',
    reqSpecial: '至少包含一个特殊字符',
    passwordTip: '避免使用在其他网站相同的密码。',
  },

  // ==========================================
  // ARABIC (العربية)
  // ==========================================
  ar: {
    nav_sign_in: 'تسجيل الدخول',
    signInTitle: 'تسجيل الدخول إلى Peekly',
    createAccountLink: 'إنشاء حساب Peekly',
    continueGoogle: 'المتابعة باستخدام Google',
    continueFaceit: 'المتابعة باستخدام FACEIT',
    orDivider: 'أو',
    emailPlaceholder: 'البريد الإلكتروني',
    continueBtn: 'متابعة',
    loginDisclaimer: 'تُستخدم معلومات حساب Peekly لتسجيل الدخول الآمن والوصول إلى إحصاءات CS2.',
    dataManagedLink: 'تعرف على كيفية إدارة بياناتك...',
    passwordPlaceholder: 'كلمة المرور',
    signInBtn: 'تسجيل الدخول',
    forgotPassword: 'هل نسيت كلمة المرور؟',
    enterValidEmail: 'أدخل عنوان بريد إلكتروني صالح.',
    passwordRequired: 'كلمة المرور مطلوبة.',
    pleaseWait: 'يرجى الانتظار...',

    createAccountTitle: 'إنشاء حساب Peekly',
    accountSubtitlePrefix: 'حساب واحد لجميع الخدمات. هل لديك حساب بالفعل؟',
    signInLink: 'تسجيل الدخول',
    nicknamePlaceholder: 'اسم المستخدم',
    confirmPasswordPlaceholder: 'تأكيد كلمة المرور',
    announcementsTitle: 'الإعلانات والتحديثات.',
    announcementsDesc: 'احصل على تحديثات المنتج وتحليلات CS2 عبر البريد الإلكتروني.',
    termsAgreePrefix: 'أوافق على',
    termsOfService: 'شروط الخدمة',
    and: 'و',
    privacyPolicy: 'سياسة الخصوصية',
    createAccountBtn: 'إنشاء حساب',
    registerDisclaimer: 'تُستخدم معلومات حسابك لتسجيل الدخول الآمن وحماية الحساب.',
    nicknameRequirements: 'من 3 إلى 20 حرفًا، حروف وأرقام فقط.',
    passwordsDoNotMatch: 'كلمتا المرور غير متطابقتين.',
    meetAllRequirements: 'يجب استيفاء جميع متطلبات كلمة المرور.',
    passwordRequirementsTitle: 'متطلبات كلمة المرور',
    strengthLabel: 'القوة',
    reqLength: '8 أحرف على الأقل',
    reqNumber: 'رقم واحد على الأقل',
    reqUppercase: 'حرف كبير واحد على الأقل',
    reqSpecial: 'رمز خاص واحد على الأقل',
    passwordTip: 'تجنب استخدام كلمة مرور تستخدمها في مواقع أخرى.',
  },

  // ==========================================
  // JAPANESE (日本語)
  // ==========================================
  ja: {
    nav_sign_in: 'ログイン',
    signInTitle: 'Peeklyにログイン',
    createAccountLink: 'Peeklyアカウントを作成',
    continueGoogle: 'Googleで続行',
    continueFaceit: 'FACEITで続行',
    orDivider: 'または',
    emailPlaceholder: 'メールアドレス',
    continueBtn: '次へ',
    loginDisclaimer: 'Peeklyアカウント情報は安全なログインとCS2統計へのアクセスのために使用されます。',
    dataManagedLink: 'データの管理方法を確認...',
    passwordPlaceholder: 'パスワード',
    signInBtn: 'ログイン',
    forgotPassword: 'パスワードをお忘れですか？',
    enterValidEmail: '有効なメールアドレスを入力してください。',
    passwordRequired: 'パスワードは必須です。',
    pleaseWait: 'お待ちください...',

    createAccountTitle: 'Peeklyアカウントを作成',
    accountSubtitlePrefix: 'ひとつのアカウントで全て利用可能。アカウントをお持ちですか？',
    signInLink: 'ログイン',
    nicknamePlaceholder: 'ニックネーム',
    confirmPasswordPlaceholder: 'パスワードを再入力',
    announcementsTitle: 'お知らせとアップデート。',
    announcementsDesc: '製品のアップデート情報とCS2分析をメールで受け取る。',
    termsAgreePrefix: '利用規約',
    termsOfService: '利用規約',
    and: 'および',
    privacyPolicy: 'プライバシーポリシー',
    createAccountBtn: 'アカウント作成',
    registerDisclaimer: 'アカウント情報は安全なログインと保護のために使用されます。',
    nicknameRequirements: '3〜20文字、英数字のみ。',
    passwordsDoNotMatch: 'パスワードが一致しません。',
    meetAllRequirements: 'すべてのパスワード要件を満たす必要があります。',
    passwordRequirementsTitle: 'パスワード要件',
    strengthLabel: '強度',
    reqLength: '8文字以上',
    reqNumber: '少なくとも1つの数字',
    reqUppercase: '少なくとも1つの大文字',
    reqSpecial: '少なくとも1つの特殊文字',
    passwordTip: '他のサイトと同じパスワードは避けてください。',
  },

  // ==========================================
  // KOREAN (한국어)
  // ==========================================
  ko: {
    nav_sign_in: '로그인',
    signInTitle: 'Peekly 로그인',
    createAccountLink: 'Peekly 계정 생성',
    continueGoogle: 'Google로 계속하기',
    continueFaceit: 'FACEIT으로 계속하기',
    orDivider: '또는',
    emailPlaceholder: '이메일 주소',
    continueBtn: '계속',
    loginDisclaimer: 'Peekly 계정 정보는 안전한 로그인 및 CS2 분석 액세스를 위해 사용됩니다.',
    dataManagedLink: '데이터 관리 방법 확인...',
    passwordPlaceholder: '비밀번호',
    signInBtn: '로그인',
    forgotPassword: '비밀번호를 잊으셨나요?',
    enterValidEmail: '올바른 이메일 주소를 입력하세요.',
    passwordRequired: '비밀번호를 입력해야 합니다.',
    pleaseWait: '잠시만 기다려주세요...',

    createAccountTitle: 'Peekly 계정 생성',
    accountSubtitlePrefix: '하나의 Peekly 계정으로 충분합니다. 이미 계정이 있으신가요?',
    signInLink: '로그인',
    nicknamePlaceholder: '닉네임',
    confirmPasswordPlaceholder: '비밀번호 확인',
    announcementsTitle: '공지 및 업데이트.',
    announcementsDesc: '제품 업데이트 및 CS2 분석 정보를 이메일로 받아보세요.',
    termsAgreePrefix: '본인은',
    termsOfService: '서비스 이용약관',
    and: '및',
    privacyPolicy: '개인정보 처리방침',
    createAccountBtn: '계정 생성',
    registerDisclaimer: '계정 정보는 안전한 로그인과 계정 보호를 위해 사용됩니다.',
    nicknameRequirements: '3~20자, 영문 및 숫자만 가능.',
    passwordsDoNotMatch: '비밀번호가 일치하지 않습니다.',
    meetAllRequirements: '모든 비밀번호 요구사항을 충족해야 합니다.',
    passwordRequirementsTitle: '비밀번호 요구사항',
    strengthLabel: '안전도',
    reqLength: '최소 8자 이상',
    reqNumber: '숫자 1개 이상',
    reqUppercase: '대문자 1개 이상',
    reqSpecial: '특수문자 1개 이상',
    passwordTip: '다른 사이트에서 사용하는 비밀번호는 피하세요.',
  },
};

export function getAuthTranslations(lang?: Language): AuthTranslation {
  if (lang && authTranslations[lang]) {
    return authTranslations[lang];
  }
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('peekly_language') || localStorage.getItem('peekly_lang');
    if (saved && authTranslations[saved as Language]) {
      return authTranslations[saved as Language];
    }
  }
  return authTranslations.en;
}
