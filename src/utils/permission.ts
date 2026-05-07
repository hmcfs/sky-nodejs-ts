export function checkAdmin(id: number, method: string, url: string) {
  const urlArr = ['/admin/employee'];
  if (url.startsWith(urlArr[0]) && (id != 1 || method != 'GET')) return false;
  return true;
}

export function checkUser(url: string) {
  return !url.startsWith('/admin');
}
