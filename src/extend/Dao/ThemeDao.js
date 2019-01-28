import {AsyncStorage,} from 'react-native';
import ThemeFactory,{ ThemeFlags } from "../Res/styles/ThemeFactory";

const THEME_KEY = 'theme_key'
export default class ThemeDao {
    /**
     * 获取当前主题
     * @returns {Promise<any> | Promise}
     */
    getTheme() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(THEME_KEY, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    this.save(ThemeFlags.Default);
                    result = ThemeFlags.Default;
                }
                resolve(ThemeFactory.createTheme(result))
            });
        });
    }

    /**
     * 保存主题
     * @param themeFlag
     */
    save(themeFlag) {
        AsyncStorage.setItem(THEME_KEY, themeFlag, (error => {
            throw new Error('保存主题出错啦～～～')
        }))
    }
}
