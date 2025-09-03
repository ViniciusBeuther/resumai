import React from "react"
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if token exists (you can adjust this logic)
  const token = localStorage.getItem("token")

  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />
  }

  // If logged in, render children
  return <>{children}</>
}

export default ProtectedRoute
