import type { Language } from '../translations';

export interface ProfileTranslation {
  // Navigation & Meta
  title: string;
  publicProfileTitle: string;
  viewOnlyNotice: string;
  backHome: string;
  userNotFound: string;
  checkingAuth: string;

  // Persona Card
  online: string;
  memberSince: string;
  ownerBadge: string;
  freeBadge: string;
  adminConsole: string;
  changeAvatar: string;
  avatarModalTitle: string;
  avatarUrlLabel: string;
  avatarSave: string;
  faceitConnected: string;
  faceitNotConnected: string;
  connectFaceit: string;
  viewOnFaceit: string;
  cs2Level: string;
  cs2Elo: string;
  region: string;
  verified: string;
  notLinked: string;
  profileId: string;
  copyProfileLink: string;
  linkCopied: string;

  // Credentials
  credentialsTitle: string;
  nicknameLabel: string;
  changeNickname: string;
  emailLabel: string;
  changeEmail: string;

  // Password & Security
  securityTitle: string;
  passwordLabel: string;
  changePassword: string;

  // Sessions
  sessionsTitle: string;
  currentDevice: string;
  currentDeviceDesc: string;
  activeNow: string;
  terminateOtherSessions: string;
  sessionsTerminatedSuccess: string;

  // Danger Zone
  dangerZoneTitle: string;
  dangerZoneSubtitle: string;
  deleteAccount: string;
  deleteAccountWarning: string;
  deleteAccountConfirm: string;

  // Modals & Forms
  save: string;
  cancel: string;
  close: string;
  submit: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  newEmail: string;
  verificationCode: string;
  sendCode: string;
  verifyAndSave: string;
  newNickname: string;
  codeSentTo: string;
  successUpdated: string;
}

