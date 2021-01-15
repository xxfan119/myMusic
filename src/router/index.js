import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Index from '../views/index.vue'
import Main from '../views/Main/Main.vue'
import Recommend from '../views/Main/Recommend.vue'
import MusicClub from '../views/Main/musicClub.vue'

import Search from '../views/search/Search.vue'
import Singer from '../views/Main/Singer'
import Rank from '../views/Main/Rank'
import Radio from '../views/Main/Radio'
import SongList from '../views/Main/songList.vue'
import MvList from '../views/Main/MvList.vue'

import SingerInfo from '../views/singerInfo/singerInfo.vue'

import UserIndex from '../views/User/UserIndex.vue'
import TopDetail from '../views/Details/Topdetail.vue'
import SongListInfo from '../views/Details/SongListInfo.vue'
import MoreList from '../views/songList/MoreList.vue'
import TypeSongList from '../views/songList/TypeSongList.vue'
import AlbumInfo from '../views/Details/AlbumInfo.vue'
import MvInfo from '../views/Details/MvInfo.vue'
import SearchResult from '../views/search/SearchResult.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Index,
        children: [{
                path: '/',
                component: Main,
                children: [{ path: '/', component: Recommend }]
            },
            {
                path: '/main',
                component: Main,
                children: [

                    { path: '/main', component: Recommend },
                    { path: 'recommend', component: Recommend },
                    { path: 'music', component: MusicClub },
                ]
            },
            {
                path: '/user',
                component: UserIndex,
            },
        ]
    },
    { path: '/search', component: Search, },
    { path: '/singer', component: Singer, },
    { path: '/rank', component: Rank },
    { path: '/radio', component: Radio },
    { path: '/songList', component: SongList },
    { path: '/mvlist', component: MvList },

    {
        path: '/singerinfo/:mid',
        name: 'singerinfo',
        component: SingerInfo,
    },
    {
        path: '/topdetail/:id',
        component: TopDetail,
    },
    {
        path: '/songlistinfo/:id',
        component: SongListInfo,
    },
    {
        path: '/albuminfo/:albummid',
        component: AlbumInfo,
    },
    {
        path: '/mvinfo/:id',
        component: MvInfo,
    },
    {
        path: '/searchresult/:key',
        component: SearchResult,
    },
    {
        path: '/morelist',
        component: MoreList
    },
    {
        path: '/typesonglist/:id',
        component: TypeSongList
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router