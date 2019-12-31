var ip = process.env.NODE_ENV === 'production' ? "http://ft.wanjunshijie.com/" : "http://localhost:8080/"
console.log(process.env.NODE_ENV);
console.log(ip);
export const devIp = ip
export const testIp = ip
