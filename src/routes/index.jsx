import Home from "../view/Home";
import Leaderboards from "../view/LeaderBoards"
import Login from "../view/Login";
var indexRoutes = [
  { path: "/leaderboards", name: "leaderboards", component: Leaderboards, private: false },
  {path:"/login" ,name:"login" ,component:Login , private:false},
  { path: "/", name: "home", component: Home, private: true },
];

export default indexRoutes;