import { getUser } from "../global/state/globalstate";
import { Login, PrintPokemonPage, printTemplateDashboard, PrintMemoryPage } from "../pages"; //faltaria añadir PrintTicTacToePage()


export const initControler = (pagesRender) => {// pagina a renderizar en la app
 
    switch (pagesRender) {
  
    // si no hay usuario, pinta el Login, si existe, pinta el Dashboard
      case undefined:
        localStorage.getItem(getUser().name) ? printTemplateDashboard() : Login();
        break;

      case "Pokemon":
        PrintPokemonPage();
        break;
      case "Dashboard":
        printTemplateDashboard();
        break;
      case "TicTacToe":
        PrintTicTacToePage();
        break;
      case "Login":
        Login();
        break;
      case "Memory":
        PrintMemoryPage();
        ;
        break;
    }
  };