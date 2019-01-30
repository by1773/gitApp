import Types from '../types'
import DataStore, {FLAG_STORAGE} from '../../../utils/fetch/DataStore'
import {_projectModels, handleData} from '../ActionUtil'
// import FavoriteDao from "../../../extend/Dao/FavoriteDao";
// import ProjectModel from "../../model/ProjectModel";
import LanguageDao from "../../../extend/Dao/LanguageDao";

/**
 * 加载标签
 * @param flagKey
 * @returns {function(*)}
 */
export function onLoadLanguage(flagKey) {
    return async dispatch => {
        try {
            let languages = await new LanguageDao(flagKey).fetch();
            dispatch({type: Types.LANGUAGE_LOAD_SUCCESS, languages: languages, flag: flagKey})
        } catch (e) {
            console.log(e)
        }
    }
}