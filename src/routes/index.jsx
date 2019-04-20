import Home from "../view/Home";
import Leaderboards from "../view/LeaderBoards"
var indexRoutes = [
  { path: "/leaderboards", name: "leaderboards", component: Leaderboards, private: false },
  { path: "/", name: "home", component: Home, private: false },
];

export default indexRoutes;