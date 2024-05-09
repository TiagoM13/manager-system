import { BrowserRouter } from "react-router-dom"

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

import { Sidebar } from "@/components"
import { routes as Router } from "@/routes"

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

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
