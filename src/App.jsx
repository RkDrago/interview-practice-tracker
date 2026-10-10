
import { RouterProvider } from "react-router-dom";
import { QuestionsProvider } from "./context/QuestionsContext";
import { router } from "./router";

export default function App() {
  return (
    <QuestionsProvider>
      <RouterProvider router={router} />
    </QuestionsProvider>
  );
}