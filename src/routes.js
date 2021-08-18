import SignUpPageState from "./pages/SignUp";
import LoginPageState from "./pages/Login";
import HomePageState from "./pages/Home";

export const routes = [SignUpPageState, LoginPageState, HomePageState];
export const config = router => {
    // register home state as the intial one
    router.urlService.rules.initial({ state: 'home' });
}