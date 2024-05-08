import { BrowserRouter } from "react-router-dom"

import { routes as Router } from "@/routes/app.routes"
import { Sidebar } from "@/components"

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-slate-100 h-screen flex relative">
        <Sidebar />

        <div className="w-full p-6 overflow-auto">
          <Router />
        </div>
      </div>
    </BrowserRouter >
  )
}

export default App
