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

  // Credentials
  credentialsTitle: string;
  credentialsSubtitle: string;
  nicknameLabel: string;
  changeNickname: string;
  emailLabel: string;
  changeEmail: string;

  // Password & Security
  securityTitle: string;
  securitySubtitle: string;
  passwordLabel: string;
  changePassword: string;

  // Sessions
  sessionsTitle: string;
  sessionsSubtitle: string;
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
    freeBadge: 'FREE TIER (EARLY BETA)',
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

    credentialsTitle: 'Учётные данные',
    credentialsSubtitle: 'Персональная информация и идентификация аккаунта',
    nicknameLabel: 'Никнейм игрока',
    changeNickname: 'Изменить никнейм',
    emailLabel: 'Основной Email',
    changeEmail: 'Сменить Email',

    securityTitle: 'Пароль и безопасность',
    securitySubtitle: 'Защита учётной записи и криптографическая аутентификация',
    passwordLabel: 'Пароль',
    changePassword: 'Сменить пароль',

    sessionsTitle: 'Активные сессии',
    sessionsSubtitle: 'Устройства, авторизованные в вашем аккаунте',
    currentDevice: 'Текущее устройство',
    currentDeviceDesc: 'Chrome (Windows) • Активно сейчас',
    activeNow: 'Активно сейчас',
    terminateOtherSessions: 'Завершить все остальные сеансы',
    sessionsTerminatedSuccess: 'Все остальные сеансы успешно завершены.',

    dangerZoneTitle: 'Опасная зона',
    dangerZoneSubtitle: 'Необратимые действия с учётной записью',
    deleteAccount: 'Удалить аккаунт',
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
    freeBadge: 'FREE TIER (EARLY BETA)',
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

    credentialsTitle: 'Account Credentials',
    credentialsSubtitle: 'Personal identity and account management',
    nicknameLabel: 'Player Nickname',
    changeNickname: 'Change Nickname',
    emailLabel: 'Primary Email',
    changeEmail: 'Change Email',

    securityTitle: 'Password & Security',
    securitySubtitle: 'Account credentials and cryptographic authentication',
    passwordLabel: 'Password',
    changePassword: 'Change Password',

    sessionsTitle: 'Active Sessions',
    sessionsSubtitle: 'Devices authorized in your account',
    currentDevice: 'Current Device',
    currentDeviceDesc: 'Chrome (Windows) • Active now',
    activeNow: 'Active now',
    terminateOtherSessions: 'Terminate All Other Sessions',
    sessionsTerminatedSuccess: 'All other sessions have been terminated.',

    dangerZoneTitle: 'Danger Zone',
    dangerZoneSubtitle: 'Irreversible account operations',
    deleteAccount: 'Delete Account',
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
  de: {} as ProfileTranslation,
  pl: {} as ProfileTranslation,
  fr: {} as ProfileTranslation,
  es: {} as ProfileTranslation,
  da: {} as ProfileTranslation,
  pt: {} as ProfileTranslation,
  fi: {} as ProfileTranslation,
  sv: {} as ProfileTranslation,
  tr: {} as ProfileTranslation,
  uk: {} as ProfileTranslation,
  zh: {} as ProfileTranslation,
  ar: {} as ProfileTranslation,
  ja: {} as ProfileTranslation,
  ko: {} as ProfileTranslation,
};

// Populate fallbacks for other languages
const fallbackEn = profileTranslations.en;
(Object.keys(profileTranslations) as Language[]).forEach((lang) => {
  if (lang !== 'ru' && lang !== 'en') {
    profileTranslations[lang] = { ...fallbackEn };
  }
});
