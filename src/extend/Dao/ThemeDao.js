import {AsyncStorage,} from 'react-native';
import ThemeFactory,{ ThemeFlags } from "../Res/styles/ThemeFactory";

const THEME_KEY = 'theme_key'
export default class ThemeDao {
    /**
     * 获取当前主题
     * @returns {Promise<any> | Promise}
     */
    getTheme(){
        const result = null
        return new Promise((resolve, reject) => {
                try {
                  const value = AsyncStorage.getItem(THEME_KEY);
                  if (!value) {
                        this.save(ThemeFlags.Default);
                        result = ThemeFlags.Default;
                    }
                    resolve(ThemeFactory.createTheme(result))
                 } catch (error) {
                    throw new Error('主题出错～～～')
                    reject(error);
                    return;
                 }
        });
    }

    /**
     * 保存主题
     * @param themeFlag
     */
    save = async (themeFlag)  => {
        try {
            AsyncStorage.setItem(THEME_KEY, themeFlag)
        } catch (error) {
            throw new Error('保存主题出错啦～～～')
        }
       
    }
}
