export interface NotFoundTranslation {
  title?: string;
  description: string;
  button: string;
}

export const notFoundTranslations: Record<string, NotFoundTranslation> = {
  en: {
    description: "The page does not exist or has been deleted.",
    button: "< Go to home page"
  },
  ru: {
    description: "Страница не существует или была удалена.",
    button: "< Перейти на главную страницу"
  },
  uk: {
    description: "Сторінка не існує або була видалена.",
    button: "< Перейти на головну сторінку"
  },
  pl: {
    description: "Strona nie istnieje lub została usunięta.",
    button: "< Przejdź do strony głównej"
  },
  de: {
    description: "Die Seite existiert nicht oder wurde gelöscht.",
    button: "< Zur Startseite"
  },
  fr: {
    description: "La page n'existe pas ou a été supprimée.",
    button: "< Aller à la page d'accueil"
  },
  es: {
    description: "La página no existe o ha sido eliminada.",
    button: "< Ir a la página de inicio"
  },
  pt: {
    description: "A página não existe ou foi eliminada.",
    button: "< Ir para a página inicial"
  },
  da: {
    description: "Siden findes ikke eller er blevet slettet.",
    button: "< Gå til forsiden"
  },
  fi: {
    description: "Sivua ei ole olemassa tai se on poistettu.",
    button: "< Siirry etusivulle"
  },
  sv: {
    description: "Sidan finns inte eller har tagits bort.",
    button: "< Gå till startsidan"
  },
  tr: {
    description: "Sayfa mevcut değil veya silinmiş.",
    button: "< Ana sayfaya git"
  },
  ar: {
    description: "الصفحة غير موجودة أو تم حذفها.",
    button: "الانتقال إلى الصفحة الرئيسية >"
  },
  ja: {
    description: "ページが存在しないか、削除されました。",
    button: "< ホームページへ戻る"
  },
  ko: {
    description: "페이지가 존재하지 않거나 삭제되었습니다.",
    button: "< 홈페이지로 이동"
  },
  zh: {
    description: "页面不存在或已被删除。",
    button: "< 返回首页"
  }
};
