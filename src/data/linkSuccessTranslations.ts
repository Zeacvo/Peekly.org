import type { Language } from '../translations';

export interface LinkSuccessTranslation {
  pageTitle: string;
  title: string;
  descWithNick: string;
  desc: string;
  closeWindow: string;
  goToProfile: string;
}

export const linkSuccessTranslations: Record<Language, LinkSuccessTranslation> = {
  ru: {
    pageTitle: 'Аккаунт привязан',
    title: 'УСПЕШНО ПРИВЯЗАНО!',
    descWithNick: 'Ваш аккаунт FACEIT ({nickname}) успешно подключен к Peekly. Вы можете закрыть эту вкладку и вернуться к расширению.',
    desc: 'Ваш аккаунт FACEIT успешно подключен к Peekly. Вы можете закрыть эту вкладку и вернуться к расширению.',
    closeWindow: 'Закрыть окно',
    goToProfile: 'Перейти в профиль',
  },
  en: {
    pageTitle: 'Account linked',
    title: 'SUCCESSFULLY LINKED!',
    descWithNick: 'Your FACEIT account ({nickname}) is now connected to Peekly. You can close this window and return to the extension.',
    desc: 'Your FACEIT account is now connected to Peekly. You can close this window and return to the extension.',
    closeWindow: 'Close Window',
    goToProfile: 'Go to Profile',
  },
  uk: {
    pageTitle: 'Акаунт прив\'язано',
    title: 'УСПІШНО ПРИВ\'ЯЗАНО!',
    descWithNick: 'Ваш акаунт FACEIT ({nickname}) успішно підключено до Peekly. Ви можете закрити цю вкладку та повернутися до розширення.',
    desc: 'Ваш акаунт FACEIT успішно підключено до Peekly. Ви можете закрити цю вкладку та повернутися до розширення.',
    closeWindow: 'Закрити вікно',
    goToProfile: 'Перейти до профілю',
  },
  de: {
    pageTitle: 'Konto verknüpft',
    title: 'ERFOLGREICH VERKNÜPFT!',
    descWithNick: 'Dein FACEIT-Konto ({nickname}) ist jetzt mit Peekly verbunden. Du kannst dieses Fenster schließen und zur Erweiterung zurückkehren.',
    desc: 'Dein FACEIT-Konto ist jetzt mit Peekly verbunden. Du kannst dieses Fenster schließen und zur Erweiterung zurückkehren.',
    closeWindow: 'Fenster schließen',
    goToProfile: 'Zum Profil',
  },
  fr: {
    pageTitle: 'Compte associé',
    title: 'ASSOCIATION RÉUSSIE !',
    descWithNick: 'Votre compte FACEIT ({nickname}) est désormais connecté à Peekly. Vous pouvez fermer cette fenêtre et revenir à l\'extension.',
    desc: 'Votre compte FACEIT est désormais connecté à Peekly. Vous pouvez fermer cette fenêtre et revenir à l\'extension.',
    closeWindow: 'Fermer la fenêtre',
    goToProfile: 'Accéder au profil',
  },
  es: {
    pageTitle: 'Cuenta vinculada',
    title: '¡VINCULACIÓN EXITOSA!',
    descWithNick: 'Tu cuenta de FACEIT ({nickname}) ahora está conectada con Peekly. Puedes cerrar esta ventana y regresar a la extensión.',
    desc: 'Tu cuenta de FACEIT ahora está conectada con Peekly. Puedes cerrar esta ventana y regresar a la extensión.',
    closeWindow: 'Cerrar ventana',
    goToProfile: 'Ir al perfil',
  },
  pl: {
    pageTitle: 'Konto połączone',
    title: 'POMYŚLNIE POŁĄCZONO!',
    descWithNick: 'Twoje konto FACEIT ({nickname}) zostało połączone z Peekly. Możesz zamknąć to okno i wrócić do rozszerzenia.',
    desc: 'Twoje konto FACEIT zostało połączone z Peekly. Możesz zamknąć to okno i wrócić do rozszerzenia.',
    closeWindow: 'Zamknij okno',
    goToProfile: 'Przejdź do profilu',
  },
  pt: {
    pageTitle: 'Conta vinculada',
    title: 'VINCULADO COM SUCESSO!',
    descWithNick: 'Sua conta da FACEIT ({nickname}) agora está conectada ao Peekly. Você pode fechar esta janela e voltar para a extensão.',
    desc: 'Sua conta da FACEIT agora está conectada ao Peekly. Você pode fechar esta janela e voltar para a extensão.',
    closeWindow: 'Fechar janela',
    goToProfile: 'Ir para o perfil',
  },
  da: {
    pageTitle: 'Konto tilknyttet',
    title: 'TILKNYTTET MED SUCCES!',
    descWithNick: 'Din FACEIT-konto ({nickname}) er nu forbundet med Peekly. Du kan lukke dette vindue og vende tilbage til udvidelsen.',
    desc: 'Din FACEIT-konto er nu forbundet med Peekly. Du kan lukke dette vindue og vende tilbage til udvidelsen.',
    closeWindow: 'Luk vindue',
    goToProfile: 'Gå til profil',
  },
  fi: {
    pageTitle: 'Tili yhdistetty',
    title: 'YHDISTETTY ONNISTUNEESTI!',
    descWithNick: 'FACEIT-tilisi ({nickname}) on nyt yhdistetty Peeklyyn. Voit sulkea tämän ikkunan ja palata laajennukseen.',
    desc: 'FACEIT-tilisi on nyt yhdistetty Peeklyyn. Voit sulkea tämän ikkunan ja palata laajennukseen.',
    closeWindow: 'Sulje ikkuna',
    goToProfile: 'Siirry profiiliin',
  },
  sv: {
    pageTitle: 'Konto länkat',
    title: 'LÄNKNINGEN LYCKADES!',
    descWithNick: 'Ditt FACEIT-konto ({nickname}) är nu anslutet till Peekly. Du kan stänga det här fönstret och återgå till tillägget.',
    desc: 'Ditt FACEIT-konto är nu anslutet till Peekly. Du kan stänga det här fönstret och återgå till tillägget.',
    closeWindow: 'Stäng fönster',
    goToProfile: 'Gå till profil',
  },
  tr: {
    pageTitle: 'Hesap bağlandı',
    title: 'BAŞARIYLA BAĞLANDI!',
    descWithNick: 'FACEIT hesabınız ({nickname}) artık Peekly\'ye bağlandı. Bu pencereyi kapatıp eklentiye geri dönebilirsiniz.',
    desc: 'FACEIT hesabınız artık Peekly\'ye bağlandı. Bu pencereyi kapatıp eklentiye geri dönebilirsiniz.',
    closeWindow: 'Pencereyi Kapat',
    goToProfile: 'Profile Git',
  },
  ar: {
    pageTitle: 'تم ربط الحساب',
    title: 'تم الربط بنجاح!',
    descWithNick: 'حسابك على FACEIT ({nickname}) متصل الآن بـ Peekly. يمكنك إغلاق هذه النافذة والعودة إلى الإضافة.',
    desc: 'حسابك على FACEIT متصل الآن بـ Peekly. يمكنك إغلاق هذه النافذة والعودة إلى الإضافة.',
    closeWindow: 'إغلاق النافذة',
    goToProfile: 'الانتقال إلى الملف الشخصي',
  },
  ja: {
    pageTitle: 'アカウント連携完了',
    title: '連携が完了しました！',
    descWithNick: 'FACEITアカウント（{nickname}）がPeeklyに接続されました。このウィンドウを閉じて拡張機能に戻ることができます。',
    desc: 'FACEITアカウントがPeeklyに接続されました。このウィンドウを閉じて拡張機能に戻ることができます。',
    closeWindow: 'ウィンドウを閉じる',
    goToProfile: 'プロフィールへ移動',
  },
  ko: {
    pageTitle: '계정 연동 완료',
    title: '성공적으로 연동되었습니다!',
    descWithNick: 'FACEIT 계정({nickname})이 Peekly에 연결되었습니다. 이 창을 닫고 확장 프로그램으로 돌아갈 수 있습니다.',
    desc: 'FACEIT 계정이 Peekly에 연결되었습니다. 이 창을 닫고 확장 프로그램으로 돌아갈 수 있습니다.',
    closeWindow: '창 닫기',
    goToProfile: '프로필로 이동',
  },
  zh: {
    pageTitle: '账户关联成功',
    title: '关联成功！',
    descWithNick: '您的 FACEIT 账户 ({nickname}) 现已成功连接至 Peekly。您可以关闭此窗口并返回扩展程序。',
    desc: '您的 FACEIT 账户现已成功连接至 Peekly。您可以关闭此窗口并返回扩展程序。',
    closeWindow: '关闭窗口',
    goToProfile: '前往个人资料',
  },
};
