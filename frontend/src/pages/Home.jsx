import Banner from "../compontents/Banner";
import DepartmentMenu from "../compontents/DepartmentMenu";
import Header from "../compontents/Header";
import TopTeacher from "../compontents/TopTeacher";

const Home = () => {
  return (
    <div>
      <Header />
      <DepartmentMenu />
      <TopTeacher />
      <Banner />
    </div>
  );
};

export default Home;
