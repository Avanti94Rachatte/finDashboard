import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"
import { API_PATHS } from "../utils/apiPaths"

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    // ✅ If user already exists, do nothing
    if (user) return

    let isMounted = true

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)

        if (isMounted && response?.data) {
          updateUser(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error)

        // ✅ Redirect ONLY if unauthorized
        if (
          isMounted &&
          error?.response?.status === 401
        ) {
          clearUser()
          navigate("/login", { replace: true })
        }
      }
    }

    fetchUserInfo()

    return () => {
      isMounted = false
    }
  }, [user, updateUser, clearUser, navigate])
}
