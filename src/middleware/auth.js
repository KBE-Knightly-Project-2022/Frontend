export default function auth({ next, router, store }) {
    if (!store.getters.isAuthenticated) {
        return router.push({ name: 'Home' });
    }
    return next();
}