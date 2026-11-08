import type { Language } from '../translations';

export interface LinkSuccessTranslation {
  pageTitle: string;
  title: string;
  goHome: string;
  goToProfile: string;
}

export const linkSuccessTranslations: Record<Language, LinkSuccessTranslation> = {
  ru: {
    pageTitle: 'Авторизация успешно прошла',
    title: 'Авторизация успешно прошла.',
    goHome: 'На главную',
    goToProfile: 'Перейти в профиль',
  },
  en: {
    pageTitle: 'Authorization successful',
    title: 'Authorization successful.',
    goHome: 'Go to Home',
    goToProfile: 'Go to Profile',
  },
  uk: {
    pageTitle: 'Авторизація успішно пройшла',
    title: 'Авторизація успішно пройшла.',
    goHome: 'На головну',
    goToProfile: 'Перейти до профілю',
  },
  de: {
    pageTitle: 'Autorisierung erfolgreich',
    title: 'Autorisierung erfolgreich abgeschlossen.',
    goHome: 'Zur Startseite',
    goToProfile: 'Zum Profil',
  },
  fr: {
    pageTitle: 'Autorisation réussie',
    title: 'Autorisation réussie.',
    goHome: 'Retour à l\'accueil',
    goToProfile: 'Accéder au profil',
  },
  es: {
    pageTitle: 'Autorización exitosa',
    title: 'Autorización exitosa.',
    goHome: 'Ir al inicio',
    goToProfile: 'Ir al perfil',
  },
  pl: {
    pageTitle: 'Autoryzacja zakończona sukcesem',
    title: 'Autoryzacja zakończona sukcesem.',
    goHome: 'Strona główna',
    goToProfile: 'Przejdź do profilu',
  },
  pt: {
    pageTitle: 'Autorização concluída',
    title: 'Autorização concluída com sucesso.',
    goHome: 'Ir para o início',
    goToProfile: 'Ir para o perfil',
  },
  da: {
    pageTitle: 'Godkendelse gennemført',
    title: 'Godkendelse gennemført.',
    goHome: 'Til forsiden',
    goToProfile: 'Gå til profil',
  },
  fi: {
    pageTitle: 'Valtuutus onnistui',
    title: 'Valtuutus onnistui.',
    goHome: 'Etusivulle',
    goToProfile: 'Siirry profiiliin',
  },
  sv: {
    pageTitle: 'Auktorisering lyckades',
    title: 'Auktorisering lyckades.',
    goHome: 'Till startsidan',
    goToProfile: 'Gå till profil',
  },
  tr: {
    pageTitle: 'Yetkilendirme başarılı',
    title: 'Yetkilendirme başarıyla tamamlandı.',
    goHome: 'Ana Sayfaya Git',
    goToProfile: 'Profile Git',
  },
  ar: {
    pageTitle: 'تمت المصادقة بنجاح',
    title: 'تمت المصادقة بنجاح.',
    goHome: 'الذهاب إلى الرئيسية',
    goToProfile: 'الانتقال إلى الملف الشخصي',
  },
  ja: {
    pageTitle: '認証完了',
    title: '認証が完了しました。',
    goHome: 'ホームに戻る',
    goToProfile: 'プロフィールへ移動',
  },
  ko: {
    pageTitle: '인증 완료',
    title: '인증이 성공적으로 완료되었습니다.',
    goHome: '홈으로 이동',
    goToProfile: '프로필로 이동',
  },
  zh: {
    pageTitle: '授权成功',
    title: '授权成功。',
    goHome: '返回首页',
    goToProfile: '前往个人资料',
  },
};
