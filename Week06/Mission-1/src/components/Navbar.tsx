import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  return (
    <div>
      <nav className="flex items-center justify-between border-b border-white/10 bg-black/30 px-6 py-4 backdrop-blur-sm">
        <span className="text-white">내브바</span>

        <div className="flex items-center gap-3">
          {accessToken ? (
            <>
              <button
                onClick={() => navigate("/")}
                className="rounded-lg bg-[#807bff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#807bff]/25 transition hover:bg-[#6b63d9] active:scale-[0.98]"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/my")}
                className="rounded-lg bg-[#807bff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#807bff]/25 transition hover:bg-[#6b63d9] active:scale-[0.98]"
              >
                My Page
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="rounded-lg bg-[#807bff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#807bff]/25 transition hover:bg-[#6b63d9] active:scale-[0.98]"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="rounded-lg bg-[#807bff] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#807bff]/25 transition hover:bg-[#6b63d9] active:scale-[0.98]"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
