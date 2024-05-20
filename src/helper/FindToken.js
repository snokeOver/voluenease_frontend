// Utility function to check for the token in cookies
const getTokenFromCookies = () => {
  const cookies = Object.fromEntries(
    document.cookie.split(";").map((cookie) => {
      const [name, ...rest] = cookie.split("=");
      const value = rest.join("=");
      return [name.trim(), decodeURIComponent(value)];
    })
  );
  console.log("Cookies:", cookies);
};

export { getTokenFromCookies };
