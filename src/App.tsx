import { BrowserRouter } from "react-router-dom"

import { Sidebar } from "@/app/components/sidebar"
import { routes as Router } from "@/app/routes/app.routes"

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex relative bg-slate-50">
        <Sidebar />

        <div className="w-full p-6">
          <Router />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
