import React, { Suspense, Lazy, lazy } from "react";
// import LoginPage from '../pages/login/LoginPage'
import HomePage from '../layout/home/HomePage'
import LayoutPage from '../layout/LayoutPage'
import ShopsPage from "@/layout/shops/ShopsPage";
import UserPage from "@/pages/user/UserPage";
import CategoryPage from "@/layout/goods/category/categoryPage";
import GoodList from "@/layout/goods/goodList/goodList";
import GoodsAdd from "@/layout/goods/goodList/GoodsAdd";
import WeekTest from "@/pages/WeekTest";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const LoginPage = lazy(() => import('../pages/login/LoginPage'))

const AppRouter = () => {
    return (
        <Suspense fallback={<p>页面加载中...</p>}>
            <BrowserRouter>
                <Routes>
                    <Route path="WeekTest" element={<WeekTest></WeekTest>}></Route>
                    <Route path="/" element={<LayoutPage></LayoutPage>}>
                        <Route path="home" element={<HomePage></HomePage>}></Route>
                        <Route path="users" element={<UserPage></UserPage>}></Route>
                        <Route path="shops" element={<ShopsPage></ShopsPage>}></Route>
                        <Route path="category" element={<CategoryPage></CategoryPage>}></Route>
                        <Route path="goods/goodlist" element={<GoodList></GoodList>}></Route>
                        <Route path="goods/goodlist/goodsAdd" element={<GoodsAdd></GoodsAdd>}></Route>
                    </Route>

                </Routes>
            </BrowserRouter>
        </Suspense>

    )
}

export default AppRouter