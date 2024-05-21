import { createRouter, createWebHistory } from "vue-router";
import { PageLayout } from "@/app";
import Boards from "@/pages/Boards";
import Board from "@/pages/Board";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: { name: "Boards" },
      component: PageLayout,
      children: [
        {
          path: "boards",
          name: "Boards",
          redirect: { name: "BoardList" },
          children: [
            {
              path: "",
              component: Boards,
              name: "BoardList",
            },
            {
              path: ":id",
              component: Board,
              name: "Board",
            },
          ],
        },
      ],
    },
  ],
});

export default router;
