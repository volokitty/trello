import { useBoardsStore } from "@/shared/stores/boards";
import { usePageStore } from "@/shared/stores/page";

export function initStores() {
  useBoardsStore();
  usePageStore();
}
