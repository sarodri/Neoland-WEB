import { axiosUtil } from "../utils";

export const getByIdPokemon = async (id)=>{
    const optionResquest = {
        method: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
    }
    return await axiosUtil(optionResquest)
}