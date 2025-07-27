import { auth } from './auth';

export default auth((req) => {
  if (!req.auth) {
    return '/login';
  }
});

export const config = {
  matcher: ['/bookmarks', '/profile'], 
};