export const profileTranslations: Record<Language, ProfileTranslation> = {
  // ==========================================
  // UKRAINIAN (Українська)
  // ==========================================
  uk: {
    title: 'ПРОФІЛЬ',
    publicProfileTitle: 'ПУБЛІЧНИЙ ПРОФІЛЬ ГРАВЦЯ',
    viewOnlyNotice: 'Ви переглядаєте відкриту картку гравця. Зміна налаштувань доступна лише власнику акаунта.',
    backHome: '< НА ГОЛОВНУ',
    userNotFound: 'Гравця не знайдено або видалено.',
    checkingAuth: 'Завантаження профілю...',

    online: 'В мережі',
    memberSince: 'У лавах з',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: 'КОНСОЛЬ АДМІНІСТРАТОРА ↗',
    changeAvatar: 'Змінити аватар',
    avatarModalTitle: 'Посилання на аватар',
    avatarUrlLabel: 'URL зображення (HTTPS):',
    avatarSave: 'Зберегти аватар',
    faceitConnected: 'FACEIT акаунт прив\'язано',
    faceitNotConnected: 'FACEIT не прив\'язано',
    connectFaceit: 'Прив\'язати FACEIT',
    viewOnFaceit: 'Профіль на FACEIT ↗',
    cs2Level: 'Рівень CS2',
    cs2Elo: 'Рейтинг CS2 ELO',
    region: 'Регіон',
    verified: 'Підтверджено',
    notLinked: 'Не прив\'язано',
    profileId: 'ID ПРОФІЛЮ',
    copyProfileLink: 'СКОПІЮВАТИ ПОСИЛАННЯ',
    linkCopied: 'СКОПІЙОВАНО!',

    credentialsTitle: 'ОБЛІКОВІ ДАНІ',
    nicknameLabel: 'НІКНЕЙМ ГРАВЦЯ',
    changeNickname: 'ЗМІНИТИ НІКНЕЙМ',
    emailLabel: 'ОСНОВНИЙ EMAIL',
    changeEmail: 'ЗМІНИТИ EMAIL',

    securityTitle: 'ПАРОЛЬ ТА БЕЗПЕКА',
    passwordLabel: 'ПАРОЛЬ',
    changePassword: 'ЗМІНИТИ ПАРОЛЬ',

    sessionsTitle: 'АКТИВНІ СЕСІЇ',
    currentDevice: 'ПОТОЧНИЙ ПРИСТРІЙ',
    currentDeviceDesc: 'Chrome (Windows) • Активно зараз',
    activeNow: 'Активно зараз',
    terminateOtherSessions: 'ЗАВЕРШИТИ ВСІ ІНШІ СЕСІЇ',
    sessionsTerminatedSuccess: 'Всі інші сеанси успішно завершено.',

    dangerZoneTitle: 'НЕБЕЗПЕЧНА ЗОНА',
    dangerZoneSubtitle: 'Незворотні дії з обліковим записом',
    deleteAccount: 'ВИДАЛИТИ АКАУНТ',
    deleteAccountWarning: 'При видаленні акаунта всі дані, сесії та прив\'язка до FACEIT будуть безповоротно стерті.',
    deleteAccountConfirm: 'Ви впевнені, що хочете видалити акаунт? Цю дію неможливо скасувати.',

    save: 'Зберегти',
    cancel: 'Скасувати',
    close: 'Закрити',
    submit: 'Підтвердити',
    oldPassword: 'Поточний пароль',
    newPassword: 'Новий пароль (від 8 символів)',
    confirmNewPassword: 'Повторіть новий пароль',
    newEmail: 'Нова адреса електронної пошти',
    verificationCode: '6-значний код підтвердження',
    sendCode: 'Надіслати код',
    verifyAndSave: 'Підтвердити та оновити',
    newNickname: 'Новий нікнейм (3-20 символів)',
    codeSentTo: 'Код підтвердження надіслано на',
    successUpdated: 'Зміни успішно збережено',
  },

  // ==========================================
  // RUSSIAN (Русский)
  // ==========================================
  ru: {
    title: 'ПРОФИЛЬ',
    publicProfileTitle: 'ПУБЛИЧНЫЙ ПРОФИЛЬ ИГРОКА',
    viewOnlyNotice: 'Вы просматриваете открытую карточку игрока. Изменение настроек доступно только владельцу аккаунта.',
    backHome: '< НА ГЛАВНУЮ',
    userNotFound: 'Пользователь не найден или был удалён.',
    checkingAuth: 'Загрузка профиля...',

    online: 'В сети',
    memberSince: 'В рядах с',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: 'КОНСОЛЬ АДМИНИСТРАТОРА ↗',
    changeAvatar: 'Изменить аватар',
    avatarModalTitle: 'Ссылка на аватар',
    avatarUrlLabel: 'URL изображения (HTTPS):',
    avatarSave: 'Сохранить аватар',
    faceitConnected: 'FACEIT аккаунт привязан',
    faceitNotConnected: 'FACEIT не привязан',
    connectFaceit: 'Привязать FACEIT',
    viewOnFaceit: 'Профиль на FACEIT ↗',
    cs2Level: 'Уровень CS2',
    cs2Elo: 'Рейтинг CS2 ELO',
    region: 'Регион',
    verified: 'Подтверждён',
    notLinked: 'Не привязан',
    profileId: 'ID ПРОФИЛЯ',
    copyProfileLink: 'СКОПИРОВАТЬ ССЫЛКУ',
    linkCopied: 'СКОПИРОВАНО!',

    credentialsTitle: 'УЧЕТНЫЕ ДАННЫЕ',
    nicknameLabel: 'НИКНЕЙМ ИГРОКА',
    changeNickname: 'ИЗМЕНИТЬ НИКНЕЙМ',
    emailLabel: 'ОСНОВНОЙ EMAIL',
    changeEmail: 'ИЗМЕНИТЬ EMAIL',

    securityTitle: 'ПАРОЛЬ И БЕЗОПАСНОСТЬ',
    passwordLabel: 'ПАРОЛЬ',
    changePassword: 'ИЗМЕНИТЬ ПАРОЛЬ',

    sessionsTitle: 'АКТИВНЫЕ СЕССИИ',
    currentDevice: 'ТЕКУЩЕЕ УСТРОЙСТВО',
    currentDeviceDesc: 'Chrome (Windows) • Активно сейчас',
    activeNow: 'Активно сейчас',
    terminateOtherSessions: 'ЗАВЕРШИТЬ ВСЕ ДРУГИЕ СЕАНСЫ',
    sessionsTerminatedSuccess: 'Все остальные сеансы успешно завершены.',

    dangerZoneTitle: 'ОПАСНАЯ ЗОНА',
    dangerZoneSubtitle: 'Необратимые действия с учётной записью',
    deleteAccount: 'УДАЛИТЬ АККАУНТ',
    deleteAccountWarning: 'При удалении аккаунта все данные, сессии и привязка к FACEIT будут безвозвратно стёрты.',
    deleteAccountConfirm: 'Вы уверены, что хотите удалить аккаунт? Это действие необратимо.',

    save: 'Сохранить',
    cancel: 'Отмена',
    close: 'Закрыть',
    submit: 'Подтвердить',
    oldPassword: 'Текущий пароль',
    newPassword: 'Новый пароль (от 8 символов)',
    confirmNewPassword: 'Повторите новый пароль',
    newEmail: 'Новый адрес электронной почты',
    verificationCode: '6-значный код подтверждения',
    sendCode: 'Отправить код',
    verifyAndSave: 'Подтвердить и сохранить',
    newNickname: 'Новый никнейм (3-20 символов)',
    codeSentTo: 'Код подтверждения отправлен на',
    successUpdated: 'Изменения успешно сохранены',
  },

  // ==========================================
  // ENGLISH
  // ==========================================
  en: {
    title: 'PROFILE',
    publicProfileTitle: 'PUBLIC PLAYER PROFILE',
    viewOnlyNotice: 'You are viewing a public player profile. Account settings can only be modified by the owner.',
    backHome: '< BACK HOME',
    userNotFound: 'Player profile not found or removed.',
    checkingAuth: 'Loading profile...',

    online: 'Online',
    memberSince: 'Member since',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: 'ADMIN CONSOLE ↗',
    changeAvatar: 'Change Avatar',
    avatarModalTitle: 'Avatar URL',
    avatarUrlLabel: 'Direct Image URL (HTTPS):',
    avatarSave: 'Save Avatar',
    faceitConnected: 'FACEIT Account Linked',
    faceitNotConnected: 'FACEIT Not Linked',
    connectFaceit: 'Connect FACEIT',
    viewOnFaceit: 'View on FACEIT ↗',
    cs2Level: 'CS2 Level',
    cs2Elo: 'CS2 Competitive ELO',
    region: 'Region',
    verified: 'Verified',
    notLinked: 'Not Linked',
    profileId: 'PROFILE ID',
    copyProfileLink: 'COPY LINK',
    linkCopied: 'COPIED!',

    credentialsTitle: 'ACCOUNT CREDENTIALS',
    nicknameLabel: 'PLAYER NICKNAME',
    changeNickname: 'CHANGE NICKNAME',
    emailLabel: 'PRIMARY EMAIL',
    changeEmail: 'CHANGE EMAIL',

    securityTitle: 'PASSWORD & SECURITY',
    passwordLabel: 'PASSWORD',
    changePassword: 'CHANGE PASSWORD',

    sessionsTitle: 'ACTIVE SESSIONS',
    currentDevice: 'CURRENT DEVICE',
    currentDeviceDesc: 'Chrome (Windows) • Active now',
    activeNow: 'Active now',
    terminateOtherSessions: 'TERMINATE ALL OTHER SESSIONS',
    sessionsTerminatedSuccess: 'All other sessions have been terminated.',

    dangerZoneTitle: 'DANGER ZONE',
    dangerZoneSubtitle: 'Irreversible account operations',
    deleteAccount: 'DELETE ACCOUNT',
    deleteAccountWarning: 'Deleting your account permanently removes all personal data, sessions, and telemetry.',
    deleteAccountConfirm: 'Are you sure you want to delete your account? This action cannot be undone.',

    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    submit: 'Submit',
    oldPassword: 'Current Password',
    newPassword: 'New Password (min. 8 chars)',
    confirmNewPassword: 'Confirm New Password',
    newEmail: 'New Email Address',
    verificationCode: '6-digit Verification Code',
    sendCode: 'Send Code',
    verifyAndSave: 'Verify & Update',
    newNickname: 'New Nickname (3-20 chars)',
    codeSentTo: 'Verification code sent to',
    successUpdated: 'Successfully updated',
  },

  // ==========================================
  // GERMAN (Deutsch)
  // ==========================================
  de: {
    title: 'PROFIL',
    publicProfileTitle: 'ÖFFENTLICHES SPIELERPROFIL',
    viewOnlyNotice: 'Sie sehen ein öffentliches Spielerprofil. Einstellungen können nur vom Kontoinhaber geändert werden.',
    backHome: '< ZUR STARTSEITE',
    userNotFound: 'Spielerprofil nicht gefunden oder entfernt.',
    checkingAuth: 'Profil wird geladen...',

    online: 'Online',
    memberSince: 'Dabei seit',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: 'ADMIN-KONSOLE ↗',
    changeAvatar: 'Avatar ändern',
    avatarModalTitle: 'Avatar-URL',
    avatarUrlLabel: 'Bild-URL (HTTPS):',
    avatarSave: 'Avatar speichern',
    faceitConnected: 'FACEIT-Konto verknüpft',
    faceitNotConnected: 'FACEIT nicht verknüpft',
    connectFaceit: 'FACEIT verknüpfen',
    viewOnFaceit: 'Auf FACEIT ansehen ↗',
    cs2Level: 'CS2 Stufe',
    cs2Elo: 'CS2 ELO-Wertung',
    region: 'Region',
    verified: 'Verifiziert',
    notLinked: 'Nicht verknüpft',
    profileId: 'PROFIL-ID',
    copyProfileLink: 'LINK KOPIEREN',
    linkCopied: 'KOPIERT!',

    credentialsTitle: 'ZUGANGSDATEN',
    nicknameLabel: 'SPIELER-NICKNAME',
    changeNickname: 'NICKNAME ÄNDERN',
    emailLabel: 'PRIMÄRE E-MAIL',
    changeEmail: 'E-MAIL ÄNDERN',

    securityTitle: 'PASSWORT & SICHERHEIT',
    passwordLabel: 'PASSWORT',
    changePassword: 'PASSWORT ÄNDERN',

    sessionsTitle: 'AKTIVE SITZUNGEN',
    currentDevice: 'AKTUELLES GERÄT',
    currentDeviceDesc: 'Chrome (Windows) • Jetzt aktiv',
    activeNow: 'Jetzt aktiv',
    terminateOtherSessions: 'ALLE ANDEREN SITZUNGEN BEENDEN',
    sessionsTerminatedSuccess: 'Alle anderen Sitzungen wurden erfolgreich beendet.',

    dangerZoneTitle: 'GEFAHRENZONE',
    dangerZoneSubtitle: 'Unwiderrufliche Kontoaktionen',
    deleteAccount: 'KONTO LÖSCHEN',
    deleteAccountWarning: 'Durch das Löschen des Kontos werden alle Daten, Sitzungen und FACEIT-Verknüpfungen dauerhaft entfernt.',
    deleteAccountConfirm: 'Möchten Sie Ihr Konto wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',

    save: 'Speichern',
    cancel: 'Abbrechen',
    close: 'Schließen',
    submit: 'Bestätigen',
    oldPassword: 'Aktuelles Passwort',
    newPassword: 'Neues Passwort (mind. 8 Zeichen)',
    confirmNewPassword: 'Neues Passwort bestätigen',
    newEmail: 'Neue E-Mail-Adresse',
    verificationCode: '6-stelliger Bestätigungscode',
    sendCode: 'Code senden',
    verifyAndSave: 'Bestätigen & Aktualisieren',
    newNickname: 'Neuer Nickname (3-20 Zeichen)',
    codeSentTo: 'Bestätigungscode gesendet an',
    successUpdated: 'Erfolgreich aktualisiert',
  },

  // ==========================================
  // POLISH (Polski)
  // ==========================================
  pl: {
    title: 'PROFIL',
    publicProfileTitle: 'PUBLICZNY PROFIL GRACZA',
    viewOnlyNotice: 'Przeglądasz profil publiczny. Zmiana ustawień jest dostępna tylko dla właściciela konta.',
    backHome: '< STRONA GŁÓWNA',
    userNotFound: 'Profil gracza nie został znaleziony.',
    checkingAuth: 'Ładowanie profilu...',

    online: 'Online',
    memberSince: 'W szeregach od',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: 'KONSOLA ADMINISTRATORA ↗',
    changeAvatar: 'Zmień awatar',
    avatarModalTitle: 'URL awatara',
    avatarUrlLabel: 'Adres obrazu (HTTPS):',
    avatarSave: 'Zapisz awatar',
    faceitConnected: 'Konto FACEIT połączone',
    faceitNotConnected: 'FACEIT niepołączony',
    connectFaceit: 'Połącz FACEIT',
    viewOnFaceit: 'Zobacz na FACEIT ↗',
    cs2Level: 'Poziom CS2',
    cs2Elo: 'Ranking CS2 ELO',
    region: 'Region',
    verified: 'Zweryfikowany',
    notLinked: 'Niepołączony',
    profileId: 'ID PROFILU',
    copyProfileLink: 'KOPIUJ LINK',
    linkCopied: 'SKOPIOWANO!',

    credentialsTitle: 'DANE LOGOWANIA',
    nicknameLabel: 'NICK GRACZA',
    changeNickname: 'ZMIEŃ NICK',
    emailLabel: 'GŁÓWNY EMAIL',
    changeEmail: 'ZMIEŃ EMAIL',

    securityTitle: 'HASŁO I BEZPIECZEŃSTWO',
    passwordLabel: 'HASŁO',
    changePassword: 'ZMIEŃ HASŁO',

    sessionsTitle: 'AKTYWNE SESJE',
    currentDevice: 'BIEŻĄCE URZĄDZENIE',
    currentDeviceDesc: 'Chrome (Windows) • Aktywne teraz',
    activeNow: 'Aktywne teraz',
    terminateOtherSessions: 'ZAKOŃCZ WSZYSTKIE INNE SESJE',
    sessionsTerminatedSuccess: 'Wszystkie pozostałe sesje zostały zakończone.',

    dangerZoneTitle: 'STREFA ZAGROŻENIA',
    dangerZoneSubtitle: 'Nieodwracalne operacje na koncie',
    deleteAccount: 'USUŃ KONTO',
    deleteAccountWarning: 'Usunięcie konta trwale skasuje dane osobowe, sesje oraz integrację z FACEIT.',
    deleteAccountConfirm: 'Czy na pewno chcesz usunąć konto? Ta operacja jest nieodwracalna.',

    save: 'Zapisz',
    cancel: 'Anuluj',
    close: 'Zamknij',
    submit: 'Zatwierdź',
    oldPassword: 'Aktualne hasło',
    newPassword: 'Nowe hasło (min. 8 znaków)',
    confirmNewPassword: 'Potwierdź nowe hasło',
    newEmail: 'Nowy adres email',
    verificationCode: '6-cyfrowy kod weryfikacyjny',
    sendCode: 'Wyślij kod',
    verifyAndSave: 'Zweryfikuj i zapisz',
    newNickname: 'Nowy nick (3-20 znaków)',
    codeSentTo: 'Kod weryfikacyjny wysłany na',
    successUpdated: 'Pomyślnie zaktualizowano',
  },

  // ==========================================
  // FRENCH (Français)
  // ==========================================
  fr: {
    title: 'PROFIL',
    publicProfileTitle: 'PROFIL PUBLIC DU JOUEUR',
    viewOnlyNotice: 'Vous consultez un profil public. Les paramètres ne peuvent être modifiés que par le propriétaire.',
    backHome: '< RETOUR À L\'ACCUEIL',
    userNotFound: 'Profil joueur introuvable ou supprimé.',
    checkingAuth: 'Chargement du profil...',

    online: 'En ligne',
    memberSince: 'Membre depuis',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: 'CONSOLE ADMIN ↗',
    changeAvatar: 'Changer l\'avatar',
    avatarModalTitle: 'URL de l\'avatar',
    avatarUrlLabel: 'URL de l\'image (HTTPS) :',
    avatarSave: 'Enregistrer l\'avatar',
    faceitConnected: 'Compte FACEIT lié',
    faceitNotConnected: 'FACEIT non lié',
    connectFaceit: 'Lier FACEIT',
    viewOnFaceit: 'Voir sur FACEIT ↗',
    cs2Level: 'Niveau CS2',
    cs2Elo: 'Classement CS2 ELO',
    region: 'Région',
    verified: 'Vérifié',
    notLinked: 'Non lié',
    profileId: 'ID DU PROFIL',
    copyProfileLink: 'COPIER LE LIEN',
    linkCopied: 'COPIÉ !',

    credentialsTitle: 'IDENTIFIANTS DU COMPTE',
    nicknameLabel: 'PSEUDO DU JOUEUR',
    changeNickname: 'CHANGER DE PSEUDO',
    emailLabel: 'E-MAIL PRINCIPAL',
    changeEmail: 'CHANGER D\'E-MAIL',

    securityTitle: 'MOT DE PASSE ET SÉCURITÉ',
    passwordLabel: 'MOT DE PASSE',
    changePassword: 'CHANGER DE MOT DE PASSE',

    sessionsTitle: 'SESSIONS ACTIVES',
    currentDevice: 'APPAREIL ACTUEL',
    currentDeviceDesc: 'Chrome (Windows) • Actif maintenant',
    activeNow: 'Actif maintenant',
    terminateOtherSessions: 'TERMINER TOUTES LES AUTRES SESSIONS',
    sessionsTerminatedSuccess: 'Toutes les autres sessions ont été terminées.',

    dangerZoneTitle: 'ZONE DE DANGER',
    dangerZoneSubtitle: 'Opérations irréversibles sur le compte',
    deleteAccount: 'SUPPRIMER LE COMPTE',
    deleteAccountWarning: 'La suppression du compte effacera définitivement toutes vos données et liaisons FACEIT.',
    deleteAccountConfirm: 'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',

    save: 'Enregistrer',
    cancel: 'Annuler',
    close: 'Fermer',
    submit: 'Valider',
    oldPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe (min. 8 car.)',
    confirmNewPassword: 'Confirmer le nouveau mot de passe',
    newEmail: 'Nouvelle adresse e-mail',
    verificationCode: 'Code de vérification à 6 chiffres',
    sendCode: 'Envoyer le code',
    verifyAndSave: 'Vérifier et mettre à jour',
    newNickname: 'Nouveau pseudo (3-20 car.)',
    codeSentTo: 'Code de vérification envoyé à',
    successUpdated: 'Mis à jour avec succès',
  },

  // ==========================================
  // SPANISH (Español)
  // ==========================================
  es: {
    title: 'PERFIL',
    publicProfileTitle: 'PERFIL PÚBLICO DEL JUGADOR',
    viewOnlyNotice: 'Estás viendo un perfil público. Los ajustes solo pueden ser modificados por el propietario.',
    backHome: '< VOLVER AL INICIO',
    userNotFound: 'Perfil de jugador no encontrado o eliminado.',
    checkingAuth: 'Cargando perfil...',

    online: 'En línea',
    memberSince: 'Miembro desde',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: 'CONSOLA DE ADMIN ↗',
    changeAvatar: 'Cambiar avatar',
    avatarModalTitle: 'URL del avatar',
    avatarUrlLabel: 'URL directa de imagen (HTTPS):',
    avatarSave: 'Guardar avatar',
    faceitConnected: 'Cuenta FACEIT vinculada',
    faceitNotConnected: 'FACEIT no vinculado',
    connectFaceit: 'Vincular FACEIT',
    viewOnFaceit: 'Ver en FACEIT ↗',
    cs2Level: 'Nivel CS2',
    cs2Elo: 'Clasificación CS2 ELO',
    region: 'Región',
    verified: 'Verificado',
    notLinked: 'No vinculado',
    profileId: 'ID DE PERFIL',
    copyProfileLink: 'COPIAR ENLACE',
    linkCopied: '¡COPIADO!',

    credentialsTitle: 'CREDENCIALES DE LA CUENTA',
    nicknameLabel: 'NICK DEL JUGADOR',
    changeNickname: 'CAMBIAR NICK',
    emailLabel: 'CORREO PRINCIPAL',
    changeEmail: 'CAMBIAR CORREO',

    securityTitle: 'CONTRASEÑA Y SEGURIDAD',
    passwordLabel: 'CONTRASEÑA',
    changePassword: 'CAMBIAR CONTRASEÑA',

    sessionsTitle: 'SESIONES ACTIVAS',
    currentDevice: 'DISPOSITIVO ACTUAL',
    currentDeviceDesc: 'Chrome (Windows) • Activo ahora',
    activeNow: 'Activo ahora',
    terminateOtherSessions: 'CERRAR TODAS LAS DEMÁS SESIONES',
    sessionsTerminatedSuccess: 'Todas las demás sesiones han sido finalizadas.',

    dangerZoneTitle: 'ZONA DE PELIGRO',
    dangerZoneSubtitle: 'Operaciones irreversibles de la cuenta',
    deleteAccount: 'ELIMINAR CUENTA',
    deleteAccountWarning: 'Eliminar tu cuenta borrará permanentemente todos tus datos personales, sesiones y telemetría.',
    deleteAccountConfirm: '¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',

    save: 'Guardar',
    cancel: 'Cancelar',
    close: 'Cerrar',
    submit: 'Confirmar',
    oldPassword: 'Contraseña actual',
    newPassword: 'Nueva contraseña (mín. 8 caract.)',
    confirmNewPassword: 'Confirmar nueva contraseña',
    newEmail: 'Nueva dirección de correo',
    verificationCode: 'Código de 6 dígitos',
    sendCode: 'Enviar código',
    verifyAndSave: 'Verificar y actualizar',
    newNickname: 'Nuevo nick (3-20 caracteres)',
    codeSentTo: 'Código de verificación enviado a',
    successUpdated: 'Actualizado correctamente',
  },

  // ==========================================
  // DANISH (Dansk)
  // ==========================================
  da: {
    title: 'PROFIL',
    publicProfileTitle: 'OFFENTLIG SPILLERPROFIL',
    viewOnlyNotice: 'Du ser en offentlig profil. Indstillinger kan kun ændres af kontoejeren.',
    backHome: '< TILBAGE TIL START',
    userNotFound: 'Spillerprofil ikke fundet.',
    checkingAuth: 'Indlæser profil...',

    online: 'Online',
    memberSince: 'Medlem siden',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: 'ADMINISTRATORKONSOL ↗',
    changeAvatar: 'Skift avatar',
    avatarModalTitle: 'Avatar-URL',
    avatarUrlLabel: 'Billede-URL (HTTPS):',
    avatarSave: 'Gem avatar',
    faceitConnected: 'FACEIT-konto tilknyttet',
    faceitNotConnected: 'FACEIT ikke tilknyttet',
    connectFaceit: 'Tilknyt FACEIT',
    viewOnFaceit: 'Vis på FACEIT ↗',
    cs2Level: 'CS2 Niveau',
    cs2Elo: 'CS2 ELO-rating',
    region: 'Region',
    verified: 'Verificeret',
    notLinked: 'Ikke tilknyttet',
    profileId: 'PROFIL-ID',
    copyProfileLink: 'KOPIER LINK',
    linkCopied: 'KOPIERET!',

    credentialsTitle: 'KONTOOPLYSNINGER',
    nicknameLabel: 'SPILLERNICKNAME',
    changeNickname: 'SKIFT NICKNAME',
    emailLabel: 'PRIMÆR E-MAIL',
    changeEmail: 'SKIFT E-MAIL',

    securityTitle: 'ADGANGSKODE & SIKKERHED',
    passwordLabel: 'ADGANGSKODE',
    changePassword: 'SKIFT ADGANGSKODE',

    sessionsTitle: 'AKTIVE SESSIONER',
    currentDevice: 'NUVÆRENDE ENHED',
    currentDeviceDesc: 'Chrome (Windows) • Aktiv nu',
    activeNow: 'Aktiv nu',
    terminateOtherSessions: 'AFSLUT ALLE ANDRE SESSIONER',
    sessionsTerminatedSuccess: 'Alle andre sessioner er blevet afsluttet.',

    dangerZoneTitle: 'FAREZONE',
    dangerZoneSubtitle: 'Uigenkaldelige kontohandlinger',
    deleteAccount: 'SLET KONTO',
    deleteAccountWarning: 'Sletning af din konto fjerner permanent alle data og tilknytninger.',
    deleteAccountConfirm: 'Er du sikker på, at du vil slette din konto? Dette kan ikke fortrydes.',

    save: 'Gem',
    cancel: 'Annuller',
    close: 'Luk',
    submit: 'Bekræft',
    oldPassword: 'Nuværende adgangskode',
    newPassword: 'Ny adgangskode (min. 8 tegn)',
    confirmNewPassword: 'Bekræft ny adgangskode',
    newEmail: 'Ny e-mailadresse',
    verificationCode: '6-cifret bekræftelseskode',
    sendCode: 'Send kode',
    verifyAndSave: 'Bekræft & Opdater',
    newNickname: 'Nyt nickname (3-20 tegn)',
    codeSentTo: 'Bekræftelseskode sendt til',
    successUpdated: 'Opdateret med succes',
  },

  // ==========================================
  // PORTUGUESE (Português)
  // ==========================================
  pt: {
    title: 'PERFIL',
    publicProfileTitle: 'PERFIL PÚBLICO DO JOGADOR',
    viewOnlyNotice: 'Você está visualizando um perfil público. Alterações só podem ser feitas pelo titular da conta.',
    backHome: '< VOLTAR AO INÍCIO',
    userNotFound: 'Perfil de jogador não encontrado.',
    checkingAuth: 'Carregando perfil...',

    online: 'Online',
    memberSince: 'Membro desde',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: 'CONSOLES DE ADMIN ↗',
    changeAvatar: 'Alterar avatar',
    avatarModalTitle: 'URL do avatar',
    avatarUrlLabel: 'URL direta da imagem (HTTPS):',
    avatarSave: 'Salvar avatar',
    faceitConnected: 'Conta FACEIT vinculada',
    faceitNotConnected: 'FACEIT não vinculado',
    connectFaceit: 'Vincular FACEIT',
    viewOnFaceit: 'Ver na FACEIT ↗',
    cs2Level: 'Nível CS2',
    cs2Elo: 'Classificação CS2 ELO',
    region: 'Região',
    verified: 'Verificado',
    notLinked: 'Não vinculado',
    profileId: 'ID DO PERFIL',
    copyProfileLink: 'COPIAR LINK',
    linkCopied: 'COPIADO!',

    credentialsTitle: 'CREDENCIAS DA CONTA',
    nicknameLabel: 'NICK DO JOGADOR',
    changeNickname: 'ALTERAR NICK',
    emailLabel: 'EMAIL PRINCIPAL',
    changeEmail: 'ALTERAR EMAIL',

    securityTitle: 'SENHA E SEGURANÇA',
    passwordLabel: 'SENHA',
    changePassword: 'ALTERAR SENHA',

    sessionsTitle: 'SESSÕES ATIVAS',
    currentDevice: 'DISPOSITIVO ATUAL',
    currentDeviceDesc: 'Chrome (Windows) • Ativo agora',
    activeNow: 'Ativo agora',
    terminateOtherSessions: 'ENCERRAR TODAS AS OUTRAS SESSÕES',
    sessionsTerminatedSuccess: 'Todas as outras sessões foram encerradas.',

    dangerZoneTitle: 'ZONA DE PERIGO',
    dangerZoneSubtitle: 'Ações irreversíveis da conta',
    deleteAccount: 'EXCLUIR CONTA',
    deleteAccountWarning: 'A exclusão da conta removerá permanentemente todos os seus dados e conexões.',
    deleteAccountConfirm: 'Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.',

    save: 'Salvar',
    cancel: 'Cancelar',
    close: 'Fechar',
    submit: 'Confirmar',
    oldPassword: 'Senha atual',
    newPassword: 'Nova senha (mín. 8 caracteres)',
    confirmNewPassword: 'Confirmar nova senha',
    newEmail: 'Novo endereço de email',
    verificationCode: 'Código de verificação de 6 dígitos',
    sendCode: 'Enviar código',
    verifyAndSave: 'Verificar e atualizar',
    newNickname: 'Novo nick (3-20 caracteres)',
    codeSentTo: 'Código enviado para',
    successUpdated: 'Atualizado com sucesso',
  },

  // ==========================================
  // FINNISH (Suomi)
  // ==========================================
  fi: {
    title: 'PROFIILI',
    publicProfileTitle: 'JULKINEN PELAAJAPROFIILI',
    viewOnlyNotice: 'Tarkastelet julkista profiilia. Vain tilin omistaja voi muuttaa asetuksia.',
    backHome: '< TAKAISIN ALKUUN',
    userNotFound: 'Pelaajaprofiilia ei löytynyt.',
    checkingAuth: 'Ladataan profiilia...',

    online: 'Paikalla',
    memberSince: 'Jäsen alkaen',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: 'YLLÄPITOKONSOLI ↗',
    changeAvatar: 'Vaihda profiilikuva',
    avatarModalTitle: 'Kuvan URL-osoite',
    avatarUrlLabel: 'Kuvan URL (HTTPS):',
    avatarSave: 'Tallenna profiilikuva',
    faceitConnected: 'FACEIT-tili yhdistetty',
    faceitNotConnected: 'FACEIT ei yhdistetty',
    connectFaceit: 'Yhdistä FACEIT',
    viewOnFaceit: 'Näytä FACEITissa ↗',
    cs2Level: 'CS2 Taso',
    cs2Elo: 'CS2 ELO-pisteet',
    region: 'Alue',
    verified: 'Vahvistettu',
    notLinked: 'Ei yhdistetty',
    profileId: 'PROFIILIN TUNNUS',
    copyProfileLink: 'KOPIOI LINKKI',
    linkCopied: 'KOPIOITU!',

    credentialsTitle: 'TILIN TIEDOT',
    nicknameLabel: 'PELAAJAN NIMIMERKKI',
    changeNickname: 'VAIHDA NIMIMERKKI',
    emailLabel: 'ENSISIJAINEN SÄHKÖPOSTI',
    changeEmail: 'VAIHDA SÄHKÖPOSTI',

    securityTitle: 'SALASANA JA TURVALLISUUS',
    passwordLabel: 'SALASANA',
    changePassword: 'VAIHDA SALASANA',

    sessionsTitle: 'AKTIIVISET ISTUNNOT',
    currentDevice: 'NYKYINEN LAITE',
    currentDeviceDesc: 'Chrome (Windows) • Aktiivinen nyt',
    activeNow: 'Aktiivinen nyt',
    terminateOtherSessions: 'LOPETA KAIKKI MUUT ISTUNNOT',
    sessionsTerminatedSuccess: 'Kaikki muut istunnot on päätetty.',

    dangerZoneTitle: 'VAARA-ALUE',
    dangerZoneSubtitle: 'Peruuttamattomat toimenpiteet',
    deleteAccount: 'POISTA TILI',
    deleteAccountWarning: 'Tilin poistaminen hävittää pysyvästi kaikki tietosi ja FACEIT-linkityksen.',
    deleteAccountConfirm: 'Haluatko varmasti poistaa tilisi? Toimintoa ei voi peruuttaa.',

    save: 'Tallenna',
    cancel: 'Peruuta',
    close: 'Sulje',
    submit: 'Vahvista',
    oldPassword: 'Nykyinen salasana',
    newPassword: 'Uusi salasana (väh. 8 merkkiä)',
    confirmNewPassword: 'Vahvista uusi salasana',
    newEmail: 'Uusi sähköpostiosoite',
    verificationCode: '6-numeroinen koodi',
    sendCode: 'Lähetä koodi',
    verifyAndSave: 'Vahvista & Päivitä',
    newNickname: 'Uusi nimimerkki (3-20 merkkiä)',
    codeSentTo: 'Vahvistuskoodi lähetetty kohteeseen',
    successUpdated: 'Päivitetty onnistuneesti',
  },

  // ==========================================
  // SWEDISH (Svenska)
  // ==========================================
  sv: {
    title: 'PROFIL',
    publicProfileTitle: 'OFFENTLIG SPELARPROFIL',
    viewOnlyNotice: 'Du visar en offentlig profil. Inställningar kan endast ändras av kontoinnehavaren.',
    backHome: '< TILLBAKA TILL START',
    userNotFound: 'Spelarprofilen hittades inte.',
    checkingAuth: 'Laddar profil...',

    online: 'Online',
    memberSince: 'Medlem sedan',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: 'ADMINKONSOL ↗',
    changeAvatar: 'Byt avatar',
    avatarModalTitle: 'Avatar-URL',
    avatarUrlLabel: 'Bild-URL (HTTPS):',
    avatarSave: 'Spara avatar',
    faceitConnected: 'FACEIT-konto kopplat',
    faceitNotConnected: 'FACEIT ej kopplat',
    connectFaceit: 'Koppla FACEIT',
    viewOnFaceit: 'Visa på FACEIT ↗',
    cs2Level: 'CS2 Nivå',
    cs2Elo: 'CS2 ELO-betyg',
    region: 'Region',
    verified: 'Verifierad',
    notLinked: 'Ej kopplad',
    profileId: 'PROFIL-ID',
    copyProfileLink: 'KOPIERA LÄNK',
    linkCopied: 'KOPIERAT!',

    credentialsTitle: 'KONTOUPPGIFTER',
    nicknameLabel: 'SPELAR-NICKNAME',
    changeNickname: 'ÄNDRA NICKNAME',
    emailLabel: 'PRIMÄR E-POST',
    changeEmail: 'ÄNDRA E-POST',

    securityTitle: 'LÖSENORD & SÄKERHET',
    passwordLabel: 'LÖSENORD',
    changePassword: 'BYT LÖSENORD',

    sessionsTitle: 'AKTIVA SESSIONER',
    currentDevice: 'NUVARANDE ENHET',
    currentDeviceDesc: 'Chrome (Windows) • Aktiv nu',
    activeNow: 'Aktiv nu',
    terminateOtherSessions: 'AVSLUTA ALLA ANDRA SESSIONER',
    sessionsTerminatedSuccess: 'Alla andra sessioner har avslutats.',

    dangerZoneTitle: 'RISKZON',
    dangerZoneSubtitle: 'Oåterkalleliga kontoåtgärder',
    deleteAccount: 'RADERA KONTO',
    deleteAccountWarning: 'Om du raderar ditt konto tas all information och FACEIT-koppling bort permanent.',
    deleteAccountConfirm: 'Är du säker på att du vill radera ditt konto? Detta kan inte ångras.',

    save: 'Spara',
    cancel: 'Avbryt',
    close: 'Stäng',
    submit: 'Bekräfta',
    oldPassword: 'Nuvarande lösenord',
    newPassword: 'Nytt lösenord (minst 8 tecken)',
    confirmNewPassword: 'Bekräfta nytt lösenord',
    newEmail: 'Ny e-postadress',
    verificationCode: '6-siffrig verifieringskod',
    sendCode: 'Skicka kod',
    verifyAndSave: 'Verifiera & Uppdatera',
    newNickname: 'Nytt nickname (3-20 tecken)',
    codeSentTo: 'Verifieringskod skickad till',
    successUpdated: 'Uppdaterades framgångsrikt',
  },

  // ==========================================
  // TURKISH (Türkçe)
  // ==========================================
  tr: {
    title: 'PROFİL',
    publicProfileTitle: 'HERKESE AÇIK OYUNCU PROFİLİ',
    viewOnlyNotice: 'Herkese açık bir profili görüntülüyorsunuz. Yalnızca hesap sahibi değişiklik yapabilir.',
    backHome: '< ANA SAYFAYA DÖN',
    userNotFound: 'Oyuncu profili bulunamadı veya silindi.',
    checkingAuth: 'Profil yükleniyor...',

    online: 'Çevrim içi',
    memberSince: 'Katılım tarihi',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: 'YÖNETİCİ PANELİ ↗',
    changeAvatar: 'Avatarı Değiştir',
    avatarModalTitle: 'Avatar Bağlantısı',
    avatarUrlLabel: 'Görsel URL\'si (HTTPS):',
    avatarSave: 'Avatarı Kaydet',
    faceitConnected: 'FACEIT Hesabı Bağlandı',
    faceitNotConnected: 'FACEIT Bağlı Değil',
    connectFaceit: 'FACEIT Bağla',
    viewOnFaceit: 'FACEIT\'te Görüntüle ↗',
    cs2Level: 'CS2 Seviyesi',
    cs2Elo: 'CS2 ELO Puanı',
    region: 'Bölge',
    verified: 'Doğrulandı',
    notLinked: 'Bağlı Değil',
    profileId: 'PROFİL KİMLİĞİ',
    copyProfileLink: 'LİNKİ KOPYALA',
    linkCopied: 'KOPYALANDI!',

    credentialsTitle: 'HESAP BİLGİLERİ',
    nicknameLabel: 'OYUNCU ADI',
    changeNickname: 'ADI DEĞİŞTİR',
    emailLabel: 'BİRİNCİL E-POSTA',
    changeEmail: 'E-POSTAYI DEĞİŞTİR',

    securityTitle: 'ŞİFRE VE GÜVENLİK',
    passwordLabel: 'ŞİFRE',
    changePassword: 'ŞİFREYİ DEĞİŞTİR',

    sessionsTitle: 'AKTİF OTURUMLAR',
    currentDevice: 'MEVCUT CİHAZ',
    currentDeviceDesc: 'Chrome (Windows) • Şimdi aktif',
    activeNow: 'Şimdi aktif',
    terminateOtherSessions: 'DİĞER TÜM OTURUMLARI KAPAT',
    sessionsTerminatedSuccess: 'Diğer tüm oturumlar başarıyla kapatıldı.',

    dangerZoneTitle: 'TEHLİKELİ BÖLGE',
    dangerZoneSubtitle: 'Geri alınamaz hesap işlemleri',
    deleteAccount: 'HESABI SİL',
    deleteAccountWarning: 'Hesabınızı silmek tüm kişisel verilerinizi ve FACEIT bağlantısını kalıcı olarak siler.',
    deleteAccountConfirm: 'Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',

    save: 'Kaydet',
    cancel: 'İptal',
    close: 'Kapat',
    submit: 'Onayla',
    oldPassword: 'Mevcut Şifre',
    newPassword: 'Yeni Şifre (en az 8 karakter)',
    confirmNewPassword: 'Yeni Şifreyi Onayla',
    newEmail: 'Yeni E-posta Adresi',
    verificationCode: '6 Haneli Doğrulama Kodu',
    sendCode: 'Kod Gönder',
    verifyAndSave: 'Doğrula ve Güncelle',
    newNickname: 'Yeni Oyuncu Adı (3-20 karakter)',
    codeSentTo: 'Doğrulama kodu gönderildi:',
    successUpdated: 'Başarıyla güncellendi',
  },

  // ==========================================
  // CHINESE (中文)
  // ==========================================
  zh: {
    title: '个人资料',
    publicProfileTitle: '玩家公开资料',
    viewOnlyNotice: '您正在查看公开资料。只有账户所有者可以修改设置。',
    backHome: '< 返回首页',
    userNotFound: '未找到玩家资料或已被删除。',
    checkingAuth: '正在加载个人资料...',

    online: '在线',
    memberSince: '注册时间',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: '管理控制台 ↗',
    changeAvatar: '更换头像',
    avatarModalTitle: '头像链接',
    avatarUrlLabel: '图片直链 (HTTPS):',
    avatarSave: '保存头像',
    faceitConnected: 'FACEIT 账号已绑定',
    faceitNotConnected: 'FACEIT 未绑定',
    connectFaceit: '绑定 FACEIT',
    viewOnFaceit: '在 FACEIT 上查看 ↗',
    cs2Level: 'CS2 等级',
    cs2Elo: 'CS2 竞技 ELO',
    region: '地区',
    verified: '已认证',
    notLinked: '未绑定',
    profileId: '玩家 ID',
    copyProfileLink: '复制链接',
    linkCopied: '已复制！',

    credentialsTitle: '账户凭据',
    nicknameLabel: '玩家昵称',
    changeNickname: '修改昵称',
    emailLabel: '主邮箱',
    changeEmail: '更换邮箱',

    securityTitle: '密码与安全',
    passwordLabel: '密码',
    changePassword: '修改密码',

    sessionsTitle: '活跃会话',
    currentDevice: '当前设备',
    currentDeviceDesc: 'Chrome (Windows) • 当前活跃',
    activeNow: '当前活跃',
    terminateOtherSessions: '终止所有其他会话',
    sessionsTerminatedSuccess: '所有其他会话已成功终止。',

    dangerZoneTitle: '危险区域',
    dangerZoneSubtitle: '不可逆的账户操作',
    deleteAccount: '注销账户',
    deleteAccountWarning: '注销账户将永久删除您的所有数据和 FACEIT 关联。',
    deleteAccountConfirm: '确定要注销账户吗？此操作无法撤销。',

    save: '保存',
    cancel: '取消',
    close: '关闭',
    submit: '提交',
    oldPassword: '当前密码',
    newPassword: '新密码 (至少8位)',
    confirmNewPassword: '确认新密码',
    newEmail: '新邮箱地址',
    verificationCode: '6位验证码',
    sendCode: '发送验证码',
    verifyAndSave: '验证并保存',
    newNickname: '新昵称 (3-20个字符)',
    codeSentTo: '验证码已发送至',
    successUpdated: '更新成功',
  },

  // ==========================================
  // ARABIC (العربية)
  // ==========================================
  ar: {
    title: 'الملف الشخصي',
    publicProfileTitle: 'الملف الشخصي العام للاعب',
    viewOnlyNotice: 'أنت تعرض ملفاً عاماً. يمكن لمالك الحساب فقط تعديل الإعدادات.',
    backHome: '< العودة للرئيسية',
    userNotFound: 'لم يتم العثور على ملف اللاعب.',
    checkingAuth: 'جارٍ تحميل الملف الشخصي...',

    online: 'متصل',
    memberSince: 'عضو منذ',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: 'لوحة التحكم ↗',
    changeAvatar: 'تغيير الصورة',
    avatarModalTitle: 'رابط الصورة الرمزية',
    avatarUrlLabel: 'رابط الصورة المباشر (HTTPS):',
    avatarSave: 'حفظ الصورة',
    faceitConnected: 'حساب FACEIT متصل',
    faceitNotConnected: 'FACEIT غير متصل',
    connectFaceit: 'ربط FACEIT',
    viewOnFaceit: 'عرض على FACEIT ↗',
    cs2Level: 'مستوى CS2',
    cs2Elo: 'تصنيف CS2 ELO',
    region: 'المنطقة',
    verified: 'تم التحقق',
    notLinked: 'غير متصل',
    profileId: 'معرف الملف',
    copyProfileLink: 'نسخ الرابط',
    linkCopied: 'تم النسخ!',

    credentialsTitle: 'بيانات الحساب',
    nicknameLabel: 'اسم اللاعب',
    changeNickname: 'تغيير الاسم',
    emailLabel: 'البريد الإلكتروني الأساسي',
    changeEmail: 'تغيير البريد',

    securityTitle: 'كلمة المرور والأمان',
    passwordLabel: 'كلمة المرور',
    changePassword: 'تغيير كلمة المرور',

    sessionsTitle: 'الجلسات النشطة',
    currentDevice: 'الجهاز الحالي',
    currentDeviceDesc: 'Chrome (Windows) • نشط الآن',
    activeNow: 'نشط الآن',
    terminateOtherSessions: 'إنهاء جميع الجلسات الأخرى',
    sessionsTerminatedSuccess: 'تم إنهاء جميع الجلسات الأخرى بنجاح.',

    dangerZoneTitle: 'منطقة الخطر',
    dangerZoneSubtitle: 'عمليات الحساب غير القابلة للتراجع',
    deleteAccount: 'حذف الحساب',
    deleteAccountWarning: 'سيؤدي حذف حسابك إلى مسح كافة البيانات والجلسات وربط FACEIT نهائياً.',
    deleteAccountConfirm: 'هل أنت متأكد من رغبتك في حذف الحساب؟ لا يمكن التراجع عن هذا الإجراء.',

    save: 'حفظ',
    cancel: 'إلغاء',
    close: 'إغلاق',
    submit: 'تأكيد',
    oldPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة (8 أحرف على الأقل)',
    confirmNewPassword: 'تأكيد كلمة المرور الجديدة',
    newEmail: 'البريد الإلكتروني الجديد',
    verificationCode: 'رمز التحقق المكون من 6 أرقام',
    sendCode: 'إرسال الرمز',
    verifyAndSave: 'تحقق وتحديث',
    newNickname: 'اسم مستخدم جديد (3-20 حرف)',
    codeSentTo: 'تم إرسال رمز التحقق إلى',
    successUpdated: 'تم التحديث بنجاح',
  },

  // ==========================================
  // JAPANESE (日本語)
  // ==========================================
  ja: {
    title: 'プロフィール',
    publicProfileTitle: '公開プレイヤープロフィール',
    viewOnlyNotice: '公開プロフィールを閲覧中です。設定変更はアカウント所有者のみ可能です。',
    backHome: '< ホームに戻る',
    userNotFound: 'プレイヤープロフィールが見つかりません。',
    checkingAuth: 'プロフィール読み込み中...',

    online: 'オンライン',
    memberSince: '登録日',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: '管理コンソール ↗',
    changeAvatar: 'アバター変更',
    avatarModalTitle: 'アバターURL',
    avatarUrlLabel: '画像URL (HTTPS):',
    avatarSave: 'アバター保存',
    faceitConnected: 'FACEIT連携済み',
    faceitNotConnected: 'FACEIT未連携',
    connectFaceit: 'FACEITを連携',
    viewOnFaceit: 'FACEITで表示 ↗',
    cs2Level: 'CS2 レベル',
    cs2Elo: 'CS2 ELOレート',
    region: '地域',
    verified: '認証済み',
    notLinked: '未連携',
    profileId: 'プロフィールID',
    copyProfileLink: 'リンクをコピー',
    linkCopied: 'コピー完了！',

    credentialsTitle: 'アカウント認証情報',
    nicknameLabel: 'プレイヤー名',
    changeNickname: 'プレイヤー名変更',
    emailLabel: '登録メールアドレス',
    changeEmail: 'メール変更',

    securityTitle: 'パスワードとセキュリティ',
    passwordLabel: 'パスワード',
    changePassword: 'パスワード変更',

    sessionsTitle: 'アクティブなセッション',
    currentDevice: '現在のデバイス',
    currentDeviceDesc: 'Chrome (Windows) • 現在アクティブ',
    activeNow: '現在アクティブ',
    terminateOtherSessions: '他の全セッションを切断',
    sessionsTerminatedSuccess: '他のすべてのセッションを切断しました。',

    dangerZoneTitle: '危険ゾーン',
    dangerZoneSubtitle: '取り消し不能なアカウント操作',
    deleteAccount: 'アカウント削除',
    deleteAccountWarning: 'アカウントを削除すると、個人データおよびFACEIT連携情報が永久に消去されます。',
    deleteAccountConfirm: '本当にアカウントを削除しますか？この操作は取り消せません。',

    save: '保存',
    cancel: 'キャンセル',
    close: '閉じる',
    submit: '送信',
    oldPassword: '現在のパスワード',
    newPassword: '新しいパスワード (8文字以上)',
    confirmNewPassword: '新しいパスワードを再入力',
    newEmail: '新しいメールアドレス',
    verificationCode: '6桁の認証コード',
    sendCode: 'コード送信',
    verifyAndSave: '認証して更新',
    newNickname: '新しいプレイヤー名 (3〜20文字)',
    codeSentTo: '認証コードの送信先:',
    successUpdated: '正常に更新されました',
  },

  // ==========================================
  // KOREAN (한국어)
  // ==========================================
  ko: {
    title: '프로필',
    publicProfileTitle: '공개 플레이어 프로필',
    viewOnlyNotice: '공개 프로필을 조회 중입니다. 설정 변경은 계정 소유자만 가능합니다.',
    backHome: '< 홈으로 돌아가기',
    userNotFound: '플레이어 프로필을 찾을 수 없습니다.',
    checkingAuth: '프로필 불러오는 중...',

    online: '온라인',
    memberSince: '가입일',
    ownerBadge: 'OWNER',
    freeBadge: 'FREE TIER',
    adminConsole: '관리자 콘솔 ↗',
    changeAvatar: '아바타 변경',
    avatarModalTitle: '아바타 URL',
    avatarUrlLabel: '이미지 URL (HTTPS):',
    avatarSave: '아바타 저장',
    faceitConnected: 'FACEIT 계정 연결됨',
    faceitNotConnected: 'FACEIT 미연결',
    connectFaceit: 'FACEIT 연결',
    viewOnFaceit: 'FACEIT에서 보기 ↗',
    cs2Level: 'CS2 레벨',
    cs2Elo: 'CS2 ELO 점수',
    region: '지역',
    verified: '인증됨',
    notLinked: '미연결',
    profileId: '프로필 ID',
    copyProfileLink: '링크 복사',
    linkCopied: '복사 완료!',

    credentialsTitle: '계정 자격 증명',
    nicknameLabel: '플레이어 닉네임',
    changeNickname: '닉네임 변경',
    emailLabel: '기본 이메일',
    changeEmail: '이메일 변경',

    securityTitle: '비밀번호 및 보안',
    passwordLabel: '비밀번호',
    changePassword: '비밀번호 변경',

    sessionsTitle: '활성 세션',
    currentDevice: '현재 기기',
    currentDeviceDesc: 'Chrome (Windows) • 현재 활동 중',
    activeNow: '현재 활동 중',
    terminateOtherSessions: '다른 모든 세션 종료',
    sessionsTerminatedSuccess: '다른 모든 세션이 종료되었습니다.',

    dangerZoneTitle: '위험 구역',
    dangerZoneSubtitle: '되돌릴 수 없는 계정 작업',
    deleteAccount: '계정 삭제',
    deleteAccountWarning: '계정을 삭제하면 모든 데이터와 FACEIT 연동 정보가 영구적으로 삭제됩니다.',
    deleteAccountConfirm: '계정을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.',

    save: '저장',
    cancel: '취소',
    close: '닫기',
    submit: '확인',
    oldPassword: '현재 비밀번호',
    newPassword: '새 비밀번호 (8자 이상)',
    confirmNewPassword: '새 비밀번호 확인',
    newEmail: '새 이메일 주소',
    verificationCode: '6자리 인증 코드',
    sendCode: '인증 코드 전송',
    verifyAndSave: '인증 및 업데이트',
    newNickname: '새 닉네임 (3-20자)',
    codeSentTo: '인증 코드가 전송된 이메일:',
    successUpdated: '성공적으로 업데이트되었습니다',
  },
};
