import {onThemeChange, onShowCustomThemeView, onThemeInit} from './theme';
import {onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite} from './popular';
// import {onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite} from './trending';
import {onSearch, onLoadMoreSearch, onSearchCancel} from './search';
// import {onLoadFavoriteData} from './favorite';
import {onLoadLanguage} from './language';

export default {
    onThemeChange,
    onShowCustomThemeView,
    onThemeInit,
    onRefreshPopular,
    onLoadMorePopular,
    // onRefreshTrending,
    // onLoadMoreTrending,
    // onLoadFavoriteData,
    onFlushPopularFavorite,
    // onFlushTrendingFavorite,
    onLoadLanguage,
    onSearch,
    onLoadMoreSearch,
    onSearchCancel,
}