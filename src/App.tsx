import { TableWithSearch } from "./components/Table";
import { Weather } from "./components/Weather";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { path: "/", element: <TableWithSearch /> },
        { path: "/weather/:cityname", element: <Weather /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
