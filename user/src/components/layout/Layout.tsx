import { LayoutContainer } from "./css/style-Layout";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Main />
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
