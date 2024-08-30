export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth();

  if (process.server) {
    await auth.getUser();
  } else {
    auth.getUser();
  }
});
