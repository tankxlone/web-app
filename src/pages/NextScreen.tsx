import { useEffect } from "react";
import PostTable from "../components/PostTable";
import DepartmentList from "../components/DepartmentList";
import { useUser } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";

const NextScreen: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div>
      <PostTable />
      <DepartmentList />
    </div>
  );
};

export default NextScreen;
