import { BrowserRouter } from "react-router-dom"

import { Sidebar } from "@/app/components/sidebar"
import { routes as Router } from "@/app/routes/app.routes"

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-slate-50 h-screen flex relative">
        <Sidebar />

        <div className="w-full p-6 overflow-auto">
          <Router />
        </div>
      </div>
    </BrowserRouter >
  )
}

export default App
