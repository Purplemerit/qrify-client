import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { useLocation } from "react-router-dom"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  // Pages without sidebar
  const pagesWithoutSidebar = ['/', '/login', '/signup']
  const showSidebar = !pagesWithoutSidebar.includes(location.pathname)

  // If no sidebar, render simple layout
  if (!showSidebar) {
    return (
      <div className="min-h-screen">
        {/* Header for pages without sidebar */}
        {location.pathname === '/' && (
          <header className="py-6 bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                  Q
                </div>
                <div>
                  <h1 className="text-lg font-semibold">QRFY</h1>
                  <p className="text-xs text-gray-400">QR Code Generator</p>
                </div>
              </div>
              <nav className="flex items-center gap-6 text-sm text-gray-600">
                <a className="hover:text-gray-900">Products</a>
                <a className="hover:text-gray-900">Resources</a>
                <a className="hover:text-gray-900">Plans</a>
                <a className="hover:text-gray-900">API</a>
                <div className="flex items-center gap-3">
                  <a href="/login">
                    <button className="px-4 py-2 rounded-full border">Log In</button>
                  </a>
                  <a href="/signup">
                    <button className="px-4 py-2 rounded-full bg-blue-600 text-white">
                      Register
                    </button>
                  </a>
                </div>
              </nav>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main>
          {children}
        </main>
      </div>
    )
  }

  // Layout with sidebar for authenticated pages
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="py-6 bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                  Q
                </div>
                <div>
                  <h1 className="text-lg font-semibold">QRFY</h1>
                  <p className="text-xs text-gray-400">QR Code Generator</p>
                </div>
              </div>
              <nav className="flex items-center gap-6 text-sm text-gray-600">
                <a className="hover:text-gray-900">Products</a>
                <a className="hover:text-gray-900">Resources</a>
                <a className="hover:text-gray-900">Plans</a>
                <a className="hover:text-gray-900">API</a>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 rounded-full border">Log In</button>
                  <button className="px-4 py-2 rounded-full bg-blue-600 text-white">
                    Register
                  </button>
                </div>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}