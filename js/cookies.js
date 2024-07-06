export class Cookie {
  static setCookie(cname, cvalue, cED) {
    document.cookie = cname + "=" + cvalue + ";Expires=" + cED;
  }
  static getCookie(cname) {
    if (
      document.cookie
        .split(";")
        .filter((e) => e.includes(cname))
        .join("")
        .split("=")[1] != undefined ||
      cname == "Visit"
    ) {
      return document.cookie
        .split(";")
        .filter((e) => e.includes(cname))
        .join("")
        .split("=")[1];
    } else {
      console.log("Cookie Name is not exists");
      return false;
    }
  }
  static deleteCookie(ckey) {
    setCookie(ckey, "Done", new Date("6,10,2001"));
  }
  static hasCookie(cname) {
    if (
      document.cookie
        .split(";")
        .filter((e) => e.includes(cname))
        .join("")
        .split("=")[1] != undefined
    ) {
      let dta = document.cookie
        .split(";")
        .filter((e) => e.includes(cname))
        .join("")
        .split("=");
      // console.log(`Cookie Key: ${dta[0]}, Cookie Value: ${dta[1]}`);
      return true;
    } else {
      console.log("Cookie is not exists");
      return false;
    }
  }
  static allCookies() {
    let par = document.cookie.split(";");
    console.log(par.map((e) => e.split("=")));
  }
  // let visit = parseInt(getCookie("Visit")) || 0;
  // setCookie("Name", "Mohamed Halabia", new Date("6,10,2025"));
  // setCookie("Gender", "Male", new Date("6,10,2025"));
  // setCookie("Visit", ++visit, new Date("6,10,2025"));
}
