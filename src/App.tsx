import { Sidebar } from "@/app/components/sidebar"
import { routes as Router } from "@/app/routes/app.routes"
import { BrowserRouter } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex relative">
        <Sidebar />

        <div className="w-full p-6">
          <Router />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
