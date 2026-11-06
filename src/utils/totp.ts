import * as OTPAuth from 'otpauth';

export interface TOTPSetupData {
  secret: string; // Base32
  otpauthUrl: string;
}

// 1. Генерация нового секрета и otpauth ссылки
export function generateTOTP(userEmail: string): { totp: OTPAuth.TOTP; secret: string; uri: string } {
  // Генерация случайного безопасного секрета Base32 (160 бит)
  const secret = new OTPAuth.Secret({ size: 20 });

  const totp = new OTPAuth.TOTP({
    issuer: 'Peekly',
    label: userEmail || 'Player',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: secret,
  });

  return {
    totp,
    secret: secret.base32,
    uri: totp.toString(), // otpauth://totp/Peekly:...
  };
}

// 2. Проверка введенного 6-значного кода
export function verifyTOTPToken(token: string, secretBase32: string): boolean {
  if (!token || token.trim().length !== 6) return false;

  try {
    const cleanSecret = secretBase32.replace(/\s+/g, '').toUpperCase();
    const totp = new OTPAuth.TOTP({
      issuer: 'Peekly',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(cleanSecret),
    });

    // window = 1 дает допуск ±30 секунд на рассинхрон времени устройства
    const delta = totp.validate({ token: token.trim(), window: 1 });
    return delta !== null;
  } catch {
    return false;
  }
}

// 3. Генерация токена (для автоматизированного тестирования)
export function generateTOTPToken(secretBase32: string): string {
  const cleanSecret = secretBase32.replace(/\s+/g, '').toUpperCase();
  const totp = new OTPAuth.TOTP({
    issuer: 'Peekly',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(cleanSecret),
  });
  return totp.generate();
}
