//! -----------------------------------------------------------------------------------
//?-----------------> INICIALIZACION EN LAZY DEL ESTADO ------------------------------
//! -----------------------------------------------------------------------------------

const currentUser = {
    name: sessionStorage.getItem("currentUser")
      ? sessionStorage.getItem("currentUser")
      : "",
  };
  
  let userData = localStorage.getItem(currentUser.name)
    ? JSON.parse(localStorage.getItem(currentUser.name))
    : {
        name: "",
        token: false,
        fav: [],
      };

  const dataGlobal = {
    pokemon: [],
    ricky: [],
  };
  
  //! --------------------------------------------------------------------------------------------
  //? ----------------------------- FUNCIONES GET Y FUNCIONES SET---------------------------------
  //! --------------------------------------------------------------------------------------------
  
  //! -------------------- SET Y GET  currentUser ----------------
  
  export const setUser = (username) => {
    currentUser.name = username;
  };
  
  export const getUser = () => {
    return currentUser;
  };
  
  //! -------------------- SET y GET dataGlobal----------------
  
  export const setData = (data, page) => {
    switch (page) {
      case "Pokemon":
        dataGlobal.pokemon = data;
  
        break;
  
      default:
        break;
    }
  };
  
  export const getData = (page) => {
    switch (page) {
      case "Pokemon":
        return dataGlobal.pokemon;
      default:
        break;
    }
    return dataGlobal;
  };
  
  //! -------------------SET y GET  dde userData  --------------------------
  
  export const setUserData = (data) => {
    console.log(".....metiendo datos en el contexto");
    userData.fav = data?.fav;
    userData.name = data?.name;
    userData.token = data?.token;
    const stringUser = JSON.stringify(userData);
    localStorage.removeItem(`${currentUser.name}`);
    console.log(userData.name);
    localStorage.setItem(`${currentUser.name}`, stringUser);
  };
  
  export const getUserData = () => {
    return userData;
  };