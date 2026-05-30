export function GoogleSearchConsoleVerification() {
  const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  if (!verification) return null;

  return <meta name="google-site-verification" content={verification} />;
}
