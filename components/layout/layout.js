import MainHeader from "./main-header";

function Layout(props) {
  return (
    <>
      <MainHeader />
      {props.children}
    </>
  );
}

export default Layout;
